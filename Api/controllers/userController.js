import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    try {

        if (!username || !email || !password) {
            res.status(400)
            throw new Error("Please fill all the fields")
        }
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).send('User already exist')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        createToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (isPasswordValid) {
            createToken(res, existingUser._id)
            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
            return
        }
    } else {
        res.status(400).send("Invalid credentials")
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 0,
    });
    res.status(200).json({ message: "User logged out successfully" });
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})


const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,

        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Cannot delete admin user")
        }
        await User.deleteOne({_id:user._id})
        res.status(200).json({ message: "User deleted successfully" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const getUsersById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { createUser, 
    loginUser, 
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateUserProfile,
    deleteUser,
    getUsersById,
    updateUserById

}



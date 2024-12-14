import express from 'express'
import { createUser, deleteUser, getAllUsers, getCurrentUserProfile, getUsersById, loginUser, logoutUser, updateUserById, updateUserProfile } from '../controllers/userController.js'
import { authenticate, autohrized } from '../middlewares/authMiddleware.js'
const router = express.Router()


router.route('/').post(createUser).get(authenticate,autohrized,getAllUsers)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateUserProfile)

// ADMIN ROUTES
router.route('/:id').delete(authenticate,autohrized,deleteUser)
.get(authenticate,autohrized,getUsersById).put(authenticate,autohrized,updateUserById)
export default router
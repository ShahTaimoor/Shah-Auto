import { Link, useNavigate } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineTruck } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";

const Navigation = () => {
    return (
        <>

            <header className='top-strip text-sm text-gray-500 py-1 border-b-2 border-gray-100 pb-2 '>
                <div className="container">
                    <div className='flex items-center justify-between'>
                        <p>Welcome To Shah Autos.PK</p>
                        <ul className='flex items-center gap-8'>
                            <li>
                                <Link to="#" className='flex  items-center gap-2 border-r-[1px] border-gray-300 pr-2'> <CiLocationOn /> Store Locator</Link>
                            </li>
                            <li>
                                <Link to="#" className='flex  items-center gap-2 border-r-[1px] border-gray-300 pr-2'> <AiOutlineTruck /> Track your order</Link>
                            </li>
                            <li>
                                <Link to="#" className='flex  items-center gap-2 border-r-[1px] border-gray-300 pr-2'> <CiShoppingCart /> Shop</Link>
                            </li>
                            <li>
                                <Link to="#" className='flex  items-center gap-2 '> <RiAccountPinCircleLine /> My Account</Link>
                            </li>



                        </ul>
                    </div>
                </div>
            </header>
            <nav className=' shadow-sm  '>

                <div className='container overflow-visible sticky top-0 left-0 right-0 py-10 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <img className='w-48' src="/images/logo.png" alt="" />
                        <RiMenu2Fill classNamFe='text-2xl' />
                    </div>
                    <div className='w-[50%] relative'>
                        <input className='border w-full  py-2 rounded-full outline-none px-5 border-[#FED700]' type="text" name="" id="" />
                        <span className='absolute py-2 px-5 h-[42px] cursor-pointer flex items-center justify-center rounded-r-full right-0 top-0 bg-[#FED700]'><IoSearchOutline /></span>
                    </div>
                    <div className='relative  flex items-center gap-5'>
                        <CiHeart className='w-8 h-8 cursor-pointer ' />
                        <CiShoppingCart className='w-8 h-8 cursor-pointer' />
                        <p className='absolute top-5  right-0 w-4 h-4 bg-[#FED700] text-white flex items-center justify-center rounded-full '>0</p>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default Navigation
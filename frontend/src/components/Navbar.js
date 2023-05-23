import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { Link } from "react-router-dom";



const Navbar = () => {
    // state could be a empty list, object or a value
    // useState return an array
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    useEffect(() => {
        handleNav();
    }, nav);

    return (
        <div className='flex p-10 justify-between items-center h-24 max-w-[1240px]  mx-auto text-white' >
            <h1 className='text-3xl font-bold text-[#ffffff] cursor-pointer'><span className='text-[#017e84]'>F</span>ast <span className='text-[#017e84]'>T</span>ransfer</h1>
            <ul className='hidden md:flex'>
                <li className='p-4 font-bold text-[#ffffff] cursor-pointer'>
                    <Link to='/'>Home</Link>

                </li>
                <li className='p-4 font-bold text-[#ffffff] cursor-pointer'>
                    <Link to='/about'>About</Link>
                </li>
                <li className='p-4 font-bold text-[#ffffff] cursor-pointer'>
                    <Link to='/contact'>Contact</Link>

                </li>
            </ul>
            <ul className='hidden md:flex'>
                <li className='p-4 font-bold text-[#ffffff] flex t'>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>

            <div onClick={handleNav} className='block md:hidden cursor-pointer'>
                {!nav ? <AiOutlineClose size={20} color='#ffffff' /> : <AiOutlineMenu size={20} color='#ffffff' />}
            </div>

            <div className={!nav ? 'fixed pl-10 left-0 top-0 w-[50%] h-full border-r border-r-gray-900 z-10 bg-white ease-in-out duration-500' : 'fixed right-[-100%]'}>
                <ul className='pt-24 uppercase'>
                    <li className=' border-b border-gray-600 text-black'>Home</li>
                    <li className=' border-b border-gray-600 text-black'>About</li>
                    <li className=' border-b border-gray-600 text-black'>Contact</li>
                    <li className=' border-b border-gray-600 text-black'>Login</li>
                </ul>
            </div>
        </div >

    )
}

export default Navbar

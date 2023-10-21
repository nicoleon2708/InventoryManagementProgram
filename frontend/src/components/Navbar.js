import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import authService from '../services/auth.service';
import {useNavigate, Link} from 'react-router-dom'
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../assets/images/avatar.jpg'
import Sidebar from './user_dashboard/Sidebar';
const Navbar = () => {

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const user = JSON.parse(localStorage.getItem('token'))

    const [profile, setProfile] = useState(false)
    const handleProfile = () => setProfile(!profile)



    return(
        <div className='w-screen h-[80px] z-10 bg-[#ffffff] fixed drop-shadow-lg'>

            <div className='px-5'>
                <div className='px-2 flex justify-between items-center w-full h-full'>
                    <div className='flex items-center'>
                        <h1 className='text-3xl text-blue-600 font-bold mr-4 sm:text-4xl'>FastTransfer.</h1>
                        {user ? (
                            <div>
                            </div>
                        ):
                        (
                        <ul className='hidden md:flex'>
                            <li>Home</li>
                            <li>About</li>
                            <li>Features</li>
                            <li>Pricing</li>
                        </ul>
                        )
                        }
                    </div>
                    <div className='hidden md:flex pr-4'>
                        {user ? 
                        (   
                                <div className='flex items-center'>
                                    <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faBell} />

                                    <div className='relative'>
                                    <img onClick={handleProfile} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={avatar} alt="User dropdown" />
                                    <div id="userDropdown" class={profile ? "z-10 absolute top-[43px] right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 " : 'hidden' }>
                                        <div class="px-4 py-3 text-sm text-gray-90">
                                            <div>Nicole</div>
                                            </div>
                                            <ul class="py-2 text-sm text-gray-700 " aria-labelledby="avatarButton">
                                            <li className='px-4 '>
                                                <a className='no-underline text-gray-700	' href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                            </li>
                                            <li className='px-4 '>
                                                <a className='no-underline text-gray-700	' href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                            </li>
                                            <li className='px-4 '>
                                                <a className='no-underline text-gray-700	' href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                                            </li>
                                            </ul>
                                            <div class="py-1 px-4">
                                            <a className='no-underline text-gray-700	' href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                        ):
                        (
                            <>
                                <button className='hover:text-green-600 mr-4'>
                                <Link to='/login'>
                                    Sign In
                                </Link>
                                </button>
                                <button className='bg-green-600 hover:bg-transparent px-8 py-3 rounded-lg text-white hover:border hover:border-green-600'>
                                    <Link to='/register'>
                                    Sign Up
                                    </Link>
                                </button>
                            </>
                        )
                    }
                    </div>

                    <div className='md:hidden cursor-pointer' onClick={handleClick}>
                        
                        {!nav ? <AiOutlineMenu className='w-5'/> : <AiOutlineClose className='w-5'/>}
                    </div>
                </div>

                <ul className={!nav ? 'hidden': 'absolute bg-zinc-200 w-full px-8'}>
                    <li className='border-b-2 border-zinc-300 w-full'>Home</li>
                    <li className='border-b-2 border-zinc-300 w-full'>About</li>
                    <li className='border-b-2 border-zinc-300 w-full'>Features</li>
                    <li className='border-b-2 border-zinc-300 w-full'>Pricing</li>
                    <div className='flex flex-col my-4'>
                        <button className='bg-transparent text-green-600 px-8 py-3 mb-4'>Sign In</button>
                        <button className='px-8 py-3 bg-green-600'>Sign Up</button>
                    </div>
                </ul>
            </div>
            {/* {user && <Sidebar/>} */}
        </div>
    )
}

export default Navbar

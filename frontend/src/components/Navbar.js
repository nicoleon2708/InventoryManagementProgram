import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import authService from '../services/auth.service';
import {useNavigate, Link} from 'react-router-dom'


const Navbar = () => {

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const user = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()

    const logOut =(e)=>{
        e.preventDefault()
        if(authService.logout()){
            navigate('/login')
        }
    }

    return(
        <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>

            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>FastTransfer.</h1>
                    <ul className='hidden md:flex'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Features</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className='hidden md:flex pr-4'>
                    {user ? (
                        <div className='flex items-center'>
                            <h1 className='mr-4'>Hello</h1>
                            <button onClick={logOut} className='hover:text-green-600 mr-4'>
                               Logout
                            </button>
                        </div>
                    ):
                    (
                        <>
                            <button className='hover:text-green-600 mr-4'>
                                Sign In
                            </button>
                            <button className='bg-green-600 hover:bg-transparent px-8 py-3 rounded-lg text-white hover:border hover:border-green-600'>
                                Sign Up
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
    )
}

export default Navbar

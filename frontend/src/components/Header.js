import React from 'react'

const Header = () => {
    return (
        <header className='py-6 mx-10 bg-white relative'>
            <nav className='flex flex-row justify-between items-center mr-auto'>
                <div className='basis-1/3 md:basis-2/6 text-center text-xl font-semibold cursor-pointer'>
                    FastTransfer
                </div>

                <div className='basis-3/6 absolute md:static bg-white md:min-h-fit min-h-[60vh] left-0 top-[-400%] w-full md:w-auto flex items-center px-5'>
                    <ul className='basis-1/2 flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
                        <li className='cursor-pointer py-1 hover:text-gray-500'>Home</li>
                        <li className='cursor-pointer py-1 hover:text-gray-500'>Contact</li>
                        <li className='cursor-pointer py-1 hover:text-gray-500'>About</li>
                        <li className='cursor-pointer py-1 hover:text-gray-500'>Features</li>
                        <li className='cursor-pointer py-1 hover:text-gray-800'>Explore</li>
                    </ul>
                </div>
                <ul className='basis-1/3 md:basis-1/6'>
                    <button className='bg-[#a6c166] text-white p-3 md:px-5 md:py-2 rounded-full hover:bg-[#87acec]]'>Sign in</button>
                </ul>

                <div className=' lg:hidden flex items-center cursor-pointer px-2 sm:px-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </div>
            </nav>
        </header >
    )
}

export default Header

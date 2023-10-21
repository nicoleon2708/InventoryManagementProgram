import React from 'react'
import Typed from 'react-typed';
import WarehouseManagement from '../../assets/images/WarehouseManagement.png'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='flex container-xl p-20'>
            {/* LEFT BANNER */}
            <div className='w-full text-white'>
                <div className='w-full text-center md:text-left  mt-[-96px] h-screen flex flex-col justify-center'>
                    <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold py-4 uppercase'>
                        Software for inventory management
                    </h1>
                    <p className='md:text-3xl sm:text-2xl text-xl font-bold  md:py-1'>
                        Provide supply chain logistics options for your company
                    </p>
                    <p className='md:text-2xl sm:text-xl text-sm font-bold text-black  md:py-1'>
                        Help you manage products and transport them to partners

                    </p>
                    <p className='md:text-2xl sm:text-xl text-sm font-bold md:py-1 text-black uppercase'>
                        <Typed
                            strings={['efficiently and quickly']}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </p>
                    <button className='bg-[#ff792e] w-[200px] rounded-md font-medium my-6 mx-auto py-3 '>
                        <Link to='/register'>Get started now</Link>
                    </button>
                </div>
            </div>

            {/* RIGHT BANNER */}
            <div className='hidden md:block w-6/12'>
                <img src={WarehouseManagement} alt='/' />

            </div>
        </div>
    )
}

export default Banner

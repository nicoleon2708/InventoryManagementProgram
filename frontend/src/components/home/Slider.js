import React from 'react'
import WarehouseManagement from '../../assets/images/WarehouseManagement.png'
import { Link } from 'react-router-dom'

const Slider = () => {
    return (
        <div className='relative w-full py-10 h-auto bg-zinc-200 flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-10 py-8 md:px-20'>
                    <h1 className=' py-3 text-3xl md:text-7xl font-bold '>
                        Software for inventory management
                    </h1>
                    <p className='text-2xl'>
                        Provide supply chain logistics options for your company
                    </p>
                    <p className='text-2xl'>
                        Help you manage products and transport them to partners efficiently and quickly
                    </p>
                    <button className='text-white bg-[#ff792e] px-8 py-3 rounded-md sm:w-[60%] my-4 hover:opacity-80 font-bold'>
                        <Link to='/register' className='no-underline text-white'>
                            Get started
                        </Link>
                    </button>
                </div>

                <div className='hidden lg:block'>
                    <img src={WarehouseManagement} className='w-full' alt='/' />
                </div>


            </div>


        </div>
    )
}

export default Slider

import React from 'react'
import InventoryManagement from '../../assets/images/InventoryManagementPicture.png'
import Typed from 'react-typed'
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4' src={InventoryManagement} alt='/' />
                <div className='flex flex-col justify-center'>
                    <h1 className='text-black md:text-4xl sm:text-3xl text-2xl text-center font-bold'>
                        <Typed
                            strings={['ABOUT US']}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </h1>
                    <p className='py-5'>
                        Our website can help your company can optimize supply chain management, obtain more accurate inventory data, get better at managing inventory, and experience exponential growth across all departments.
                    </p>
                    <button className='bg-black w-[200px] text-white rounded-md font-medium my-6 mx-auto py-3 hover:bg-[#017e84]'>
                        <Link to='/register'>Get started now</Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AboutUs

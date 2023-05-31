import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Pricing = () => {
    return (
        <div className='w-full my-24'>
            <div className='w-full p-10 bg-zinc-200 absolute mix-blend-overlay h-[800px]'>

            </div>

            <div className='max-w-[1240px] mx-auto py-12 px-10'>
                <div className='text-center py-8 font-bold'>

                    <h1 className='text-5xl font-bold py-8'>
                        Choose a plan to suit your business
                    </h1>
                    <p className='text-3xl '>We're happy to have you as one of our partners</p>
                </div>

                <div className='grid lg:grid-cols-3 md:grid-cols-2'>
                    <div className='bg-white text-black m-4 p-8 rounded-xl shadow-2xl relative'>
                        <span className='uppercase px-3 py-1  bg-green-600 text-white rounded-2xl text-sm'>Standard</span>
                        <div>
                            <p className='text-6xl font-bold py-4 flex'>$18/<span className='text-xl text-black flex flex-col justify-end'>month</span></p>
                        </div>
                        <p className='text-2xl py-8 text-black'>Start your business</p>
                        <div>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Track income & expenses</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Send custom invoices</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Connect your bank</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Track GST</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Insighst and report</p>
                            <button className='w-full py-4 my-4 bg-green-600 text-white hover:opacity-80 rounded-lg'>Get started</button>
                        </div>
                    </div>

                    <div className='bg-white text-black m-4 p-8 rounded-xl shadow-2xl relative'>
                        <span className='uppercase px-3 py-1  bg-green-600 text-white rounded-2xl text-sm'>Essentials</span>
                        <div>
                            <p className='text-6xl font-bold py-4 flex'>$27/<span className='text-xl text-black flex flex-col justify-end'>month</span></p>
                        </div>
                        <p className='text-2xl py-8 text-black'>Run your business</p>
                        <div>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />All features of  <span className='font-bold ml-1 text-green-600'>STANDARD</span></p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Manage bills and payments</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Capture & organise receipts</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Multi-currency</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Progress invoicing</p>
                            <button className='w-full py-4 my-4 bg-green-600 text-white hover:opacity-80 rounded-lg'>Get started</button>
                        </div>
                    </div>

                    <div className='bg-white text-black m-4 p-8 rounded-xl shadow-2xl relative'>
                        <span className='uppercase px-3 py-1  bg-green-600 text-white rounded-2xl text-sm'>Premium</span>
                        <div>
                            <p className='text-6xl font-bold py-4 flex'>$36/<span className='text-xl text-black flex flex-col justify-end'>month</span></p>
                        </div>
                        <p className='text-2xl py-8 text-black'>Grow your business</p>
                        <div>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />All features of  <span className='font-bold ml-1 text-green-600'> ESSENTIALS</span></p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Tracking inventory</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Manage budgets</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Track project profitability</p>
                            <p className='flex py-4'><FontAwesomeIcon icon={faCheck} className='w-8 mr-5 text-green-600' />Recurring transactions and bills</p>


                            <button className='w-full py-4 my-4 bg-green-600 text-white hover:opacity-80 rounded-lg'>Get started</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Pricing

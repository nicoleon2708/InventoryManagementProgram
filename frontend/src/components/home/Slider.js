import React from 'react'
import WarehouseManagement from '../../assets/images/WarehouseManagement.png'

const Slider = () => {
    return (
        <div className='relative w-full py-10 h-screen bg-zinc-200 flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-20 py-8'>
                    <h1 className=' py-3 text-5xl md:text-7xl font-bold '>
                        Software for inventory management
                    </h1>
                    <p className='text-2xl'>
                        Provide supply chain logistics options for your company
                    </p>
                    <p className='text-2xl'>
                        Help you manage products and transport them to partners efficiently and quickly
                    </p>
                    <button className='text-white bg-green-600 px-8 py-3 rounded-md sm:w-[60%] my-4 hover:opacity-80 font-bold'>
                        Get started
                    </button>
                </div>

                <div className='hidden lg:block'>
                    <img src={WarehouseManagement} className='w-full' alt='/' />
                </div>

                {/* <div className='mr-auto absolute flex flex-col py-8 md:min-w[760px] bottom-[-30%] md:bottom-[-15%] mx-l md:left-1/2 transform md:-translate-x-1/2 bg-white border border-slate-300 rounded-xl text-center shadow-xl'>
                    <p className='font-bold text-2xl text-green-600'>Services</p>
                    <div className='flex justify-between flex-wrap px-4'>
                        <div className='flex flex-col items-center justify-content px-4 py-2 text-slate-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <p>
                                Fast Transfer
                            </p>
                        </div>
                        <div className='flex flex-col items-center justify-center px-4 py-2 text-slate-500'>
                            <svg className='h-6 text-green-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>

                            <p>
                                Product Management
                            </p>
                        </div>
                        <div className='flex flex-col items-center justify-center px-4 py-2 text-slate-500'>
                            <svg className='h-6 text-green-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>

                            <p>
                                Tracking
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>


        </div>
    )
}

export default Slider

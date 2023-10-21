import React, { useState } from 'react'

const SendingConfirm = () => {
    return (
        <>
            <div className='bg-zinc-200 h-screen flex justify-center items-center	'>
                <div className=' bg-white  text-center h-fit min-h-0 min-w-fit rounded-lg p-8'>
                    <div className='p-10'>
                        <form action=''>
                            <h1 className=' text-2xl font-bold border-b-slate-200'>
                                Sending Recovery Link successful
                            </h1>
                            <p className='mt-5'>
                                Please check your email to reset your password
                            </p>
                        </form>
                    </div>
                </div >
            </div >
        </>


    )
}

export default SendingConfirm

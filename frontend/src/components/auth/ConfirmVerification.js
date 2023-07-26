import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ConfirmVerification = () => {
    return (
        <div className='bg-zinc-200'>
            <div className=' w-[50%]  flex items-center justify-center mx-auto min-h-screen rounded-lg'>
                <div className='shadow-md bg-white flex items-center flex-col gap-2 justify-center p-10'>
                    <h1 className='text-2xl font-bold'>EMAIL VERIFICATION</h1>
                    <p>An mail has been sent to your email to verify your account</p>
                    <p>Please check your email to verify</p>
                    <button className='bg-[#ff792e] px-3 py-2 hover:opacity-80 mt-3 text-white p-2 rounded-2xl'>
                        <Link className='no-underline text-white' to='/login'>
                            Proceed to login
                        </Link>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ConfirmVerification

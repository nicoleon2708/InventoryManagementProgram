import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../services/auth.service';

function EmailVerification() {

    const {token} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{



        authService.emailVerification(token)
        .then(res=>{
            setTimeout(() => {
                navigate('/login')
            }, 4000);
        })
        .catch(err=>console.log(err))
    }, [])

    return (
        <div className='bg-zinc-200'>
        <div className=' w-[50%]  flex items-center justify-center mx-auto min-h-screen rounded-lg'>
            <div className='shadow-md bg-white flex items-center flex-col gap-2 justify-center p-10'>
                <h1 className='text-2xl font-bold'>EMAIL VERIFICATION</h1>
                <p>Your account has been verified and we will transfer you to login page</p>
            </div>
        </div>
        </div>
    );
}

export default EmailVerification;

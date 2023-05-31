import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ConfirmVerification = () => {
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        if (token) {
            fetch(`http://127.0.0.1:8000/auth/user/email-verification/?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    setIsVerified(data.is_verified)
                })
                .catch(error => console.error(error))
        }
    }, []);

    return (
        <div className='bg-zinc-200'>
            <div className=' w-[50%]  flex items-center justify-center mx-auto min-h-screen rounded-lg'>
                <div className='shadow-md bg-white flex items-center flex-col gap-2 justify-center p-10'>
                    <h1 className='text-2xl font-bold'>EMAIL VERIFICATION</h1>
                    <p>An mail has been sent to your email to verify your account</p>
                    <p>Please check your email to verify</p>
                    <button className='bg-green-600 px-2 hover:opacity-80 mt-5 text-white p-2 rounded-2xl'>
                        <Link to='/login'>
                            Proceed to login
                        </Link>
                    </button>
                </div>
                {/* {isVerified === true && <p>Email is verified.</p>}
            {isVerified === false && <p>Email is not verified.</p>} */}
            </div>
        </div>

    );
}

export default ConfirmVerification

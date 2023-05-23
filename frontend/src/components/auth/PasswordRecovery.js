import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/apis/auth/AuthService'
import { toast } from 'react-toastify'
const PasswordRecovery = () => {

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        AuthService.RecoveryPassword({ email })
            .then(res => console.log(res),
                toast.success("An mail to recover your account has been sent to your email!")
            )
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className='bg-[#f2f2f2] h-screen flex justify-center items-center	'>
                <div className=' bg-white h-fit min-h-0 min-w-fit rounded-lg p-8'>
                    <form action=''>
                        <h1 className=' text-center text-2xl font-bold text-[#66425c] border-b-slate-200'>
                            odoo
                        </h1>

                        <div className='mt-10'>
                            <label >Your email</label>
                            <input type='text' placeholder='Email' className='mt-2 border border-gray-400 py-1 px-2 outline-none w-full'
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button onClick={(e) => handleSubmit(e)} className='mt-7 bg-[#66425c] text-white w-full p-2 rounded-md font-bold hover:opacity-80'>
                            Update your password
                        </button>

                        <div className='mt-5 '>
                            <p className='text-[#66425c] font-bold cursor-pointer mr-5'>
                                <Link to='/login'>Return to login page</Link></p>
                        </div>


                    </form>
                </div >
            </div >
        </>


    )
}

export default PasswordRecovery

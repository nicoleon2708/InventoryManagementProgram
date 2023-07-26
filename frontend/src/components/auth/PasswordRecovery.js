import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../../services/auth.service'
const PasswordRecovery = () => {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email: email
        }
        authService.recoveryPassword(data)
        .then(res=>{
            navigate('/sending-confirm')
        })
        .catch(err=>console.log(err))
    }

    return (
        <>
            <div className='bg-[#f2f2f2] h-screen flex justify-center items-center	'>
                <div className=' bg-white h-fit min-h-0 min-w-fit rounded-lg p-8'>
                    <form action=''>
                        <h1 className=' text-center text-2xl font-bold  border-b-slate-200'>
                            Recovery your password
                        </h1>

                        <div className='mt-10'>
                            <label >Your email</label>
                            <input type='text' placeholder='Email' className='mt-2 border border-gray-400 py-1 px-2 outline-none w-full'
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button onClick={(e) => handleSubmit(e)} className='mt-7 bg-[#ff792e] text-white w-full p-2 rounded-md font-bold hover:opacity-80'>
                            Update your password
                        </button>

                        <div className='mt-5 '>
                            <p className=' font-bold cursor-pointer mr-5'>
                                <Link className='no-underline text-[#ff792e]' to='/login'>Return to login page</Link></p>
                        </div>


                    </form>
                </div >
            </div >
        </>


    )
}

export default PasswordRecovery

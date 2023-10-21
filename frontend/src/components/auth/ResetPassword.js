import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../services/auth.service'
import {toast} from 'react-toastify'

const ResetPassword = () => {

    const [new_password, setNewpassword] = useState('')
    const [conf_new_password, setConfirmPassword] = useState('')
    const [isReset, setReset] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const navigate = useNavigate()
    let { uidb64, token } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            new_password: new_password,
            conf_new_password: conf_new_password
        }
        authService.resetPassword(uidb64, token, data)
        .then(res=>{
            navigate('/login')
            toast("Recovery password successfully!")
        })
        .catch(err=>console.log(err))
    }

    const togglePassword = (e) => {
        e.preventDefault()
        setIsPasswordVisible((prevState) => !prevState);

    }

    const toggleConfirmPassword = (e) =>{
        e.preventDefault()
        setIsConfirmPasswordVisible((prevState) => !prevState)
    }


    return (
        <div className='bg-zinc-200 h-screen flex justify-center items-center	'>
            <div className=' bg-white h-fit min-h-0 min-w-fit rounded-lg p-8'>
                <form action=''>
                    <h1 className=' text-center text-2xl font-bold border-b-slate-200'>
                        Reset Password
                    </h1>

                        <div className='relative mt-3'>
                        <label className='font-bold'>New password</label>

                                <input
                                    className='p-2 border w-full'
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    name="confirm_new_password"
                                    placeholder='Password'
                                    value={conf_new_password} onChange={e => setConfirmPassword(e.target.value)}

                                />

                                <button
                                    className="absolute inset-y-0 top-[22px] right-0 flex items-center px-4 text-gray-600"
                                    onClick={toggleConfirmPassword}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className='relative mt-3'>
                        <label className='font-bold'>Confirm new password</label>

                                <input
                                    className='p-2 border w-full'
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="new_password"
                                    placeholder='Password'
                                    value={new_password} onChange={e => setNewpassword(e.target.value)}

                                />

                                <button
                                    className="absolute top-[22px] inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                    onClick={togglePassword}
                                >
                                    {isPasswordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                    <button onClick={handleSubmit} className='mt-7 bg-[#ff792e] text-white w-full p-2 rounded-md font-bold hover:opacity-80'>
                        Update your password
                    </button>

                </form>
            </div >
        </div >
    )
}

export default ResetPassword

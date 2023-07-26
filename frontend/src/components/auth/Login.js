import React, { useEffect, useState } from 'react'
import Image from '../../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authService from '../../services/auth.service';
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const togglePassword = (e) => {
        e.preventDefault()
        setIsPasswordVisible((prevState) => !prevState);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsernameError('');
        setPasswordError('');
        setError('');
        if(!username){
            setUsernameError('You must enter username to login!')
        }
        if(!password){
            setPasswordError("Please enter your password!")
        }
        authService.login(username, password)
        .then(res=>{
            navigate('/home')
            window.location.reload()
        })
        .catch(error=>{
            if (error.response) {
                // The error is a response error from the API
                const { data } = error.response;
                if(username && data.username){
                    setUsernameError(data.username)
                }
                if(password && data.password){
                    setPasswordError(data.username)
                }
                else{
                    setPasswordError(data.non_field_errors)
                }
            }         
        })
    }


    return (
        <div>
            <section className='pt-24 md:pt-16 min-h-screen flex items-center justify-center'>
                {/* Login container */}
                <div className='bg-white flex max-3-xl '>
                    {/* form */}

                    <div className='md:w-1/3 px-[20px] m-auto'>
                        <h2 className='font-bold text-2xl'>
                            Sign in
                        </h2>
                        <p className='text-sm mt-4 text-[#002d74]'>
                            If your already have an FastTransfer account, please login.
                        </p>

                        {error && <p className='text-red-600 font-bold'>{error}</p>}


                        <form onSubmit={handleSubmit} className='flex flex-col gap-4' action=''>
                            <input
                                className='p-2 rounded-xl border'
                                type='text'
                                name="username"
                                placeholder='Username'
                                value={username} onChange={e => setUsername(e.target.value)}
                            />
                            {usernameError && <p className='text-red-600 font-bold'>{usernameError}</p>}

                            <div className='relative'>
                                <input
                                    className='p-2 rounded-xl border w-full'
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder='Password'
                                    value={password} onChange={e => setPassword(e.target.value)}

                                />

                                <button
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
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
                            {passwordError && <p className='text-red-600 font-bold'>{passwordError}</p>}

                            <div class="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-black">Remember me?</label>
                            </div>

                            <button onClick={handleSubmit} type='button' className='bg-[#ff792e] border-solid border-[1px] border-[#ff792e] rounded-xl py-3 hover:bg-white  '>
                                <span className='text-white hover:text-[#ff792e]'>Login</span>
                            </button>
                        </form>

                        <div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
                            <hr className='border-gray-400' />
                            <p className='text-center test-sm'>OR</p>
                            <hr className='border-gray-400' />
                        </div>


                        <button type='button' className='w-full block bg-white border-gray-300 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-xl items-end justify-center text-sm px-2 py-1 border'>
                            <div className='flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>                                <span className='ml-4'>
                                    Login with Google
                                </span>
                            </div>
                        </button>

                        <p className='mt-5 font-bold text-xs border-b border-gray-400 py-4'>
                            <Link className='no-underline text-[#ff792e]'
                                to='/recovery-password'
                            >
                                Forgot your password?
                            </Link>
                        </p>

                        <div className='mt-3 text-xs flex justify-between items-center'>
                            <p>If your don't have an account...</p>
                            <span className='font-bold'>
                                <Link className='no-underline text-[#ff792e]' to='/register'>
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>

                    {/* image */}
                    <div className='sm:block hidden w-2/3'>
                        <img src={Image} alt='login-img' />
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Login

import InventoryManagementRegister from '../../assets/images/InventoryManagementRegister.png'
import React, { useState, useEffect } from 'react'
import AuthService from '../../services/apis/auth/AuthService'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from './Login'
import authService from '../../services/auth.service'

const Register = () => {


    const [first_name, setFirstName] = useState('')
    const [last_name, setlastName] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [postal_code, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [isRegister, setRegister] = useState(false)
    const [error, setError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [msg, setMsg] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const navigate = useNavigate()

    const togglePassword = (e) => {
        e.preventDefault()
        setIsPasswordVisible((prevState) => !prevState);

    }

    const toggleConfirmPassword = (e) =>{
        e.preventDefault()
        setIsConfirmPasswordVisible((prevState) => !prevState)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setUsernameError('')
        setPasswordError('')
        setError('')
        setEmailError('')
        setPhoneError('')
        if (
            !first_name.trim() ||
            !last_name.trim() ||
            !company_name.trim() ||
            !email.trim() ||
            !address.trim() ||
            !phone.trim() ||
            !postal_code.trim() ||
            !city.trim() ||
            !district.trim() ||
            !username.trim() ||
            !password.trim() ||
            !confirm_password.trim()
        ){
            setError('You must fill all the fields to register account!')
        }
        if(password != confirm_password){
            setPasswordError("Confirm password is not correct")
        }
        let data = {
            first_name: first_name,
            last_name: last_name,
            company_name: company_name,
            email: email,
            address: address,
            phone: phone,
            address: address,
            postal_code,
            city: city,
            district: district,
            username: username,
            password: password,
            confirm_password: confirm_password
        }
        authService.register(data)
        .then(res=>{
            navigate('/verification-confirm')
        })
        .catch(err=>{
            if(err.response){
                const {data} = err.response
                if(phone && data.phone){
                    setPhoneError(data.phone)
                }
                if(username && data.username){
                    setUsernameError(data.username)
                }
                if(password && data.password){
                    setPasswordError(data.password)
                }
                if(email && data.email){
                    setEmailError(data.email)
                }

            }
        })
    }

    return (
        <>
            <div className='flex bg-white'>
                {/*LEFT REGISTER */}
                <div className='hidden lg:flex w-1/2 bg-[#ff792e] px-4 justify-center items-center'>
                    <img src={InventoryManagementRegister} />
                </div>
                {/*RIGHT REGISTER */}
                <div className='w-full lg:w-1/2 pt-24 md:pt-24 px-12'>
                    <h1 className='text-3xl mb-4  font-bold'>Sign Up</h1>
                    <p className='mb-4'>
                        Create your <span className=' font-bold'>FastTransfer</span> account. It's free and only take a minute
                    </p>

                    {/* FORM REGISTER */}
                    {error && <p className='text-red-600 font-bold'>{error}</p>}



                    <form onSubmit={(e) => handleRegister(e)}>
                        {/* COMPANY INFORMATION */}
                        <h1 className='mb-4 text-2xl font-bold '>
                            Create your company information
                        </h1>
                        <div className='grid grid-cols-2 gap-3'>
                            <input type='text' placeholder='Firstname'
                                className='border border-gray-400 py-1 px-2 outline-none '
                                value={first_name} onChange={e => setFirstName(e.target.value)}
                            />
                            <input type='text' placeholder='Lastname'
                                className='border border-gray-400 py-1 px-2 outline-none'
                                value={last_name} onChange={e => setlastName(e.target.value)}
                            />
                        </div>

                        <div className='mt-3'>
                            <input type='text' placeholder='Company Name' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={company_name} onChange={e => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='mt-3'>
                            <input type='email' placeholder='Email' required className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={email} onChange={e => setEmail(e.target.value)}

                            />
                            {emailError && <p className='text-red-600 font-bold'>{emailError}</p>}

                        </div>

                        <div className='mt-3'>
                            <input type='text' placeholder='Address' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={address} onChange={e => setAddress(e.target.value)}

                            />
                        </div>

                        <div className='mt-3 grid grid-cols-2 gap-3'>
                            <input type='text' placeholder='Phone' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={phone} onChange={e => setPhone(e.target.value)}
                            />
                            <input type='text' placeholder='Postal Code' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={postal_code} onChange={e => setPostalCode(e.target.value)}
                            />
                            {phoneError && <p className='text-red-600 font-bold'>{phoneError}</p>}

                        </div>

                        <div className='mt-3 grid grid-cols-2 gap-3'>
                            <input type='text' placeholder='City' className='border border-gray-400 py-1 px-2 outline-none'
                                value={city} onChange={e => setCity(e.target.value)}
                            />
                            <input type='text' placeholder='District' className='border border-gray-400 py-1 px-2 outline-none'
                                value={district} onChange={e => setDistrict(e.target.value)}
                            />

                        </div>

                        {/* ACCOUNT INFORMATION */}

                        <h1 className='my-4 text-2xl font-bold outline-none'>
                            Create your account information
                        </h1>

                        <div>
                            <input type='text' placeholder='Username' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={username} onChange={e => setUsername(e.target.value)}
                            />
                            {usernameError && <p className='text-red-600 font-bold'>{usernameError}</p>}

                        </div>

                        <div className='relative mt-3'>
                                <input
                                    className='p-2 border w-full'
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

                            <div className='relative mt-3'>
                                <input
                                    className='p-2 border w-full'
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    name="confirm_password"
                                    placeholder='Confirm Password'
                                    value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}

                                />

                                <button
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
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
                        {passwordError && <p className='text-red-600 font-bold'>{passwordError}</p>}

                        <button onClick={(e) => handleRegister(e)} className='mt-3 w-full bg-[#ff792e] border-solid border-[1px] hover:opacity-80 border-[#ff792e] rounded-xl py-3'>
                            <span className='text-white'>Sign Up</span>
                        </button>

                        <p className='mt-3'>
                            By submitting this form, I agree to the odoo's <span className=' font-bold'>Website Terms of Use</span>, <span className=' font-bold'>Privacy and Cookie Notice</span>, and <span className=' font-bold'>EULA or Customer Terms for SaaS</span>
                        </p>

                        <p className='mt-3'>
                            Already have an account? <span className=' font-bold cursor-pointer'>
                                <Link className='no-underline text-[#ff792e]' to='/login'>Login here</Link>

                            </span>
                        </p>

                    </form>

                </div>

            </div>
        </>
    )
}

export default Register

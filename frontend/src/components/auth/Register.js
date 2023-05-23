import InventoryManagementRegister from '../../assets/images/InventoryManagementRegister.png'
import React, { useState, useEffect } from 'react'
import AuthService from '../../services/apis/auth/AuthService'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from './Login'

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
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (isRegister) {
            navigate('/login');
        }
    }, isRegister)

    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.Register({ username, email, password, first_name, last_name, confirm_password, company_name, phone, address, postal_code, city, district })
            .then(
                (res) => setRegister(isRegister => !isRegister),
                toast.success("An mail has been sent your email"),
                console.log(isRegister)
            )
            .catch(
                (error) => console.log(error)
            )
    }

    return (
        <>
            <div className='flex bg-white'>
                {/*LEFT REGISTER */}
                <div className='hidden lg:flex w-1/2  justify-center items-center'>
                    <img src={InventoryManagementRegister} />
                </div>
                {/*RIGHT REGISTER */}
                <div className='w-full lg:w-1/2 py-16 px-12'>
                    <h1 className='text-3xl mb-4 text-[#66425c] font-bold'>Sign Up</h1>
                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 font-bold dark:text-green-400" role="alert">
                        <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
                    </div>
                    <p className='mb-4'>
                        Create your <span className='text-[#66425c] font-bold'>odoo</span> account. It's free and only take a minute
                    </p>

                    {/* FORM REGISTER */}



                    <form onSubmit={(e) => handleRegister(e)}>
                        {/* COMPANY INFORMATION */}
                        <h1 className='mb-4 text-2xl font-bold text-[#66425c]'>
                            Create your company information
                        </h1>
                        <div className='grid grid-cols-2 gap-5'>
                            <input type='text' placeholder='Firstname'
                                className='border border-gray-400 py-1 px-2 outline-none '
                                value={first_name} onChange={e => setFirstName(e.target.value)}
                            />
                            <input type='text' placeholder='Lastname'
                                className='border border-gray-400 py-1 px-2 outline-none'
                                value={last_name} onChange={e => setlastName(e.target.value)}
                            />
                        </div>

                        <div className='mt-5'>
                            <input type='text' placeholder='Company Name' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={company_name} onChange={e => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='mt-5'>
                            <input type='email' placeholder='Email' required className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={email} onChange={e => setEmail(e.target.value)}

                            />

                        </div>

                        <div className='mt-5'>
                            <input type='text' placeholder='Address' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={address} onChange={e => setAddress(e.target.value)}

                            />
                        </div>

                        <div className='mt-5 grid grid-cols-2 gap-5'>
                            <input type='text' placeholder='Phone' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={phone} onChange={e => setPhone(e.target.value)}
                            />
                            <input type='text' placeholder='Postal Code' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={postal_code} onChange={e => setPostalCode(e.target.value)}
                            />

                        </div>

                        <div className='mt-5 grid grid-cols-2 gap-5'>
                            <input type='text' placeholder='City' className='border border-gray-400 py-1 px-2 outline-none'
                                value={city} onChange={e => setCity(e.target.value)}
                            />
                            <input type='text' placeholder='District' className='border border-gray-400 py-1 px-2 outline-none'
                                value={district} onChange={e => setDistrict(e.target.value)}
                            />

                        </div>

                        {/* ACCOUNT INFORMATION */}

                        <h1 className='my-4 text-2xl font-bold text-[#66425c] outline-none'>
                            Create your account information
                        </h1>

                        <div>
                            <input type='text' placeholder='Username' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={username} onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='mt-5'>
                            <input type='password' placeholder='Password' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={password} onChange={e => setPassword(e.target.value)}

                            />
                        </div>

                        <div className='mt-5'>
                            <input type='password' placeholder='Confirm password' className='border border-gray-400 py-1 px-2 w-full outline-none'
                                value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button onClick={(e) => handleRegister(e)} className='mt-5 bg-[#66425c] text-white w-full p-2 rounded-md font-bold hover:opacity-80'>
                            Sign Up
                        </button>

                        <p className='mt-5'>
                            By submitting this form, I agree to the odoo's <span className='text-[#66425c] font-bold'>Website Terms of Use</span>, <span className='text-[#66425c] font-bold'>Privacy and Cookie Notice</span>, and <span className='text-[#66425c] font-bold'>EULA or Customer Terms for SaaS</span>
                        </p>

                        <p className='mt-5'>
                            Already have an account? <span className='text-[#66425c] font-bold cursor-pointer'>
                                <Link to='/login'>Login here</Link>

                            </span>
                        </p>

                    </form>

                </div>

            </div>
        </>
    )
}

export default Register

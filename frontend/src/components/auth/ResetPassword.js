import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { reset_password } from '../../redux/apiRequests'
import axios from 'axios'
const ResetPassword = () => {

    const [new_password, setNewpassword] = useState('')
    const [conf_new_password, setConfirmPassword] = useState('')
    const [isReset, setReset] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { uidb64, token } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.put(`http://127.0.0.1:8000/auth/reset-password/${uidb64}/${token}/`, {
        //     new_password: new_password,
        //     conf_new_password: conf_new_password
        // }).then(res => console.log(res))
        //     .catch(err => console.log(err))

        // const data = {
        //     uidb64: uidb64,
        //     token: token,
        //     new_password: newPassword,
        //     conf_new_password: confirmPassword
        // }
        // axios.post('http://127.0.0.1:8000/auth/reset-password/', data)
        //     .then(res =>
        //         console.log(res),
        //         setReset(isReset => !isReset)
        //     )
        //     .catch(err => console.log(err))
        let data = {
            new_password: new_password,
            conf_new_password: conf_new_password
        }
        reset_password(data, navigate, dispatch, uidb64, token)
    }


    return (
        <div className='bg-zinc-200 h-screen flex justify-center items-center	'>
            <div className=' bg-white h-fit min-h-0 min-w-fit rounded-lg p-8'>
                <form action=''>
                    <h1 className=' text-center text-2xl font-bold border-b-slate-200'>
                        Reset Password
                    </h1>

                    <div className='mt-10'>
                        <label className='font-bold'>New password</label>
                        <input type='password' placeholder='Password' className='mt-2 border border-gray-400 py-1 px-2 outline-none w-full'
                            value={new_password}
                            onChange={(e) => setNewpassword(e.target.value)}
                        />
                    </div>

                    <div className='mt-10'>
                        <label className='font-bold'>Confirm new password</label>
                        <input type='password' placeholder='Password' className='mt-2 border border-gray-400 py-1 px-2 outline-none w-full'
                            value={conf_new_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handleSubmit} className='mt-7 bg-green-600 text-white w-full p-2 rounded-md font-bold hover:opacity-80'>
                        Update your password
                    </button>

                </form>
            </div >
        </div >
    )
}

export default ResetPassword

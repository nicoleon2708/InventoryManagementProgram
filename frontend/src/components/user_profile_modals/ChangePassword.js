import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service'
import { toast } from 'react-toastify'

const ChangePassword = ({currentUser}) => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confNewPassword, setConfNewPassword] = useState('')
    const changePassword = () =>{
        let data = {
            password: password,
            new_password: newPassword,
            conf_new_password: confNewPassword
        }
        authService.changePassword(currentUser.id, data)
        .then(res=>{
            window.location.reload()
            toast('Change user password successfully!')
        })
        .catch(err=>console.log(err))
    }

    const resetChangePassword = ()=>{
        setPassword('')
        setNewPassword('')
        setConfNewPassword('')
    }
    return (
    
    <div>
    <div className='p-[20px]'>
        <h4>Change password</h4>
    </div>

    <div className='px-[20px]'>
        <div className='flex flex-col'>
                        <label className='mb-2 text-[#acb5bd] font-bold'>Password:</label>
                        <input type='text' placeholder=''
                            className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                        />

        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <div className='flex flex-col'>
                    <label className='mb-2 text-[#acb5bd] font-bold'>New password:</label>
                    <input type='text' placeholder=''
                        className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
                    />

            </div>

            <div className='flex flex-col'>
                    <label className='mb-2 text-[#acb5bd] font-bold'>Confirm New Password:</label>
                    <input type='text' placeholder=''
                        className='border border-gray-400 text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={confNewPassword} onChange={(e)=>setConfNewPassword(e.target.value)}
                    />

            </div>               
        </div>
    </div>

    <div className='py-[15px] px-[20px]'>
        <button onClick={changePassword} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
            Save Changes
        </button>
        <button onClick={resetChangePassword} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
            Reset
        </button>
    </div> 
</div>
  )
}

export default ChangePassword

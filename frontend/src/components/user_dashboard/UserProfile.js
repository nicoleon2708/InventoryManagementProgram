import React, { useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import Profile from '../user_profile_modals/Profile'
import ChangePassword from '../user_profile_modals/ChangePassword'

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(false)
    

    const [atProfile, setAtProfile] = useState(true)
    const navigate = useNavigate()
    const changeAtProfileComponent = () => setAtProfile(!atProfile)

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/auth/user/info/', authHeader())
        .then(res=>{
            setCurrentUser(res.data);

        })
        .catch(err=>console.log(err))
    }, [])



    return (
    <div className='overflow-x-auto'>
            
            <div>
                <h2>Profile</h2>
                <p>User Profile</p>
            </div>

                <div className='bg-white rounded-lg'>
                    <div className='flex items-center p-[10px]'>
                        <button onClick={changeAtProfileComponent} className='mr-2 border-b-[1px] border-black border-solid no-underline'>Account</button>
                        <button onClick={changeAtProfileComponent} className=' no-underline'>Security</button>
                    </div>

                    {
                        atProfile ? (
                            <Profile currentUser={currentUser}/>
                        ):(
                            <ChangePassword currentUser={currentUser}/>
                        )
                    }
                </div>
        </div>
  )
}

export default UserProfile

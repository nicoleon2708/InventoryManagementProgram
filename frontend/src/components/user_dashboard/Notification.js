import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import notificationService from '../../services/notification.service'
import { Link, useNavigate } from 'react-router-dom'

const Notification = () => {

    const [notifications, setNotifications] = useState([])
    const [currentDateTime, setCurrentDateTime] = Date()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(currentDateTime)
        notificationService.getAllNotifications()
        .then(res=>{
            setNotifications(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div className='overflow-x-auto'>
            
            <div className='px-[20px]'>
                <h2>Notification List</h2>
                <p>View all your activities</p>
            </div>

            <div className='mt-4 p-[20px]'>
                {notifications ? notifications.map((notification, index)=> (
                    <div className='bg-white p-[10px] mb-[20px] flex items-center' key={index}>
                        <p>{notification.message}</p>
                    </div>
                )):
                (
                    <div>
                        Currently don't have notifications to display!
                    </div>
                )
            }
            </div>  
        </div>
  )
}

export default Notification

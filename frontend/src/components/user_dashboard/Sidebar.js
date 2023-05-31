import React from 'react'
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons'
import { faHandshakeSimple } from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='bg-neutral-900 w-60 px-3 flex flex-col py-10'>
        <div className='flex items-center text-neutral-100 text-lg justify-center px-1 py-3'>
            FastTransfer.
        </div>
        <div className='flex-1 py-2 text-white flex flex-col gap-5 px-5'>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
                <FontAwesomeIcon className=' mr-2 w-5 h-5' icon={faGripHorizontal} />
                Dashboard
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
                <FontAwesomeIcon className=' mr-2 w-5 h-5' icon={faBox} />
                <Link to='/home/product'>
                    Products
                </Link>
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
                <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faFileInvoice} />
                Invoices
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
                <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faTruckMoving} />
                Transfers
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
                <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faHandshakeSimple} />
                Partners
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
            <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faWarehouse} />
                <Link to='/home/warehouse'>
                    Warehouses
                </Link>
            </div>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
            <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faLocationDot} />
                <Link to='/home/location'>
                    Locations
                </Link>
            </div>
        </div>
        <div className='flex mt-2 px-5 py-2 text-neutral-100 flex-col gap-5 pt-2 border-t border-neutral-700'>
            <div className='flex items-center cursor-pointer hover:text-green-600'>
            <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faGear} />                
            Settings
            </div>

            <div className='flex items-center cursor-pointer hover:text-green-600'>
            <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faCircleQuestion} />                
            Help & Questions
            </div>

            <div className='flex items-center cursor-pointer  hover:text-red-600'>
            <FontAwesomeIcon className='mr-2 w-5 h-5' icon={faRightFromBracket} />
            Logout
            </div>

        </div>
    </div>
  )
}

export default Sidebar

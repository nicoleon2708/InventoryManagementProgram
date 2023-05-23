import React from 'react'

const AuthHeader = () => {
    return (
        <div className='flex p-5  justify-between'>
            <h1 className='text-3xl font-bold text-white cursor-pointer'>
                odoo
            </h1>
            <ul className='flex'>
                <li className='p-4 text-white font-bold cursor-pointer'>Home</li>
                <li className='p-4 text-white font-bold cursor-pointer'>About</li>
                <li className='p-4 text-white font-bold cursor-pointer'>Contact</li>

            </ul>
        </div>
    )
}

export default AuthHeader

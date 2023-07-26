import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFacebook,
    faInstagram,
    faTwitter,
    faGithub
} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
    return (
        <div className='w-full bg-slate-900 text-gray-300 py-y px-2'>
            <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 border-b2 border-gray-600 py-8'>
                <div>
                    <h6 ckassName='font-bold uppercase pt-2'>Solutions</h6>
                    <ul>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>

                    </ul>
                </div>
                <div>
                    <h6 ckassName='font-bold uppercase pt-2'>Solutions</h6>
                    <ul>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>

                    </ul>
                </div>
                <div>
                    <h6 ckassName='font-bold uppercase pt-2'>Solutions</h6>
                    <ul>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>

                    </ul>
                </div>
                <div>
                    <h6 ckassName='font-bold uppercase pt-2'>Solutions</h6>
                    <ul>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>
                        <li className='py-1'>Marketing</li>

                    </ul>
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <h4>Our sites:</h4>
                <div>
                    <FontAwesomeIcon className='mr-2' icon={faFacebook}/>
                    <FontAwesomeIcon className='mr-2' icon={faTwitter}/>
                    <FontAwesomeIcon className='mr-2' icon={faGithub}/>
                    <FontAwesomeIcon className='mr-2' icon={faInstagram}/>
                </div>
            </div>
        </div>
    )
}

export default Footer

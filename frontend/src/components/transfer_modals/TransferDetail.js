import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import transferService from '../../services/transfer.service'
import { toast } from 'react-toastify'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import { faBoxesStacked, faLocationDot, faMobile, faUser } from '@fortawesome/free-solid-svg-icons'

const TransferDetail = () => {    

    const [products, setProducts] = useState([])
    const [currentTransfer, setCurrentTransfer] = useState(null)
    const [transferDetails, setTransferDetails] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [detailConfirmError, setDetailConfirmError] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        transferService.getTransferById(id)
        .then(res=>{
            setCurrentTransfer(res.data);
            setTransferDetails(res.data.transfer_detail)
            console.log(res.data.transfer_detail)
        })
        .catch(err=>console.log(err))

        axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/auth/user/info/`, authHeader())
        .then(res=>setCurrentUser(res.data))
        .catch(err=>console.log(err))
        
    }, [products])

    const confirmTransfer = (id) => {
        transferService.confirmTransfer(id)
        .then((res) => {
            window.location.reload()
            toast('Confirm Transfer successfully');
        })
        .catch((err) => {
            if(err.response){
                const {data} = err.response;
                if(data){
                    toast.error(data[0])
                }
                if(data.detail){
                    toast.error(data.detail)
                }
            }
        });
        
    };
    
    return (
    <div>
        <div className='flex items-center justify-between'>
            <div>
                <h2>Transfer Detail</h2>
            </div>
            <div>
                <Link to='/home/transfer'>
                    <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                        Back
                    </button>
                </Link>

            </div>
        </div>

        
        <div className='mt-3 rounded-lg bg-white p-[20px]'>



            <div className='md:flex md:justify-between p-[10px]'>
                <div className='md:w-[33.33%] p-[10px]'>
                    <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Partner Info:</p>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faUser} />
                        {currentTransfer && currentTransfer.outcome && currentTransfer.outcome.partner.company_name}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faMobile} />
                        {currentTransfer && currentTransfer.outcome && currentTransfer.outcome.partner.contact_phone}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                    <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                        {currentTransfer && currentTransfer.outcome && currentTransfer.outcome.partner.address}, {currentTransfer && currentTransfer.outcome && currentTransfer.outcome.partner.district}, {currentTransfer && currentTransfer.outcome && currentTransfer.outcome.partner.city}
                    </div>
                </div>
                <div className='md:w-[33.33%] p-[10px]'>
                    <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Company Info:</p>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faUser} />
                        {currentUser && currentUser.company_name}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faMobile} />
                        {currentUser && currentUser.phone}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                    <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                        {currentUser && currentUser.address}, {currentUser && currentUser.district}, {currentUser && currentUser.city}

                    </div>
                </div>

                <div className='md:w-[33.33%] p-[10px]'>
                    <p className='text-gray-600 bg-light p-4 mb-3 text-uppercase font-bold'>Transfer Info:</p>
                    <p className='px-4'>Status:  
                        { currentTransfer && currentTransfer.status === 'COMPLETED' ? (
                                            <span className='ml-2 px-3 py-2 rounded-lg text-green-500 bg-[#cef2e3] w-[150px]  text-center'>
                                                {currentTransfer && currentTransfer.status}
                                            </span>
                                        ): (currentTransfer && currentTransfer.status === 'TRANSFER') ? (
                                            <span className='ml-2 px-3 py-2 rounded-lg text-[#ffbe41] bg-[#fff1d3] w-[150px]  text-center'>
                                                {currentTransfer && currentTransfer.status}
                                            </span>
                                        ): null

                                        }
                    </p>
                    <p className=' px-4'>From: {currentTransfer && currentTransfer.source_location.name}</p>
                    <p className=' px-4'>To: {currentTransfer && currentTransfer.destination_location.name}</p>

                </div>
            </div>

            <div>
                <h4 className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>
                    Transfer Summary:
                </h4>
            </div>

            <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900'>
                    <thead className='bg-white text-uppercase'>
                        <tr className=''>

                            <th className='w-[100px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Product
                            </th>                       
                            <th className='w-[60.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Barcode
                            </th>
                            <th className='w-[40.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                QTY
                            </th>
                            <th className='w-[82.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Price
                            </th>
                            <th className='w-[150.135px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    {
                        transferDetails.length > 0 ? (
                        <tbody>
                            {transferDetails.length > 0 && transferDetails.map((detail, index) => (
                                <tr key={index} className='bg-white'>

                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <img className='h-12 w-12 leading-[50px] min-w-[50px] mr-3 rounded-lg' src={detail.product.image} alt='product-image'/>
                                            <div>
                                                {detail.product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <span className='px-3 py-2 rounded-lg text-[#f62a48] bg-[#fdd4da] w-[100px]'>
                                            {detail.product.barcode}
                                        </span>                                    
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {detail.quantity}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {detail.price}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        { detail.status && detail.status === 'Completed' ? (
                                            <p className='px-3 py-2 rounded-lg text-green-500 bg-[#cef2e3] w-[150px] text-center'>
                                                {detail.status}
                                            </p>
                                        ): detail.status && detail.status === 'On Transfer' ? (
                                            <p className='px-3 py-2 rounded-lg text-[#ffbe41] bg-[#fff1d3] w-[150px]  text-center'>
                                                {detail.status}
                                            </p>
                                        ): detail.status && detail.status === 'Failed' ? (
                                            <p className='px-3 py-2 rounded-lg text-[#f62a48] bg-[#fdd4da] w-[150px] text-center'>
                                                {detail.status}
                                            </p>
                                        ): null

                                        }
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={8} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
            </div>

            <div className='w-full h-auto flex justify-end my-[20px]'>
                <div className='flex w-[50%] justify-end mt-[10px]'>
                    <table className='border-[1px] border-solid text-[#6f757d] border-[#dee2e6] align-middle w-full'>
                        <tbody>
                            <tr>
                                <td className='py-3 px-[20px]'>Shipping:</td>
                                <td className='py-3 px-[20px]'>$ 0.00</td>
                            </tr>
                            <tr>
                                <td className='py-3 px-[20px] text-[#ff792e]'>Grand Total:</td>
                                <td className='py-3 px-[20px] text-[#ff792e]'>$ <span>{currentTransfer && currentTransfer.total_price}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {currentTransfer && currentTransfer.status !== 'COMPLETED' && (
                            <div className='p-[5px] flex items-center justify-between'>

                            <div>
                                <button onClick={()=>confirmTransfer(currentTransfer && currentTransfer.id)} className='bg-[#ff792e] rounded-lg px-4 py-2 font-bold text-white hover:opacity-80'>
                                    Confirm Transfer
                                </button>
                            </div>
                        </div>
            )}

        </div>

    
    </div>
  )
}

export default TransferDetail

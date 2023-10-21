import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import locationService from '../../services/location.service'
import locationStockService from '../../services/location.stock.service'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import productService from '../../services/product.service'

const StockDetail = () => {

    const [currentStockLocation, setCurrentStockLocation] = useState(null)
    const {id} = useParams()
    

    useEffect(()=>{
        locationStockService.getSpecificLocation(id)
        .then(res=>{
            setCurrentStockLocation(res.data)
        })
        .catch(err=>console.log(err))

    }, [])


    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Stock Location Detail</h2>
                </div>
                <div>
                    <Link to='/home/stock'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white'>
                <div className='mt-4 p-[20px] '>
                <h4 className='text-center'>Stock Item: {currentStockLocation && currentStockLocation.product.barcode} | {currentStockLocation && currentStockLocation.product.name}</h4>
                <div className='md:flex md:justify-between p-[10px]'>
                    <div className='md:w-[50%] p-[10px] '>
                        <div className='border-solid border-[1px] border-[#dcdfe8] p-[10px]'>
                        <img src={currentStockLocation && currentStockLocation.product.image} className=''/>

                        </div>
                    </div>
                    <div className='md:w-[50%] p-[10px]'>
                    <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Available Stock: {currentStockLocation && currentStockLocation.quantity}</p>
                        <div className='flex items-center px-4 py-2'>
                            Location: {currentStockLocation && currentStockLocation.location.name}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            Status: OK
                        </div>
                    </div>
                </div>

                </div>  
            </div>

        </div>
  )
}

export default StockDetail

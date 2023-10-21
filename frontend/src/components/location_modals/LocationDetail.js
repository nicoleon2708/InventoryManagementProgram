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

const LocationDetail = () => {

    const [currentLocation, setCurrentLocation] = useState(null)
    const [listStockLocation, setListStockLocation] = useState([])
    const {id} = useParams()
    const [paginationData, setPaginationData] = useState({})
    const [locations, setLocations] = useState([])
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [action, setAction] = useState(false)
    const handleState = () => setAction(!action)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        locationService.getSpecificLocation(id)
        .then(res=>{
            setCurrentLocation(res.data);
        })
        .catch(err=>console.log(err))

        locationService.getAllLocations()
        .then(res=>setLocations(res.data.results))
        .catch(err=>console.log(err))

        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))


    }, [id])

    useEffect(()=>{
        fetchData()
    }, [])
    
    
    const fetchData = async()=>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                location: id,
            };

            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/stock/`, {
                params: params,
                ...authHeader()
            })
            setListStockLocation(res.data.results)
            setPaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })

            console.log(res.data.results)
        } catch(err){
            console.log(err)
        }
    }

    
    const handlePageChange = ({selected}) =>{
        setCurrentPage(selected)
    };

    const handleChangeItemPerPage = (e)=>{
        setPageSize(parseInt(e.target.value, 10)); 
        setCurrentPage(0); 
    }

    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Location Detail</h2>
                </div>
                <div>
                    <Link to='/home/location'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white'>
                <div className='mt-4 p-[20px] '>
                <h4 className='text-center'>{currentLocation && currentLocation.name}</h4>
                <div className='md:flex md:justify-between p-[10px]'>
                    <div className='md:w-[50%] p-[10px]'>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Address Info:</p>
                        <div className='flex items-center px-4 py-2'>
                            Address: {currentLocation && currentLocation.address}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            District: {currentLocation && currentLocation.district}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            City: {currentLocation && currentLocation.city}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            Warehouse: {currentLocation && currentLocation.warehouse.name}
                        </div>
                    </div>
                    <div className='md:w-[50%] p-[10px]'>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Items Stock:</p>
                        <div className='flex items-center px-4 py-2'>
                            Items: {listStockLocation && listStockLocation.length}
                        </div>

                    </div>
                </div>




                <h4 className='text-gray-600 bg-light px-4 py-3 mb-0 text-uppercase font-bold'>
                        List Product stock at Location:
                </h4>              


                <div className='overflow-x-auto mt-[20px]'>
                    <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                #
                            </th>
                            <th className='w-[200px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Product 
                                </div>
                            </th>
                            <th className='w-[100.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Barcode
                                </div>
                            </th>
                            <th className='w-[170.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Warehouse
                                </div>
                            </th>
                            <th className='w-[170.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Location
                                </div>
                            </th>
                            <th className='w-[100.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>        
                                    In Stock
                                </div>
                            </th>
                            <th className='w-[100.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Status
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        listStockLocation.length > 0 ? (
                        <tbody>
                            {listStockLocation.length > 0 && listStockLocation.map((stock, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <img className='h-12 w-12 leading-[50px] min-w-[50px] mr-3 rounded-lg' src={stock.product.image} alt='product-image'/>
                                            <div>
                                                {stock.product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {stock.product.barcode}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {stock.location.warehouse.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {stock.location.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {stock.quantity}
                                    </td>
                                    <td className={stock.quantity > 0 ? 'align-middle text-blue-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]' : 'align-middle text-red-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'}>
                                        {stock.quantity > 0 ? 'Available' : 'Out of stock!'}
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={7} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
                </div>
                {listStockLocation.length > 0 && (
                    <div className='md:flex md:items-center md:justify-between'>
                        <ReactPaginate
                            pageCount={Math.ceil(paginationData.count / pageSize)}
                            onPageChange={handlePageChange}
                            initialPage={currentPage}
                            containerClassName="isolate inline-flex -space-x-px rounded-md "
                            activeLinkClassName='active bg-[#ff792e] text-white'
                            previousClassName='px-[0px]'
                            pageLinkClassName='relative ring-1 ring-inset ring-gray-300 no-underline z-10 inline-flex text-black items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            previousLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronLeft} />}
                            previousLinkClassName='relative no-underline inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            disabledLinkClassName='disable p-0 bg-gray-300 cursor-auto text-black'
                            nextLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronRight} />}
                            pageClassName='px-[0px]'
                            nextClassName='px-[0px]'
                            nextLinkClassName='relative no-underline inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        />


                        <div>
                            <label className='mr-2'>Show items per page:</label>
                            <select value={pageSize} onChange={handleChangeItemPerPage} className='border border-gray-300'>
                                <option selected value='5'>
                                        5
                                </option>
                                <option value='10'>
                                        10
                                </option>
                                <option value='15'>
                                        15
                                </option>
                                <option value='20'>
                                        20
                                </option>
                            </select>
                        </div>
                    </div>
                )}
                </div>  
                
            </div>

        </div>
  )
}

export default LocationDetail

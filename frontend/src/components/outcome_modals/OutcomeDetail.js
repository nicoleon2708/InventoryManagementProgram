import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import outcomeService from '../../services/outcome.service'
import { Link, useParams } from 'react-router-dom'
import warehouseService from '../../services/warehouses.service'
import productService from '../../services/product.service'
import transferService from '../../services/transfer.service'
import { faBoxesStacked, faLocationDot, faMobile, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import ReactPaginate from 'react-paginate'

const OutcomeDetail = () => {    

    const [products, setProducts] = useState([])
    const [currentOutcome, setCurrentOutcome] = useState(null)
    const [currentWarehouse, setCurrentWarehouse] = useState(null)
    const [orderDetails, setOrderDetails] = useState([])
    const [transfersOfOutcome, setTransferOfOutcome] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [paginationData, setPaginationData] = useState({})

    const {id} = useParams()
    useEffect(()=>{

        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))
    }, [])

    useEffect(()=>{
        outcomeService.getOutcomeById(id)
        .then(res=>{
            setCurrentOutcome(res.data); 
            setOrderDetails(res.data.order_detail)

            warehouseService.getSpecificWarehouse(res.data.warehouse)
            .then(res=>setCurrentWarehouse(res.data))
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
        

        axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/auth/user/info/`, authHeader())
        .then(res=>setCurrentUser(res.data))
        .catch(err=>console.log(err))

        fetchData()
    }, [])

    const fetchDetailData = async()=>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                outcome: id,
            };

            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/outcome_detail/`, {
                params: params,
                ...authHeader()
            })
            setOrderDetails(res.data.results)
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

    const fetchData = async()=>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                outcome: id,
                is_import: false
            };

            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/transfer/`, {
                params: params,
                ...authHeader()
            })
            setTransferOfOutcome(res.data.results)
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

    const displayProductDetails = () => {
        if (products.length > 0) {
            return orderDetails.map(order => {
                const product = products.find(p => p.id === order.product);
                if (product) {
                    return {
                        name: product.name,
                        quantity: order.quantity,
                        price: order.price,
                        unit: order.unit,
                        image: product.image,
                        barcode: product.barcode
                    }
                }
                return null;
            });
        }
        return []; 
    }

    const handlePageChange = ({selected}) =>{
        setCurrentPage(selected)
    };

    const handleChangeItemPerPage = (e)=>{
        setPageSize(parseInt(e.target.value, 10)); 
        setCurrentPage(0); 
    }

    return (
    <div>
        <div className='flex items-center justify-between'>
            <div>
                <h2>Outcome Detail</h2>
            </div>
            <div>
                <Link to='/home/outcome'>
                    <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                        Back
                    </button>
                </Link>

            </div>
        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            <div className='p-[5px] '>
                <h3 className='text-base text-center'>Outcome Detail: OC{currentOutcome && currentOutcome.id}</h3>
            </div>

            <div className='md:flex md:justify-between p-[10px]'>
                <div className='md:w-[33.33%] p-[10px]'>
                    <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Partner Info:</p>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faUser} />
                        {currentOutcome && currentOutcome.partner && currentOutcome.partner.company_name}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faMobile} />
                        {currentOutcome && currentOutcome.partner && currentOutcome.partner.contact_phone}
                    </div>
                    <div className='flex items-center px-4 py-2'>
                    <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                        {currentOutcome && currentOutcome.partner && currentOutcome.partner.address}, district: {currentOutcome && currentOutcome.partner && currentOutcome.partner.district}
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
                    <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Outcome Info:</p>
                    <p className=' px-4'>Reference: OC{currentOutcome && currentOutcome.id}</p>
                    <p className=' px-4'>Status: 
                        { currentOutcome && currentOutcome.status && currentOutcome.status === 'Completed' ? (
                                            <span className='ml-2 px-3 py-2 rounded-lg text-green-500 bg-[#cef2e3] w-[100px]'>
                                                {currentOutcome && currentOutcome.status && currentOutcome.status}
                                            </span>
                                        ): (currentOutcome && currentOutcome.status && currentOutcome.status) === 'On Pending' ? (
                                            <span className='ml-2 px-3 py-2 rounded-lg text-[#ffbe41] bg-[#fff1d3] w-[150px]'>
                                                {currentOutcome && currentOutcome.status && currentOutcome.status}
                                            </span>
                                        ): null

                                        }
                    </p>
            
                    <p className=' px-4'>Warehouse: {currentWarehouse && currentWarehouse.name}</p>
                </div>
            </div>

            <div>
                <h4 className='text-gray-600 bg-light px-4 py-2 mb-0 text-uppercase font-bold'>
                    Order Summary:
                </h4>
            </div>

            <div className='overflow-x-auto mt-[10px]'>
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
                            <th className='w-[82.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Unit
                            </th>
                            <th className='w-[109.135px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    {
                        displayProductDetails().length > 0 ? (
                        <tbody>
                            {displayProductDetails().length > 0 && displayProductDetails().map((product, index) => (
                                <tr key={index} className='bg-white'>

                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <img className='h-12 w-12 leading-[50px] min-w-[50px] mr-3 rounded-lg' src={product.image} alt='product-image'/>
                                            <div>
                                                {product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.barcode}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.quantity}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.price}$
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.unit}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.price*product.quantity}$
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={6} className='p-[10px] text-center text-[#6c757d] '>
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
                                <td className='py-3 px-[20px] text-[#ff792e]'>$ <span>{currentOutcome && currentOutcome.total_price}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            <div>
                <h4 className='text-gray-600 bg-light px-4 py-2 mb-0 text-uppercase font-bold'>
                    Transfer Summary:
                </h4>
            </div>

            <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                #
                            </th>
                            <th className='w-[50px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Reference
                                </div>
                            </th>
                            <th className='w-[200.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    From
                                </div>
                            </th>
                            <th className='w-[200.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    To
                                </div>
                            </th>
                            <th className='w-[50.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>        
                                    Items
                                </div>
                            </th>
                            <th className='w-[50.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>        
                                    Status
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        transfersOfOutcome.length > 0 ? (
                        <tbody>
                            {transfersOfOutcome.length > 0 && transfersOfOutcome.map((transfer, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        TF{transfer.id}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {transfer.source_location.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {transfer.destination_location.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {transfer.transfer_detail.length}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        { transfer.status && transfer.status === 'COMPLETED' ? ( 
                                            <p className='px-3 py-2 rounded-lg text-green-500 text-center bg-[#cef2e3] w-[150px]'>
                                                {transfer.status}
                                            </p>
                                        ): transfer.status === 'TRANSFER' ? (
                                            <p className='px-3 py-2 rounded-lg text-[#ffbe41] bg-[#fff1d3] text-center w-[150px]'>
                                                {transfer.status}
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
                            <td colSpan={5} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>

                        )
                    }

                </table>
                </div>
                {transfersOfOutcome.length > 0 && (
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
  )
}

export default OutcomeDetail

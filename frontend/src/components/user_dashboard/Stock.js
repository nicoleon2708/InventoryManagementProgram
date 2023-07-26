import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import locationStockService from '../../services/location.stock.service'
import { Link, useNavigate } from 'react-router-dom'
import locationService from '../../services/location.service'
import productService from '../../services/product.service'
import authHeader from '../../services/auth-header'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { Container, Row, Table, Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify'


const Stock = () => {

    const [locations, setLocations] = useState([])
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filterData, setFilterData] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [paginationData, setPaginationData] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [ordering, setOrdering] = useState('')
    const [isAscending, setIsAscending] = useState(false)
    const [action, setAction] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [selectedStockId, setSelectedStockId] = useState(null)
    const navigate = useNavigate()

    const handleState = () => setAction(!action)
    const handleClose = () =>{
        setShowConfirmDialog(false)
    }
    const handleClickDelete = (id)=>{
        setShowConfirmDialog(true)
        setSelectedStockId(id)
    }

    const fetchData = async()=>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                search: searchQuery,
                location: selectedLocation,
                product: selectedProduct
            };

            const res = await axios.get('http://127.0.0.1:8000/inventory/stock/', {
                params: params,
                ...authHeader()
            })
            setFilterData(res.data.results)
            setPaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        locationService.getAllLocations()
        .then(res=>setLocations(res.data.results))
        .catch(err=>console.log(err))

        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))

        fetchData()

    }, [searchQuery, currentPage, pageSize, selectedLocation, selectedProduct])

    const handleDeleteStock = (id)=>{
        try {
          locationStockService.deleteLocationStock(id);
          setProducts((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
          setFilterData((prevFilterData) => prevFilterData.filter((stock) => stock.id !== id));
          toast('Delete stock successfully!')
          setShowConfirmDialog(false)
        } catch (err) {
          console.log(err);
        }
    }

    const navigateToDetail = (id) =>{
        navigate(`/home/stock/${id}`)
    }

    const handleEdit = (id) =>{
        navigate(`/home/stock/${id}/edit`)
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
                <h2>Stock List</h2>

                <button className='flex items-center bg-[#ff792e] py-2 px-5 rounded-lg font-bold hover:bg-[#1b2850] text-white'>
                    <FontAwesomeIcon className='mr-2' icon={faPlus} />

                    <span>
                        <Link className='no-underline text-white' to='/home/stock/add'>
                            Add Stock Item
                        </Link>
                    </span>
                </button>

            </div>

            <div className='bg-white mt-4 p-[20px]'>
                <div className='flex justify-between items-center w-full'>
                    <div className='w-[50%]'>
                        <form class="w-full flex items-center">   
                            <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-[50%]">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400 " placeholder="Search" required/>
                                </div>
                                <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-[#ff792e] rounded-lg border hover:opacity-80">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <span class="sr-only">Search</span>
                                </button>
                        </form>
                    </div>
                    <div className='relative'>
                        <div onClick={handleState} className='bg-[#ff792e] text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-80'>
                            <FontAwesomeIcon className='mr-3' icon={faFilter} />
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>   

                        <div class={
                            action ? "absolute top-[35px] right-[0px] z-10 mt-2 w-[300px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : 'hidden'
                        } 
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="px-[40px] py-[20px]" role="none">
                                <div className='flex flex-col justify-between'>
                                    <div className='mb-1'>Filter by Location:</div>
                                    <select value={selectedLocation} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedLocation(e.target.value)}>
                                        <option selected>Choose Location</option>
                                        {locations.length>0 ? locations.map((location, index)=>(
                                            <option value={location.id}>
                                                {location.name}
                                            </option>
                                        )):(
                                            <option>
                                                Don't have data
                                            </option>
                                        )
                                    }
                                    </select>
                                </div>

                                <div className='flex flex-col justify-between mt-3'>
                                    <div className='mb-1'>Filter by Product:</div>
                                    <select value={selectedProduct} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedProduct(e.target.value)}>
                                        <option selected>Choose Product</option>
                                        {products.length>0 ? products.map((product, index)=>(
                                            <option value={product.id}>
                                                {product.name}
                                            </option>
                                        )):(
                                            <option>
                                                Don't have data
                                            </option>
                                        )
                                    }
                                    </select>
                                </div>


                                <button className='w-full mt-3 py-2 bg-[#ff792e] text-white hover:opacity-80 rounded-lg'>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                #
                            </th>
                            <th className='w-[200px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Product 
                                </div>
                            </th>
                            <th className='w-[100.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Barcode
                                </div>
                            </th>
                            <th className='w-[150.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Location
                                </div>
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Quantity
                                </div>
                            </th>
                            <th className='w-[150.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    On Stock
                                </div>
                            </th>
                            <th className='w-[109.135px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        filterData.length > 0 ? (
                        <tbody>
                            {filterData.length > 0 && filterData.map((stock, index) => (
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
                                        {stock.location.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {stock.quantity}
                                    </td>
                                    <td className={stock.quantity > 0 ? 'align-middle text-blue-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]' : 'align-middle text-red-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'}>
                                        {stock.quantity > 0 ? 'Available' : 'Out of stock!'}
                                    </td>
                                    <td className='align-middle text-center items-center text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon onClick={(e)=>navigateToDetail(stock.id)} className='hover:opacity-80 mr-2 bg-[#7ee2ff] rounded-lg text-white cursor-pointer px-[8px] py-[10px]' icon={faEye} />
                                            <FontAwesomeIcon onClick={(e)=>handleEdit(stock.id)} className='hover:opacity-80 mr-2   cursor-pointer bg-[#78C091] rounded-lg text-white  px-[8px] py-[10px]' icon={faPen} />
                                            <FontAwesomeIcon onClick={(e)=>handleClickDelete(stock.id)} className='hover:opacity-80  cursor-pointer bg-[#FF9770] rounded-lg text-white px-[8px] py-[10px]' icon={faTrash} />
                                        </div>
                                        <Modal show={showConfirmDialog} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Delete this stock?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete this stock?</Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={(e)=>handleDeleteStock(selectedStockId)}>
                                                Delete
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
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
                {filterData.length > 0 && (
                    <div className='flex items-center justify-between'>
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

export default Stock

import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, useParams} from 'react-router-dom'
import { faChevronLeft, faFilter, faChevronRight, faHouse, faEye, faPenToSquare, faTrashCan, faBoxesStacked, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import productService from '../../services/product.service'
import groupRuleService from '../../services/group_rule.service'
import Barcode from 'react-barcode'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import ReactPaginate from 'react-paginate'


const ProductDetail = () => {
  const {pk} = useParams()
  const [currentProduct, setCurrentProduct] = useState(null);
  const [locationStockOfProduct, setLocationStockOfProduct] = useState([]);
  const [groupRule, setGroupRule] = useState([])
  const [selectedGroupRule, setSelectedGroupRule] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [paginationData, setPaginationData] = useState({})

  useEffect(()=>{
    productService.getSpecificProduct(pk)
    .then(res=>{
      setCurrentProduct(res.data);
    //   if(res.data.location_stocks.length > 0){
    //     setLocationStockOfProduct(res.data.location_stocks);
    //   }else{
    //     setLocationStockOfProduct([])
    //   }
    })
    .catch(err=>console.log(err))


    groupRuleService.getAllGroupRule()
    .then(res=>{
      setGroupRule(res.data.results)
    })
    .catch(err=>console.log(err))

    fetchData()
  },[])


  const fetchData = async()=>{
    try{
        const params = {
            page: currentPage + 1,
            page_size: pageSize,
            product: pk
        };

        const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/stock/`, {
            params: params,
            ...authHeader()
        })
        setLocationStockOfProduct(res.data.results)
        setPaginationData({
            count: res.data.count,
            previous: res.data.previous,
            next: res.data.next
        })
    } catch(err){
        console.log(err)
    }
}

  const setRuleProduct = (id) => {
    let formData = new FormData()
    formData.append('group_rule', selectedGroupRule)

    productService.setUpRuleForProduct(id, formData)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  const handleChangeGroupRule = (e) => {
    setSelectedGroupRule(e.target.value)
  }

  const handlePageChange = ({selected}) =>{
    setCurrentPage(selected)
};

const handleChangeItemPerPage = (e)=>{
    setPageSize(parseInt(e.target.value, 10)); 
    setCurrentPage(0); 
}

  return (
      <div className="text-black">
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Product Detail</h2>
                </div>
                <div>
                    <Link to='/home/product'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>


          <div className=' w-full rounded-lg bg-white mt-3'>


              <div>
                <div className='p-10  flex items-center justify-center'>
                    <div className='border-solid border-[1px] border-[#dcdfe8] p-[10px]'>
                       <Barcode value={currentProduct && currentProduct.barcode}/>

                    </div>
                </div>

              </div>

              <div class="productdetails">
                <ul className='px-[30px]'>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Product</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.name}</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Unit</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.unit}</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Barcode</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.barcode}</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Price</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.price}$</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Status</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.quantity > 0 ? 'Available': 'Out of Stock'}</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Group Rule</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.group_rule && currentProduct.group_rule.name}</h6>
                  </li>
                  <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
                        <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Description</h4>
                        <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentProduct && currentProduct.description}</h6>
                  </li>
                </ul>
                
              </div>
              
              <div className='w-full p-10'>
                    <div className='border-[1px] border-solid border-[#dcdfe8]'>
                      {currentProduct && 
                      (
                        <img className='w-[50%] mx-auto p-10' src={currentProduct.image} alt='product picture'/>

                      )}
                    </div>
                </div>



          </div>  

          <div className='mt-[30px] bg-white rounded-lg'>
                <div className='p-4'>
                <div className='flex px-4 py-2 bg-light items-center justify-between'>
                    <div>
                    <h4 className='text-gray-600  mb-0 text-uppercase font-bold'>
                        Stock Locations:
                    </h4>
                    </div>

                    <div className='mr-[15px]'>
                      <button className='px-3 h-[50px] rounded-lg text-white font-bold hover:opacity-80 bg-[#ff762e]'>
                        Add new stock
                      </button>
                    </div>
                </div>
              </div>

              <div className='px-[20px] '> 

                <div className='overflow-x-auto'>
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
                        locationStockOfProduct.length > 0 ? (
                        <tbody>
                            {locationStockOfProduct.length > 0 && locationStockOfProduct.map((stock, index) => (
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
                {locationStockOfProduct.length > 0 && (
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

export default ProductDetail

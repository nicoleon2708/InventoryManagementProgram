import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import warehouseService from '../../services/warehouses.service'
import locationService from '../../services/location.service'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const WarehouseDetail = () => {

    const [currentWarehouse, setCurrentWarehouse] = useState(null)
    const [listLocation, setListLocation] = useState([])
    const {id} = useParams()
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [paginationData, setPaginationData] = useState({});
    const navigate = useNavigate()

    useEffect(()=>{
        Promise.all([
            warehouseService.getSpecificWarehouse(id),
            // locationService.getAllLocations()
          ])
          .then(([warehouseRes, locationRes]) => {
            const warehouseData = warehouseRes.data;
            // const locationData = locationRes.data.results;
            setCurrentWarehouse(prevState => ({ ...prevState, ...warehouseData }));
        
            // const filteredData = locationData.filter(location => location.warehouse && location.warehouse.id == id);
            // setListLocation(filteredData);
          })
          .catch(err => console.log(err));

          fetchData()
    }, [])

    const fetchData = async() =>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                warehouse: id,
            };
            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/location/`, {
                params: params,
                ...authHeader()
            });

            setListLocation(res.data.results);
            setPaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })
        }
        catch(err){
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
                    <h2>Warehouse Detail</h2>
                </div>
                <div>
                    <Link to='/home/warehouse'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white mt-3'>
                <div className='mt-2 p-[20px]'>
                    <h4 className='text-center'>Warehouse Information</h4>

                </div>

                <div className='p-[20px]'>
                    <div className=''>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Warehouse Info:</p>
                        <div className='flex items-center px-4 py-2'>
                            Name: {currentWarehouse && currentWarehouse.name}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            Number of location: {currentWarehouse && currentWarehouse.location} locations
                        </div>
                    </div>        
                </div>

                <div className='mt-2 px-[20px] '>
                    <h4 className='text-gray-600 bg-light px-4 py-3 mb-0 text-uppercase font-bold'>
                        Location List:
                    </h4>   
                    <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                #
                            </th>
                            <th className='w-[200px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Location Name
                                </div>
                            </th>
                            <th className='w-[120.1667px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Postal Code
                                </div>
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>        
                                    City
                                </div>
                            </th>
                            <th className='w-[150.1667px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    Address
                                </div>
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                <div className='flex justify-between'>
                                    District
                                </div>
                            </th>

                        </tr>
                    </thead>
                    {
                        listLocation.length > 0 ? (
                        <tbody>
                            {listLocation.length > 0 && listLocation.map((location, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {location.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {location.postal_code}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {location.city}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {location.address}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {location.district}
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
                {
                    listLocation.length > 0 && (
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
                    )
                }

                </div>  
            </div>

        </div>
  )
}

export default WarehouseDetail

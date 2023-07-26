import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import warehouseService from '../../services/warehouses.service'
import locationService from '../../services/location.service'

const WarehouseDetail = () => {

    const [currentWarehouse, setCurrentWarehouse] = useState(null)
    const [listLocation, setListLocation] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        Promise.all([
            warehouseService.getSpecificWarehouse(id),
            locationService.getAllLocations()
          ])
          .then(([warehouseRes, locationRes]) => {
            const warehouseData = warehouseRes.data;
            const locationData = locationRes.data.results;
            setCurrentWarehouse(prevState => ({ ...prevState, ...warehouseData }));
        
            const filteredData = locationData.filter(location => location.warehouse && location.warehouse.id == id);
            setListLocation(filteredData);
          })
          .catch(err => console.log(err));
    }, [])

    return (
    <div className='overflow-x-auto'>
            
            <div className='px-[20px]'>
                <h2>Warehouse Detail</h2>
            </div>

            <div className='bg-white'>
                <div className='mt4 p-[20px]'>
                    <h4 className='text-center'>Warehouse Information</h4>

                </div>

                <div className='p-[20px]'>
                    <p>Warehouse name: {currentWarehouse && currentWarehouse.name}</p>
                    <p>Number of locations belong to Warehouse: {currentWarehouse && currentWarehouse.location} locations</p>
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
                    {/* <div className='overflow-x-auto'>
                    <table className='w-full mt-3 border-collapse'>
                        <thead className='bg-[#fafbfe] text-left'>
                            <tr>
                                <th className='p-[15px]'>
                                    <span>#</span>
                                </th>
                                <th className='p-[15px]'>
                                    <span>Location Name</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Warehouse</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Postal Code</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>City</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Address</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>District</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Action</span>
                                </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            { listLocation ? listLocation.map((location, index)=>(
                                <tr className='border-b-[1px] border-solid text-left border-[#67748E] hover:bg-[#fafafa]'>
                                    <td className='p-[15px]'>{index+1}</td>
                                    <td className='p-[15px]'>{location.name}</td>
                                    <td className='p-[15px]'>{currentWarehouse.name}</td>
                                    <td className='p-[15px]'>{location.postal_code}</td>
                                    <td className='p-[15px]'>{location.city}</td>
                                    <td className='p-[15px]'>{location.address}</td>
                                    <td className='p-[15px]'>{location.district}</td>

                                    <td className='p-[15px]'>
                                        {/* <FontAwesomeIcon onClick={()=>navigateToDetail(location.id)} className='mr-2 hover:opacity-80 cursor-pointer' icon={faEye} />
                                        <FontAwesomeIcon onClick={()=>handleEditLocation(location.id)} className='mr-2 text-blue-700 hover:opacity-80 cursor-pointer' icon={faPen} />
                                        <FontAwesomeIcon onClick={()=>handleDeleteLocation(location.id)} className='text-red-800 hover:opacity-80 cursor-pointer' icon={faTrash} /> 
                                    </td>                    
                                </tr>
                            ))
                            :
                            (
                                <div>
                                    Don't have warehouse
                                </div>
                            )
                            }

                        </tbody>


                    </table>
                    </div> */}

                </div>  
            </div>

        </div>
  )
}

export default WarehouseDetail

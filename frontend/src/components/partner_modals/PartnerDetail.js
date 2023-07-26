import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faUser, faMobile, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import partnerService from '../../services/partner.service'
import outcomeService from '../../services/outcome.service'
import locationService from '../../services/location.service'
import {toast} from 'react-toastify'

const PartnerDetail = () => {

    const [currentPartner, setCurrentPartner] = useState(null)
    const [listOutcome, setListOutcome] = useState([])
    const [externalLocation, setExternalLocation] = useState([])
    const [outcomeLocation, setOutcomeLocation] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
          partnerService.getPartnerById(id),
          outcomeService.getAllOutcomes()
        ])
        .then(([partnerRes, outcomeRes, purchaseRes]) => {
          const partnerData = partnerRes.data;
          const outcomeData = outcomeRes.data.results;
          setCurrentPartner(prevState => ({ ...prevState, ...partnerData }));
      
          const filteredData = outcomeData.filter(outcome => outcome.partner && outcome.partner.id === partnerData.id);
          setListOutcome(filteredData);
        })
        .catch(err => console.log(err));
      }, []);

    useEffect(()=>{
        locationService.getAllLocations()
        .then(res=>{
            const filteredData = res.data.results.filter((location) => location.name.includes('External Outcome'))
            setExternalLocation(filteredData)
        })
        .catch(err=>console.log(err))
    }, [])

    const setExternalLocationWarehouse = (id) =>{
        let data={
            location: outcomeLocation
        }
        partnerService.setUpExternalLocationWarehouse(id, data)
        .then(res=>{
            toast('Set up external location of warehouse for partner successfully!')
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Partner Detail</h2>
                </div>
                <div>
                    <Link to='/home/partner'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white rounded-lg mt-[20px]'>
                <div className='flex justify-between p-[10px]'>
                    <div className='w-[50%] p-[10px]'>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Company Info:</p>
                        <div className='flex items-center px-4 py-2'>
                            <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faUser} />
                            {currentPartner && currentPartner.company_name}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faUser} />
                            {currentPartner && currentPartner.contact_name}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faMobile} />
                            {currentPartner && currentPartner.contact_phone}
                        </div>

                    </div>
                    <div className='w-[50%] p-[10px]'>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Address Info:</p>
                        <div className='flex items-center px-4 py-2'>
                            <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                            {currentPartner && currentPartner.address}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                            {currentPartner && currentPartner.district}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                        <FontAwesomeIcon className='mr-3 text-[#ff792e]' icon={faLocationDot} />
                            {currentPartner && currentPartner.city}
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between px-[40px]'>
                    <div className='flex items-center justify-center'>
                        <p>External Location of Warehouse:</p>

                    </div>
                    <div className='flex items-center'>
                        <select value={outcomeLocation} onChange={(e)=>setOutcomeLocation(e.target.value)} id="underline_select" className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] text-gray-500'>
                            <option selected>
                                    Choose External Location
                            </option>
                            
                            {externalLocation.length > 0 ? externalLocation.map((location, index)=> (
                                <option key={index} value={location.id}>
                                   {location.name} 
                                </option>
                            )):
                            (
                                <option value=''>
                                None
                                </option>
                            )
                            }
                        </select>
                        <button onClick={()=>setExternalLocationWarehouse(currentPartner.id)} className='ml-3 rounded-lg px-3 py-2 bg-[#ff792e] hover:opacity-80 text-white font-bold'>
                            Set
                        </button>
                    </div>
                </div>

                <div className='mt-2 p-[20px] '>
                    <div>
                        <h4 className='text-gray-600 bg-light px-4 py-2 mb-0 text-uppercase font-bold'>
                            Outcome List:
                        </h4>
                    </div>
                <div className='overflow-x-auto mt-[10px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900'>
                    <thead className='bg-white text-uppercase'>
                        <tr className=''>
                            <th className='w-[100px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Reference
                            </th>                       
                            <th className='w-[60.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Date
                            </th>
                            <th className='w-[40.1667px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Total Price
                            </th>
                            <th className='w-[82.5px] capitalize px-[15px] text-base leading-5 bg-[#f8f9fa] text-[#748293] font-normal py-2 border-[0px]'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    {
                        listOutcome.length > 0 ? (
                        <tbody>
                            {listOutcome.length > 0 && listOutcome.map((outcome, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        OC{outcome.id}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {outcome.created_date}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {outcome.total_price}$
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        { outcome.status && outcome.status === 'Completed' ? ( 
                                            <p className='px-3 py-2 rounded-lg text-green-500 text-center bg-[#cef2e3] w-[150px]'>
                                                {outcome.status}
                                            </p>
                                        ): outcome.status === 'On Pending' ? (
                                            <p className='px-3 py-2 rounded-lg text-[#ffbe41] bg-[#fff1d3] text-center w-[150px]'>
                                                {outcome.status}
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
                            <td colSpan={4} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
            </div>
                </div>  
            </div>

        </div>
  )
}

export default PartnerDetail

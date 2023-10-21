import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import outcomeService from '../../services/outcome.service'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import ReactPaginate from 'react-paginate'
import warehouseService from '../../services/warehouses.service'
import partnerService from '../../services/partner.service'
import { Container, Row, Table, Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify'
const Outcome = () => {
  
    const [outcomes, setOutcomes] = useState([])
    const [partners, setPartners] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [filterData, setFilterData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [paginationData, setPaginationData] = useState({})
    const [selectedPartner, setSelectedPartner] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedWarehouse, setSelectedWarehouse] = useState(null)
    const [action, setAction] = useState(false)
    const navigate = useNavigate()
    const handleState = () => setAction(!action)
    const [ordering, setOrdering] = useState('')
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [isAscending, setIsAscending] = useState(false)
    const [selectedOutcomeId, setSelectedOutcomeId] = useState(null)
    const handleClose = () =>{
        setShowConfirmDialog(false)
    }
    const handleClickDelete = (id)=>{
        setShowConfirmDialog(true)
        setSelectedOutcomeId(id)
    }
    const StatusChoice = {
        PENDING: 'On Pending',
        RECEIVED: 'Received',
        SHIPPING: 'On Shipping',
        COMPLETED: 'Completed'
      };
    const fetchData = async()=>{
        try{
            const params = {
                page: currentPage+1,
                page_size: pageSize,
                partner: selectedPartner,
                status: selectedStatus,
                warehouse: selectedWarehouse
            };
            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/outcome/`, {
                params: params,
                ...authHeader()
            });
            setFilterData(res.data.results)
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

    useEffect(()=>{
        warehouseService.getAllWarehouses()
        .then(res=>setWarehouses(res.data.results))
        .catch(err=>console.log(err))

        partnerService.getAllPartner()
        .then(res=>setPartners(res.data.results))
        .catch(err=>console.log(err))

        fetchData()
    }, [currentPage, pageSize, selectedPartner, selectedStatus, selectedWarehouse])

    const handleDeleteOutcome = async (id)=>{
        try {
            await outcomeService.deleteOutcome(id);
            setOutcomes((prevOutcome) => prevOutcome.filter((outcome) => outcome.id !== id));
            setFilterData((prevFilterData) => prevFilterData.filter((outcome) => outcome.id !== id));
            toast("Delete outcome successfully!")
            setShowConfirmDialog(false)
          } catch (err) {
            console.log(err);
          }
    }
    const navigateOutcomeDetail = (id)=>{
        navigate(`${id}`)
    }
    const handlePageChange = ({selected}) =>{
        setCurrentPage(selected)
        console.log(selected)
    };

    const handleChangeItemPerPage = (e)=>{
        setPageSize(parseInt(e.target.value, 10)); 
        setCurrentPage(0); 
    }
    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <h2>Outcome List</h2>

                <button className='flex items-center bg-[#ff792e] py-2 px-5 rounded-lg font-bold hover:bg-[#1b2850] text-white'>
                    <FontAwesomeIcon className='mr-2' icon={faPlus} />

                    <span>
                        <Link className='no-underline text-white' to='/home/outcome/create'>
                            Add New Outcome
                        </Link>
                    </span>
                </button>

            </div>

            <div className='bg-white rounded-lg mt-4 p-[20px]'>
                <div className='flex justify-between items-center w-full'>
                    <div className='w-[50%]'>

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
                                    <div className='mb-1'>Filter by Warehouse:</div>
                                    <select value={selectedWarehouse} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedWarehouse(e.target.value)}>
                                        <option selected>Choose Warehouse:</option>
                                        {warehouses.length>0 ? warehouses.map((warehouse, index)=>(
                                            <option value={warehouse.id}>
                                                {warehouse.name}
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
                                    <div className='mb-1'>Filter by Partner:</div>
                                    <select value={selectedPartner} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedPartner(e.target.value)}>
                                        <option selected>Choose Partner:</option>
                                        {partners.length>0 ? partners.map((partner, index)=>(
                                            <option value={partner.id}>
                                                {partner.name}
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
                                    <div className='mb-1'>Filter by Status:</div>
                                    <select value={selectedStatus} onChange={(e)=>setSelectedStatus(e.target.value)} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' >
                                        <option selected>Choose Status:</option>
                                        {Object.keys(StatusChoice).map(key => (
                                            <option key={key} value={key}>
                                                {StatusChoice[key]}
                                            </option>
                                        ))}
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
                            <th className='w-[50px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Reference
                                </div>
                            </th>
                            <th className='w-[200.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Partner Name
                                </div>
                            </th>
                            <th className='w-[200.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Date
                                </div>
                            </th>
                            <th className='w-[150.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Total Price
                                </div>
                            </th>
                            <th className='w-[150.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Status
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
                            {filterData.length > 0 && filterData.map((outcome, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        OC{outcome.id}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {outcome.partner.company_name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {new Date(outcome.created_date).toLocaleString()}
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
                                    <td className='align-middle text-center items-center text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon onClick={(e)=>navigateOutcomeDetail(outcome.id)} className='hover:opacity-80 mr-2 bg-[#7ee2ff] rounded-lg text-white cursor-pointer px-[8px] py-[10px]' icon={faEye} />
                                            <FontAwesomeIcon onClick={(e)=>handleClickDelete(outcome.id)} className='hover:opacity-80  cursor-pointer bg-[#FF9770] rounded-lg text-white px-[8px] py-[10px]' icon={faTrash} />
                                        </div>
                                        
                                    </td>
                                    <Modal show={showConfirmDialog} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Delete this outcome?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete this outcome?</Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={(e)=>handleDeleteOutcome(selectedOutcomeId)}>
                                                Delete
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
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

export default Outcome

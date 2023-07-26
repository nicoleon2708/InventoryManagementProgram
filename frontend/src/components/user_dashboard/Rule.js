import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import ruleService from '../../services/rules.service'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import locationService from '../../services/location.service'
import groupRuleService from '../../services/group_rule.service'
import ReactPaginate from 'react-paginate'
import { Container, Row, Table, Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify'

const Rule = () => {
  
    const [rules, setRules] = useState([])
    const [filterData, setFilterData] = useState([])
    const [groupRules, setGroupRules] = useState([])
    const [locations, setLocations] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSourceLocation, setSelectedSourceLocation] = useState(null)
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [action, setAction] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [paginationData, setPaginationData] = useState({})
    const handleState = () => setAction(!action)
    const navigate = useNavigate()
    const [ordering, setOrdering] = useState('')
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [isAscending, setIsAscending] = useState(false)
    const [selectedRuleId, setSelectedRuleId] = useState(null)
    const handleClose = () =>{
        setShowConfirmDialog(false)
    }
    const handleClickDelete = (id)=>{
        setShowConfirmDialog(true)
        setSelectedRuleId(id)
    }
    const TypeChoice = {
        STRAIGHT: 'Take From Stock',
        ANT_LC: 'Take From Stock, If Unavailable, Trigger Another Rule',
      };

    const fetchData = async()=>{
        try{
            const params = {
                page: currentPage + 1,
                page_size: pageSize,
                source_location: selectedSourceLocation,
                destination_location: selectedDestinationLocation,
                group: selectedGroup,
                types_of_rule: selectedMethod,
                search: searchQuery
            };

            const res = await axios.get('http://127.0.0.1:8000/inventory/rule/', {
                params: params,
                ...authHeader()
            });
            setFilterData(res.data.results)
            setPaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        groupRuleService.getAllGroupRule()
        .then(res=>setGroupRules(res.data.results))
        .catch(err=>console.log(err))

        locationService.getAllLocations()
        .then(res=>setLocations(res.data.results))
        .catch(err=>console.log(err))

        fetchData()
    }, [searchQuery, pageSize, currentPage, selectedSourceLocation, selectedDestinationLocation, selectedGroup, selectedMethod])

    const handleDeleteRule =async (id)=>{
        try {
            await ruleService.deleteRule(id);
            setRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
            setFilterData((prevFilterData) => prevFilterData.filter((rule) => rule.id !== id));
            toast('Delete rule succesfully')
            setShowConfirmDialog(false)
          } catch (err) {
            console.log(err);
          }
    }

    const handleEditRule = (id)=>{
        navigate(`${id}/edit`)
    }

    
    const handlePageChange = ({selected}) =>{
        setCurrentPage(selected)
    };

    const handleChangeItemPerPage = (e)=>{
        setPageSize(parseInt(e.target.value, 10)); 
        setCurrentPage(0); 
    }

    const navigateToDetail = (id)=>{
        navigate(`/home/rule/${id}`)
    }

    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <h2>Rule List</h2>

                <button className='flex items-center bg-[#ff792e] py-2 px-5 rounded-lg font-bold hover:bg-[#1b2850] text-white'>
                    <FontAwesomeIcon className='mr-2' icon={faPlus} />

                    <span>
                        <Link className='no-underline text-white' to='/home/rule/add'>
                            Add Rule
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
                                    <div className='mb-1'>Filter by Source Location:</div>
                                    <select value={selectedSourceLocation} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedSourceLocation(e.target.value)}>
                                        <option selected>Choose Source Location:</option>
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
                                    <div className='mb-1'>Filter by Destination Location:</div>
                                    <select value={selectedDestinationLocation} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedDestinationLocation(e.target.value)}>
                                        <option selected>Choose Destination Location:</option>
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
                                    <div className='mb-1'>Filter by Group:</div>
                                    <select value={selectedGroup} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedGroup(e.target.value)}>
                                        <option selected>Choose Group Rule:</option>
                                        {groupRules.length>0 ? groupRules.map((group, index)=>(
                                            <option value={group.id}>
                                                {group.name}
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
                                    <div className='mb-1'>Filter by Method:</div>
                                    <select value={selectedMethod} className='border-solid border-[1px] border-[#CCCCCC] rounded-lg' onChange={(e)=>setSelectedMethod(e.target.value)}>
                                        <option selected>Choose Method:</option>
                                        {Object.keys(TypeChoice).map(key => (
                                            <option key={key} value={key}>
                                                {TypeChoice[key]}
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
                            <th className='w-[200px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Rule Name
                                </div>
                            </th>
                            <th className='w-[100.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Method
                                </div>
                            </th>
                            <th className='w-[120.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Source Location
                                </div>
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Destination Location
                                </div>
                            </th>
                            <th className='w-[150.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Group Rule
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
                            {filterData.length > 0 && filterData.map((rule, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.types_of_rule === 'STRAIGHT' ? 'Take From Stock' : 'Pull from another'}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.source_location ? rule.source_location.name : "Don't have source location"}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.destination_location ? rule.destination_location.name : "Don't have destination location"}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.group ? rule.group.name : "Don't have group"}
                                    </td>
                                    <td className='align-middle text-center items-center text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon onClick={(e)=>navigateToDetail(rule.id)} className='hover:opacity-80 mr-2 bg-[#7ee2ff] rounded-lg text-white cursor-pointer px-[8px] py-[10px]' icon={faEye} />
                                            <FontAwesomeIcon onClick={(e)=>handleEditRule(rule.id)} className='hover:opacity-80 mr-2   cursor-pointer bg-[#78C091] rounded-lg text-white  px-[8px] py-[10px]' icon={faPen} />
                                            <FontAwesomeIcon onClick={(e)=>handleClickDelete(rule.id)} className='hover:opacity-80  cursor-pointer bg-[#FF9770] rounded-lg text-white px-[8px] py-[10px]' icon={faTrash} />
                                        </div>
                                        
                                    </td>
                                    <Modal show={showConfirmDialog} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Delete this rule?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete this rule?</Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={(e)=>handleDeleteRule(selectedRuleId)}>
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

export default Rule

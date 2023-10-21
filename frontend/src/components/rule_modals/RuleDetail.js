import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ruleService from '../../services/rules.service'

const RuleDetail = () => {

    const [currentRule, setCurrentRule] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        ruleService.getRuleById(id)
        .then(res=>{
            setCurrentRule(res.data)
        })
        .catch(err=>console.log(err))
    }, [])

    const TypeChoice = {
        STRAIGHT: 'Take From Stock',
        ANT_LC: 'Take From Stock, If Unavailable, Trigger Another Rule',
      };

    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Rule Detail</h2>
                </div>
                <div>
                    <Link to='/home/rule'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white rounded-lg mt-3'>
                <div className=' px-[40px] py-[10px]'>
                    <h4>Name: {currentRule && currentRule.name}</h4>
                </div>
            <div>

<div className='p-[10px]'>
    <ul className='px-[30px]'>
    <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
            <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Action</h4>
            <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>                                        {currentRule && currentRule.types_of_rule === 'STRAIGHT' ? 'Take From Stock' : 'Pull from another'}</h6>
    </li>
    <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
            <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Source Location</h4>
            <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentRule && currentRule.source_location.name}</h6>
    </li>
    <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
            <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Destination Location</h4>
            <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentRule && currentRule.destination_location.name}</h6>
    </li>
    <li className='flex p-0 border-solid border-[1px] border-[#d8d8d8]'>
            <h4 className='w-[50%] md:w-[30%] pl-[10px] pt-[12px] m-0 border-r-[1px] border-solid border-[#d8d8d8] text-[14px] font-bold'>Group</h4>
            <h6 className='w-[50%] md:w-[70%] font-normal pl-[10px] pt-[12px]'>{currentRule && currentRule.group.name}</h6>
    </li>
    
    </ul>
    
</div>
</div>  
            </div>
        </div>
  )
}

export default RuleDetail

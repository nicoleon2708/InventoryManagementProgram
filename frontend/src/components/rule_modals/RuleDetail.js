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

    return (
    <div className='overflow-x-auto'>
            
            <div className='px-[20px]'>
                <h2>Rule Detail</h2>
                <p>View all detail of this rule</p>
            </div>

            <div className='mt-4 p-[20px]'>
                <div className='bg-white p-[20px]'>
                    <div className='border-b-[1px] border-[#bfbfbf] border-solid'>
                        <p>Name:</p>
                        <h3>{currentRule && currentRule.name}</h3>
                    </div>

                    <div className='flex items-center mt-2'>
                        <p className='mr-3'>Action:</p>
                        <p>Pull From Another</p>
                    </div>

                    <div className='flex items-center'>
                        <p className='mr-3'>Source Location:</p>
                        <p>{currentRule && currentRule.source_location.name}</p>
                    </div>

                    <div className='flex items-center'>
                        <p className='mr-3'>Destination Location:</p>
                        <p>{currentRule && currentRule.destination_location.name}</p>
                    </div>

                    
                    <div className='flex items-center'>
                        <p className='mr-3'>Group rule:</p>
                        <p>{currentRule && currentRule.group.name}</p>
                    </div>

                    <div>
                        <p>Description:</p>
                        <p>{currentRule && currentRule.description}</p>
                    </div>


                </div>
            </div>  
        </div>
  )
}

export default RuleDetail

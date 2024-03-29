import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import groupRuleService from '../../services/group_rule.service'
import locationService from '../../services/location.service'
import ruleService from '../../services/rules.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddRule = () => {

    const [groupRules, setGroupRule] = useState([])
    const [location, setLocation] = useState([])
    const [name, setName] = useState('')
    const [method, setMethod] = useState('')
    const [sourceLocation, setSourceLocation] = useState('')
    const [destinationLocation, setDestinationLocation] = useState('')
    const [description, setDescription] = useState('')
    const [group, setGroup] = useState('')
    const [error, setError] = useState('')
    const [nameError, setNameError] = useState('')
    const navigate = useNavigate()

    const TypeChoice = {
        STRAIGHT: 'Take From Stock',
        ANT_LC: 'Take From Stock, If Unavailable, Trigger Another Rule',
      };
    
    useEffect(()=>{
        groupRuleService.getAllGroupRule()
        .then(res=>{
            setGroupRule(res.data.results);
        })
        .catch(err=>console.log(err))

        locationService.getAllLocations()
        .then(res=>{
            setLocation(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    const handleChangeMethod = (e) =>{
        setMethod(e.target.value)
    }

    const handleChangeSource = (e) =>{
        setSourceLocation(e.target.value)
    }

    const handleChangeDestination = (e) =>{
        setDestinationLocation(e.target.value)
    }

    const handleChangeGroup = (e) => {
        setGroup(e.target.value)
    }
    const addRule = (e) =>{
        e.preventDefault()
        setError('')
        setNameError('')
        if(
            !name.trim()|
            !description.trim()|
            !method|
            !sourceLocation|
            !destinationLocation|
            !group
        ){
            setError("You must fill all the fields to create new rule!")
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('types_of_rule', method)
        formFields.append('source_location', sourceLocation)
        formFields.append('destination_location', destinationLocation);
        formFields.append('description', description)
        formFields.append('group', group);
        console.log(formFields)
        ruleService.createNewRule(formFields)
        .then(res=>{
            toast('Add new rule successfully')
            navigate('/home/rule')
        })
        .catch(err=>{
            if(err.response){
                const {data} = err.response
                if(name && data.name){
                    setNameError(data.name)
                }
                if(data.detail){
                    setError(data.detail)
                }
            }
        })

    }

    const cancelAdd = ()=>{
        navigate('/home/rule')
    }

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add Rule</h2>

        </div>

        <div className='mt-3 bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}
            <div className='flex flex-col'>
                <label className='mb-2 text-[#343a40] font-bold'>Rule Name:<span className='text-red-600'>*</span></label>
                <input type='text' placeholder='Name'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={name} onChange={(e)=>setName(e.target.value)}
                />
                {nameError && <p className='text-red-600 font-bold'>{nameError}</p>}
            </div>                        
            <div className='grid grid-cols-1 mt-3 md:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Method:<span className='text-red-600'>*</span></label>

                    <select value={method} onChange={handleChangeMethod} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option selected>
                            Choose Method
                      </option>
                      
                      {Object.keys(TypeChoice).map(key => (
                        <option key={key} value={key}>
                            {TypeChoice[key]}
                        </option>
                    ))}

                    </select>
                </div>
                            

                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Belongs to Group:<span className='text-red-600'>*</span></label>

                    <select value={group} onChange={handleChangeGroup} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option selected>
                            Choose Group
                      </option>
                      
                      {groupRules ? groupRules.map((groupRule, index)=> (
                        <option key={index} value={groupRule.id}>{groupRule.name}</option>
                      )):
                      (
                        <option value=''>
                          None
                        </option>
                      )
                    }


                    </select>
                </div>
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 mt-3 gap-4'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Source Location:<span className='text-red-600'>*</span></label>

                    <select value={sourceLocation} onChange={handleChangeSource} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                        <option selected>Choose Source Location</option>

                            {location ? location.map((location, index)=>(
                                <option key={index} value={location.id}>
                                    {location.name}
                                </option>
                            ))
                            :
                            (
                                <option value=''>
                                    None
                                </option>
                            )
                            }


                    </select>
                </div>

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Destination Location:<span className='text-red-600'>*</span></label>

                    <select value={destinationLocation} onChange={handleChangeDestination} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                    <option selected>Choose Destination Location</option>

                        {location ? location.map((location, index)=>(
                            <option key={index} value={location.id}>
                                {location.name}
                            </option>
                        ))
                        :
                        (
                            <option value=''>
                                None
                            </option>
                        )
                        }


                    </select>
                </div>
                            
            </div>

            <div className='mt-3 mb-3'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Description:<span className='text-red-600'>*</span></label>
                    <textarea 
                        rows="4" 
                        cols="50 "
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg '
                    >
                    </textarea>
                </div>
            </div>
        
            <div className='py-[15px]'>
                <button onClick={addRule} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Submit
                </button>
                <button onClick={cancelAdd} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default AddRule

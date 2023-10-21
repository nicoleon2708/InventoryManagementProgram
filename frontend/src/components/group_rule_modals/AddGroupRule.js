import React, {useEffect, useState} from 'react'
import groupRuleService from '../../services/group_rule.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ruleService from '../../services/rules.service'
import locationService from '../../services/location.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faSquareXmark, faTrash } from '@fortawesome/free-solid-svg-icons'


const AddGroupRule = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [description, setDescription] = useState('')
    const [locations, setLocations] = useState([])
    const [error, setError] = useState('')
    const [ruleError, setRuleError] = useState('')
    const [rules, setRules] = useState([
        { name: '', types_of_rule: '', source_location: '', destination_location: '' },
      ]);
    const TypeChoice = {
        STRAIGHT: 'Take From Stock',
        ANT_LC: 'Take From Stock, If Unavailable, Trigger Another Rule',
    };
    const navigate = useNavigate()

    const addGroupRule = (e) =>{
        e.preventDefault()
        setNameError('')
        setError('')
        setRuleError('')
        if(
            !name.trim()|
            !description.trim() 
        ){
            setError('Please fill all the fields to create new group rule!')
        }
        if(rules.length == 0){
            setRuleError("Please create a list of rule for this group rule!")
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('description', description)
        groupRuleService.createNewGroupRule(formFields)
        .then(res=>{
            const createRulePromises = rules.map(rule => {
                const updatedRule = { ...rule, group: res.data.group_rule.id };
                const ruleFields = new FormData();
                ruleFields.append('name', updatedRule.name);
                ruleFields.append('description', updatedRule.description);
                ruleFields.append('types_of_rule', updatedRule.types_of_rule);
                ruleFields.append('source_location', updatedRule.source_location);
                ruleFields.append('destination_location', updatedRule.destination_location);
                ruleFields.append('group', updatedRule.group);
                return ruleService.createNewRule(ruleFields);
            });

            return Promise.all(createRulePromises);
        })
        .then(() => {
            toast('Group rule and rules have been added successfully');
            navigate('/home/group_rule');
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
            console.log(err)
        })

    }

    const handleRuleChange = (index, field, value) => {
        const updatedRules = [...rules];
        updatedRules[index][field] = value;
        setRules(updatedRules);
    };

    const handleRemoveRule = (index) => {
        const updatedRules = [...rules];
        updatedRules.splice(index, 1);
        setRules(updatedRules);
    };

    const handleAddRuleRow = () => {
        setRules(prevRules => [
          ...prevRules,
          { name: '', types_of_rule: '', source_location: '', destination_location: '' }
        ]);
      };

    useEffect(()=>{
        locationService.getAllLocations()
        .then(res=>setLocations(res.data.results))
        .catch(err=>console.log(err))
    }, [])


    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add Group Rule</h2>

        </div>

        <div className='mt-3 bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Group Rule Name:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Name'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    {nameError && <p className='text-red-600 font-bold'>{nameError}</p>}

               </div>
                            
            
            <div className='mt-3 mb-3'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Description:<span className='text-red-600'>*</span></label>
                    <textarea 
                        rows="4" 
                        cols="50 "
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg  '
                    >
                    </textarea>
                </div>
            </div>

            {ruleError && <p className='text-red-600 font-bold'>{ruleError}</p>}

            <div>
                <label className='mb-2 text-[#343a40] font-bold'>Rule list:<span className='text-red-600'>*</span></label>
                <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[150px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 px-[15px] border-[0px]'>
                                Name
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 px-[15px] border-[0px]'>
                                Method
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 px-[15px] border-[0px]'>
                                Source Location
                            </th>
                            <th className='w-[69.875px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 px-[15px] border-[0px]'>
                                Destination Location
                            </th>
                            <th className='w-[109.135px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 px-[15px] border-[0px]'>
                                {
                                    rules.length > 1 && (
                                        <th className='p-[15px]'>
                                            <span>Action</span>
                                        </th>
                                    )
                                }
                            </th>
                        </tr>
                    </thead>

                        <tbody>
                            {rules && rules.map((rule, index) => (
                                <>
                                <tr key={index} className='bg-white'>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <input
                                            type='text'
                                            placeholder='Name'
                                            className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                                            value={rule.name}
                                            onChange={(e) =>
                                            handleRuleChange(index, 'name', e.target.value)
                                            }
                                        />
                                        
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <select value={rule.types_of_rule}
                                            onChange={(e) => handleRuleChange(index, "types_of_rule", e.target.value)}
                                            id="underline_select"                     
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
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <select
                                            value={rule.source_location}
                                            onfocus='this.size=3;' onblur='this.size=1;' onchange='this.size=1; this.blur();'
                                            className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'

                                            onChange={(e)=>handleRuleChange(index, 'source_location', e.target.value)}
                                        >
                                            <option selected>Choose Source Location</option>

                                                {locations ? locations.map((location, index)=>(
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
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <select
                                            value={rule.destination_location}
                                            onfocus='this.size=3;' onblur='this.size=1;' onchange='this.size=1; this.blur();'
                                            onChange={(e)=>handleRuleChange(index, 'destination_location', e.target.value)}
                                            className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'

                                        >
                                                <option selected>Choose Destination Location</option>

                                                    {locations ? locations.map((location, index)=>(
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
                                    </td>
                                    { rules.length > 1 && (
                                            <td className='align-middle text-center items-center text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                                <div className='flex items-center justify-center'>
                                                    
                                                    <FontAwesomeIcon onClick={handleRemoveRule}  className='hover:opacity-80  cursor-pointer bg-[#FF9770] rounded-lg text-white px-[8px] py-[10px]' icon={faTrash} />
                                                </div>

                                            </td>
                                        )
                                    }

                                </tr>
                                <tr>
                                    <td className="p-[15px]">
                                        {/* Plus button */}
                                        {index === rules.length - 1 && (
                                        <button onClick={handleAddRuleRow} className="ml-2">
                                            <FontAwesomeIcon className='text-green-700 cursor-pointer' icon={faCirclePlus} />         
                                        </button>
                                        )}
                                    </td> 
                                </tr>
                                </>
                            ))
                            }

                        </tbody>

                </table>
                </div>
                

            </div>
        

            
            <div className='py-[15px]'>
                <button onClick={addGroupRule} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Submit
                </button>
                <button className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default AddGroupRule

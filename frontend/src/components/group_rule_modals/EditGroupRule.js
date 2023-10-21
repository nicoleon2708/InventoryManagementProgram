import React, {useEffect, useState} from 'react'
import groupRuleService from '../../services/group_rule.service'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditGroupRule = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [error, setError] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const editGroupRule = (e) =>{
        e.preventDefault()
        setError('')
        setNameError('')
        if(
            !name.trim()|
            !description.trim()
        ){
            setError('You must fill all the fields to update group rule!')
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('description', description)
        groupRuleService.updateGroupRule(id, formFields)
        .then(res=>{
            toast('Update group rule successfully')
            navigate('/home/group_rule')
        })
        .catch(err=>{
            if(err.response){
                const {data} = err.response
                if(data.name){
                    setNameError(data.name)
                }
                if(data.detail){
                    setError(data.detail)
                }
            }
        })

    }

    const cancelEdit = ()=>{
        navigate('/home/group_rule')
    }

    useEffect(()=>{
        groupRuleService.getGroupRuleById(id)
        .then(res=>{
            setName(res.data.name)
            setDescription(res.data.description)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Edit Group Rule</h2>

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
                    <label className='mb-2'>Description</label>
                    <textarea 
                        rows="4" 
                        cols="50 "
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg'                        
                        >

                    </textarea>
                </div>
            </div>




        

            
            <div className='py-[15px]'>
                <button onClick={editGroupRule} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Submit
                </button>
                <button onClick={cancelEdit} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default EditGroupRule

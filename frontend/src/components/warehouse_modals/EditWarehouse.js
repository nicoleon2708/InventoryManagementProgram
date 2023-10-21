import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import warehouseService from '../../services/warehouses.service'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditWarehouse = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [postal_code, setPostalCode] = useState('')
    const [error, setError] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    const editWarehouse = async (e) =>{
        e.preventDefault()
        setError('')
        setNameError('')
        if(
            !name.trim()|
            !address.trim()|
            !district.trim()|
            !city.trim()|
            !postal_code.trim()
        ){
            setError('You must input all fields to create a update warehouse!')
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('address', address)
        formFields.append('district', district)
        formFields.append('city', city)
        formFields.append('postal_code', postal_code)
        await warehouseService.updateWarehouse(id, formFields)
        .then(res=>{
            toast('Update warehouse successfully!')
            navigate('/home/warehouse')
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

    const cancelUpdate = ()=>{
        navigate('/home/warehouse')
    }

    useEffect(()=>{
        warehouseService.getSpecificWarehouse(id)
        .then(res=>{
            setName(res.data.name)
            setAddress(res.data.address)
            setDistrict(res.data.district)
            setCity(res.data.city)
            setPostalCode(res.data.postal_code)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Edit Warehouse</h2>

        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}

            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
               <div className='flex flex-col'>
               <label className='mb-2 text-[#343a40] font-bold'>Warehouse Name:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Name'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    {nameError && <p className='text-red-600 font-bold'>{nameError}</p>}

               </div>

               <div className='flex flex-col'>
               <label className='mb-2 text-[#343a40] font-bold'>Postal Code:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Postal Code'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={postal_code} onChange={(e)=>setPostalCode(e.target.value)}
                    />
               </div>
                            
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 mt-3 gap-4'>
               <div className='flex flex-col'>
               <label className='mb-2 text-[#343a40] font-bold'>District:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='District'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={district} onChange={(e)=>setDistrict(e.target.value)}
                    />
               </div>

               <div className='flex flex-col'>
               <label className='mb-2 text-[#343a40] font-bold'>City:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='City'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={city} onChange={(e)=>setCity(e.target.value)}
                    />
               </div>
                            
            </div>

            <div className='flex flex-col mt-3'>
            <label className='mb-2 text-[#343a40] font-bold'>Address:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Address'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={address} onChange={(e)=>setAddress(e.target.value)}
                    />
               </div>

        

            
            <div className='py-[15px]'>
                <button onClick={editWarehouse} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Submit
                </button>
                <button onClick={cancelUpdate} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default EditWarehouse

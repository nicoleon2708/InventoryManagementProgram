import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import warehouseService from '../../services/warehouses.service'
import locationService from '../../services/location.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddLocation = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [postal_code, setPostalCode] = useState('')
    const [warehouse, setWarehouse] = useState('')
    const [listWarehouse, setListWarehouse] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const addLocation = async (e) =>{
        e.preventDefault()
        setError('')
        setNameError('')
        if(
            !name.trim()|
            !address.trim()|
            !district.trim()|
            !city.trim()|
            !postal_code.trim()|
            !warehouse
        ){
            setError("Please fill all fields to create new location!")
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('address', address)
        formFields.append('district', district)
        formFields.append('city', city)
        formFields.append('postal_code', postal_code)
        formFields.append('warehouse', warehouse)
        await locationService.createNewLocation(formFields)
        .then(res=>{
            toast('Add new location successfully')
            navigate('/home/location')
        })
        .catch(err=>{
            if(err.response){
                const {data} = err.response
                if(name && data.name){
                    setNameError(data.name)
                }
            }
        })
    }

    const handleChangeWarehouse = (e) =>{
        setWarehouse(e.target.value)
    }

    const cancelAdd = ()=>{
        navigate('/home/location')
    }

    useEffect(()=>{

        warehouseService.getAllWarehouses()
        .then(res=>{
            setListWarehouse(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add Location</h2>

        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}

            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Location Name:<span className='text-red-600'>*</span></label>
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

            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-3'>
               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>District:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='District'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={district} onChange={(e)=>setDistrict(e.target.value)}
                    />
               </div>

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>City:<span className='text-red-600'>*</span></label>
                    <select value={city} onChange={(e)=>setCity(e.target.value)} 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                        <option value="An Giang">An Giang</option>
                        <option value="Bac Giang">Bac Giang</option>
                        <option value="Bac Kan">Bac Kan</option>
                        <option value="Bac Lieu">Bac Lieu</option>
                        <option value="Bac Ninh">Bac Ninh</option>
                        <option value="Ba Ria-Vung Tau">Ba Ria-Vung Tau</option>
                        <option value="Ben Tre">Ben Tre</option>
                        <option value="Binh Dinh">Binh Dinh</option>
                        <option value="Binh Duong">Binh Duong</option>
                        <option value="Binh Phuoc">Binh Phuoc</option>
                        <option value="Binh Thuan">Binh Thuan</option>
                        <option value="Ca Mau">Ca Mau</option>
                        <option value="Cao Bang">Cao Bang</option>
                        <option value="Dac Lak">Dac Lak</option>
                        <option value="Dac Nong">Dac Nong</option>
                        <option value="Dien Bien">Dien Bien</option>
                        <option value="Dong Nai">Dong Nai</option>
                        <option value="Dong Thap">Dong Thap</option>
                        <option value="Gia Lai">Gia Lai</option>
                        <option value="Ha Giang">Ha Giang</option>
                        <option value="Hai Duong">Hai Duong</option>
                        <option value="Ha Nam">Ha Nam</option>
                        <option value="Ha Tay">Ha Tay</option>
                        <option value="Ha Tinh">Ha Tinh</option>
                        <option value="Hau Giang">Hau Giang</option>
                        <option value="Hoa Binh">Hoa Binh</option>
                        <option value="Hung Yen">Hung Yen</option>
                        <option value="Khanh Hoa">Khanh Hoa</option>
                        <option value="Kien Giang">Kien Giang</option>
                        <option value="Kon Tum">Kon Tum</option>
                        <option value="Lai Chau">Lai Chau</option>
                        <option value="Lam Dong">Lam Dong</option>
                        <option value="Lang Son">Lang Son</option>
                        <option value="Lao Cai">Lao Cai</option>
                        <option value="Long An">Long An</option>
                        <option value="Nam Dinh">Nam Dinh</option>
                        <option value="Nghe An">Nghe An</option>
                        <option value="Ninh Binh">Ninh Binh</option>
                        <option value="Ninh Thuan">Ninh Thuan</option>
                        <option value="Phu Tho">Phu Tho</option>
                        <option value="Phu Yen">Phu Yen</option>
                        <option value="Quang Binh">Quang Binh</option>
                        <option value="Quang Nam">Quang Nam</option>
                        <option value="Quang Ngai">Quang Ngai</option>
                        <option value="Quang Ninh">Quang Ninh</option>
                        <option value="Quang Tri">Quang Tri</option>
                        <option value="Soc Trang">Soc Trang</option>
                        <option value="Son La">Son La</option>
                        <option value="Tay Ninh">Tay Ninh</option>
                        <option value="Thai Binh">Thai Binh</option>
                        <option value="Thai Nguyen">Thai Nguyen</option>
                        <option value="Thanh Hoa">Thanh Hoa</option>
                        <option value="Thua Thien-Hue">Thua Thien-Hue</option>
                        <option value="Tien Giang">Tien Giang</option>
                        <option value="Tra Vinh">Tra Vinh</option>
                        <option value="Tuyen Quang">Tuyen Quang</option>
                        <option value="Vinh Long">Vinh Long</option>
                        <option value="Vinh Phuc">Vinh Phuc</option>
                        <option value="Yen Bai">Yen Bai</option>
                        <option value="Can Tho">Can Tho</option>
                        <option value="Da Nang">Da Nang</option>
                        <option value="Hai Phong">Hai Phong</option>
                        <option value="Hanoi">Hanoi</option>
                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                    </select>
               </div>
                            
            </div>

            <div className='flex flex-col mt-3'>
                    <label className='mb-2 text-[#343a40] font-bold'>Address:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Address'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={address} onChange={(e)=>setAddress(e.target.value)}
                    />
            </div>

            <div className='flex flex-col mt-3'>
                    <label className='mb-2 text-[#343a40] font-bold'>Belongs to Warehouse:<span className='text-red-600'>*</span></label>

                    <select value={warehouse} onChange={handleChangeWarehouse} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option selected>
                            Choose warehouse
                      </option>
                      
                      {listWarehouse ? listWarehouse.map((warehouse, index)=> (
                        <option key={index} value={warehouse.id}>{warehouse.name}</option>
                      )):
                      (
                        <option value=''>
                          None
                        </option>
                      )
                    }


                    </select>
            </div>


        

            
            <div className='py-[15px]'>
                <button onClick={addLocation} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
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

export default AddLocation

import React, {useEffect, useState} from 'react'
import productService from '../../services/product.service'
import groupRuleService from '../../services/group_rule.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX} from '@fortawesome/free-solid-svg-icons'
import Barcode from 'react-barcode';



const AddProduct = () => {

    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')
    const [weight, setWeight] = useState('')
    const [weightError, setWeightError] = useState('')
    const [price, setPrice] = useState('')
    const [priceError, setPriceError] = useState('')
    const [image, setImage] = useState(null)
    const [barcode, setBarcode] = useState('')
    const [barcodeError, setBarcodeError] = useState('')
    const [description, setDescription] = useState('')
    const [group, setGroup] = useState('')
    const [groupRules, setGroupRules] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const AddProduct = async (e) =>{
        e.preventDefault()
        setError('')
        setBarcodeError('')
        setPriceError('')
        setWeightError('')
        if(
            !name.trim()|
            !unit.trim()|
            !weight|
            !price|
            !barcode
        ){
            setError("You must input all fields to create a new product!")
        }
        let formFields = new FormData()
        formFields.append('name', name)
        formFields.append('unit', unit)
        formFields.append('weight', weight)
        formFields.append('price', price)
        formFields.append('description', description)
        formFields.append('barcode', barcode)
        formFields.append('group_rule', group)
        if(image!=null){
            formFields.append('image', image)
        }
        await productService.createNewProduct(formFields)
        .then(res=>{
            toast('Product has been added successfully');
            navigate('/home/product')
        })
        .catch(err=>{
            if(err.response){
                const {data} = err.response;
                if(barcode && data.barcode){
                    setBarcodeError(data.barcode)
                }
                if(price && data.price){
                    setPriceError(data.price)
                }
                if(weight && data.weight){
                    setWeightError(data.weight)
                }
            }
        })
    }


    const handleFileChange = (e) =>{
        setImage(e.target.files[0]);
    }

    const handleChangeGroupRule = (e)=>{
        setGroup(e.target.value);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e)=>{
        const selectedFile = e.dataTransfer.files[0]
        setImage(selectedFile)
    }

    const cancelAdd = ()=>{
        navigate('/home/product')
    }

    const deleteImageFile = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        setImage('')
    }

    useEffect(()=>{
        groupRuleService.getAllGroupRule()
        .then(res=>{
            setGroupRules(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add product</h2>

        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}
            <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Product Name:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Product name'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px]'
                        value={name} onChange={(e)=>setName(e.target.value)}
                    />
               </div>
               
            <div className='my-2 grid md:grid-cols-3 grid-col gap-4'>


               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Unit:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Product Unit'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={unit} onChange={(e)=>setUnit(e.target.value)}
                    />
               </div>

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Barcode:<span className='text-red-600'>*</span></label>
                    <input type='text' placeholder='Product Barcode'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={barcode} onChange={(e)=>setBarcode(e.target.value)}
                    />
                    {barcodeError && <p className='text-red-600 font-bold'>{barcodeError}</p>}

               </div>

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Weight:<span className='text-red-600'>*</span></label>
                    <input type='number' placeholder='Product Weight'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={weight} onChange={(e)=>setWeight(e.target.value)}
                    />
                    {weightError && <p className='text-red-600 font-bold'>{weightError}</p>}
               </div>
                            
            </div>

            <div className='mt-3 mb-3'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Description:<span className='text-red-600'>*</span></label>
                    <textarea 
                        rows="4" 
                        cols="50 "
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg'>

                    </textarea>
                </div>
            </div>

            <div className='grid md:grid-cols-2 grid-col gap-4'>

               <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Price:<span className='text-red-600'>*</span></label>
                    <input type='number' placeholder='Product Price'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={price} onChange={(e)=>setPrice(e.target.value)}
                    />
                    {priceError && <p className='text-red-600 font-bold'>{priceError}</p>}
               </div>

               <div className='flex flex-col mt'>
                    <label className='mb-2 text-[#343a40] font-bold'>Group rule:<span className='text-red-600'>*</span></label>

                    <select value={group} onChange={handleChangeGroupRule} required={false} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option value=''>
                            Choose group
                      </option>
                      
                      {groupRules.length > 0 ? groupRules.map((groupRule, index)=> (
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


               
            <div class="w-full flex flex-col mt-3">
                    <label className='text-[#343a40] font-bold mb-3'>Product Image:<span className='text-red-600'>*</span></label>
                    <div 
                        className='flex relative items-center justify-center w-full'
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        required={false}
                    >
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full min-h-[400px] border-2  border-dashed rounded-lg cursor-pointer  hover:bg-bray-800  border-gray-600  ">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange}/>
                            {image && (<img src={URL.createObjectURL(image)} className='w-[300px] absolute' alt='Preview of chosen image' />)}
                            <div className='z-50 absolute  top-[8px] right-[11px]'>
                                <FontAwesomeIcon 
                                    className={image ? ' text-red-600 hover:opacity-80' : 'hidden'} 
                                    icon={faX} 
                                    onClick={deleteImageFile}
                                />
                            </div>
                        </label>


                    </div>

                </div> 

            
            <div className='py-[15px]'>
                <button onClick={AddProduct} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
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

export default AddProduct

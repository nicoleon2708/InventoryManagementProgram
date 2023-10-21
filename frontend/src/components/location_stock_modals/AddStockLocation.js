import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import locationService from '../../services/location.service'
import productService from '../../services/product.service'
import locationStockService from '../../services/location.stock.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddStockLocation = () => {

    const [listLocation, setListLocation] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [error, setError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    const navigate = useNavigate()

    const addStockLocation = async (e) =>{
        e.preventDefault()
        setError('')
        setQuantityError('')
        if(
          !selectedLocation|
          !selectedProduct|
          !quantity
        ){
          setError("You must fill all fields to add new stock location!")
        }
        let formFields = new FormData()
        formFields.append('location', selectedLocation)
        formFields.append('product', selectedProduct)
        formFields.append('quantity', quantity)
        await locationStockService.createNewLocationStock(formFields)
        .then(res=>{
          toast('Add new stock item successfully')
          navigate('/home/stock')
        })
        .catch(err=>{
          if(err.response){
            const {data} = err.response
            if(data.quantity){
              setQuantityError(data.quantity)
            }
            if(data.detail){
              setError(data.detail)
            }
          }
          console.log(err)
        })
    }

    const handleChangeLocation = (e) =>{
        setSelectedLocation(e.target.value)
    }

    const handleChangeProduct = (e) => {
        setSelectedProduct(e.target.value)
    }

    const cancelAdd = () =>{
      navigate('/home/stock')
    }

    useEffect(()=>{
        

        productService.getAllProducts()
        .then(res=>{
            setListProduct(res.data.results)
        })
        .catch(err=>console.log(err))

        locationService.getAllLocations()
        .then(res=>{
            setListLocation(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add Stock Item</h2>

        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold mt-3'>{error}</p>}

            <div className='flex flex-col mt-2'>
                    <label className='mb-2 text-[#343a40] font-bold'>Location:<span className='text-red-600'>*</span></label>

                    <select value={selectedLocation} onChange={handleChangeLocation} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option selected>
                            Choose Location
                      </option>
                      
                      {listLocation ? listLocation.map((location, index)=> (
                        <option key={index} value={location.id}>{location.name}</option>
                      )):
                      (
                        <option value=''>
                          None
                        </option>
                      )
                    }


                    </select>
            </div>

            <div className='flex flex-col mt-3'>
                    <label className='mb-2 text-[#343a40] font-bold'>Product:<span className='text-red-600'>*</span></label>

                    <select value={selectedProduct} onChange={handleChangeProduct} id="underline_select" 
                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-gray-500 rounded-lg'
                    >
                      <option selected>
                            Choose Product
                      </option>
                      
                      {listProduct ? listProduct.map((product, index)=> (
                        <option key={index} value={product.id}>{product.name}</option>
                      )):
                      (
                        <option value=''>
                          None
                        </option>
                      )
                    }


                    </select>
            </div>

            <div className='flex flex-col mt-3'>
                    <label className='mb-2 text-[#343a40] font-bold'>Quantity:<span className='text-red-600'>*</span></label>
                    <input type='number' placeholder='Quantity'
                        className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] '
                        value={quantity} onChange={(e)=>setQuantity(e.target.value)}
                    />
                    {quantityError && <p className='text-red-600 font-bold mt-3'>{quantityError}</p>}

            </div>
        

            
            <div className='py-[15px]'>
                <button onClick={addStockLocation} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
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

export default AddStockLocation

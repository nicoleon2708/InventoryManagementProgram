import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useRef, useState} from 'react'
import partnerService from '../../services/partner.service'
import outcomeService from '../../services/outcome.service'
import productService from '../../services/product.service'
import warehouseService from '../../services/warehouses.service'
import { faBarcode, faTrash } from '@fortawesome/free-solid-svg-icons'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import locationService from '../../services/location.service'




const CreateOutcome = () => {
    const [listPartner, setListPartner] = useState([])
    const [partner, setPartner] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentUser, setCurrentUser] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [products, setProducts] = useState([])   
    const [externalLocationError, setExternalLocationError] = useState(false)
    const [createOutcomeError, setCreateOutcomeError] = useState('')
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/auth/user/info/`, authHeader())
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        const storedProducts = localStorage.getItem(`listProduct_${currentUser && currentUser.id}`);
        setListProduct(prevListProduct => {
            if (!storedProducts) {
                return [];
            }
            const parsedProducts = JSON.parse(storedProducts);
            return parsedProducts;
        });
    }, [currentUser]);
    const [listWarehouse, SetListWarehouse] = useState([])
    const [warehouse, setWarehouse] = useState(null)
    const [barcode, setBarcode] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{

        partnerService.getAllPartner()
        .then(res=>setListPartner(res.data.results))
        .catch(err=>console.log(err))

        warehouseService.getAllWarehouses()
        .then(res=>SetListWarehouse(res.data.results))
        .catch(err=>console.log(err)) 

        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))

        const calculateTotalPrice = listProduct.reduce((totalPrice, product)=>{
            return totalPrice + (product.quantity*product.price);
        }, 0)
        setTotalPrice(parseFloat(calculateTotalPrice, 10))
    }, [listProduct])
    const handleBarcodeScan = (e) => {
        setBarcode(e.target.value)

    };      
    const handleChangePartner = (e) => {
        setPartner(e.target.value)
    }
    const handleChangeWarehouse = (e) => {
        setWarehouse(e.target.value)
    }
    useEffect(()=>{
        if(barcode != ''){
            const foundProduct = Boolean(products.find((pd)=> pd.barcode === barcode))
            if(foundProduct){
                const getData = setTimeout(()=>{
                    productService.getAllProducts()
                    .then(res=>{
                        const product = res.data.results.find((product) => product.barcode === barcode);
                        const findProduct = Boolean(listProduct.find((pd)=> pd.id === product.id))
                        if(!findProduct){
                            setListProduct((prevListProduct)=>{
                                const updatedList = [...prevListProduct, product]
                                localStorage.setItem(`listProductImport_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
                                return updatedList;
                            })
                            setBarcode('')
                        }else{
                            toast.error('You have already added this product!')
                        }
                    })
                }, 500)
        
                return () => clearTimeout(getData)
            }else{
                const displayError = setTimeout(()=>{
                    toast.error("This product don't exist!")
                }, 1000) 
                return () => clearTimeout(displayError)
            }

        }
    }, [barcode])
    const handleProductQuantityChange = (e, index) => {
        const updatedList = [...listProduct];
        updatedList[index].quantity = parseInt(e.target.value);
        setListProduct(updatedList);
        localStorage.setItem(`listProduct_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
      };

    const createOutcome = (e) =>{
        e.preventDefault()
        setError('')
        if(
            !partner |
            !warehouse 
        ){
            setError('Please fill all fields to create new outcome!')
        }else{
            let orderDetails = listProduct.map((product) => {
                const { id: id, quantity: quantity, unit: unit, price: price } = product;
            
                return {
                  product: id,
                  quantity: quantity,
                  unit: unit,
                  price: price,
                };
              });
            if(listProduct.length>0){
                let hasNegativeQuantity = listProduct.some((product) => {
                    return product.quantity <= 0;
                });
        
                let data = {
                    'partner': partner,
                    'order_detail': orderDetails,
                    'warehouse': warehouse
                }
        
                locationService.getAllLocations()
                .then(res=>{
                    const foundExternalOfPartner = Boolean(res.data.results.find((location)=> {
                        return location.warehouse && location.partner && location.warehouse.id == warehouse && location.partner.id == partner;
                    }))
                    setExternalLocationError(foundExternalOfPartner)
                    console.log(externalLocationError)

                })
                .catch(err=>console.log(err))
                if(hasNegativeQuantity===false){
                    outcomeService.createNewOutcome(data)
                    .then(res=>{
                        if(createOutcomeError === ''){
                            localStorage.removeItem(`listProduct_${currentUser && currentUser.id}`);
                            toast('Create new outcome successfully')
                            navigate('/home/outcome')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        setCreateOutcomeError(err.response.data)
                        const {data} = err.response;
                        if(data.detail){
                            toast.error(data.detail)
                        }
                    })
                }else{
                    toast.error("Please choose a valid quantity of product!")
                }
            }else{
                setError('Please choose a product to create outcome!')
            }     
        }

    }

    const handleRemoveProduct = (index) => {
        const updatedList = [...listProduct];
        updatedList.splice(index, 1);
        setListProduct(updatedList);
        localStorage.setItem(`listProduct_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
    };

    const cancelCreate = ()=>{
        navigate('/home/outcome')
    }

    return (
    <div >
        <div className='flex items-center justify-between'>
                <h2>Add Outcome</h2>
        </div>

        <div className='mt-3 rounded-lg bg-white p-[20px]'>
            {error && <p className='text-red-600 font-bold'>{error}</p>}
            <div className='grid grid-cols md:grid-cols-2 gap-2 md:gap-8'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Partner:<span className='text-red-600'>*</span></label>
                        <select value={partner} onChange={handleChangePartner} id="underline_select" className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] text-gray-500'>
                            <option selected>
                                    Choose Partner
                            </option>
                            
                            {listPartner ? listPartner.map((partner, index)=> (
                                <option key={index} value={partner.id}>
                                    {partner.company_name}
                                </option>
                            )):
                            (
                                <option value=''>
                                None
                                </option>
                            )
                            }
                        </select>

                </div>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Warehouse:<span className='text-red-600'>*</span></label>
                        <select value={warehouse} onChange={handleChangeWarehouse} id="underline_select" className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] text-gray-500'>
                            <option selected>
                                    Choose Warehouse
                            </option>
                            
                            {listWarehouse ? listWarehouse.map((warehouse, index)=> (
                                <option key={index} value={warehouse.id}>
                                    {warehouse.name}
                                </option>
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
            <label className='mb-2 mt-2 text-[#343a40] font-bold'>Product:<span className='text-red-600'>*</span></label>

            <div className='flex flex-col'>
                    <div className='relative'>
                        <input type='text' placeholder='Please type or scan barcode to select'
                            className='border w-full border-gray-400 py-1 px-2 outline-none h-[40px] rounded-lg'
                            value={barcode} onChange={handleBarcodeScan}
                        />
                        <FontAwesomeIcon  className='absolute right-[8px] top-[12px]' icon={faBarcode} />
                    </div>
                    
            </div>
            
            <div className='mt-2 font-bold'>
                Order items:<span className='text-red-600'>*</span>
            </div>
            
            <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 '>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                #
                            </th>
                            <th className='w-[150px] capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                Product
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                Barcode
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                Price
                            </th>
                            <th className='w-[69.875px] capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                Quantity
                            </th>
                            <th className='w-[109.135px] capitalize text-base leading-5 bg-[#f8f9fa] py-2 text-[#748293] font-bold border-[0px]'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        listProduct.length > 0 ? (
                        <tbody>
                            {listProduct.length > 0 && listProduct.map((product, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <img className='h-12 w-12 leading-[50px] min-w-[50px] mr-3 rounded-lg' src={product.image} alt='product-image'/>
                                            <div>
                                                {product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.barcode}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.price}$
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div class='quantity'>
                                            <input 
                                                type='number'
                                                min={1}
                                                className='w-12 h-10 float-left block p-0 pl-5 leading-[10px] m-0 border-solid border-[#eee]'
                                                onChange={(e) => handleProductQuantityChange(e, index)}
                                            
                                            />    
                                        </div>
                                    </td>
                                    <td className='align-middle text-center items-center text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                        
                                            <FontAwesomeIcon onClick={(e)=>handleRemoveProduct(index)}  className='hover:opacity-80  cursor-pointer bg-[#FF9770] rounded-lg text-white px-[8px] py-[10px]' icon={faTrash} />
                                        </div>

                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={8} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
            </div>


                        
            <div className='w-full h-auto flex justify-end my-[20px]'>
                <div className='flex w-[50%] justify-end mt-[10px]'>
                    <table className='border-[1px] border-solid text-[#6f757d] border-[#dee2e6] align-middle w-full'>
                        <tbody>
                            <tr>
                                <td className='py-3 px-[20px]'>Shipping:</td>
                                <td className='py-3 px-[20px]'>$ 0.00</td>
                            </tr>
                            <tr>
                                <td className='py-3 px-[20px] text-[#ff792e]'>Grand Total:</td>
                                <td className='py-3 px-[20px] text-[#ff792e]'>$ <span>{totalPrice && totalPrice}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className='py-[15px]'>
                <button onClick={createOutcome} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Submit
                </button>
                <button onClick={cancelCreate} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>

    </div>
  )
}

export default CreateOutcome

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useRef, useState} from 'react'
import outcomeService from '../../services/outcome.service'
import outcomeDetailService from '../../services/outcome_detail.service'
import partnerService from '../../services/partner.service'
import productService from '../../services/product.service'
import warehouseService from '../../services/warehouses.service'
import { faBarcode, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import locationService from '../../services/location.service'
import transferService from '../../services/transfer.service'


const CreatePurchase = () => {
    const [locationList, setLocationList] = useState([])
    const [partnerLocationList, setPartnerLocationList] = useState([])
    const [totalPrice, setTotalPrice] = useState('')
    const [products, setProducts] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    //useMemo toi uu 
    //query toi uu chua
    //danh index cot trong database
    const [listProduct, setListProduct] = useState([]);   
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/auth/user/info/', authHeader())
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        const storedProducts = localStorage.getItem(`listProductImport_${currentUser && currentUser.id}`);
        setListProduct(prevListProduct => {
            if (!storedProducts) {
                return [];
            }
            const parsedProducts = JSON.parse(storedProducts);
            return parsedProducts;
        });
    }, [currentUser]);
    const [barcode, setBarcode] = useState('')
    const [barcodeError, setBarcodeError] = useState('')
    const [sourceLocation, setSourceLocation] = useState('')
    const [destinationLocation, setDestinationLocation] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        locationService.getAllLocations()
        .then(res=>{
            const filteredDataNoOutcome = res.data.results.filter((location) => !location.name.includes('External Outcome'))
            setLocationList(filteredDataNoOutcome);
            const filteredData = res.data.results.filter((location) => location.name.includes('External Outcome'))
            setPartnerLocationList(filteredData)
        })

        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))

        const calculateTotalPrice = listProduct.reduce((total, product)=>{
            return total + (product.quantity*product.price);
        }, 0)
        setTotalPrice(calculateTotalPrice)
    }, [listProduct])

    const handleProductQuantityChange = (e, index) => {
        const updatedList = [...listProduct];
        updatedList[index].quantity = parseInt(e.target.value);
        setListProduct(updatedList);
        localStorage.setItem(`listProductImport_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
      };

    const handleProductPriceChange = (e, index) => {
        const updatedList = [...listProduct];
        updatedList[index].price = parseFloat(e.target.value)
        setListProduct(updatedList)
        localStorage.setItem(`listProductImport_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
    };

    const createPurchase = (e) =>{
        e.preventDefault()
        let transferDetails = listProduct.map((product) => {
            const { id: id, quantity: quantity, unit: unit, price: price } = product;
        
            return {
              product: id,
              quantity: quantity,
              unit: unit,
              price: price,
            };
          });
        let data = {
            'source_location': sourceLocation,
            'transfer_detail': transferDetails,
            'destination_location': destinationLocation
        }
        transferService.importProductTransfer(data)
        .then(res=>{
            localStorage.removeItem(`listProductImport_${currentUser && currentUser.id}`);
            toast('Create purchase successfully')
            navigate('/home/purchase')
        })
        .catch(err=>console.log(err))
    }
    const handleRemoveProduct = (index) => {
        const updatedList = [...listProduct];
        updatedList.splice(index, 1);
        setListProduct(updatedList);
        localStorage.setItem(`listProductImport_${currentUser && currentUser.id}`, JSON.stringify(updatedList));
    };

    const cancelCreate = ()=>{
        navigate('/home/purchase')
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
                }, 1000)
        
                return () => clearTimeout(getData)
            }else{
                const displayError = setTimeout(()=>{
                    toast.error("This product don't exist!")
                }, 1000) 
                return () => clearTimeout(displayError)
            }

        }
    }, [barcode])

    const handleChangeBarcode = (e) =>{
        setBarcode(e.target.value)
        console.log(e.target.value)
        // if(barcode!=''){
        //     const useDebounce = setTimeout(()=>{
        //         console.log(e.target.value)
        //     }, 1000)
        //     return () => clearTimeout(useDebounce)
        // }
    }

    return (
    <div>
        <div className='flex items-center justify-between'>
                <h2>Add Purchase</h2>
        </div>

        <div className='mt-3 bg-white p-[20px]'>
            <div className='grid md:grid-cols-2 gap-2 md:gap-5'>
                <div className='flex flex-col'>
                    <label className='mb-2 text-[#343a40] font-bold'>Partner:<span className='text-red-600'>*</span></label>
                        <select value={sourceLocation} onChange={(e)=>setSourceLocation(e.target.value)} id="underline_select" className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] text-gray-500'>
                            <option selected>
                                    Choose Partner
                            </option>
                            
                            {partnerLocationList.length > 0 ? partnerLocationList.map((location, index)=> (
                                <option key={index} value={location.id}>
                                    {location.partner && location.partner.company_name}
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
                    <label className='mb-2 text-[#343a40] font-bold'>Destination Location:<span className='text-red-600'>*</span></label>
                        <select value={destinationLocation} onChange={(e)=>setDestinationLocation(e.target.value)} id="underline_select" className='border border-gray-400 py-1 px-2 outline-none rounded-lg h-[40px] text-gray-500'>
                            <option selected>
                                    Choose Destination Location
                            </option>
                            
                            {locationList ? locationList.map((location, index)=> (
                                <option key={index} value={location.id}>
                                    {location.name}
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
            <label className='my-2 text-[#343a40] font-bold'>Product:<span className='text-red-600'>*</span></label>

            <div className='flex flex-col'>
                    <div className='relative'>
                        <input type='text' placeholder='Please type product barcode to select'
                            className='border w-full border-gray-400 py-1 px-2 outline-none h-[40px] rounded-lg'
                            value={barcode} onChange={(e)=>setBarcode(e.target.value)}
                            // value={barcode} onChange={handleChangeBarcode}
                        />
                        <FontAwesomeIcon className='absolute right-[8px] top-[9px]' icon={faBarcode} />
                    </div>
                    
            </div>


            {barcodeError && <p className='text-red-600 font-bold'>{barcodeError}</p>}

            <div className='text-[#343a40] mt-2 font-bold'>
                Order details:<span className='text-red-600'>*</span>
            </div>

            <div className='overflow-x-auto mt-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
                                #
                            </th>
                            <th className='w-[150px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
                                Product
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
                                Barcode
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
                                Price
                            </th>
                            <th className='w-[69.875px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
                                Quantity
                            </th>
                            <th className='w-[109.135px] capitalize text-base leading-5 bg-[#f8f9fa] text-[#748293] font-bold py-2 border-[0px]'>
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
                                        <div class='quantity'>
                                            <input 
                                                type='number'
                                                min={1}
                                                className='w-12 h-10 float-left block p-0 pl-5 leading-[10px] m-0 border-solid border-[#eee]'
                                                onChange={(e) => handleProductPriceChange(e, index)}
                                            
                                            />    
                                        </div>
                                        
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
                                            {/* <FontAwesomeIcon  className='hover:opacity-80 mr-2 bg-[#7ee2ff] rounded-lg text-white cursor-pointer px-[8px] py-[10px]' icon={faEye} />
                                            <FontAwesomeIcon className='hover:opacity-80 mr-2   cursor-pointer bg-[#78C091] rounded-lg text-white  px-[8px] py-[10px]' icon={faPen} /> */}
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
                <button onClick={createPurchase} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
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

export default CreatePurchase

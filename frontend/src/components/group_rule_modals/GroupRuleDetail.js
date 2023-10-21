import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import groupRuleService from '../../services/group_rule.service'
import productService from '../../services/product.service'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import ReactPaginate from 'react-paginate'

const GroupRuleDetail = () => {

    const [currentGroupRule, setCurrentGroupRule] = useState(null)
    const [listRule, setListRule] = useState([])
    const [listProduct, setListProduct] = useState([])
    const {id} = useParams()
    const [currentRulePage, setCurrentRulePage] = useState(0)
    const [rulePageSize, setRulePageSize] = useState(5)
    const [rulePaginationData, setRulePaginationData] = useState({})
    const [currentProductPage, setCurrentProductPage] = useState(0)
    const [productPageSize, setProductPageSize] = useState(5)
    const [productPaginationData, setProductPaginationData] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        Promise.all([
            groupRuleService.getGroupRuleById(id),
        ])
        .then(([groupRuleRes])=>{
            const groupRuleData = groupRuleRes.data
            setCurrentGroupRule(prevState => ({ ...prevState, ...groupRuleData }));
        }) 
        .catch(err => console.log(err));

        fetchData()
        fetchProductData()
    }, [])

    
    const fetchData = async()=>{
        try{
            const params = {
                page: currentRulePage + 1,
                page_size: rulePageSize,
                group: id,
            };

            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/rule/`, {
                params: params,
                ...authHeader()
            });
            setListRule(res.data.results)
            setRulePaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleRulePageChange = ({selected}) =>{
        setCurrentRulePage(selected)
    };
    
    const handleChangeRulePerPage = (e)=>{
        setRulePageSize(parseInt(e.target.value, 10)); 
        setCurrentRulePage(0); 
    }

    const fetchProductData = async()=>{
        try{
            const params = {
                page: currentProductPage + 1,
                page_size: productPageSize,
                group_rule: id,
            };

            const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/product/`, {
                params: params,
                ...authHeader()
            });
            setListProduct(res.data.results)
            setProductPaginationData({
                count: res.data.count,
                previous: res.data.previous,
                next: res.data.next
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleProductPageChange = ({selected}) =>{
        setCurrentProductPage(selected)
    };
    
    const handleChangeProductPerPage = (e)=>{
        setProductPageSize(parseInt(e.target.value, 10)); 
        setCurrentProductPage(0); 
    }

    return (
    <div className='overflow-x-auto'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h2>Group Rule Detail</h2>
                </div>
                <div>
                    <Link to='/home/group_rule'>
                        <button className='rounded-lg px-2 py-3 w-[100px] bg-[#ff792e]  text-white no-underline font-bold hover:opacity-80'>
                            Back
                        </button>
                    </Link>

                </div>
            </div>

            <div className='bg-white rounded-lg mt-3'>
                <div className='p-[20px]'>
                    <div className=''>
                        <p className='text-gray-600 bg-light p-4 mb-0 text-uppercase font-bold'>Group Rule Info:</p>
                        <div className='flex items-center px-4 py-2'>
                            Name: {currentGroupRule && currentGroupRule.name}
                        </div>
                        <div className='flex items-center px-4 py-2'>
                            Description: {currentGroupRule && currentGroupRule.description}
                        </div>
                    </div>        
                </div>

                <div className='px-[20px]'>
                    <h4 className='text-gray-600 bg-light px-4 py-3 mb-0 text-uppercase font-bold'>
                        Rule List:
                    </h4>   
                </div>

                <div className='overflow-x-auto mt-[20px] px-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                #
                            </th>
                            <th className='w-[200px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Rule Name
                                </div>
                            </th>
                            <th className='w-[100.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Method
                                </div>
                            </th>
                            <th className='w-[150.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Source Location
                                </div>
                            </th>
                            <th className='w-[150.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Destination Location
                                </div>
                            </th>
                            

                        </tr>
                    </thead>
                    {
                        listRule.length > 0 ? (
                        <tbody>
                            {listRule.length > 0 && listRule.map((rule, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.name}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.types_of_rule === 'STRAIGHT' ? 'Take From Stock' : 'Pull from another'}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.source_location ? rule.source_location.name : "Don't have source location"}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {rule.destination_location ? rule.destination_location.name : "Don't have destination location"}
                                    </td>
                                    

                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={5} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>

                        )
                    }

                </table>
                </div>

                {listRule.length > 0 && (
                    <div className='md:flex md:items-center md:justify-between'>
                    <ReactPaginate
                        pageCount={Math.ceil(rulePaginationData.count / rulePageSize)}
                        onPageChange={handleRulePageChange}
                        initialPage={currentRulePage}
                        containerClassName="isolate inline-flex -space-x-px rounded-md "
                        activeLinkClassName='active bg-[#ff792e] text-white'
                        previousClassName='px-[0px]'
                        pageLinkClassName='relative ring-1 ring-inset ring-gray-300 no-underline z-10 inline-flex text-black items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        previousLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronLeft} />}
                        previousLinkClassName='relative no-underline inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        disabledLinkClassName='disable p-0 bg-gray-300 cursor-auto text-black'
                        nextLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronRight} />}
                        pageClassName='px-[0px]'
                        nextClassName='px-[0px]'
                        nextLinkClassName='relative no-underline inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    />


                    <div className='mr-3'>
                        <label className='mr-2'>Show items per page:</label>
                        <select value={rulePageSize} onChange={handleChangeRulePerPage} className='border border-gray-300'>
                            <option selected value='5'>
                                    5
                            </option>
                            <option value='10'>
                                    10
                            </option>
                            <option value='15'>
                                    15
                            </option>
                            <option value='20'>
                                    20
                            </option>
                        </select>
                    </div>
                </div>
                )}

        
            </div>

            <div className='bg-white rounded-lg mt-3'>
            <div className='p-[20px] mt-2'>
                    <h4 className='text-gray-600 bg-light px-4 py-3 mb-0 text-uppercase font-bold'>
                        Product List:
                    </h4>   
                </div>

                <div className='overflow-x-auto mt-[10px] px-[20px]'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                #
                            </th>
                            <th className='w-[150px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Product

                                </div>
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Barcode
                                </div>
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Price
                                </div>
                            </th>
                            <th className='w-[60.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                Unit
                            </th>
                            <th className='w-[150.875px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Stock on hand
                                </div>
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
                                        <span className='px-3 py-2 rounded-lg text-[#f62a48] bg-[#fdd4da] w-[100px]'>
                                            {product.barcode}
                                        </span>                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.price}$
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <span className='px-3 py-2 rounded-lg text-green-500 bg-[#cef2e3] w-[100px]'>
                                            {product.unit}
                                        </span>
                                    </td>
                                    <td className={product.quantity > 0 ? 'align-middle text-blue-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]' : 'align-middle text-red-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'}>
                                        {product.quantity > 0 ? product.quantity : 'Out of Stock'}
                                    </td>
    
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={6} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
                </div>
                {listProduct.length > 0 && (
                    <div className='md:flex md:items-center md:justify-between'>
                    <ReactPaginate
                        pageCount={Math.ceil(productPaginationData.count / productPageSize)}
                        onPageChange={handleProductPageChange}
                        initialPage={currentProductPage}
                        containerClassName="isolate inline-flex -space-x-px rounded-md "
                        activeLinkClassName='active bg-[#ff792e] text-white'
                        previousClassName='px-[0px]'
                        pageLinkClassName='relative ring-1 ring-inset ring-gray-300 no-underline z-10 inline-flex text-black items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        previousLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronLeft} />}
                        previousLinkClassName='relative no-underline inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        disabledLinkClassName='disable p-0 bg-gray-300 cursor-auto text-black'
                        nextLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronRight} />}
                        pageClassName='px-[0px]'
                        nextClassName='px-[0px]'
                        nextLinkClassName='relative no-underline inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    />


                    <div className='mr-3'>
                        <label className='mr-2'>Show items per page:</label>
                        <select value={productPageSize} onChange={handleChangeProductPerPage} className='border border-gray-300'>
                            <option selected value='5'>
                                    5
                            </option>
                            <option value='10'>
                                    10
                            </option>
                            <option value='15'>
                                    15
                            </option>
                            <option value='20'>
                                    20
                            </option>
                        </select>
                    </div>
                </div>
                )}
            </div>

        </div>
  )
}

export default GroupRuleDetail

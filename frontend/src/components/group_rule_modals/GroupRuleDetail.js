import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import groupRuleService from '../../services/group_rule.service'
import productService from '../../services/product.service'

const GroupRuleDetail = () => {

    const [currentGroupRule, setCurrentGroupRule] = useState(null)
    const [listRule, setListRule] = useState([])
    const [listProduct, setListProduct] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        Promise.all([
            groupRuleService.getGroupRuleById(id),
            productService.getAllProducts()
        ])
        .then(([groupRuleRes, productRes])=>{
            const groupRuleData = groupRuleRes.data
            const productData = productRes.data.results
            setCurrentGroupRule(prevState => ({ ...prevState, ...groupRuleData }));
            setListRule(groupRuleData.rules)

            const filteredData = productData.filter((product)=> product.group_rule && product.group_rule.id === currentGroupRule.id)
            setListProduct(filteredData)
        }) 
        .catch(err => console.log(err));
    }, [])

    return (
    <div className='overflow-x-auto'>
            
            <div className='px-[20px]'>
                <h2>Group Rule Detail</h2>
            </div>

            <div className='bg-white'>
                <div className='mt4 p-[20px]'>
                    <h4>Information</h4>
                    <p>Group Rule name: {currentGroupRule && currentGroupRule.name}</p>
                    <p>Description: {currentGroupRule && currentGroupRule.description}</p>
                </div>

                <div className='mt-2 p-[20px] '>
                    <h4>List Rule of Group Rule</h4>
                

                    <div className='overflow-x-auto'>
                    <table className='w-full mt-3 border-collapse'>
                        <thead className='bg-[#fafbfe] text-left'>
                            <tr>
                                <th className='p-[15px]'>
                                    <span>#</span>
                                </th>
                                <th className='p-[15px]'>
                                    <span>Rule Name</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Method</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Source Location</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Destination Location</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Group Rule</span>
                                </th>

                                <th className='p-[15px]'>
                                    <span>Action</span>
                                </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            { listRule ? listRule.map((rule, index)=>(
                                <tr className='border-b-[1px] border-solid text-left border-[#67748E] hover:bg-[#fafafa]'>
                                    <td className='p-[15px]'>{index+1}</td>                        
                                    <td className='p-[15px]'>{rule.name}</td>
                                    <td className='p-[15px]'>
                                        {rule.types_of_rule === 'STRAIGHT' ? 'Take From Stock' : 'Pull from another'}

                                    </td>
                                    <td className='p-[15px]'>
                                        {rule.source_location ? rule.source_location.name : "Don't have source location"}
                                    </td>
                                    <td className='p-[15px]'>
                                        {rule.destination_location ? rule.destination_location.name : "Don't have destination location"}
                                    </td>
                                    <td className='p-[15px]'>
                                        {currentGroupRule && currentGroupRule.name}
                                    </td>
                                    <td className='p-[15px]'>
                                        {/* <FontAwesomeIcon className='mr-2' icon={faEye} />
                                        <FontAwesomeIcon onClick={() => handleEditRule(rule.id)} className='mr-2' icon={faPen} />
                                        <FontAwesomeIcon onClick={() => handleDeleteRule(rule.id)} icon={faTrash} /> */}
                                    </td>                    
                                </tr>
                            ))
                            :
                            (
                                <div>
                                    Don't have rules
                                </div>
                            )
                            }

                        </tbody>


                    </table>
                </div>
                
                <div className='mt-2 p-[20px] '>
                    <h4>List Product Apply This Group Rule</h4>

                    <div className='overflow-x-auto'>
                    <table className='w-full mt-3 border-collapse'>
                        <thead className='bg-[#fafbfe] text-left'>
                            <tr>
                                <th scope="col">
                                    <span>#</span>
                                </th>
                                <th scope="col">
                                    <span>Product Image</span>
                                </th>

                                <th scope="col">
                                    <span>Product Name</span>
                                </th>

                                <th scope="col">
                                    <span>Barcode</span>
                                </th>

                                <th scope="col">
                                    <span>Unit</span>
                                </th>

                                <th scope="col">
                                    <span>Weight</span>
                                </th>

                                <th scope="col">
                                    <span>Price</span>
                                </th>

                                <th scope="col">
                                    <span>Stock on hand</span>
                                </th>

                                <th scope="col">
                                    <span>Action</span>
                                </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            { listProduct ? listProduct.map((product, index)=>(
                                <tr key={index} className='border-b-[1px] border-solid text-left border-[#67748E] hover:bg-[#fafafa]'>
                                    <td >{index+1}</td>
                                    <td >
                                        <img src={product.image} className='w-[70px]' alt='product-img'/>
                                    </td>
                                    <td >{product.name}</td>
                                    <td >{product.barcode}</td>
                                    <td >{product.unit}</td>
                                    <td >{product.weight}</td>
                                    <td >{product.price}</td>
                                    <td className={product.quantity > 0 ? 'p-[15px] font-bold text-blue-700' : 'p-[15px] font-bold text-red-700'}>{product.quantity > 0 ? product.quantity : 'Out of Stock'}</td>

                                    <td >
                                        {/* <FontAwesomeIcon onClick={()=>navigateToDetail(product.id)} className='mr-2 hover:opacity-80 cursor-pointer' icon={faEye} />
                                        <FontAwesomeIcon onClick={()=>handleEdit(product.id)} className='mr-2 text-blue-700 hover:opacity-80 cursor-pointer' icon={faPen} />
                                        <FontAwesomeIcon onClick={()=>handleDeleteProduct(product.id)} className='text-red-800 hover:opacity-80 cursor-pointer' icon={faTrash} /> */}
                                    </td>                    
                                </tr>
                            ))
                            :
                            (
                                <div>
                                    Don't have product
                                </div>
                            )
                            }

                        </tbody>


                    </table>
                </div>
                </div>

                </div>  
            </div>

        </div>
  )
}

export default GroupRuleDetail

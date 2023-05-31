import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AddModal from '../product_modals/AddModal';
import EditModal from '../product_modals/EditModal';
import { Modal, Button } from 'react-bootstrap';
import productService from '../../services/product.service'
const Product = () => {

    const [products, setProducts] = useState([]);
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductData, setSelectedProductData] = useState(null);

    const navigate = useNavigate()

    const handleShowAddModal =() => setShowAdd(true)
    const handleCloseAddModal = () => setShowAdd(false)
    // const handleShowEditModal = () => setShowEdit(true)
    // const handleCloseEditModal = () => setShowEdit(false)
    useEffect(() => {
        productService.getAllProducts()
        .then(res=>{
            setProducts(res.data.results);
        })
        .catch(err => console.log(err))
        
    }, [])

    const handleShowEditModal = (product) =>{
        setSelectedProduct(product.id);
        setSelectedProductData(product);
        setShowEdit(true);
    }

    const handleCloseEditModal = () =>{
        setSelectedProduct(null);
        setSelectedProductData(null);
        setShowEdit(false);
    }

    const handleDelete = (id) =>{
        productService.deleteProduct(id)
        .then(res=>console.log(res),
        window.location.reload())
        .catch(err=>console.log(err))
    }

    return (
            <>
            
            <div className=' bg-white px-4 pt-5 pb-4 rounded-sm border boder-gray-200 flex-1'>
                <div className='flex items-center justify-between p-5'>
                    <h1 className='text-green-600 font-bold text-2xl'> List of Products</h1>
                    <div>
                        <Button onClick={handleShowAddModal} className='px-2 py-3 bg-green-600 text-white hover:opacity-80 rounded-lg'>
                            Add new Product
                        </Button>
                    </div>
                </div>

                <div className='mt-5'> 
                    
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Weight
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className='col-span-2' class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index)=>(
                                <tr key={index} class="bg-white border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {product.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        <img className='w-[50px]' src={product.image} alt='product-image'/>
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.unit}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.weight}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        <Button onClick={() => handleShowEditModal(product)} className='bg-green-600 px-2 py-2 mr-2 rounded-lg hover:opacity-80'>Edit</Button>
                                        <Button onClick={() => handleDelete(product.id)} className='bg-green-600 px-2 py-2 rounded-lg hover:opacity-80'>Delete</Button>
                                    </td>
                                    
                                </tr>))
                                }
                            </tbody>
                        </table>
                    </div>

    ​
                </div>
            </div>

            <Modal show={showAdd} onHide={handleCloseAddModal}>
                    <Modal.Header>
                        <Modal.Title>
                                Add new product
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                            <AddModal />
                    </Modal.Body>
                    <Modal.Footer>
                            <Button onClick={handleCloseAddModal} variant='secondary'>
                                Close button
                            </Button>
                    </Modal.Footer>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEditModal}>
                <Modal.Header>
                    <Modal.Title>
                        Edit product
                    </Modal.Title>
                </Modal.Header>
                                    
                <Modal.Body>
                    {selectedProductData && <EditModal product={selectedProduct}/>}
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseEditModal} variant='secondary'>
                    Close button
                </Button>
            </Modal.Footer>                      
            </Modal>

            </>
  )
}

export default Product

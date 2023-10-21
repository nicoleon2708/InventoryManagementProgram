import React, { useEffect, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import productService from '../../services/product.service'
import { toast } from 'react-toastify'
const UpdateStockModal = () => {

    const [products, setProducts] = useState([]) 
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductImage, setSelectedProductImage] = useState(null)
    const [stock, setStock] = useState(null)


    useEffect(()=>{
        productService.getAllProducts()
        .then(res=>setProducts(res.data.results))
        .catch(err=>console.log(err))

        if(selectedProduct){
            productService.getSpecificProduct(selectedProduct)
            .then(res=>{
                setSelectedProductImage(res.data.image)
            })
            .catch(err=>console.log(err))
        }
    }, [])

    const updateStock = async(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('quantity', stock)
        productService.updateStockProduct(selectedProduct, data)
        .then(res=>{
                console.log(res);
                window.location.reload()
                toast('Update stock successful')
            }
        )
        .catch(err=>console.log(err))
    }

    const handleChange = (e)=>{
        setSelectedProduct(e.target.value)
    }


    return (
        <Form>
            <Form.Select value={selectedProduct} onChange={handleChange} aria-label="Default select example">
                <option selected>Choose a product</option>
                {products.map((product,index)=>(
                    <option key={index} value={product.id}>{product.name}</option>
                ))}
            </Form.Select>
            {selectedProduct && <img src={selectedProductImage} alt='Picture of product'/>}
            <Form.Group className='mt-3'>
                <Form.Control
                    type='number'
                    placeholder='Stock of product'
                    required
                    value={stock}
                    onChange={e=>setStock(e.target.value)}
                />
            </Form.Group>
                <Button className='mt-2' onClick={updateStock} variant="success" type='submit' block>
                    Update stock
                </Button>
        </Form>
    )
}

export default UpdateStockModal

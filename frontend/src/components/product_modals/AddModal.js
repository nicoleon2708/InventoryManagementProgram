import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import productService from '../../services/product.service'
const AddModal = () => {

    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')
    const [weight, setWeight] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = {
            name: name,
            unit: unit,
            weight: weight,
            quantity: quantity,
            price: price,
            image: image,
            description: description,
        }
        productService.createNewProduct(data)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    const handleFileChange = (e) =>{
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }


    return (
        <Form>

            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Name of product'
                    required
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Unit'
                    required
                    value={unit}
                    onChange={e=>setUnit(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Weight'
                    required
                    value={weight}
                    onChange={e=>setWeight(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Control
                    type='text'
                    placeholder='Quantity'
                    required
                    value={quantity}
                    onChange={e=>setQuantity(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control
                    type='text'
                    placeholder='Price'
                    required
                    value={price}
                    onChange={e=>setPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control
                    type='file'
                    accept='image/jpeg, image/png, image/gif'
                    name='image_url'
                    onChange={handleFileChange}
                />
                <img src={image}/>
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />
            </Form.Group>``
            <Button onClick={handleSubmit} variant="success" type='submit' block>
                Add new product

            </Button>
        </Form>
    )
}

export default AddModal

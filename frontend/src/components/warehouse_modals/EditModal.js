import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import warehouseService from '../../services/warehouses.service'
import authHeader from '../../services/auth-header'
import axios from 'axios'

const EditModal = ({warehouse}) => {

    const [nameWarehouse, setNameWarehouse] = useState('')
    const [addressWarehouse, setAddressWarehouse] = useState('')
    const [postalCodeWarehouse, setPostalCode] = useState('')
    const [cityWarehouse, setCityWarehouse] = useState('')
    const [districtWarehouse, setDistrictWarehouse] = useState('')
    const selectedWarehouseID = warehouse
    
    useEffect(()=>{
        warehouseService.getSpecificWarehouse(selectedWarehouseID)
        .then(res => {
            setNameWarehouse(res.data.name);
            setAddressWarehouse(res.data.address);
            setPostalCode(res.data.postal_code);
            setCityWarehouse(res.data.city);
            setDistrictWarehouse(res.data.district);
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = {
            name: nameWarehouse,
            address: addressWarehouse,
            postal_code: postalCodeWarehouse,
            district: districtWarehouse,
            city: cityWarehouse
        }
        axios.put(`http://127.0.0.1:8000/inventory/warehouse/${selectedWarehouseID}/update/`, data, authHeader())
        .then(res=>console.log(res),
        window.location.reload())
        .catch(err=>console.log(err))
    }

    return (
        <Form>
            <Form.Group >
                <Form.Control
                    type='text'
                    placeholder='Name of warehouse'
                    required
                    value={nameWarehouse}
                    onChange={e=>setNameWarehouse(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Address of warehouse'
                    required
                    value={addressWarehouse}
                    onChange={e=>setAddressWarehouse(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Postal code of warehouse'
                    required
                    value={postalCodeWarehouse}
                    onChange={e=>setPostalCode(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='District of warehouse'
                    required
                    value={districtWarehouse}
                    onChange={e=>setDistrictWarehouse(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Control
                    type='text'
                    placeholder='City of warehouse'
                    required
                    value={cityWarehouse}
                    onChange={e=>setCityWarehouse(e.target.value)}
                />
            </Form.Group>
            <Button onClick={handleSubmit} variant="success" type='submit' block>
                Edit warehouse

            </Button>
        </Form>
    )
}

export default EditModal

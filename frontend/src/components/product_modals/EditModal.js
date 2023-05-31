import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import locationService from '../../services/location.service'
import authHeader from '../../services/auth-header'
import axios from 'axios'

const EditModal = ({location}) => {

    const [addressLocation, setAddressLocation] = useState('')
    const [postalCodeLocation, setPostalCode] = useState('')
    const [cityLocation, setCityLocation] = useState('')
    const [districtLocation, setDistrictLocation] = useState('')
    const [warehouseOfLocation, setWarehouseOfLocation] = useState('')
    const [warehouse, setWarehouse] = useState([])

    const selectedLocationID = location
    
    useEffect(()=>{
        setWarehouse(JSON.parse(localStorage.getItem('warehouses')))
        locationService.getSpecificLocation(selectedLocationID)
        .then(res => {
            setAddressLocation(res.data.address);
            setPostalCode(res.data.postal_code);
            setCityLocation(res.data.city);
            setDistrictLocation(res.data.district);
            setWarehouseOfLocation(res.data.warehouse);
        })
        .catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        setWarehouseOfLocation(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = {
            address: addressLocation,
            postal_code: postalCodeLocation,
            district: districtLocation,
            city: cityLocation,
            warehouse: warehouseOfLocation,
        }
        axios.put(`http://127.0.0.1:8000/inventory/location/${selectedLocationID}/update/`, data, authHeader())
        .then(res=>console.log(res),
        window.location.reload())
        .catch(err=>console.log(err))
    }

    return (
        <Form>

            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Address of location'
                    required
                    value={addressLocation}
                    onChange={e=>setAddressLocation(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='Postal code of location'
                    required
                    value={postalCodeLocation}
                    onChange={e=>setPostalCode(e.target.value)}
                />
            </Form.Group>


            <Form.Group className='mt-3'>
                <Form.Control
                    type='text'
                    placeholder='District of location'
                    required
                    value={districtLocation}
                    onChange={e=>setDistrictLocation(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Control
                    type='text'
                    placeholder='City of location'
                    required
                    value={cityLocation}
                    onChange={e=>setCityLocation(e.target.value)}
                />
            </Form.Group>
            <Form.Select value={warehouseOfLocation} onChange={handleChange} aria-label="Default select example">
                <option selected>Choose a warehouse</option>
                {warehouse.map((warehouse,index)=>(
                    <option key={index} value={warehouse.id}>{warehouse.name}</option>
                ))}
            </Form.Select>
            <Button onClick={handleSubmit} variant="success" type='submit' block>
                Edit location

            </Button>
        </Form>
    )
}

export default EditModal

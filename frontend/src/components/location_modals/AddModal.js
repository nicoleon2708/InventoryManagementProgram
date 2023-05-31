import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import locationService from '../../services/location.service'
import warehouseService from '../../services/warehouses.service'
const AddModal = () => {

    const [warehouse, setWarehouse] = useState([])
    const [addressLocation, setAddressLocation] = useState('')
    const [postalCodeLocation, setPostalCode] = useState('')
    const [cityLocation, setCityLocation] = useState('')
    const [districtLocation, setDistrictLocation] = useState('')
    const [warehouseOfLocation, setWarehouseOfLocation] = useState('')
    const [warehouseMap, setWarehouseMap] = useState('')

    useEffect(()=>{
        setWarehouse(JSON.parse(localStorage.getItem('warehouses')))
    }, [])


    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = {
            address: addressLocation,
            postal_code: postalCodeLocation,
            district: districtLocation,
            city: cityLocation,
            warehouse: warehouseOfLocation
        }
        locationService.createNewLocation(data)
        .then(res=>console.log(res),
        window.location.reload())
        .catch(err=>console.log(err))
    }

    
    const handleChange = (e) => {
        setWarehouseOfLocation(e.target.value)
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
                Add new location

            </Button>
        </Form>
    )
}

export default AddModal

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import authHeader from '../../services/auth-header';
import EditModal from '../location_modals/EditModal';
import AddModal from '../location_modals/AddModal'
const Location = () => {
    const [locations, setLocations] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [addressLocation, setAddressLocation] = useState('')
    const [postalCodeLocation, setPostalCode] = useState('')
    const [cityLocation, setCityLocation] = useState('')
    const [districtLocation, setDistrictLocation] = useState('')
    const [warehouseOfLocation, setWarehouseOfLocation] = useState('')
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocationData, setSelectedLocationData] = useState(null);
    const [warehouseMap, SetWarehouseMap] = useState({});
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/inventory/location/', authHeader())
        .then(res => {
                console.log(res);
                setLocations(res.data.results);

        })
        .catch(err => console.log(err))

        // setWarehouse(JSON.parse(localStorage.getItem('warehouses')))
        const data = warehouse
        const warehousesMap = {};

        // Map company ID to company name
        data.forEach((warehouse) => {
            warehousesMap[warehouse.id] = warehouse.name;
        });
        SetWarehouseMap(warehousesMap)
        console.log(warehouseMap)
    }, [])

    const handleShowAddModal = () => setShowAdd(true)
    const handleCloseAddModal = () => setShowAdd(false)

    const handleDelete = (id) =>{
        axios.delete(`http://127.0.0.1:8000/inventory/location/${id}/delete/`, authHeader())
        .then(res => console.log(res),
        window.location.reload())
        .catch(err => console.log(err))
        
    }

    const handleShowEditModal = (location) => {
        setSelectedLocation(location.id)
        setSelectedLocationData(location);
        setShowEdit(true);
    }

    const handleCloseEditModal = () => {
        setSelectedLocation(null)
        setSelectedLocationData(null)
        setShowEdit(false)
    }

    const handleChange = (e) => {
        setWarehouseOfLocation(e.target.value)
    }

    return (
        <>
            <div className=' bg-white px-4 pt-5 pb-4 rounded-sm border boder-gray-200 flex-1'>
                <div className='flex items-center justify-between p-5'>
                    <h1 className='text-green-600 font-bold text-2xl'> List of Locations</h1>
                    <div>
                        <Button onClick={handleShowAddModal} className='px-2 py-3 bg-green-600 text-white hover:opacity-80 rounded-lg'>
                            Add new Location
                        </Button>
                    </div>
                </div>

                <div className='mt-5'> 
                    
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        District
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        City
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Postal code
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Belongs to
                                    </th>
                                    <th scope="col" className='col-span-2' class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {locations.map((location)=>(
                                <tr key={location.id} class="bg-white border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {location.address}
                                    </th>
                                    <td class="px-6 py-4">
                                        {location.district}
                                    </td>
                                    <td class="px-6 py-4">
                                        {location.city}
                                    </td>
                                    <td class="px-6 py-4">
                                        {location.postal_code}
                                    </td>
                                    <td class="px-6 py-4">
                                        {warehouseMap[location.warehouse] || 'No Warehouse'}
                                    </td>
                                    <td class="px-6 py-4">
                                        <Button onClick={() => handleShowEditModal(location)}  className="font-medium mr-4 text-blue-600 dark:text-blue-500 hover:underline">Edit</Button>
                                        <Button onClick={() => handleDelete(location.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Button>   
                                    </td>
                                </tr>))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
<Modal show={showAdd} onHide={handleCloseAddModal}>
    <Modal.Header>
        <Modal.Title>
                Add new warehouse
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
             Edit Location
         </Modal.Title>
     </Modal.Header>
                    
     <Modal.Body>
         {selectedLocation && <EditModal location={selectedLocation}/>}
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

export default Location

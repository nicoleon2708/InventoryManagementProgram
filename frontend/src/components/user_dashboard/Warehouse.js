import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AddModal from '../warehouse_modals/AddModal';
import EditModal from '../warehouse_modals/EditModal';
import { Modal, Button } from 'react-bootstrap';
import warehouseService from '../../services/warehouses.service';
const Warehouse = () => {

    const [warehouses, setWarehouses] = useState([]);

    const [nameWarehouse, setNameWarehouse] = useState('')
    const [addressWarehouse, setAddressWarehouse] = useState('')
    const [postalCodeWarehouse, setPostalCode] = useState('')
    const [cityWarehouse, setCityWarehouse] = useState('')
    const [districtWarehouse, setDistrictWarehouse] = useState('')
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedWarehouseData, setSelectedWarehouseData] = useState(null);

    const navigate = useNavigate()

    const handleShowAddModal =() => setShowAdd(true)
    const handleCloseAddModal = () => setShowAdd(false)
    // const handleShowEditModal = () => setShowEdit(true)
    // const handleCloseEditModal = () => setShowEdit(false)
    useEffect(() => {
  
                axios.get('http://127.0.0.1:8000/inventory/warehouse/', 
                    authHeader()
                )
                .then(res => {
                        setWarehouses(res.data.results);
                        localStorage.setItem('warehouses', JSON.stringify(res.data.results))
                    })
                .catch(err => console.log(err))
        
    }, [])

    const handleShowEditModal = (warehouse) =>{
        setSelectedWarehouse(warehouse.id);
        setSelectedWarehouseData(warehouse);
        setShowEdit(true);
    }

    const handleCloseEditModal = () =>{
        setSelectedWarehouse(null);
        setSelectedWarehouseData(null);
        setShowEdit(false);
    }

    const handleDelete = (id) =>{
        warehouseService.deleteWarehouse(id)
        .then(res=>console.log(res),
        window.location.reload())
        .catch(err=>console.log(err))
    }

    return (
            <>
            
            <div className=' bg-white px-4 pt-5 pb-4 rounded-sm border boder-gray-200 flex-1'>
                <div className='flex items-center justify-between p-5'>
                    <h1 className='text-green-600 font-bold text-2xl'> List of Warehouses</h1>
                    <div>
                        <Button onClick={handleShowAddModal} className='px-2 py-3 bg-green-600 text-white hover:opacity-80 rounded-lg'>
                            Add new Warehouse
                        </Button>
                    </div>
                </div>

                <div className='mt-5'> 
                    
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Warehouse name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Company
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Locations
                                    </th>
                                    <th scope="col" className='col-span-2' class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {warehouses.map((warehouse, index)=>(
                                <tr key={index} class="bg-white border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {warehouse.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {warehouse.company}
                                    </td>
                                    <td class="px-6 py-4">
                                        {warehouse.location}
                                    </td>
                                    <td class="px-6 py-4">
                                        <Button onClick={() => handleShowEditModal(warehouse)} className='bg-green-600 px-2 py-2 mr-2 rounded-lg hover:opacity-80'>Edit</Button>
                                        <Button onClick={() => handleDelete(warehouse.id)} className='bg-green-600 px-2 py-2 rounded-lg hover:opacity-80'>Delete</Button>
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
                        Edit warehouse
                    </Modal.Title>
                </Modal.Header>
                                    
                <Modal.Body>
                    {selectedWarehouseData && <EditModal warehouse={selectedWarehouse}/>}
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

export default Warehouse

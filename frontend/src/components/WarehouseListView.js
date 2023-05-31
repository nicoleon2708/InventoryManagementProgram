import React, {useState, useEffect} from 'react'
import axios from 'axios'
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import warehouseService from '../services/warehouses.service';

const WarehouseListView = () => {
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        warehouseService.getAllWarehouses().then(
            (res) => {
                setWarehouses(res.data.results);
            })
            .catch(error =>{
                console.log(error)
                // invalid token
                if (error.response && error.response.status == 403){
                    authService.logout();
                    navigate('/login')
                    window.location.reload()
                }
            })        
    }, [])

    return (
        <div className='w-full flex items-center justify-center h-screen bg-white'>
            <div className='mt-50 '>
                <h1 className='text-black'>Home Page</h1>
                <h1>List of warehouses</h1>
                <ul>
                    {warehouses.map((warehouse, index)=>(
                        <div key={index}>
                            <li>{warehouse.name}</li>
                        </div>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export default WarehouseListView

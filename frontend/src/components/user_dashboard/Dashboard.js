import { faUser, faWarehouse, faFileInvoiceDollar, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import partnerService from '../../services/partner.service'
import warehouseService from '../../services/warehouses.service'
import outcomeService from '../../services/outcome.service'
import transferService from '../../services/transfer.service'
import ChartComponent from './ChartComponent'
import axios from 'axios'
import authHeader from '../../services/auth-header'

const Dashboard = () => {
  const [partners, setPartners] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [transfers, setTransfers] = useState([])

  useEffect(()=>{
    partnerService.getAllPartner()
    .then(res=>setPartners(res.data.results))
    .catch(err=>console.log(err))

    warehouseService.getAllWarehouses()
    .then(res=>setWarehouses(res.data.results))
    .catch(err=>console.log(err))

    outcomeService.getAllOutcomes()
    .then(res=>setOutcomes(res.data.results))
    .catch(err=>console.log(err))

    fetchData()
  }, [])

  const fetchData = async()=>{
    try{
        const params = {
            is_import: false
        };
        const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/transfer/`, {
            params: params,
            ...authHeader()
        });
    
        setTransfers(res.data.results);
            }
    catch(err){
        console.log(err)
    }
}
  return (
    <div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className='bg-[#ffb821] text-white font-bold rounded-lg flex items-center justify-between p-[10px]'>
          <div>
              <p>{partners && partners.length}</p>
              <p>Partners</p>
          </div>

          <div>
              <FontAwesomeIcon className='w-[50px]' icon={faUser} />
          </div>
        </div>
        <div className='bg-[#00c6ff] text-white font-bold rounded-lg flex items-center justify-between p-[10px]'>
          <div>
              <p>{warehouses && warehouses.length}</p>
              <p>Warehouses</p>
          </div>

          <div>
              <FontAwesomeIcon className='w-[50px]' icon={faWarehouse} />                            
          </div>
        </div>
        <div className='bg-[#6f42c1] text-white font-bold rounded-lg flex items-center justify-between p-[10px]'>
          <div>
              <p>{outcomes && outcomes.length}</p>
              <p>Sale invoices</p>
          </div>

          <div>
              <FontAwesomeIcon className='w-[50px]' icon={faFileInvoiceDollar} />        
          </div>
        </div>
        <div className='bg-[#0ac074] text-white font-bold rounded-lg flex items-center justify-between p-[10px]'>
          <div>
              <p>{transfers && transfers.length}</p>
              <p>Transfer Invoices</p>
          </div>

          <div>
            <FontAwesomeIcon className='w-[50px]' icon={faTruckArrowRight} />        
          </div>
        </div>
      </div>
      <ChartComponent/>


    </div>
  )
}

export default Dashboard

import React, { useEffect, useState } from 'react'
import {Bar, Line} from 'react-chartjs-2'
import 'chart.js/auto'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import { json } from 'react-router-dom'

const ChartComponent = () => {

    const [outcomeData, setOutcomeData] = useState([])
    const [outcomeLabel, setOutcomeLabel] = useState('')
    const [transferData, setTransferData] = useState([])
    const [transferLabel, setTransferLabel] = useState('')
    const [selectedYearData, setSelectedYearData] = useState(2023)
    const [monthlyOutcomeData, setMonthlyOutcomeData] = useState([])
    const [monthlyTransferData, setMonthlyTransferData] = useState([])

    useEffect(()=>{
      getMonthlyOutcomeData(selectedYearData)
      getMonthlyTransferData(selectedYearData)
    }, [selectedYearData])

    const getMonthlyOutcomeData = async(selectedYear)=>{
        try{
          const outcome_res = await axios.get('http://127.0.0.1:8000/inventory/outcome/', authHeader())
          const outcome_parsed = outcome_res.data.results.map((outcome)=>({
            id: outcome.id,
            order_detail: outcome.order_detail,
            partner: outcome.partner,
            status: outcome.status,
            total_price: outcome.total_price,
            user: outcome.user,
            warehouse: outcome.warehouse,
            created_date: new Date(outcome.created_date)
          }));
          setOutcomeData(outcome_parsed)
          const filteredData = outcome_parsed.filter((outcome) => outcome.created_date.getFullYear() == selectedYear)
          const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const monthData = filteredData.filter((outcome) => outcome.created_date.getMonth() === i)
            const monthTotal = monthData.reduce((total, outcome) => total + outcome.total_price, 0)
            return monthData.length
          })
          setMonthlyOutcomeData(monthlyData)
          setOutcomeLabel(`Partner's Outcome`)    
        }catch(err){
          console.log(err)
        }
    }

    const getMonthlyTransferData = async(selectedYear)=>{
      try{
        const transfer_res = await axios.get('http://127.0.0.1:8000/inventory/transfer/', authHeader())
        const transfer_parse = transfer_res.data.results.map((transfer)=>({
          id: transfer.id,
          transfer_detail: transfer.transfer_detail,
          outcome: transfer.outcome,
          source_location: transfer.source_location,
          destination_location: transfer.destination_location,
          created_date: new Date(transfer.created_date)
        }));
        setTransferData(transfer_parse)
        const filteredData = transfer_parse.filter((transfer) => transfer.created_date.getFullYear() == selectedYearData)
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
          const monthData = filteredData.filter((transfer) => transfer.created_date.getMonth() === i)
          return monthData.length
        })
        setMonthlyTransferData(monthlyData)
        setTransferLabel(`Transfers`)    
      }catch(err){
        console.log(err)
      }
  }


    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: outcomeLabel,
            data: monthlyOutcomeData,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: transferLabel,
            data: monthlyTransferData,
            backgroundColor: 'rgba(255, 200, 192, 0.8)',
            borderColor: 'rgba(255, 200, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

  
    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
    };
  return (  
    <div>
      <div className='bg-white mt-[30px] p-[10px]'>
        <div className='flex items-center justify-between'>
          <h3>Chart</h3>
          <select className='border border-gray-400 py-1 px-2 outline-none' value={selectedYearData} onChange={(e)=>setSelectedYearData(e.target.value)}>
            <option value={2023} selected>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
            <option value={2018}>2018</option>

          </select>

        </div>
        
        <div className='flex items-center'>
          <Bar data={data} options={options}/>  
        </div>

      </div>

    </div>
    )
}


export default ChartComponent

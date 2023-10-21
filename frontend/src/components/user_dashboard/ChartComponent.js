import React, { useEffect, useState } from 'react'
import {Bar, Line} from 'react-chartjs-2'
import 'chart.js/auto'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPen, faTrash, faChevronLeft, faChevronRight, faFilter, faCaretDown, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

const ChartComponent = () => {

    const [outcomeData, setOutcomeData] = useState([])
    const [outcomeLabel, setOutcomeLabel] = useState('')
    const [transferData, setTransferData] = useState([])
    const [transferLabel, setTransferLabel] = useState('')
    const [selectedYearData, setSelectedYearData] = useState(2023)
    const [monthlyOutcomeData, setMonthlyOutcomeData] = useState([])
    const [monthlyTransferData, setMonthlyTransferData] = useState([])
    const [nearlyOutOfStockProductList, setNearlyOutOfStockProductList] = useState([])
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5)

    useEffect(()=>{
      getMonthlyOutcomeData(selectedYearData)
      getMonthlyTransferData(selectedYearData)
      fetchData()
    }, [selectedYearData])

    const getMonthlyOutcomeData = async(selectedYear)=>{
        try{
          const outcome_res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/outcome/`, authHeader())
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
            return monthTotal
          })
          setMonthlyOutcomeData(monthlyData)
          setOutcomeLabel(`Partner's Outcome`)    
        }catch(err){
          console.log(err)
        }
    }

    const getMonthlyTransferData = async(selectedYear)=>{
      try{
        const transfer_res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/transfer/`, authHeader())
        const purchase_res = transfer_res.data.results.filter((transfer) => transfer.is_import === true)
        const transfer_parse = purchase_res.map((transfer)=>({
          id: transfer.id,
          transfer_detail: transfer.transfer_detail,
          // outcome: transfer.outcome,
          source_location: transfer.source_location,
          destination_location: transfer.destination_location,
          created_date: new Date(transfer.created_date),
          total_price: transfer.total_price
        }));
        console.log(transfer_parse)
        setTransferData(transfer_parse)
        const filteredData = transfer_parse.filter((transfer) => transfer.created_date.getFullYear() == selectedYearData)
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
          const monthData = filteredData.filter((transfer) => transfer.created_date.getMonth() === i)
          const monthTotal = monthData.reduce((total, transfer) => total + transfer.total_price, 0)

          return monthTotal
        })
        setMonthlyTransferData(monthlyData)
        console.log(monthlyTransferData)
        setTransferLabel(`Purchase`)    
      }catch(err){
        console.log(err)
      }
  }

  const fetchData = async() => {
    try{          
        const params = {
            page: currentPage + 1,
            page_size: pageSize,
            quantity_lte: 10,
        };
  
        const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/inventory/product/`, {
            params: params,
            ...authHeader()
        });
        setNearlyOutOfStockProductList(res.data.results)
        setPaginationData({
            count: res.data.count,
            previous: res.data.previous,
            next: res.data.next
        })
    }
    catch(error){
        console.log(error)
    }
}

const handlePageChange = ({selected}) =>{
  setCurrentPage(selected)
};

const handleChangeItemPerPage = (e)=>{
  setPageSize(parseInt(e.target.value, 10)); 
  setCurrentPage(0); 
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
      <div className='bg-white rounded-lg mt-[30px] p-[10px]'>
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

      <div className='bg-white  mt-[20px]'>
        <h3 className='px-[20px] mt-4'>
          Product Stock Alert
        </h3>
      <div className='overflow-x-auto px-[20px] mt-2'>
                <table className='w-full clear-both mx-auto border-collapse border-spacing-0 overflow-hidden text-gray-900 border-[1px] border-solid border-[#dcdfe8] rounded-xl'>
                    <thead className='bg-white text-uppercase'>
                        <tr>
                            <th className='w-[40px] text-center capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                #
                            </th>
                            <th className='w-[150px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Product

                                </div>
                            </th>
                            <th className='w-[75.1667px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Barcode
                                </div>
                            </th>
                            <th className='w-[82.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>        
                                    Price
                                </div>
                            </th>
                            <th className='w-[60.5px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                Unit
                            </th>
                            <th className='w-[150.875px] capitalize text-base leading-5 bg-[#fafbfe] text-[#110A57] font-bold px-[15px] py-[20px] border-[0px]'>
                                <div className='flex justify-between'>
                                    Stock on hand
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        nearlyOutOfStockProductList.length > 0 ? (
                        <tbody>
                            {nearlyOutOfStockProductList.length > 0 && nearlyOutOfStockProductList.map((product, index) => (
                                <tr key={index} className='bg-white'>
                                    <td className='text-center align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {index + 1}
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <div className='flex items-center'>
                                            <img className='h-12 w-12 leading-[50px] min-w-[50px] mr-3 rounded-lg' src={product.image} alt='product-image'/>
                                            <div>
                                                {product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <span className='px-3 py-2 rounded-lg text-[#f62a48] bg-[#fdd4da] w-[100px]'>
                                            {product.barcode}
                                        </span>                                    
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        {product.price}$
                                    </td>
                                    <td className='align-middle text-gray-900 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'>
                                        <span className='px-3 py-2 rounded-lg text-green-500 bg-[#cef2e3] w-[100px]'>
                                            {product.unit}
                                        </span>
                                    </td>
                                    <td className={product.quantity > 0 ? 'align-middle text-blue-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]' : 'align-middle text-red-700 px-[15px] py-[20px] border-[0px] border-b-[1px] border-solid border-[#dcdfe8]'}>
                                        {product.quantity > 0 ? product.quantity : 'Out of Stock'}
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                        )
                        :(
                            <td colSpan={7} className='p-[10px] text-center text-[#6c757d] '>
                                Don't have data
                            </td>
                        )
                    }

                </table>
                </div>

                {nearlyOutOfStockProductList.length > 0 && (
                    <div className='md:flex md:items-center md:justify-between'>
                    <ReactPaginate
                        pageCount={Math.ceil(paginationData.count / pageSize)}
                        onPageChange={handlePageChange}
                        initialPage={currentPage}
                        containerClassName="isolate inline-flex -space-x-px rounded-md "
                        activeLinkClassName='active bg-[#ff792e] text-white'
                        previousClassName='px-[0px]'
                        pageLinkClassName='relative ring-1 ring-inset ring-gray-300 no-underline z-10 inline-flex text-black items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        previousLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronLeft} />}
                        previousLinkClassName='relative no-underline inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        disabledLinkClassName='disable p-0 bg-gray-300 cursor-auto text-black'
                        nextLabel={<FontAwesomeIcon className='w-5 h-5 hover:text-[#ff792e]' icon={faChevronRight} />}
                        pageClassName='px-[0px]'
                        nextClassName='px-[0px]'
                        nextLinkClassName='relative no-underline inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    />


                    <div className='pr-[5px]'>
                        <label className='mr-2'>Show items per page:</label>
                        <select value={pageSize} onChange={handleChangeItemPerPage} className='border border-gray-300'>
                            <option selected value='5'>
                                    5
                            </option>
                            <option value='10'>
                                    10
                            </option>
                            <option value='15'>
                                    15
                            </option>
                            <option value='20'>
                                    20
                            </option>
                        </select>
                    </div>
                </div>
                )}
      </div>

    </div>
    )
}


export default ChartComponent

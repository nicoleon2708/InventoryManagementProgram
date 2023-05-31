import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Warehouse from './Warehouse'
import { Routes, Route } from 'react-router-dom'
import Location from './Location'
import Product from './Product'
import Dashboard from './Dashboard'

const Home = () => {

  return (
      <div className='flex flex-row bg-neutral-100 min-h-screen pt-20 min-w-screen overflow-hidden'>
          <Sidebar/>
          <Routes>
            <Route path='' element={<Dashboard/>} exact/>
            <Route path="/warehouse" element={<Warehouse/>}/>
            <Route path='/location' element={<Location/>}/>
            <Route path='/product' element={<Product/>}/>
          </Routes>

      </div>
    )
}

export default Home

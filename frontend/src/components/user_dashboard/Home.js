import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Warehouse from './Warehouse'
import { Routes, Route } from 'react-router-dom'
import Location from './Location'
import Product from './Product'
import Stock from './Stock'
import Dashboard from './Dashboard'
import ProductDetail from './ProductDetail'
import Rule from './Rule'
import AddWarehouse from '../warehouse_modals/AddWarehouse'
import AddProduct from '../product_modals/AddProduct'
import AddLocation from '../location_modals/AddLocation'
import RuleTest from './Rule'
import AddRule from '../rule_modals/AddRule'
import AddStockLocation from '../location_stock_modals/AddStockLocation'
import GroupRule from './GroupRule'
import EditProduct from '../product_modals/EditProduct'
import EditWarehouse from '../warehouse_modals/EditWarehouse'
import EditLocation from '../location_modals/EditLocation'
import EditRule from '../rule_modals/EditRule'
import AddGroupRule from '../group_rule_modals/AddGroupRule'
import EditGroupRule from '../group_rule_modals/EditGroupRule'
import Outcome from './Outcome'
import OutcomeDetail from '../outcome_modals/OutcomeDetail'
import CreateOutcome from '../outcome_modals/CreateOutcome'
import Transfer from './Transfer'
import Partner from './Partner'
import AddPartner from '../partner_modals/AddPartner'
import Notification from './Notification'
import UserProfile from './UserProfile'
import EditPartner from '../partner_modals/EditPartner'
import TransferDetail from '../transfer_modals/TransferDetail'
import WarehouseDetail from '../warehouse_modals/WarehouseDetail'
import LocationDetail from '../location_modals/LocationDetail'
import PartnerDetail from '../partner_modals/PartnerDetail'
import GroupRuleDetail from '../group_rule_modals/GroupRuleDetail'
import RuleDetail from '../rule_modals/RuleDetail'
import Purchase from './Purchase'
import CreatePurchase from '../purchase_modals/CreatePurchase'
import PurchaseDetail from '../purchase_modals/PurchaseDetail'

const Home = () => {

  return (
      <div className=' flex flex-row bg-neutral-100 min-h-screen pt-20 min-w-screen overflow-hidden'>
          {/* <Sidebar/> */}
          <div className='p-10 w-full'>
            <Routes>
              <Route path='' element={<Dashboard/>} exact/>
              <Route path='/warehouse/add' element={<AddWarehouse/>}/>
              <Route path='/warehouse' element={<Warehouse/>}/>   
              <Route path='/warehouse/:id' element={<WarehouseDetail/>}/>
              <Route path="/warehouse/:id/edit"  element={<EditWarehouse/>}/>
              <Route path='/location/add' element={<AddLocation/>}/>     
              <Route path='/location' element={<Location/>}/>
              <Route path="/location/:id" element={<LocationDetail/>}/>
              <Route path='/location/:id/edit' element={<EditLocation/>}/>
              <Route path='/product/add' element={<AddProduct/>}/>
              <Route path='/product/:id/edit' element={<EditProduct/>}/>
              <Route path='/product' element={<Product/>}/>
              <Route path='/product/:pk' element={<ProductDetail/>}/>
              <Route path='/stock/add' element={<AddStockLocation/>}/>
              <Route path='/stock' element={<Stock/>}/>
              <Route path='/rule/add' element={<AddRule/>}/>
              <Route path='/rule' element={<Rule/>}/>
              <Route path='/rule/:id/edit' element={<EditRule/>}/>
              <Route path="/rule/:id" element={<RuleDetail/>}/>
              <Route path='/group_rule' element={<GroupRule/>}/>
              <Route path='/group_rule/add' element={<AddGroupRule/>}/>
              <Route path='/group_rule/:id/edit' element={<EditGroupRule/>}/>
              <Route path="/group_rule/:id" element={<GroupRuleDetail/>}/>
              <Route path='/outcome' element={<Outcome/>}/>
              <Route path='/outcome/:id' element={<OutcomeDetail/>}/>
              <Route path='/outcome/create' element={<CreateOutcome/>}/>
              <Route path='/transfer' element={<Transfer/>}/>
              <Route path='/transfer/:id' element={<TransferDetail/>}/>
              <Route path="/purchase" element={<Purchase/>}/>
              <Route path='/purchase/add' element={<CreatePurchase/>}/>
              <Route path="/purchase/:id" element={<PurchaseDetail/>}/>
              <Route path='/partner' element={<Partner/>}/>
              <Route path='/partner/add' element={<AddPartner/>}/>
              <Route path='/partner/:id/edit' element={<EditPartner/>}/>
              <Route path='/partner/:id' element={<PartnerDetail/>}/>
              <Route path='/notification' element={<Notification/>}/>
              <Route path="/profile" element={<UserProfile/>}/>
            </Routes>
          </div>
      </div>
    )
}

export default Home

import React, { useEffect } from "react";
import ProtectedRoute from '../src/components/auth/ProtectedRoute'
import Index from "./components/home/Index";
import Footer from "./components/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/user_dashboard/Home";
import PasswordRecovery from "./components/auth/PasswordRecovery";
import { Routes, Route } from 'react-router-dom'
import EmailVerification from "./components/auth/EmailVerification";
import Warehouse from "./components/user_dashboard/Warehouse";
import Product from "./components/user_dashboard/Product";
import ProductDetail from "./components/user_dashboard/ProductDetail";
import Location from './components/user_dashboard/Location'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from "./components/auth/ResetPassword";
import SendingConfirm from "./components/auth/SendingConfirm";
import ConfirmVerification from "./components/auth/ConfirmVerification";
import Stock from "./components/user_dashboard/Stock";
import SidebarNavbar from "./components/SidebarNavbar";
import Rule from "./components/user_dashboard/Rule";
import GroupRule from "./components/user_dashboard/GroupRule";
import AddRule from "./components/rule_modals/AddRule";
import AddProduct from "./components/product_modals/AddProduct";
import AddStockLocation from "./components/location_stock_modals/AddStockLocation";
import AddLocation from "./components/location_modals/AddLocation";
import AddWarehouse from "./components/warehouse_modals/AddWarehouse";
import EditProduct from "./components/product_modals/EditProduct";
import EditWarehouse from "./components/warehouse_modals/EditWarehouse";
import EditLocation from "./components/location_modals/EditLocation";
import EditRule from "./components/rule_modals/EditRule";
import AddGroupRule from "./components/group_rule_modals/AddGroupRule";
import EditGroupRule from "./components/group_rule_modals/EditGroupRule";
import Outcome from "./components/user_dashboard/Outcome";
import OutcomeDetail from "./components/outcome_modals/OutcomeDetail";
import CreateOutcome from "./components/outcome_modals/CreateOutcome";
import Transfer from "./components/user_dashboard/Transfer";
import Partner from "./components/user_dashboard/Partner";
import AddPartner from "./components/partner_modals/AddPartner";
import Notification from "./components/user_dashboard/Notification";
import UserProfile from "./components/user_dashboard/UserProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPartner from "./components/partner_modals/EditPartner";
import TransferDetail from "./components/transfer_modals/TransferDetail";
import WarehouseDetail from "./components/warehouse_modals/WarehouseDetail";
import LocationDetail from "./components/location_modals/LocationDetail";
import PartnerDetail from "./components/partner_modals/PartnerDetail";
import GroupRuleDetail from "./components/group_rule_modals/GroupRuleDetail";
import RuleDetail from "./components/rule_modals/RuleDetail";
import Purchase from "./components/user_dashboard/Purchase";
import CreatePurchase from "./components/purchase_modals/CreatePurchase";
import PurchaseDetail from "./components/purchase_modals/PurchaseDetail";
import StockDetail from "./components/stock_modals/StockDetail";


function App() {
  const user = localStorage.getItem('token');

  return (
    <>
    <div className="font-Karla max-w-screen-2xl text-base">
      <ToastContainer />
      <div>
      <SidebarNavbar/>
      <div className={!user ? '': 'sm:ml-64'}>

      <Routes>
        <Route path='/' element={<Index />} />
        <Route exact path='/home' element={<ProtectedRoute/>}>
            <Route exact path='/home' element={<Home/>}>
              <Route path="/home/warehouse" element={<Warehouse/>}>
                <Route path="/home/warehouse/add"  element={<AddWarehouse/>}/>
                <Route path='/home/warehouse/:id' element={<WarehouseDetail/>}/>
                <Route path="/home/warehouse/:id/edit"  element={<EditWarehouse/>}/>
              </Route>
              <Route path="/home/location"  element={<Location/>}>
                <Route path="/home/location/add"  element={<AddLocation/>}/>
                <Route path='/home/location/:id/edit' element={<EditLocation/>}/>
                <Route path="/home/location/:id" element={<LocationDetail/>}/>

              </Route>
              <Route path="/home/product" element={<Product/>}>
                  <Route path="/home/product/add" element={<AddProduct/>} />
              </Route>
              <Route path="/home/product/:id" element={<ProductDetail />}>
                <Route path="/home/product/:id/edit" element={<EditProduct/>} />
              </Route>
              <Route path='/home/stock' element={<Stock/>}>
                  <Route path='/home/stock/add' element={<AddStockLocation/>} />
                  <Route path="/home/stock/:id" element={<StockDetail/>}/>
              </Route>
              <Route path="/home/rule" element={<Rule/>}>
                <Route path='/home/rule/add' element={<AddRule/>}/>
                <Route path='/home/rule/:id/edit' element={<EditRule/>}/>
                <Route path="/home/rule/:id" element={<RuleDetail/>}/>

              </Route>
              <Route path='/home/group_rule' element={<GroupRule/>}>
                <Route path='/home/group_rule/add' element={<AddGroupRule/>}/>
                <Route path='/home/group_rule/:id/edit' element={<EditGroupRule/>}/>
                <Route path="/home/group_rule/:id" element={<GroupRuleDetail/>}/>
              </Route>

              <Route path='/home/outcome' element={<Outcome/>}>
                <Route path='/home/outcome/:id' element={<OutcomeDetail/>}/>
                <Route path='/home/outcome/add' element={<CreateOutcome/>}/>
              </Route>

              <Route path='/home/transfer' element={<Transfer/>}>
                <Route path='/home/transfer/:id' element={<TransferDetail/>}/>

              </Route>

              <Route path='/home/partner' element={<Partner/>}>
                <Route path='/home/partner/add' element={<AddPartner/>}/>
                <Route path='/home/partner/:id/edit' element={<EditPartner/>}/>
                <Route path='/home/partner/:id' element={<PartnerDetail/>}/>
              </Route>

              <Route path="/home/purchase" element={<Purchase/>}>
                <Route path='/home/purchase/add' element={<CreatePurchase/>}/>
                <Route path="/home/purchase/:id" element={<PurchaseDetail/>}/>
              </Route>

              <Route path="/home/notification" element={<Notification/>}/>
              <Route path="/home/profile" element={<UserProfile/>}/>

            </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recovery-password' element={<PasswordRecovery/>}/>
        <Route path='/verification-confirm' element={<ConfirmVerification/>}/>
        <Route path='/email-verification/:token' element={<EmailVerification />} />
        <Route path='/reset-password/:uidb64/:token' element={<ResetPassword />} />
        <Route path='/sending-confirm' element={<SendingConfirm />} />


      </Routes>
      </div>

      </div>
      {!user && <Footer />}
    </div>
    </>

  );
}

export default App;

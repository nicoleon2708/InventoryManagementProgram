import React, {useEffect, useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartFlatbed, faSquarePlus, faTruckArrowRight,faBoxesStacked, faWarehouse, faBox, faLocationDot, faFileInvoiceDollar, faBell, faArrowAltCircleRight, faArrowRightFromBracket, faCirclePlus, faUser, faGear, faCircleDollarToSlot} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import authHeader from '../services/auth-header'
import notificationService from '../services/notification.service'
import jwtDecode from "jwt-decode";
import authService from '../services/auth.service'


const SidebarNavbar = () => {

    const [currentUser, setCurrentUser] = useState(null)
    const user = localStorage.getItem('token');
    const [sidebar, setSidebar] = useState(false)
    const [listNotification, setListNotification] = useState([])
    const webSocket = new WebSocket(
        'ws://127.0.0.1:8000/ws/notifications/'
    )

    const navLinkStyles = ({ isActive }) => {
        return{
            backgroundColor: isActive ? '#1b2850' : 'white',
            color: isActive ? 'white': '#1F2937'
        }
    }


    useEffect(()=>{
        notificationService.getAllNotifications()
        .then(res=>setListNotification(res.data.results))
        .catch(err=>console.log(err))

        axios.get('http://127.0.0.1:8000/auth/user/info/', authHeader())
        .then(res=>setCurrentUser(res.data))
        .catch(err=>console.log(err))

        webSocket.onopen = function(e) {
            if(user){
                const decode_token = jwtDecode(user)
                const user_id = decode_token.user_id
                console.log(user_id)
                webSocket.send(JSON.stringify({
                    'message': 'From Client',
                    'user_id': user_id
                }));
                
                webSocket.onmessage = function(e) {
                    const newNotification = JSON.parse(e.data)
                    setListNotification(prevListNotifications => [
                        ...prevListNotifications,
                        newNotification
                    ])
                };
                webSocket.onclose = function(e){
                    console.log('Closed')
                }
            }

        }

    }, [])

    const [notiState, setNotiState] = useState(false)
    const [userState, setUserState] = useState(false)
    const handleChangeStateNoti = (e) => {
        e.preventDefault()
        setNotiState(!notiState)
    }
    const handleUserState = (e) => {
        e.preventDefault()
        setUserState(!userState)
    }
    const handleChangeSidebar = (e)=>{
        e.preventDefault()
        setSidebar(!sidebar)
    }

    const handleLogout = (e) =>{
        e.preventDefault()
        if(authService.logout()){
            window.location.reload()
        }
        
    }

    const markNotiAsRead = (id) =>{
        notificationService.markNotificationAsRead(id)
        .then(res=>window.location.reload())
        .catch(err=>console.log(err))
    }

    return (
    <> 
        <nav class="fixed h-[80px] top-0 z-50 w-full bg-white border-b border-gray-200 text-gray-800">
        <div class="">
            <div class="flex items-center justify-between px-3 py-3 md:p-0">
                <div class="flex items-center justify-start">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="cursor-pointer inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-[#1b2850] focus:outline-none focus:ring-2 focus:ring-gray-200  ">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" onClick={handleChangeSidebar} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <a class="flex no-underline ml-2 md:mr-24">
                    <span class="self-center cursor-pointer text-xl no-underline font-semibold sm:text-2xl whitespace-nowrap text-[#ff792e]">
                        <FontAwesomeIcon icon={faCartFlatbed} />
                        FastTransfer
                    </span>
                    </a>
                </div>
                {!user && 
                    <div className='flex items-center'>
                    <ul className='hidden md:flex pt-2 p-0'>
                        <li className='hover:text-white font-bold cursor-pointer'>Home</li>
                        <li className='hover:text-white font-bold cursor-pointer'>About</li>
                        <li className='hover:text-white font-bold cursor-pointer'>Features</li>
                        <li className='hover:text-white font-bold cursor-pointer'>Pricing</li>
                    </ul>
                    </div>
                }




                <div class="flex items-center">
                    {user ? (
                        <>
                        <div className='relative'>
                            <button onClick={handleChangeStateNoti} class="cursor-pointer bg-[#f6f7f8] z-10 block rounded-md p-2 focus:outline-none">
                            <span class="[&>svg]:w-5">
                                <svg width="24" className='text-[#67748E]' height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell "><g><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></g></svg>
                                </span>
                                <span
                                    class={listNotification.filter(notification => !notification.is_read).length > 0 ? "absolute -mt-4 ml-2.5 rounded-full bg-[#ff792e] px-[0.35em] py-[0.15em] top-[18px] right-[5px] text-[0.6rem] font-bold leading-none text-white" : "hidden"}
                                    >
                                        {listNotification && listNotification.filter(notification => !notification.is_read).length}
                                    </span>
                            </button>
                            <div class={notiState ? "absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20 w-[300px]" : 'hidden'}>
                                    <div className='flex items-center justify-between px-[10px] pt-[10px] border-b-[1px] border-[#f2f2f2] border-solid'>
                                        <p>Notifications</p>
                                        <p className='text-red-700 cursor-pointer'>Clear all</p>
                                    </div>
                                    <div className=' overflow-y-auto h-[300px]'>
                                        {listNotification ? listNotification.map((notification, index)=>(
                                            <div onClick={(e)=>markNotiAsRead(notification.id)} className={notification.is_read == false ? 'flex items-center border-b-[1px] cursor-pointer border-[#f2f2f2] border-solid  px-4 py-3 hover:bg-gray-100' : 'flex items-center order-b  -mx-2  px-4 py-3 bg-white'}>
                                                <FontAwesomeIcon className='text-green-700 mr-2' icon={faCirclePlus} />                                                
                                                <a class="no-underline flex items-center justify-center">
                                                    <p class="text-gray-600 text-sm mx-2">
                                                        <span class="font-bold" href="#">{notification.message}</span>
                                                    </p>
                                                </a>
                                            </div>
                                        ))
                                        
                                        :
                                        (
                                            <h3>Currently don't have notifications yet</h3>
                                        )
                                        }
                                    </div>
                                    <a href="home/notification" class="no-underline block hover:text-[#ff792e] text-gray-600 text-center font-bold py-2 border-t-[1px] border-[#f2f2f2] border-solid">See all notifications</a>
                            </div>
                            {/* <div className= 'absolute text-white bg-[# ] px-[7px] rounded-full bottom-5 left-5' : 'hidden'}>
                                
                            </div> */}
                        </div>
                        <div class="flex items-center ml-3 relative">
                            <div>
                                <button onClick={handleUserState} type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 " aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="w-8 h-8 rounded-full" src={currentUser && currentUser.image} alt="user photo" />
                                </button>
                            </div>
                            <div class={userState ? "z-50 absolute top-4 right-0 w-[300px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow " : 'hidden'} id="dropdown-user">
                                <div class="px-4 py-3 flex items-center" role="none">
                                    <img class="w-10 h-10 rounded-full" src={currentUser && currentUser.image} alt="user photo" />
                                    <div className='flex flex-col ml-[20px]'>
                                        <p className='mb-0'>{currentUser && currentUser.first_name+' '+currentUser.last_name} </p>
                                        <p className='text-sm text-[#9aa5ae]'>{currentUser && currentUser.email}</p>
                                    </div>
                                </div>
                                <ul class="p-0" role="none">
                                    <li className='p-0'>
                                        <a href="/home/profile" class="block no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">
                                            <FontAwesomeIcon className='mr-2' icon={faUser} />
                                            Profile
                                        </a>
                                        <a href="/home/profile" class="block no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">
                                            <FontAwesomeIcon className='mr-2' icon={faGear} />
                                            Settings
                                        </a>
                                        <a href="/home/profile" class="block no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">
                                            <FontAwesomeIcon className='mr-2' icon={faCircleDollarToSlot} />
                                            Pricing
                                        </a>
                                    </li>
                                    <li className='p-0'>
                                    <a href="#" onClick={handleLogout} class="block no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700 border-t-[1px] border-solid border-gray-300" role="menuitem">
                                        <FontAwesomeIcon className='mr-2' icon={faArrowRightFromBracket} />
                                        Sign out
                                    </a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    </>
                    )
                    :
                    (
                        <div className='flex items-center '>
                            <button className='mr-2'>
                                <Link className="no-underline hover:text-white font-bold cursor-pointer text-[#67748E]" to='/login'>
                                    Sign in
                                </Link>
                            </button>
                            <button className='bg-[#ff792e] px-5 py-2 rounded-lg hover:opacity-80'>
                                <Link className="no-underline text-white" to='/register'>
                                    Sign up
                                </Link>
                            </button>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
        </nav>

        {user ? 
        <aside id="logo-sidebar" class={sidebar ? "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ": "fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200"} aria-label="Sidebar">
        <div class="h-full py-4 overflow-y-auto bg-white ">
            <ul class="space-y-2 font-medium">
                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <NavLink end  style={navLinkStyles} to="/home" className="flex items-center p-2 no-underline text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <svg aria-hidden="true" class="w-6 h-6  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span class="ml-3">Dashboard</span>
                    </NavLink>
                </li>
                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Products</h4>
                    <NavLink end  style={navLinkStyles} to="/home/product" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faBoxesStacked} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Products
                        </span>
                    </NavLink>

                    <NavLink end  style={navLinkStyles} to="/home/product/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                            <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                Add product
                            </span>
                    </NavLink>


                </li>
                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Warehouse</h4>
                    <NavLink end  style={navLinkStyles} to="/home/warehouse" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faWarehouse} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Warehouses
                        </span>
                    </NavLink>

                    <NavLink end  style={navLinkStyles} to="/home/warehouse/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                            <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                Add warehouse
                            </span>
                    </NavLink>
                    <NavLink end  style={navLinkStyles} to="/home/location" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faLocationDot} />
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Locations
                        </span>
                    </NavLink>

                    <NavLink end  style={navLinkStyles} to="/home/location/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Add location
                        </span>
                    </NavLink>

                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Stocks</h4>
                    <NavLink end  style={navLinkStyles} to="/home/stock" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faBoxesStacked} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Location Stocks
                        </span>
                    </NavLink>

                    
                    <NavLink end  style={navLinkStyles} to="/home/stock/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                            <FontAwesomeIcon className='mr-2 hover:text-white' icon={faBox} />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                Add stock location
                            </span>
                    </NavLink>
                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Configuration</h4>
                    <NavLink end  style={navLinkStyles} to="/home/group_rule" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faBoxesStacked} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Group Rule
                        </span>
                    </NavLink>

                    <NavLink end  style={navLinkStyles} to="/home/group_rule/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Add Group Rule
                        </span>
                    </NavLink>

                    
                    <NavLink end  style={navLinkStyles} to="/home/rule" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                            <FontAwesomeIcon className='mr-2 hover:text-white' icon={faBox} />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                Rule
                            </span>
                    </NavLink>

                    <NavLink end  style={navLinkStyles} to="/home/rule/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            Add Rule
                        </span>
                    </NavLink>
                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Customer/ Supplier</h4>
                    <NavLink end  style={navLinkStyles} to="/home/partner" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faFileInvoiceDollar} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Partners
                        </span>
                    </NavLink>
                    <NavLink end  style={navLinkStyles} to="/home/partner/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Create Partner
                        </span>
                    </NavLink>

                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Purchase</h4>
                    <NavLink end  style={navLinkStyles} to="/home/purchase" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faFileInvoiceDollar} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Purchases
                        </span>
                    </NavLink>
                    <NavLink end  style={navLinkStyles} to="/home/purchase/add" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Create Purchase
                        </span>
                    </NavLink>

                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Sales</h4>
                    <NavLink end  style={navLinkStyles} to="/home/outcome" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faFileInvoiceDollar} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Outcome
                        </span>
                    </NavLink>
                    <NavLink end  style={navLinkStyles} to="/home/outcome/create" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faSquarePlus} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Create Outcome
                        </span>
                    </NavLink>

                </li>

                <li className='border-solid border-[#67748E] border-b-[1px]'>
                    <h4>Transfer</h4>
                    <NavLink end  style={navLinkStyles} to="/home/transfer" className="flex no-underline items-center p-2 text-[#67748E] rounded-lg  hover:bg-[#1b2850] hover:text-white">
                        <FontAwesomeIcon className='mr-2 hover:text-white' icon={faTruckArrowRight} />                            
                        <span class="flex-1 ml-3 whitespace-nowrap">
                                    Transfer
                        </span>
                    </NavLink>

                </li>
            
            </ul>
        </div>
        </aside>
        :
        <aside id="logo-sidebar" class={sidebar ? "fixed hidden top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ": "fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200"} aria-label="Sidebar">
        <div class="h-full overflow-y-auto bg-white ">
            <ul class="font-medium p-0">
                <li className='border-solid p-0 '>
                    <a href="#" class="flex items-center p-2 text-[#67748E] rounded-lg no-underline hover:text-white  hover:bg-[#1b2850] ">
                    <span class="">Home</span>
                    </a>
                </li>
                <li className='border-solid p-0'>
                    <a href="#" class="flex items-center p-2 text-[#67748E] rounded-lg no-underline hover:text-white  hover:bg-[#1b2850] ">
                    <span class="">About</span>
                    </a>
                </li>
                <li className='border-solid p-0'>
                    <a href="#" class="flex items-center p-2 text-[#67748E] rounded-lg no-underline hover:text-white  hover:bg-[#1b2850] ">
                    <span class="">Features</span>
                    </a>
                </li>
                <li className='border-solid p-0'>
                    <a href="#" class="flex items-center p-2 text-[#67748E] rounded-lg no-underline hover:text-white  hover:bg-[#1b2850] ">
                    <span class="">Pricing</span>
                    </a>
                </li>
            
            </ul>
        </div>
        </aside>
        }
    </>
  )
}

export default SidebarNavbar

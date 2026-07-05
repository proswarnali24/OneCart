import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si";
import { ThemeContext } from '../context/ThemeContext'

function Orders() {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)
  const { theme } = useContext(ThemeContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
     try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
      }
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className={`w-full min-h-screen flex flex-col transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Nav />
      <div className="flex flex-1 pt-[70px]">
        <Sidebar />
        <div className='flex-1 p-8 md:p-12 z-10 flex flex-col gap-8'>
          <h1 className='text-3xl font-extrabold tracking-tight'>All Orders List</h1>

          <div className="flex flex-col gap-6 max-w-4xl">
            {orders.map((order, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border glass-panel flex flex-col lg:flex-row gap-6 justify-between lg:items-center hover:scale-[101%] transition-all duration-300"
              >
                {/* Details Section */}
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800 text-indigo-400' : 'bg-slate-100/60 border-slate-200 text-indigo-600'
                  }`}>
                    <SiEbox className='w-8 h-8' />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 text-sm font-semibold">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="tracking-tight text-indigo-500">
                          {item.name.toUpperCase()} &bull; {item.quantity} &bull; <span className="text-slate-400">{item.size}</span>
                        </p>
                      ))}
                    </div>
                    <div className={`text-[13px] leading-relaxed ${theme === 'dark' ? 'text-slate-450' : 'text-slate-550'}`}>
                      <p className="font-extrabold text-slate-800 dark:text-slate-200">{order.address.firstName + " " + order.address.lastName}</p>
                      <p>{order.address.street}</p>
                      <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pinCode}</p>
                      <p className="font-bold mt-1 text-slate-700 dark:text-slate-350">Phone: {order.address.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Summary Section */}
                <div className={`text-[13px] leading-relaxed flex flex-col gap-1 ${theme === 'dark' ? 'text-slate-450' : 'text-slate-550'}`}>
                  <p>Items: <span className="font-extrabold">{order.items.length}</span></p>
                  <p>Method: <span className="font-extrabold uppercase">{order.paymentMethod}</span></p>
                  <p>Payment: <span className={`font-extrabold ${order.payment ? 'text-green-500' : 'text-amber-500'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                  <p>Date: <span className="font-extrabold">{new Date(order.date).toLocaleDateString()}</span></p>
                  <p className="text-lg font-black text-indigo-500 mt-1">₹ {order.amount}</p>
                </div>

                {/* Status Selector Dropdown */}
                <select 
                  value={order.status} 
                  onChange={(e) => statusHandler(e, order._id)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-slate-800 text-white' 
                      : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

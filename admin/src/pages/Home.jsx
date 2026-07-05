import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'

function Home() {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const { serverUrl } = useContext(authDataContext)
    const { theme } = useContext(ThemeContext)

    const fetchCounts = async () => {
        try {
            const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
            setTotalProducts(products.data.length)

            const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
            setTotalOrders(orders.data.length)
        } catch (err) {
            console.error("Failed to fetch counts", err)
        }
    }

    useEffect(() => {
        fetchCounts()
    }, [])

    return (
        <div className={`w-full min-h-screen transition-all-300 relative ${
            theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            <Nav />
            <div className="flex pt-[70px]">
                <Sidebar />
                <div className='flex-1 p-8 md:p-12 flex flex-col gap-8 z-10'>
                    <h1 className='text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent w-fit'>
                        Solivana Admin Panel
                    </h1>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
                        <div className="p-8 rounded-2xl border glass-panel flex flex-col items-center justify-center gap-4 hover:scale-[102%] transition-transform duration-300">
                            <span className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                Total Products
                            </span>
                            <span className="text-4xl font-black text-indigo-500">
                                {totalProducts}
                            </span>
                        </div>

                        <div className="p-8 rounded-2xl border glass-panel flex flex-col items-center justify-center gap-4 hover:scale-[102%] transition-transform duration-300">
                            <span className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-slate-300' : 'text-slate-650'}`}>
                                Total Orders
                            </span>
                            <span className="text-4xl font-black text-indigo-500">
                                {totalOrders}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

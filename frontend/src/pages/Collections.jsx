import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { ThemeContext } from '../context/ThemeContext';

function Collections() {
    let [showFilter, setShowFilter] = useState(false)
    let { products, search, showSearch } = useContext(shopDataContext)
    let [filterProduct, setFilterProduct] = useState([])
    let [category, setCategory] = useState([])
    let [subCategory, setSubCategory] = useState([])
    let [sortType, setSortType] = useState("relavent")
    const { theme } = useContext(ThemeContext)

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice()

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)
    }

    const sortProducts = () => {
        let fbCopy = filterProduct.slice()

        switch (sortType) {
            case 'low-high':
                setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price)))
                break;
            case 'high-low':
                setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price)))
                break;
            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        sortProducts()
    }, [sortType])

    useEffect(() => {
        setFilterProduct(products)
    }, [products])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    return (
        <div className={`w-full min-h-screen pt-24 pb-20 transition-all-300 flex flex-col md:flex-row gap-8 px-6 md:px-12 ${
            theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
                <button 
                    onClick={() => setShowFilter(prev => !prev)}
                    className="flex items-center gap-2 text-xl font-bold tracking-tight uppercase cursor-pointer"
                >
                    Filters
                    <span className="md:hidden">
                        {showFilter ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
                    </span>
                </button>

                {/* Filter list container */}
                <div className={`flex flex-col gap-4 ${showFilter ? 'block' : 'hidden md:flex'}`}>
                    
                    {/* Category Filter Box */}
                    <div className="p-5 rounded-2xl border glass-panel">
                        <h4 className="text-sm font-extrabold tracking-wider uppercase mb-3">Categories</h4>
                        <div className="flex flex-col gap-2.5">
                            {['Men', 'Women', 'Kids'].map((catName) => (
                                <label key={catName} className="flex items-center gap-3 text-[14px] font-medium cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        value={catName} 
                                        onChange={toggleCategory}
                                        className="w-4 h-4 rounded text-indigo-600 border-slate-350 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer"
                                    /> 
                                    {catName}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sub-Category Filter Box */}
                    <div className="p-5 rounded-2xl border glass-panel">
                        <h4 className="text-sm font-extrabold tracking-wider uppercase mb-3">Sub-Categories</h4>
                        <div className="flex flex-col gap-2.5">
                            {['TopWear', 'BottomWear', 'WinterWear'].map((subCatName) => (
                                <label key={subCatName} className="flex items-center gap-3 text-[14px] font-medium cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        value={subCatName} 
                                        onChange={toggleSubCategory}
                                        className="w-4 h-4 rounded text-indigo-600 border-slate-350 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer"
                                    /> 
                                    {subCatName}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Listing Grid */}
            <div className="flex-1 flex flex-col gap-8">
                {/* Header Actions */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Title text1="All" text2="Collections" />

                    <select 
                        onChange={(e) => setSortType(e.target.value)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                            theme === 'dark' 
                                ? 'bg-slate-900 border-slate-800 text-white' 
                                : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                        }`}
                    >
                        <option value="relavent">Sort By: Relevant</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to Low</option>
                    </select>
                </div>

                {/* Product Grid Layout */}
                <div className="w-full flex flex-wrap items-center justify-center md:justify-start gap-8 min-h-[50vh]">
                    {filterProduct.length > 0 ? (
                        filterProduct.map((item, index) => (
                            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
                        ))
                    ) : (
                        <div className="w-full text-center py-12">
                            <p className={`text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                No products found matching these filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Collections
import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { ThemeContext } from '../context/ThemeContext'

function Add() {
  let [image1, setImage1] = useState(null)
  let [image2, setImage2] = useState(null)
  let [image3, setImage3] = useState(null)
  let [image4, setImage4] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  const { theme } = useContext(ThemeContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    
    if (!image1 || !image2 || !image3 || !image4) {
      toast.error("Please upload all 4 images")
      setLoading(false)
      return
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size")
      setLoading(false)
      return
    }

    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(result.data)
      toast.success("Add Product Successfully")
      setLoading(false)

      if (result.data) {
          setName("")
          setDescription("")
          setImage1(null)
          setImage2(null)
          setImage3(null)
          setImage4(null)
          setPrice("")
          setBestSeller(false)
          setCategory("Men")
          setSubCategory("TopWear")
          setSizes([])
          
          const input1 = document.getElementById('image1')
          const input2 = document.getElementById('image2')
          const input3 = document.getElementById('image3')
          const input4 = document.getElementById('image4')
          if (input1) input1.value = ''
          if (input2) input2.value = ''
          if (input3) input3.value = ''
          if (input4) input4.value = ''
      }
    } catch (error) {
       console.log(error)
       setLoading(false)
       const errorMessage = error.response?.data?.message || error.message || "Add Product Failed"
       toast.error(errorMessage)
    }
  }

  const getSelectClass = () => {
    return `px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
      theme === 'dark' 
        ? 'bg-slate-900 border-slate-800 text-white' 
        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
    }`;
  }

  const getInputClass = () => {
    return `w-full max-w-xl h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
      theme === 'dark' 
        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
    }`;
  }

  const getTextareaClass = () => {
    return `w-full max-w-xl h-24 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
      theme === 'dark' 
        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
    }`;
  }

  return (
    <div className={`w-full min-h-screen flex flex-col transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Nav />
      <div className="flex flex-1 pt-[70px]">
        <Sidebar />
        <div className='flex-1 p-8 md:p-12 z-10 flex flex-col gap-8'>
          <h1 className='text-3xl font-extrabold tracking-tight'>Add Product</h1>

          <form onSubmit={handleAddProduct} className='w-full max-w-4xl flex flex-col gap-8'>
            {/* Image upload section */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-lg font-bold tracking-tight'>Upload Images</h3>
              <div className='flex items-center justify-start gap-4 flex-wrap'>
                {[
                  { id: 'image1', val: image1, set: setImage1 },
                  { id: 'image2', val: image2, set: setImage2 },
                  { id: 'image3', val: image3, set: setImage3 },
                  { id: 'image4', val: image4, set: setImage4 }
                ].map((imgItem) => (
                  <div key={imgItem.id} className='relative w-20 h-20 md:w-24 md:h-24'>
                    <label htmlFor={imgItem.id} className={`absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center border-2 border-dashed rounded-2xl hover:border-indigo-500 hover:scale-105 transition-all duration-200 ${
                      theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-300 bg-slate-100'
                    }`}>
                      <img 
                        src={!imgItem.val ? upload : URL.createObjectURL(imgItem.val)} 
                        alt="Upload Preview" 
                        className='w-[85%] h-[85%] rounded-xl object-cover pointer-events-none' 
                      />
                    </label>
                    <input 
                      type="file" 
                      id={imgItem.id}
                      accept="image/*" 
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) imgItem.set(e.target.files[0])
                      }}
                      required 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs section */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold tracking-tight'>Product Name</label>
                <input 
                  type="text" 
                  placeholder='Type product name'
                  className={getInputClass()} 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  required 
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold tracking-tight'>Product Description</label>
                <textarea 
                  placeholder='Type product description'
                  className={getTextareaClass()} 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description} 
                  required 
                />
              </div>
            </div>

            {/* Category / Sub-category dropdowns */}
            <div className='flex flex-wrap items-center gap-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold tracking-tight'>Product Category</label>
                <select className={getSelectClass()} onChange={(e) => setCategory(e.target.value)} value={category}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold tracking-tight'>Sub-Category</label>
                <select className={getSelectClass()} onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>
            </div>

            {/* Price section */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-bold tracking-tight'>Product Price</label>
              <input 
                type="number" 
                placeholder='₹ 2000'
                className={getInputClass()} 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                required 
              />
            </div>

            {/* Size Tags Selection */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-bold tracking-tight'>Product Sizes</label>
              <div className='flex items-center justify-start gap-3 flex-wrap'>
                {["S", "M", "L", "XL", "XXL"].map((sz) => {
                  const isSelected = sizes.includes(sz);
                  return (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setSizes(prev => isSelected ? prev.filter(item => item !== sz) : [...prev, sz])}
                      className={`px-5 py-2 text-sm font-bold border rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow-md ring-2 ring-indigo-500/20' 
                          : 'bg-transparent border-slate-350 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:border-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      {sz}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Best Seller Checkbox */}
            <label className='flex items-center gap-3 text-sm font-bold cursor-pointer select-none'>
              <input 
                type="checkbox" 
                id='checkbox' 
                className='w-5 h-5 rounded text-indigo-650 border-slate-350 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer' 
                onChange={() => setBestSeller(prev => !prev)}
                checked={bestseller}
              />
              Add to BestSeller
            </label>

            {/* Submit Button */}
            <button 
              type="submit"
              className='w-full max-w-xs h-12 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl flex items-center justify-center font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-indigo-500/10 cursor-pointer disabled:opacity-85'
            >
              {loading ? <Loading /> : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Add

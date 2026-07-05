import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';
import { ThemeContext } from '../context/ThemeContext';

function ProductDetail() {
    let { productId } = useParams()
    let { products, currency, addtoCart, loading } = useContext(shopDataContext)
    let [productData, setProductData] = useState(false)
    const { theme } = useContext(ThemeContext)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className={`w-full min-h-screen pt-24 pb-12 transition-all-300 ${
            theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Main Details Section */}
            <div className='max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 items-start justify-center'>
                
                {/* Images Column */}
                <div className='w-full lg:w-[55%] flex flex-col-reverse md:flex-row gap-4 items-center justify-center'>
                    {/* Thumbnails list */}
                    <div className='flex md:flex-col gap-3 flex-wrap items-center justify-center'>
                        {[image1, image2, image3, image4].map((imgUrl, idx) => (
                            <div 
                                key={idx} 
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:border-indigo-500 hover:scale-105 ${
                                    image === imgUrl ? 'border-indigo-600 shadow-md scale-105' : 'border-transparent bg-slate-200 dark:bg-slate-800'
                                }`}
                                onClick={() => setImage(imgUrl)}
                            >
                                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className='w-full h-full object-cover' />
                            </div>
                        ))}
                    </div>
                    {/* Main image viewer */}
                    <div className={`w-full max-w-[480px] aspect-[4/5] rounded-2xl overflow-hidden border shadow-lg ${
                        theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                    }`}>
                        <img src={image} alt={productData.name} className='w-full h-full object-cover transition-all duration-300' />
                    </div>
                </div>

                {/* Information Column */}
                <div className='w-full lg:w-[45%] flex flex-col gap-6 items-start justify-start'>
                    <span className={`text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                        {productData.category} &bull; {productData.subCategory}
                    </span>

                    <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight'>{productData.name.toUpperCase()}</h1>
                    
                    {/* Rating stars */}
                    <div className='flex items-center gap-1.5'>
                        <div className="flex items-center gap-0.5">
                            <FaStar className='w-4 h-4 fill-amber-400' />
                            <FaStar className='w-4 h-4 fill-amber-400' />
                            <FaStar className='w-4 h-4 fill-amber-400' />
                            <FaStar className='w-4 h-4 fill-amber-400' />
                            <FaStarHalfAlt className='w-4 h-4 fill-amber-400' />
                        </div>
                        <p className={`text-xs font-semibold pl-1.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>(124 customer reviews)</p>
                    </div>

                    {/* Price tag */}
                    <p className='text-3xl font-black tracking-tight text-indigo-500'>{currency} {productData.price}</p>

                    {/* Description */}
                    <p className={`text-[15px] leading-relaxed ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
                        {productData.description} Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
                    </p>

                    {/* Size selection */}
                    <div className='flex flex-col gap-3 w-full border-t border-slate-200/10 pt-6'>
                        <p className='text-lg font-bold tracking-tight'>Select Size</p>
                        <div className='flex gap-3 flex-wrap'>
                            {productData.sizes.map((item, index) => (
                                <button 
                                    key={index} 
                                    className={`px-5 py-2 text-sm font-bold border rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer ${
                                        item === size 
                                            ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow-md ring-2 ring-indigo-500/20' 
                                            : 'bg-transparent border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                                    }`} 
                                    onClick={() => setSize(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Add to Cart button */}
                        <button 
                            className={`w-full max-w-sm h-12 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer mt-4 ${
                                theme === 'dark' 
                                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/10' 
                                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                            }`} 
                            onClick={() => addtoCart(productData._id, size)}
                        >
                            {loading ? <Loading /> : "Add to Cart"}
                        </button>
                    </div>

                    {/* Additional benefits */}
                    <div className={`w-full border-t border-slate-200/10 pt-6 flex flex-col gap-2 text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                        <div className="flex items-center gap-2">
                            <span className="text-indigo-500 font-bold">&check;</span> 100% Original Product.
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-indigo-500 font-bold">&check;</span> Cash on delivery is available on this product.
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-indigo-500 font-bold">&check;</span> Easy return and exchange policy within 7 days.
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Tab & Reviews Section */}
            <div className='max-w-7xl mx-auto px-6 md:px-12 mt-16'>
                <div className='flex border-b border-slate-200/10'>
                    <button className={`px-6 py-3 text-sm font-bold border-b-2 border-indigo-500 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                        Description
                    </button>
                    <button className={`px-6 py-3 text-sm font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-350`}>
                        Reviews (124)
                    </button>
                </div>

                <div className={`p-6 border-x border-b border-slate-200/10 rounded-b-2xl text-[14px] leading-relaxed ${
                    theme === 'dark' ? 'bg-slate-900/20 text-slate-300' : 'bg-slate-50 text-slate-650'
                }`}>
                    <p>
                        Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on Solivana. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
                    </p>
                </div>

                {/* Related Products list */}
                <div className="mt-16">
                    <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
                </div>
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default ProductDetail

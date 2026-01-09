import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req,res) => {
    try {
        let {name,description,price,category,subCategory,sizes,bestseller} = req.body

        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
            return res.status(400).json({message: "All 4 images are required"})
        }

        if (!sizes || sizes.length === 0) {
            return res.status(400).json({message: "At least one size is required"})
        }

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)
        let image4 = await uploadOnCloudinary(req.files.image4[0].path)

        if (!image1 || !image2 || !image3 || !image4) {
            return res.status(500).json({message: "Failed to upload images to Cloudinary"})
        }
        
        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subCategory,
            sizes : typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            bestseller :bestseller === "true" || bestseller === true,
            date :Date.now(),
            image1,
            image2,
            image3,
            image4
            
        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
          console.log("AddProduct error:", error)
    return res.status(500).json({message:`AddProduct error: ${error.message || error}`})
    }
    
}


export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}

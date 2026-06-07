import dotenv from 'dotenv';
import connectDb from './config/db.js';
import Product from './model/productModel.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDb();

    const sampleProducts = [
      {
        name: 'Classic Men T-Shirt',
        description: 'Comfortable cotton t-shirt for everyday wear.',
        price: 799,
        category: 'Men',
        subCategory: 'TopWear',
        sizes: ['S', 'M', 'L', 'XL'],
        bestseller: true,
        date: Date.now(),
        image1: 'https://via.placeholder.com/400x400?text=Men+TopWear+1',
        image2: 'https://via.placeholder.com/400x400?text=Men+TopWear+2',
        image3: 'https://via.placeholder.com/400x400?text=Men+TopWear+3',
        image4: 'https://via.placeholder.com/400x400?text=Men+TopWear+4',
      },
      {
        name: 'Women Jeans',
        description: 'Slim fit denim jeans for women.',
        price: 1299,
        category: 'Women',
        subCategory: 'BottomWear',
        sizes: ['S', 'M', 'L'],
        bestseller: false,
        date: Date.now(),
        image1: 'https://via.placeholder.com/400x400?text=Women+BottomWear+1',
        image2: 'https://via.placeholder.com/400x400?text=Women+BottomWear+2',
        image3: 'https://via.placeholder.com/400x400?text=Women+BottomWear+3',
        image4: 'https://via.placeholder.com/400x400?text=Women+BottomWear+4',
      },
      {
        name: 'Kids Winter Jacket',
        description: 'Warm and cozy winter jacket for kids.',
        price: 1599,
        category: 'Kids',
        subCategory: 'WinterWear',
        sizes: ['XS', 'S', 'M'],
        bestseller: true,
        date: Date.now(),
        image1: 'https://via.placeholder.com/400x400?text=Kids+WinterWear+1',
        image2: 'https://via.placeholder.com/400x400?text=Kids+WinterWear+2',
        image3: 'https://via.placeholder.com/400x400?text=Kids+WinterWear+3',
        image4: 'https://via.placeholder.com/400x400?text=Kids+WinterWear+4',
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    process.exit(0);
  }
};

seed();






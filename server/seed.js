import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const products = [
  {
    name: 'Classic Runner',
    description: 'A customizable everyday sneaker',
    basePrice: 2999,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
    modelPath: '/models/sneaker.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#FFFFFF', '#000000', '#FF0000'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#FFFFFF', '#0000FF', '#00FF00'] },
    ],
  },
  {
    name: 'Street Trainer',
    description: 'Bold streetwear-inspired sneaker',
    basePrice: 3499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    modelPath: '/models/sneaker2.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#111111', '#FFD700', '#FF4500'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#000000', '#8A2BE2', '#00CED1'] },
      { partName: 'laces', meshName: 'Laces_Mesh', colorOptions: ['#FFFFFF', '#000000'] },
    ],
  },
  {
    name: 'Retro Court',
    description: 'Vintage-style low-top sneaker',
    basePrice: 2799,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500',
    modelPath: '/models/sneaker3.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#FFFFFF', '#DC143C'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#F5F5DC', '#2F4F4F', '#800000'] },
    ],
  },
  {
    name: 'Volt Pace',
    description: 'A lightweight runner built for speed, in high-contrast colorways',
    basePrice: 3199,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
    modelPath: '/models/sneaker.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#C8FF3D', '#000000', '#FFFFFF'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#111111', '#C8FF3D', '#F5F3EF'] },
    ],
  },
  {
    name: 'Molten High-Top',
    description: 'High-top silhouette with a fiery gradient-ready palette',
    basePrice: 3899,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500',
    modelPath: '/models/sneaker2.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#FF5A36', '#1A1A1A', '#FFFFFF'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#FF5A36', '#0C0B0A', '#F5F3EF'] },
      { partName: 'laces', meshName: 'Laces_Mesh', colorOptions: ['#FFFFFF', '#FF5A36'] },
    ],
  },
  {
    name: 'Concrete Low',
    description: 'Minimal low-top with an urban, muted colorway',
    basePrice: 2599,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    modelPath: '/models/sneaker3.glb',
    customizableParts: [
      { partName: 'sole', meshName: 'Sole_Mesh', colorOptions: ['#A89E8F', '#0C0B0A', '#F5F3EF'] },
      { partName: 'body', meshName: 'Body_Mesh', colorOptions: ['#3A3835', '#A89E8F', '#0C0B0A'] },
    ],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`${products.length} products seeded successfully`);
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedProducts();

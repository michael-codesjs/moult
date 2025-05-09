'use client'

import { Suspense } from 'react';
import Link from 'next/link';
import { FilterModal } from './FilterModal';
import Button from '../../../components/button/Button';
import { Header } from '@/layout/header';
import { BottomNavigation } from '@/layout/navigation';

// Sample data for the explore page
const brands = [
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'puma', name: 'Puma' },
  { id: 'reebok', name: 'Reebok' },
  { id: 'nb', name: 'New Balance' },
  { id: 'uniqlo', name: 'Uniqlo' },
  { id: 'zara', name: 'Zara' },
  { id: 'hm', name: 'H&M' },
];

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#008000' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Grey', value: '#808080' },
];

const products = [
  {
    id: '1',
    name: 'Minimal Cotton Tee',
    brand: 'Uniqlo',
    price: 24.99,
    category: 'Tops',
    colors: ['#000000', '#FFFFFF', '#808080'],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '2',
    name: 'Performance Joggers',
    brand: 'Nike',
    price: 89.99,
    category: 'Bottoms',
    colors: ['#000000', '#808080', '#0000FF'],
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&auto=format&q=60',
    technologies: ['3D', 'VR', 'AR']
  },
  {
    id: '3',
    name: 'Oversized Blazer',
    brand: 'Zara',
    price: 129.99,
    category: 'Outerwear',
    colors: ['#000000', '#FFFFFF'],
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '4',
    name: 'Studio Leather Sneakers',
    brand: 'Adidas',
    price: 119.99,
    category: 'Footwear',
    colors: ['#FFFFFF', '#808080', '#FFC0CB'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '5',
    name: 'Relaxed Linen Shirt',
    brand: 'H&M',
    price: 39.99,
    category: 'Tops',
    colors: ['#FFFFFF', '#FFA500', '#0000FF'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&q=60',
    technologies: ['VR']
  },
  {
    id: '6',
    name: 'Utility Cargo Pants',
    brand: 'Puma',
    price: 69.99,
    category: 'Bottoms',
    colors: ['#008000', '#808080', '#000000'],
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&q=60',
    technologies: ['3D', 'VR']
  },
  {
    id: '7',
    name: 'Minimalist Watch',
    brand: 'Uniqlo',
    price: 149.99,
    category: 'Accessories',
    colors: ['#000000', '#808080'],
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '8',
    name: 'Casual Denim Jacket',
    brand: 'Zara',
    price: 79.99,
    category: 'Outerwear',
    colors: ['#0000FF'],
    imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=500&auto=format&q=60',
    technologies: ['AR']
  },
  {
    id: '9',
    name: 'Classic Oxford Shirt',
    brand: 'Uniqlo',
    price: 34.99,
    category: 'Tops',
    colors: ['#FFFFFF', '#0000FF', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&q=60',
    technologies: ['3D', 'VR']
  },
  {
    id: '10',
    name: 'Ultra Boost Runners',
    brand: 'Adidas',
    price: 179.99,
    category: 'Footwear',
    colors: ['#000000', '#FF0000', '#FFFFFF'],
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '11',
    name: 'Wool Blend Beanie',
    brand: 'H&M',
    price: 19.99,
    category: 'Accessories',
    colors: ['#808080', '#000000', '#008000'],
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '12',
    name: 'Vintage Denim Shorts',
    brand: 'Levi\'s',
    price: 59.99,
    category: 'Bottoms',
    colors: ['#0000FF'],
    imageUrl: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&auto=format&q=60',
    technologies: ['VR', 'AR']
  },
  {
    id: '13',
    name: 'Structured Tote Bag',
    brand: 'Zara',
    price: 45.99,
    category: 'Accessories',
    colors: ['#000000', '#FFC0CB', '#FFFFFF'],
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '14',
    name: 'Premium Yoga Mat',
    brand: 'Nike',
    price: 79.99,
    category: 'Fitness',
    colors: ['#800080', '#008000', '#FFC0CB'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&q=60',
    technologies: ['VR']
  },
  {
    id: '15',
    name: 'Retro Aviator Sunglasses',
    brand: 'Ray-Ban',
    price: 149.99,
    category: 'Accessories',
    colors: ['#000000', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '16',
    name: 'Quilted Puffer Jacket',
    brand: 'Uniqlo',
    price: 99.99,
    category: 'Outerwear',
    colors: ['#000000', '#FF0000', '#008000'],
    imageUrl: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=500&auto=format&q=60',
    technologies: ['3D', 'VR']
  },
  {
    id: '17',
    name: 'High-Waist Leggings',
    brand: 'Puma',
    price: 49.99,
    category: 'Fitness',
    colors: ['#000000', '#800080'],
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&auto=format&q=60',
    technologies: ['AR']
  },
  {
    id: '18',
    name: 'Canvas Slip-On Shoes',
    brand: 'Vans',
    price: 65.99,
    category: 'Footwear',
    colors: ['#FFFFFF', '#000000', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '19',
    name: 'Chunky Knit Sweater',
    brand: 'H&M',
    price: 59.99,
    category: 'Tops',
    colors: ['#FFC0CB', '#808080', '#FFFFFF'],
    imageUrl: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=500&auto=format&q=60',
    technologies: ['VR', 'AR']
  },
  {
    id: '20',
    name: 'Leather Crossbody Bag',
    brand: 'Zara',
    price: 89.99,
    category: 'Accessories',
    colors: ['#000000', '#FFC0CB', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '21',
    name: 'Embroidered Baseball Cap',
    brand: 'Nike',
    price: 29.99,
    category: 'Accessories',
    colors: ['#000000', '#0000FF', '#FF0000'],
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '22',
    name: 'Slim Fit Chinos',
    brand: 'Uniqlo',
    price: 39.99,
    category: 'Bottoms',
    colors: ['#808080', '#000000', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&q=60',
    technologies: ['VR']
  },
  {
    id: '23',
    name: 'Wireless Earbuds',
    brand: 'Apple',
    price: 199.99,
    category: 'Tech',
    colors: ['#FFFFFF', '#000000'],
    imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '24',
    name: 'Lightweight Running Jacket',
    brand: 'Adidas',
    price: 89.99,
    category: 'Outerwear',
    colors: ['#000000', '#FF0000', '#0000FF'],
    imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&auto=format&q=60',
    technologies: ['3D', 'VR']
  },
  {
    id: '25',
    name: 'Smart Fitness Watch',
    brand: 'Fitbit',
    price: 149.99,
    category: 'Tech',
    colors: ['#000000', '#808080'],
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&q=60',
    technologies: ['AR']
  },
  {
    id: '26',
    name: 'Graphic Print T-Shirt',
    brand: 'H&M',
    price: 24.99,
    category: 'Tops',
    colors: ['#FFFFFF', '#000000', '#FF0000'],
    imageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&q=60',
    technologies: ['3D']
  },
  {
    id: '27',
    name: 'Polarized Sunglasses',
    brand: 'Ray-Ban',
    price: 169.99,
    category: 'Accessories',
    colors: ['#000000', '#FFA500'],
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&q=60',
    technologies: ['3D', 'AR']
  },
  {
    id: '28',
    name: 'Sustainable Swimwear',
    brand: 'Patagonia',
    price: 79.99,
    category: 'Swimwear',
    colors: ['#0000FF', '#008000', '#FF0000'],
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&q=60',
    technologies: ['VR']
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen text-white">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Explore Drops</h1>
            <p className="text-gray-400 mt-2">
              Experience fashion in a new dimension with virtual showrooms and immersive runway shows
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex space-x-2">
              <FilterModal brands={brands} colors={colors} />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 text-sm font-medium">
                <span>Sort by: Newest</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-lg z-10 hidden group-hover:block">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Newest</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Price: Low to High</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Price: High to Low</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Popularity</a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Suspense fallback={<div>Loading products...</div>}>
              {products.map(product => (
                <div key={product.id} className="group bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-white/5 relative">
                  {/* Subtle corner glow effect */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
                  
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square relative overflow-hidden flex items-center justify-center">
                      {/* Image */}
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Technology badges with original background */}
                      <div className="absolute top-3 right-3 flex space-x-2 z-10">
                        {product.technologies.map((technology, index) => (
                          <span key={index} className="text-xs px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white font-medium tracking-wide">{technology}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Product details */}
                    <div className="p-5 flex justify-between items-center relative">
                      <div>
                        <h3 className="font-medium text-white tracking-wide">{product.name}</h3>
                        <p className="text-xs text-gray-400 mt-1 tracking-wide">{product.brand}</p>
                      </div>
                      <div className="min-h-10 min-w-10 h-10 w-10 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center hover:from-white/30 hover:to-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10">
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2023 moult. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
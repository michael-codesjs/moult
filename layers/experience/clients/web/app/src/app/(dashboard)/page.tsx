'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeStyle, setActiveStyle] = useState('casual');
  const [animating, setAnimating] = useState(false);
  
  // Animation effect for product cards
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Helper function to get item descriptions
  const getItemDescription = (index: number): string => {
    const descriptions = [
      'Casual fit', // Navy Blazer
      'Cotton blend', // White Shirt
      'Slim fit, beige', // Chino Pants
      'Leather' // Brown Loafers
    ];
    return descriptions[index] || '';
  };
  
    return (
    <>
      {/* Daily Outfit Notification Banner */}
      <div className="w-full lg:hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-rose-600 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23A78BFA\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px'}}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-4 relative z-10">
          <Link href="/tailored" className="block group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-md group-hover:bg-opacity-20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-semibold">Today's Outfit</p>
                    <div className="flex -space-x-1 mr-2">
                      <div className="h-6 w-6 rounded-full bg-indigo-300 border-2 border-white"></div>
                      <div className="h-6 w-6 rounded-full bg-purple-300 border-2 border-white"></div>
                      <div className="h-6 w-6 rounded-full bg-rose-300 border-2 border-white"></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-purple-100 text-sm">Styled for the weather and meeting today</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors group-hover:shadow-md group-hover:translate-y-[-1px] transition-all">
                  View Now
                </button>
              </div>
              
              {/* Adding right arrow for mobile */}
              <div className="sm:hidden">
                <div className="h-8 w-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Abstract Picasso-inspired decoration */}
        <div className="absolute -top-3 left-[15%] h-10 w-10 border-4 border-indigo-400 border-opacity-20 rounded-full transform rotate-45"></div>
        <div className="absolute top-[50%] right-[8%] h-8 w-8 border-4 border-pink-500 border-opacity-20 rounded-full"></div>
        <div className="absolute -bottom-3 left-[35%] h-6 w-16 bg-purple-400 bg-opacity-20 rounded-full transform -rotate-12"></div>
        <div className="absolute top-[20%] right-[25%] h-5 w-12 border-4 border-rose-400 border-opacity-20 rounded-full transform rotate-45"></div>
      </div>
      
      {/* Featured Collections - changing to Featured Drops */}
      <section className="py-4 lg:py-0 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Featured Drops
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Avant-garde Collection */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md relative group hover:shadow-xl transition-shadow">
              <div className="h-64 relative overflow-hidden">
                {/* Stock image for fashion collection - Replace with actual stock image URLs */}
                <img 
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Avant-garde Fashion Collection" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  New Arrival
                </div>
                
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <h3 className="text-white text-xl font-bold">Avant-garde Collection</h3>
                  <p className="text-gray-200 text-sm">Limited edition release</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-600 font-bold">$89 - $250</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">28 items</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Bold geometric patterns and expressive forms inspired by modern art movements.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="h-7 w-7 rounded-full bg-indigo-500 border-2 border-white"></div>
                      <div className="h-7 w-7 rounded-full bg-amber-500 border-2 border-white"></div>
                      <div className="h-7 w-7 rounded-full bg-rose-500 border-2 border-white"></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">+2 items</span>
                  </div>
                  <button className="text-purple-700 hover:text-purple-900 transition-colors text-sm font-medium flex items-center">
                    View Drop
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modernist Essentials */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md relative group hover:shadow-xl transition-shadow">
              <div className="h-64 relative overflow-hidden">
                {/* Stock image for fashion collection - Replace with actual stock image URLs */}
                <img 
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Modernist Fashion Essentials" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                
                <div className="absolute top-4 left-4 bg-purple-600 bg-opacity-90 px-3 py-1 rounded-full text-xs font-semibold text-white">
                  Trending
                </div>
                
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <h3 className="text-white text-xl font-bold">Modernist Essentials</h3>
                  <p className="text-gray-200 text-sm">Contemporary minimalism</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-600 font-bold">$75 - $190</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">34 items</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Clean lines and refined silhouettes that emphasize function without sacrificing style.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="h-7 w-7 rounded-full bg-gray-800 border-2 border-white"></div>
                      <div className="h-7 w-7 rounded-full bg-neutral-300 border-2 border-white"></div>
                      <div className="h-7 w-7 rounded-full bg-blue-400 border-2 border-white"></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">+4 items</span>
                  </div>
                  <button className="text-purple-700 hover:text-purple-900 transition-colors text-sm font-medium flex items-center">
                    View Drop
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trending Products - changing to Tailored Just For You */}
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Tailored Just For You
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Geometric Blouse",
                price: "$89",
                image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                color: "Multi-color"
              },
              {
                name: "Cubist Jacket",
                price: "$169",
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                color: "Blue/Gold"
              },
              {
                name: "Abstract Pants",
                price: "$75",
                image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                color: "Black/White"
              },
              {
                name: "Modernist Dress",
                price: "$120",
                image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                color: "Rose/Amber"
              }
            ].map((product, index) => (
              <div key={index} 
                className={`relative rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition-all ${
                  animating ? 'animate-fadeIn' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-48 sm:h-60 relative`}>
                  {/* Using stock image instead of abstract design */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-3 bg-white">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-purple-600 font-bold">{product.price}</span>
                    <span className="text-xs text-gray-500">{product.color}</span>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="h-8 w-8 border border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500 rounded-full flex items-center justify-center transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </button>
                    <button className="flex-1 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-purple-500 hover:text-purple-500 transition-colors text-xs font-medium text-gray-700">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Community Showcase Section */}
          <div className="mt-12 mb-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              Community Showcase
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Community Post 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* User's styled outfit photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  
                  {/* User info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/23.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Emma K.</p>
                        <p className="text-gray-300 text-xs">New York, NY</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Loving my new Geometric Blouse! Paired it with vintage denim for a gallery opening weekend."
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>284</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>46</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">GB</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Geometric Blouse</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Community Post 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* User's styled outfit photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  
                  {/* User info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/men/42.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Alex T.</p>
                        <p className="text-gray-300 text-xs">Los Angeles, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The Cubist Jacket is even better in person! Perfect statement piece for my minimalist wardrobe."
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>172</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>29</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">CJ</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Cubist Jacket</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Community Post 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* User's styled outfit photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  
                  {/* User info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/65.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Sofia M.</p>
                        <p className="text-gray-300 text-xs">Miami, FL</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Obsessed with my new Modernist Dress! The colors are even more vibrant in person. Perfect for summer nights."
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>324</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>57</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">MD</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Modernist Dress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Community Posts (4-13) */}
              {/* Post 4 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/32.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Leila J.</p>
                        <p className="text-gray-300 text-xs">Chicago, IL</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The Abstract Pants really make any outfit stand out! So comfortable too."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>208</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>31</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AP</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Abstract Pants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 5 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Chloe D.</p>
                        <p className="text-gray-300 text-xs">Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Avant-garde collection is perfect for editorial shoots and making a statement."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>341</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>68</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AC</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Avant-garde</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 6 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/men/36.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">David R.</p>
                        <p className="text-gray-300 text-xs">Berlin, Germany</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Modernist Essentials is exactly what my wardrobe needed. Clean lines and perfect fit."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>194</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>25</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">ME</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Modernist</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 7 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/men/59.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Tyler J.</p>
                        <p className="text-gray-300 text-xs">Stockholm, Sweden</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Cubist jacket gets me compliments everywhere I go. Worth every penny."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>267</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>41</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">CJ</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Cubist Jacket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 8 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1602573060573-e3474741e1ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/79.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Jana P.</p>
                        <p className="text-gray-300 text-xs">Prague, CZ</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Abstract pants are so versatile. Dressed them up for gallery night, down for weekend brunch."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>231</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>37</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AP</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Abstract Pants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 9 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/men/18.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Marco V.</p>
                        <p className="text-gray-300 text-xs">Milan, Italy</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "Absolutely love the geometric details on these pieces. The avant-garde collection is a game changer."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>183</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>29</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">AC</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Avant-garde</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 10 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/67.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Anya B.</p>
                        <p className="text-gray-300 text-xs">Toronto, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The Modernist Dress is my go-to for both work events and evening outings. So versatile!"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>249</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>42</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">MD</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Modernist Dress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 11 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/men/24.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Jason K.</p>
                        <p className="text-gray-300 text-xs">Austin, TX</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The blue and gold in the Cubist Jacket really pop in person. Get compliments everywhere I go."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>192</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>33</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">CJ</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Cubist Jacket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 12 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/28.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Sarah M.</p>
                        <p className="text-gray-300 text-xs">Sydney, AU</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The Geometric Blouse pairs perfectly with high-waisted jeans. Love the artful design!"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>217</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>49</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">GB</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Geometric Blouse</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 13 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="User styled outfit" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src="https://randomuser.me/api/portraits/women/54.jpg" 
                          alt="User avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-white font-medium">Nina L.</p>
                        <p className="text-gray-300 text-xs">Copenhagen, DK</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-3">
                    "The Modernist Essentials collection has completely refreshed my wardrobe. Clean lines and timeless appeal."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>298</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>62</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 ring-2 ring-white flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-bold">ME</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-purple-600">Modernist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center mx-auto">
                View more community styles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
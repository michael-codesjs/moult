'use client';

import { useState } from 'react';
import Link from 'next/link';
import './styles.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  
  // Mock user data
  const userData = {
    name: 'Alex Morgan',
    username: 'alexmorgan',
    email: 'alex@example.com',
    location: 'New York, NY',
    memberSince: 'January 2023',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Fashion enthusiast with a love for avant-garde and minimalist designs. Always looking for unique pieces that tell a story.',
    preferences: {
      styles: ['Modernist', 'Avant-garde', 'Minimalist'],
      colors: ['Black', 'White', 'Blue', 'Purple'],
      sizes: ['S', 'M'],
    },
    stats: {
      collections: 5,
      following: 87,
      followers: 142
    }
  };
  
  // Mock order history
  const orderHistory = [
    {
      id: 'ORD-9385',
      date: 'Feb 15, 2024',
      items: ['Geometric Blouse', 'Modernist Dress'],
      total: '$209.00',
      status: 'Delivered'
    },
    {
      id: 'ORD-8712',
      date: 'Jan 23, 2024',
      items: ['Cubist Jacket'],
      total: '$169.00',
      status: 'Delivered'
    },
    {
      id: 'ORD-7645',
      date: 'Dec 10, 2023',
      items: ['Abstract Pants', 'Minimalist Shirt'],
      total: '$145.00',
      status: 'Delivered'
    }
  ];
  
  // Mock saved items
  const savedItems = [
    {
      name: 'Geometric Blouse',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      color: 'Multi-color'
    },
    {
      name: 'Cubist Jacket',
      price: '$169',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      color: 'Blue/Gold'
    },
    {
      name: 'Abstract Pants',
      price: '$75',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      color: 'Black/White'
    },
    {
      name: 'Modernist Dress',
      price: '$120',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      color: 'Rose/Amber'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-0 sm:px-4 pb-10">
      {/* Profile Header - Updated for mobile */}
      <div className="bg-white pb-4 mb-4">
        <div className="relative px-4 pt-4 pb-2">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600 text-sm">@{userData.username}</p>
            </div>
          </div>
          
          {/* Bio Section */}
          <div className="mt-3 bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 text-sm">{userData.bio}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4 px-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/saved-items" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors group">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Saved Items</p>
              <p className="text-xs text-gray-500">View your items</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <Link href="/order-history" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors group">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Orders</p>
              <p className="text-xs text-gray-500">purchases</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {/* Settings Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          
          <div className="space-y-3">
            {/* Personal Info & Preferences (Moved to first position) */}
            <Link href="/settings/personal-info" className="flex items-center py-3 hover:bg-purple-50 rounded-lg px-3 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Personal Info & Preferences</p>
                <p className="text-sm text-gray-500">Your fashion interests and sizes</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link href="/settings/general" className="flex items-center py-3 hover:bg-purple-50 rounded-lg px-3 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">General Settings</p>
                <p className="text-sm text-gray-500">Account preferences, notifications</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link href="/settings/privacy" className="flex items-center py-3 hover:bg-purple-50 rounded-lg px-3 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Privacy Settings</p>
                <p className="text-sm text-gray-500">Control your data and visibility</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link href="/settings/security" className="flex items-center py-3 hover:bg-purple-50 rounded-lg px-3 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Security</p>
                <p className="text-sm text-gray-500">Password, 2FA, sessions</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link href="/settings/payments" className="flex items-center py-3 hover:bg-purple-50 rounded-lg px-3 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Payment Methods</p>
                <p className="text-sm text-gray-500">Manage cards and payments</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
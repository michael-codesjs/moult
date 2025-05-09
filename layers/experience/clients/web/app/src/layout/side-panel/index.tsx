'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const SidePanel = () => {
    const pathname = usePathname();
    const activeColor = "#8b5cf6";
    
    // Simplified outfit items data
    const outfitItems = [
        { 
            name: "Terracotta Blazer", 
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        },
        { 
            name: "Denim Shirt", 
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
        },
        { 
            name: "Dark Jeans", 
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
        },
        { 
            name: "Leather Boots", 
            image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
        }
    ];
    
    return (
        <aside className={`
            hidden lg:block lg:h-full lg:w-56 lg:min-w-56 xl:w-80 xl:min-w-80 sm:order-2
            absolute bottom-0 sm:relative
            border-t-2 sm:border-t-0 sm:border-l-2 border-gray-200
            backdrop-blur-lg bg-white/50 z-50
        `}>
            <div className="px-4">
                {/* Today's Outfit Card */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-gray-800 relative inline-flex">
                            Today's Outfit
                            <span className="absolute -top-1 -right-2 h-2 w-2 bg-purple-500 rounded-full animate-ping"></span>
                        </h2>
                        <div className="flex -space-x-1">
                            <div className="h-5 w-5 rounded-full bg-indigo-400 border-2 border-white shadow-sm"></div>
                            <div className="h-5 w-5 rounded-full bg-purple-400 border-2 border-white shadow-sm"></div>
                            <div className="h-5 w-5 rounded-full bg-rose-400 border-2 border-white shadow-sm"></div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                        Based on your preferences, today's schedule, and the weather.
                    </p>
                    
                    <div className="flex space-x-2 mb-4 overflow-x-auto">
                        {outfitItems.map((item, index) => (
                            <div key={index} className="group overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md flex-shrink-0" style={{width: '60px'}}>
                                <div className="h-16 relative bg-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <Link href="/tailored">
                        <button className="w-full py-2.5 px-4 rounded-full bg-gray-100 text-purple-600 font-medium text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-1 group">
                            View Complete Outfit
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}
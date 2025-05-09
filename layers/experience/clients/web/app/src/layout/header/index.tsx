'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Header = () => {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    
    return (
        <header
            className={`
                h-16 lg:h-20 bg-white/90
                border-b-2 lg:border-0 border-gray-200 backdrop-blur-lg
                sticky top-0 z-50
            `}>
            <div className="w-full h-full overflow-x-hidden flex items-center justify-between">
                {/* Logo */}
                <div className={`
                    sm:w-56 sm:min-w-56 xl:w-60 xl:min-w-60
                    lg:border-r-2 lg:border-gray-200
                    px-4 sm:px-6 lg:px-8 py-4 lg:py-8
                `}>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600 shrink-0">
                        <Link href="/">moult</Link>
                    </h1>
                </div>
                
                {/* Search Input - visible on all screen sizes */}
                <div className={`
                    w-full h-full lg:w-56 lg:min-w-56 xl:w-80 xl:min-w-80
                    lg:order-2 lg:border-l-2 lg:border-gray-200
                    px-2 lg:px-4 xl:px-6
                    flex justify-center items-center
                `}>
                    <label className="relative flex items-center w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-1.5 lg:py-3 xl:py-3 px-4 pr-8 rounded-lg lg:rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
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
                            className="text-gray-500 absolute right-4"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </label>
                </div>
                
                {/* Actions */}
                <div
                    className={`
                        flex items-center justify-end lg:w-full space-x-2 px-4 py-4
                    `}
                >
                    {/* Bell icon for activity center */}
                    <button className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    
                    {/* Shopping bag */}
                    <button className="p-1 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-black text-white rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}
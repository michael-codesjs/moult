'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Navigation = () => {
    const pathname = usePathname();
    const activeColor = "#8b5cf6";
    
    return (
        <nav className={`
            w-full sm:h-full sm:w-56 sm:min-w-56 xl:w-60 xl:min-w-60 sm:order-1
            absolute bottom-0 sm:relative
            border-t-2 sm:border-t-0 sm:border-r-2 border-gray-200
            backdrop-blur-lg bg-white/50 z-50
        `}>
            <div className={`
                flex justify-around items-center sm:items-start sm:flex-col space-y-0 sm:space-y-4
                max-w-md mx-auto py-4 sm:py-0 px-2 sm:px-8
            `}
        >
                <Link href="/" className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center justify-center">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/' ? activeColor : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/' ? '' : '#64748b'}}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span className={`text-xs sm:text-base ${pathname === '/' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Home</span>
                </Link>
                
                <Link href="/discover" className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center justify-center">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/discover' ? activeColor : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/discover' ? '' : '#64748b'}}>
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span className={`text-xs sm:text-base ${pathname === '/discover' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Discover</span>
                </Link>
                
                <Link href="/create" className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center justify-center">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/create' ? activeColor : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/create' ? '' : '#64748b'}}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span className={`text-xs sm:text-base ${pathname === '/create' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Create</span>
                </Link>
                
                <Link href="/tailored" className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center justify-center">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/tailored' ? activeColor : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/tailored' ? '' : '#64748b'}}>
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                        <path d="M19 11h2m-1 -1v2" />
                    </svg>
                    <span className={`text-xs sm:text-base ${pathname === '/tailored' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Tailored</span>
                </Link>
                
                <Link href="/profile" className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center justify-center">
                    <div className={`h-6 w-6 rounded-full overflow-hidden flex items-center justify-center ${pathname === '/profile' ? 'ring-2 ring-purple-600' : 'border border-gray-200'}`}
                        style={pathname === '/profile' ? {background: '#8b5cf6'} : {background: '#f3f4f6'}}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" 
                            stroke={pathname === '/profile' ? 'white' : '#64748b'}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <span className={`text-xs sm:text-base ${pathname === '/profile' ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>Profile</span>
                </Link>
            </div>
        </nav>
    )
}
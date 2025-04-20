'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Navigation = () => {
    const pathname = usePathname();
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/20 py-6 md:hidden z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
                <style jsx>{`
                    .gradient-text {
                        background: linear-gradient(90deg, #a18fff 30%, #6ec3f4 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                `}</style>
                
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="moult-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="30%" stopColor="#a18fff" />
                            <stop offset="100%" stopColor="#6ec3f4" />
                        </linearGradient>
                    </defs>
                </svg>
                
                <Link href="/" className="flex items-center justify-center">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/' ? 'url(#moult-gradient)' : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/' ? '' : 'white'}}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </Link>
                
                <Link href="/discover" className="flex items-center justify-center">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/discover' ? 'url(#moult-gradient)' : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/discover' ? '' : 'white'}}>
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                </Link>
                
                <Link href="/create" className="flex items-center justify-center">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/create' ? 'url(#moult-gradient)' : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/create' ? '' : 'white'}}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </Link>
                
                <Link href="/tailored" className="flex items-center justify-center">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" 
                        stroke={pathname === '/tailored' ? 'url(#moult-gradient)' : 'currentColor'} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{color: pathname === '/tailored' ? '' : 'white'}}>
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                        <path d="M19 11h2m-1 -1v2" />
                    </svg>
                </Link>
                
                <Link href="/profile" className="flex items-center justify-center">
                    <div className={`h-7 w-7 rounded-full overflow-hidden bg-white flex items-center justify-center ${pathname === '/profile' ? 'ring-2 ring-[#a18fff]' : ''}`}
                        style={pathname === '/profile' ? {background: 'linear-gradient(90deg, #a18fff 30%, #6ec3f4 100%)'} : {}}>
                        <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    )
}
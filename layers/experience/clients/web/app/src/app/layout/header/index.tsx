'use client'

import Link from 'next/link';

export const Header = () => {
    return (
        <header
            className={`
                fixed top-0 left-0 right-0
                min-h-20 flex items-center justify-between px-8
                bg-black/20 backdrop-blur-md z-40
                border-b border-white/10
            `}
        >
            <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold gradient-text">moult</h1>
            </Link>
            
            <div className="flex items-center space-x-8">
                <button className="text-white relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#a18fff]"></span>
                </button>
                
                <button className="text-white relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#a18fff]"></span>
                </button>
            </div>
        </header>
    )
}
import Link from "next/link"



export const BottomNavigation = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/20 py-4 md:hidden z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/explore" className="flex flex-col items-center">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7H18C19.1 7 20 7.9 20 9V14C20 15.1 19.1 16 18 16H14.5L13.5 17H10.5L9.5 16H6C4.9 16 4 15.1 4 14V9C4 7.9 4.9 7 6 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 12H22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-white mt-2">Explore</span>
          </Link>
          
          <Link href="/brands" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs text-white mt-2">Brands</span>
          </Link>
          
          <Link href="/get-the-app" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-xs text-white mt-2">Get the app</span>
          </Link>
          
          <Link href="/auth/signin" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="text-xs text-white mt-2">Sign in</span>
          </Link>
        </div>
      </div>
    )
}
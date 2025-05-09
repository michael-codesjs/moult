import Button from "@/components/button/Button"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex justify-between items-center pt-8 px-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              <Link href="/">moult</Link>
            </h1>
            <nav className="hidden md:flex space-x-8 text-sm text-white">
              <Link href="/explore" className="hover:text-purple-300 transition">Explore</Link>
              <Link href="/brands" className="hover:text-purple-300 transition">Brands</Link>
              <Link href="/get-the-app" className="text-purple-300 hover:text-purple-200 transition border-b border-purple-400">Download App</Link>
            </nav>
            <div className="flex space-x-4">
                <Button variant="ghost" href='/auth/up'>
                Sign up
                </Button>
            </div>
        </header>
    )
}
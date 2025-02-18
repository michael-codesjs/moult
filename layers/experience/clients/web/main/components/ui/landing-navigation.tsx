import Link from "next/link"
import { Compass, Store, Download, LogIn } from "lucide-react"
import { Logo } from "./logo"

const navigationItems = [
  { icon: <Compass className="w-5 h-5" />, label: "Explore", href: "/explore" },
  { icon: <Store className="w-5 h-5" />, label: "Showrooms", href: "/showrooms" },
  { icon: <Download className="w-5 h-5" />, label: "Get the App", href: "/download" },
  { icon: <LogIn className="w-5 h-5" />, label: "Sign In", href: "/auth/login" },
]

export function LandingNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-t border-gray-800">
      <nav className="flex items-center justify-around h-16">
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400 hover:text-white"
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 
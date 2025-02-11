"use client"

import { Home, Glasses, ShoppingBag, Sparkles, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth"
import { Button } from "../ui/button"
import Image from "next/image"

const navigationItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/app" },
  { icon: <ShoppingBag className="w-5 h-5" />, label: "Shop", href: "/app/collections" },
  { icon: <Glasses className="w-5 h-5" />, label: "Try On", href: "/app/try-on" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Events", href: "/app/events" },
]

export function AppNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                  {user?.attributes?.picture ? (
                    <Image
                      src={user.attributes.picture}
                      alt={user.attributes.name || "Profile picture"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{user?.attributes?.name || "Guest User"}</h2>
                  <p className="text-sm text-gray-500">{user?.username}</p>
                </div>
              </div>
              <Link 
                href="/app/profile"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t lg:hidden">
        <nav className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-3 transition-colors ${
                  isActive 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
} 
"use client"

import { useState } from "react"
import { MinimalBanner } from "@/components/ui/minimal-banner"
import { Home, Glasses, ShoppingBag, Sparkles, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from 'aws-amplify/auth'
import { useRouter, usePathname } from 'next/navigation'

const navigationItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/app" },
  { icon: <Glasses className="w-5 h-5" />, label: "Try On", href: "/app/try-on" },
  { icon: <ShoppingBag className="w-5 h-5" />, label: "Collections", href: "/app/collections" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Events", href: "/app/events" },
  { icon: <User className="w-5 h-5" />, label: "Profile", href: "/app/profile" },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <MinimalBanner />
      
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">Premium Member</p>
              </div>
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

          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
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

      {/* Main Content */}
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
} 
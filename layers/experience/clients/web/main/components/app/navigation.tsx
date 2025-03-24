'use server'

import { Home, Glasses, ShoppingBag, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthenticatedUser } from '@/utils/amplify-server-utils'
import { Logo } from '@/components/ui/logo'

const navigationItems = [
  { icon: <Home className="w-6 h-6" />, label: 'Home', href: '/app' },
  { icon: <ShoppingBag className="w-6 h-6" />, label: 'Shop', href: '/app/collections' },
  { icon: <Glasses className="w-6 h-6" />, label: 'Try On', href: '/app/try-on' },
  { icon: <Sparkles className="w-6 h-6" />, label: 'Events', href: '/app/events' },
]

// Separate mobile and desktop navigation items
const desktopNavigationItems = [
  ...navigationItems,
  { icon: <User className="w-6 h-6" />, label: 'Profile', href: '/app/profile' },
]

const mobileNavigationItems = navigationItems

type AppNavigationProps = {
  user: AuthenticatedUser
}

export async function AppNavigation({ user }: AppNavigationProps) {
  const userName = 'john_doe_2'
  const displayName = user?.name || 'Guest User'

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-[244px] bg-white transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out border-r border-gray-100">
        <div className="flex flex-col h-full py-2">
          {/* Brand Section */}
          <div className="px-3 py-4">
            <Link href="/app" className="flex items-center px-3 py-1">
              <Logo
                variant="minimal"
                shape="square"
                size="lg"
                className="hover:scale-95 transition-transform"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 mt-4">
            <div className="space-y-1">
              {desktopNavigationItems.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 px-3 py-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-50 group transition-colors"
                >
                  <span className="relative">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto px-3">
            <Link
              href="/app/profile"
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 group transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden">
                {user?.picture ? (
                  <Image
                    src={user.picture}
                    alt={displayName}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium text-gray-800">{displayName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 lg:hidden">
        <nav className="flex items-center justify-around">
          {mobileNavigationItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center py-3 px-6"
            >
              <span className="text-gray-800">{item.icon}</span>
            </Link>
          ))}
          <Link href="/app/profile" className="flex flex-col items-center py-3 px-6">
            <div className="w-6 h-6 rounded-full bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt={displayName}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-gray-800" />
              )}
            </div>
          </Link>
        </nav>
      </div>
    </>
  )
}

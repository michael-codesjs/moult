'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Search as SearchIcon,
  SlidersHorizontal,
  Clock,
  TrendingUp,
  User,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './button'
import { Popover } from './popover'

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function Search({ placeholder = 'Search...', onSearch, className = '' }: SearchProps) {
  const [isActive, setIsActive] = useState(false)
  const [query, setQuery] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { user, handleSignOut, loading } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch?.(value)
  }

  const profileContent = (
    <div className="w-64 p-4 space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
            {user?.attributes?.picture ? (
              <Image
                src={user.attributes.picture}
                alt={user.attributes.name || 'Profile picture'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-purple-600" />
            )}
          </div>
          <div>
            <h2 className="font-semibold">{user?.attributes?.name || 'Guest User'}</h2>
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
  )

  return (
    <div className="flex items-center gap-4">
      {/* Search Container */}
      <div ref={containerRef} className="flex-1 relative">
        {/* Blurred Backdrop */}
        {isActive && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" style={{ zIndex: 9998 }} />
        )}

        {/* Search Input and Suggestions Container */}
        <div className="relative" style={{ zIndex: 9999 }}>
          {/* Search Input */}
          <div
            className={`${isActive ? 'bg-white shadow-lg' : 'bg-gray-100/80'} rounded-full transition-all duration-200`}
          >
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => setIsActive(true)}
                className="w-full pl-11 pr-12 h-11 text-sm bg-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
                  <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Suggestions */}
          {isActive && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-2">
                {/* Recent Searches */}
                <div className="px-3 py-2">
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Recent Searches</h3>
                  <div className="space-y-2">
                    <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Digital Fashion Week</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">AR Accessories</span>
                    </button>
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="px-3 py-2 border-t">
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Trending</h3>
                  <div className="space-y-2">
                    <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4 text-pink-500" />
                      <span className="text-sm">Metaverse Fashion</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4 text-pink-500" />
                      <span className="text-sm">Virtual Try-On</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4 text-pink-500" />
                      <span className="text-sm">Digital Couture</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Button */}
      <div className="flex-none" style={{ zIndex: 9999 }}>
        <Popover
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
          content={profileContent}
          side="bottom"
          align="end"
          sideOffset={8}
        >
          <button className="lg:hidden w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
            {user?.attributes?.picture ? (
              <Image
                src={user.attributes.picture}
                alt={user.attributes.name || 'Profile picture'}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </Popover>
      </div>
    </div>
  )
}

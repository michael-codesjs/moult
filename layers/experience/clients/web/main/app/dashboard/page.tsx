'use client'

import { useState } from 'react'
import { MinimalBanner } from '@/components/ui/minimal-banner'
import { FlipCounter } from '@/components/ui/flip-counter'
import {
  ArrowRight,
  Box,
  Brain,
  Glasses,
  ShoppingBag,
  Sparkles,
  Bell,
  Settings,
  User,
  Menu,
  LogOut,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'

const quickActions = [
  {
    title: 'Try On Items',
    description: 'Use AI to virtually try on new items',
    icon: <Glasses className="w-6 h-6 text-purple-600" />,
    href: '/try-on',
    color: 'bg-purple-50',
  },
  {
    title: 'Browse Collections',
    description: 'Explore digital fashion collections',
    icon: <ShoppingBag className="w-6 h-6 text-pink-600" />,
    href: '/collections',
    color: 'bg-pink-50',
  },
  {
    title: 'AI Style Match',
    description: 'Get personalized style recommendations',
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    href: '/style-match',
    color: 'bg-blue-50',
  },
  {
    title: 'Live Events',
    description: 'Join virtual fashion shows and events',
    icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
    href: '/events',
    color: 'bg-cyan-50',
  },
]

const recentActivity = [
  {
    action: 'Tried on Neon Cyber Jacket',
    timestamp: '2 hours ago',
    icon: <Glasses className="w-4 h-4" />,
  },
  {
    action: 'Attended Virtual Fashion Show',
    timestamp: 'Yesterday',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    action: 'Received Style Recommendations',
    timestamp: '2 days ago',
    icon: <Brain className="w-4 h-4" />,
  },
]

const sidebarLinks = [
  { icon: <Home className="w-5 h-5" />, label: 'Overview', href: '/dashboard' },
  { icon: <Glasses className="w-5 h-5" />, label: 'Try On', href: '/try-on' },
  { icon: <ShoppingBag className="w-5 h-5" />, label: 'Collections', href: '/collections' },
  { icon: <Sparkles className="w-5 h-5" />, label: 'Events', href: '/events' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/settings' },
]

export default function Dashboard() {
  const [stats] = useState({
    itemsTried: 24,
    eventsAttended: 3,
    savedItems: 12,
    styleMatches: 48,
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

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

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out shadow-lg`}
      >
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
            {sidebarLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
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

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b mt-12">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-24 lg:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
            <p className="mt-1 text-sm text-gray-500">Here's what's happening with your account.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {Object.entries(stats).map(([key, value], index) => {
              const icons = {
                itemsTried: <Glasses className="w-full h-full" />,
                eventsAttended: <Sparkles className="w-full h-full" />,
                savedItems: <Box className="w-full h-full" />,
                styleMatches: <Brain className="w-full h-full" />,
              }
              const colors = {
                itemsTried: 'purple',
                eventsAttended: 'pink',
                savedItems: 'blue',
                styleMatches: 'cyan',
              }
              const titles = {
                itemsTried: 'Items Tried On',
                eventsAttended: 'Events Attended',
                savedItems: 'Saved Items',
                styleMatches: 'Style Matches',
              }
              return (
                <div
                  key={key}
                  className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.05] hover:shadow-md transition-shadow"
                >
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-[0.06]">
                    {icons[key as keyof typeof icons]}
                  </div>
                  <div className="p-6">
                    <dt className="text-sm font-medium text-gray-500">
                      {titles[key as keyof typeof titles]}
                    </dt>
                    <dd
                      className={`mt-2 text-3xl font-bold text-${colors[key as keyof typeof colors]}-600`}
                    >
                      <FlipCounter value={value} />
                    </dd>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map(action => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.05] hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div
                    className={`absolute top-6 right-6 w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}
                  >
                    {action.icon}
                  </div>
                  <div className="pr-12">
                    <h3 className="font-medium mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.05] divide-y">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-gray-100">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { FlipCounter } from "@/components/ui/flip-counter"
import { ArrowRight, Box, Brain, Glasses, ShoppingBag, Sparkles, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "Try On Items",
    description: "Use AI to virtually try on new items",
    icon: <Glasses className="w-6 h-6 text-purple-600" />,
    href: "/app/try-on",
    color: "bg-purple-50"
  },
  {
    title: "Browse Collections",
    description: "Explore digital fashion collections",
    icon: <ShoppingBag className="w-6 h-6 text-pink-600" />,
    href: "/app/collections",
    color: "bg-pink-50"
  },
  {
    title: "AI Style Match",
    description: "Get personalized style recommendations",
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    href: "/app/style-match",
    color: "bg-blue-50"
  },
  {
    title: "Live Events",
    description: "Join virtual fashion shows and events",
    icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
    href: "/app/events",
    color: "bg-cyan-50"
  }
]

const recentActivity = [
  {
    action: "Tried on Neon Cyber Jacket",
    timestamp: "2 hours ago",
    icon: <Glasses className="w-4 h-4" />,
  },
  {
    action: "Attended Virtual Fashion Show",
    timestamp: "Yesterday",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    action: "Received Style Recommendations",
    timestamp: "2 days ago",
    icon: <Brain className="w-4 h-4" />,
  }
]

export default function ProfilePage() {
  const { handleSignOut, loading: signOutLoading } = useAuth()
  const [stats] = useState({
    itemsTried: 24,
    eventsAttended: 3,
    savedItems: 12,
    styleMatches: 48
  })

  return (
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
            styleMatches: <Brain className="w-full h-full" />
          }
          const colors = {
            itemsTried: 'purple',
            eventsAttended: 'pink',
            savedItems: 'blue',
            styleMatches: 'cyan'
          }
          const titles = {
            itemsTried: 'Items Tried On',
            eventsAttended: 'Events Attended',
            savedItems: 'Saved Items',
            styleMatches: 'Style Matches'
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
                <dt className="text-sm font-medium text-gray-500">{titles[key as keyof typeof titles]}</dt>
                <dd className={`mt-2 text-3xl font-bold text-${colors[key as keyof typeof colors]}-600`}>
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
          {quickActions.map((action) => (
            <Link 
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.05] hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`absolute top-6 right-6 w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
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
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="p-2 rounded-full bg-gray-100">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.timestamp}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.05] p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                defaultValue="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                defaultValue="+1 234 567 8900"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Session Details Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Session Details</h2>
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.05] p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Current Session</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>Device: Chrome on MacOS</p>
                <p>IP Address: 192.168.1.1</p>
                <p>Last Active: Just now</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Active Sessions</h3>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Chrome on MacOS</p>
                    <p className="text-gray-500">Last active: 2 minutes ago</p>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">
                    End Session
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Safari on iPhone</p>
                    <p className="text-gray-500">Last active: 1 hour ago</p>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">
                    End Session
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                End All Other Sessions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.05] p-6">
          <div className="flex flex-col space-y-2 items-center justify-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">Sign Out</h3>
            <p className="text-sm text-gray-500">You will be redirected to the login page</p>
            <Button
              onClick={handleSignOut}
              loading={signOutLoading}
              className="min-w-[200px] bg-red-100 text-red-600 gap-2"
              variant="outline"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 
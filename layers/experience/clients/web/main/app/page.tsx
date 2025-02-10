"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, Brain, Glasses, ShoppingBag, Sparkles, Code, Shapes } from "lucide-react"
import { useState, useEffect } from "react"
import { FlipCounter } from "@/components/ui/flip-counter"
import { CountdownCounter } from "@/components/ui/countdown-counter"
import { MinimalBanner } from "@/components/ui/minimal-banner"

const features = [
  {
    title: "AI-Powered Virtual Try-On",
    description: "Experience real-time, AI-driven virtual fitting with unprecedented accuracy. Our neural networks ensure perfect size and style matching.",
    icon: <Brain className="w-8 h-8 text-purple-600" />,
    gradient: "from-purple-100 to-pink-100"
  },
  {
    title: "Metaverse Marketplace",
    description: "Buy, sell, and trade both physical and digital fashion in our immersive 3D marketplace. Connect with brands in the metaverse.",
    icon: <Box className="w-8 h-8 text-blue-600" />,
    gradient: "from-blue-100 to-cyan-100"
  },
  {
    title: "3D Fashion Studio",
    description: "Create next-gen fashion in our advanced 3D studio. Design, animate, and bring your digital fashion to life.",
    icon: <ShoppingBag className="w-8 h-8 text-emerald-600" />,
    gradient: "from-emerald-100 to-teal-100"
  },
  {
    title: "AR Fashion Shows",
    description: "Experience runway shows in augmented reality. Place virtual models right in your space and interact with collections.",
    icon: <Glasses className="w-8 h-8 text-orange-600" />,
    gradient: "from-orange-100 to-red-100"
  }
]

// Stats initial values and increment ranges
const statsConfig = {
  digitalCollections: { initial: 1234, maxIncrement: 3 },
  virtualTryOns: { initial: 856, maxIncrement: 5 },
  aiMatches: { initial: 2891, maxIncrement: 8 },
  metaverseEvents: { initial: 142, maxIncrement: 1 }
}

export default function Home() {
  const [stats, setStats] = useState({
    digitalCollections: statsConfig.digitalCollections.initial,
    virtualTryOns: statsConfig.virtualTryOns.initial,
    aiMatches: statsConfig.aiMatches.initial,
    metaverseEvents: statsConfig.metaverseEvents.initial
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        digitalCollections: prevStats.digitalCollections + Math.floor(Math.random() * statsConfig.digitalCollections.maxIncrement),
        virtualTryOns: prevStats.virtualTryOns + Math.floor(Math.random() * statsConfig.virtualTryOns.maxIncrement),
        aiMatches: prevStats.aiMatches + Math.floor(Math.random() * statsConfig.aiMatches.maxIncrement),
        metaverseEvents: prevStats.metaverseEvents + Math.floor(Math.random() * statsConfig.metaverseEvents.maxIncrement)
      }))
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Format number with commas
  const formatNumber = (num: number) => num.toLocaleString()

  return (
    <main className="relative min-h-screen">
      <MinimalBanner />
        {/* Fashion Week Banner */}
        <div className="relative flex items-center justify-center gap-x-6 overflow-hidden bg-gradient-to-r from-purple-600/50 to-pink-600/50 backdrop-blur-sm px-6 py-3 sm:px-3.5">
        <div className="flex items-center justify-center gap-x-4 gap-y-2 max-w-7xl mx-auto">
          <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">Fashion Week {new Date().getFullYear()}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
            Experience the future of fashion with our virtual runway show
          </p>
          <Link
            href="/fashion-week" 
            className="flex-none rounded-full bg-white/20 px-3.5 py-1 text-sm font-semibold hover:cursor-pointer text-white shadow-sm hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Register now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="relative z-10 min-h-screen">
        {/* Combined Hero and Stats Section */}
        <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Hero Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Fashion in the
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient">
                  Digital Dimension
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Step into a world where AI meets style, where virtual becomes reality, and where fashion transcends physical limitations.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 px-6 text-base group">
                    Get Started 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/try-on">
                  <Button variant="outline" size="lg" className="border-purple-400 text-purple-600 hover:bg-purple-50 h-12 px-6 text-base">
                    Try AR Fashion
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="w-full">
              <div className="relative overflow-hidden rounded-3xl">
                <dl className="grid grid-cols-2 gap-4 text-center lg:grid-cols-4">
                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-white shadow-inner ring-1 ring-black/[0.02]">
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-purple-600 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.digitalCollections} />
                      </dd>
                      <dt className="text-sm font-medium text-purple-900/70">Digital Collections</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Box className="w-full h-full text-purple-950" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-white shadow-inner ring-1 ring-black/[0.02]">
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-pink-600 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.virtualTryOns} />
                      </dd>
                      <dt className="text-sm font-medium text-pink-900/70">Virtual Try-Ons Today</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Glasses className="w-full h-full text-pink-950" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-white shadow-inner ring-1 ring-black/[0.02]">
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-blue-600 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.aiMatches} />
                      </dd>
                      <dt className="text-sm font-medium text-blue-900/70">AI Style Matches</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Brain className="w-full h-full text-blue-950" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-white shadow-inner ring-1 ring-black/[0.02]">
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-cyan-600 group-hover:scale-105 transition-transform">
                        <CountdownCounter value={stats.metaverseEvents} />
                      </dd>
                      <dt className="text-sm font-medium text-cyan-900/70">Live Events</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles className="w-full h-full text-cyan-950" />
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

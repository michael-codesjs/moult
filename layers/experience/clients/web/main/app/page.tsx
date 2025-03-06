"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, Brain, Glasses, ShoppingBag, Sparkles, Code, Shapes } from "lucide-react"
import { useState, useEffect } from "react"
import { FlipCounter } from "@/components/ui/flip-counter"
import { CountdownCounter } from "@/components/ui/countdown-counter"
import { MinimalBanner } from "@/components/ui/minimal-banner"
import { LandingNavigation } from "@/components/ui/landing-navigation"
import { Logo } from "@/components/ui/logo"

const features = [
  {
    title: "AI-Powered Virtual Try-On",
    description: "Experience real-time, AI-driven virtual fitting with unprecedented accuracy. Our neural networks ensure perfect size and style matching.",
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    gradient: "from-purple-900/20 to-pink-900/20"
  },
  {
    title: "The Moulti-verse",
    description: "Step into our digital showrooms where physical stores come to life in stunning 3D, AR, and VR experiences. Shop across dimensions.",
    icon: <Box className="w-8 h-8 text-blue-400" />,
    gradient: "from-blue-900/20 to-cyan-900/20"
  },
  {
    title: "Smart Style Assistant",
    description: "Get personalized style recommendations powered by AI. Discover new looks that match your unique taste.",
    icon: <ShoppingBag className="w-8 h-8 text-emerald-400" />,
    gradient: "from-emerald-900/20 to-teal-900/20"
  },
  {
    title: "AR Fashion Shows",
    description: "Experience runway shows in augmented reality. Place virtual models right in your space and interact with collections.",
    icon: <Glasses className="w-8 h-8 text-orange-400" />,
    gradient: "from-orange-900/20 to-red-900/20"
  }
]

// Stats initial values and increment ranges
const statsConfig = {
  digitalCollections: { initial: 1234, maxIncrement: 3 },
  virtualTryOns: { initial: 856, maxIncrement: 5 },
  aiMatches: { initial: 2891, maxIncrement: 8 },
  liveEvents: { initial: 142, maxIncrement: 1 }
}

export default function Home() {
  const [stats, setStats] = useState({
    digitalCollections: statsConfig.digitalCollections.initial,
    virtualTryOns: statsConfig.virtualTryOns.initial,
    aiMatches: statsConfig.aiMatches.initial,
    liveEvents: statsConfig.liveEvents.initial
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        digitalCollections: prevStats.digitalCollections + Math.floor(Math.random() * statsConfig.digitalCollections.maxIncrement),
        virtualTryOns: prevStats.virtualTryOns + Math.floor(Math.random() * statsConfig.virtualTryOns.maxIncrement),
        aiMatches: prevStats.aiMatches + Math.floor(Math.random() * statsConfig.aiMatches.maxIncrement),
        liveEvents: prevStats.liveEvents + Math.floor(Math.random() * statsConfig.liveEvents.maxIncrement)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Format number with commas
  const formatNumber = (num: number) => num.toLocaleString()

  return (
    <main className="relative min-h-screen pb-16 lg:pb-0 text-white">
      <MinimalBanner />
      <LandingNavigation />
      {/* Fashion Week Banner */}
      <div className="relative flex items-center justify-center gap-x-6 overflow-hidden bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm px-6 py-3 sm:px-3.5">
        <div className="flex items-center justify-center space-x-4 gap-y-2 max-w-7xl mx-auto">
          <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">Fashion Week {new Date().getFullYear()}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
            Experience the future of fashion with our virtual runway show
          </p>
          <Link
            href="/fashion-week" 
            className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold hover:cursor-pointer text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Register now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="relative z-10">
        {/* Combined Hero and Stats Section */}
        <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {/* Hero Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                The Future of
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
                  Digital Fashion
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                Experience fashion like never before with AI-powered styling, immersive shopping, and virtual try-ons that blur the line between digital and physical.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 h-12 px-6 text-base group text-white border-0">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/try-on">
                  <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-950/50 h-12 px-6 text-base">
                    Try AR Fashion
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="w-full">
              <div className="relative overflow-hidden rounded-3xl">
                <dl className="grid grid-cols-2 gap-4 text-center lg:grid-cols-4">
                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-gray-900/50 backdrop-blur-sm shadow-inner ring-1 ring-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-purple-400 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.digitalCollections} />
                      </dd>
                      <dt className="text-sm font-medium text-purple-200/70">Digital Collections</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Box className="w-full h-full text-purple-300" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-gray-900/50 backdrop-blur-sm shadow-inner ring-1 ring-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-transparent" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-pink-400 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.virtualTryOns} />
                      </dd>
                      <dt className="text-sm font-medium text-pink-200/70">Virtual Try-Ons Today</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Glasses className="w-full h-full text-pink-300" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-gray-900/50 backdrop-blur-sm shadow-inner ring-1 ring-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-blue-400 group-hover:scale-105 transition-transform">
                        <FlipCounter value={stats.aiMatches} />
                      </dd>
                      <dt className="text-sm font-medium text-blue-200/70">AI Style Matches</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Brain className="w-full h-full text-blue-300" />
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl p-10 bg-gray-900/50 backdrop-blur-sm shadow-inner ring-1 ring-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent" />
                    <div className="relative flex flex-col gap-1">
                      <dd className="text-3xl font-bold tracking-tight text-cyan-400 group-hover:scale-105 transition-transform">
                        <CountdownCounter value={stats.liveEvents} />
                      </dd>
                      <dt className="text-sm font-medium text-cyan-200/70">Live Events</dt>
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles className="w-full h-full text-cyan-300" />
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Redefining Fashion Experiences
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Discover a new era of fashion where cutting-edge technology creates immersive, personalized experiences for every shopper.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative group overflow-hidden rounded-3xl bg-gray-900/50 backdrop-blur-sm p-8 ring-1 ring-white/[0.05] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/[0.05]">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { MinimalBanner } from "@/components/ui/minimal-banner"
import { AppNavigation } from "@/components/app/navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <MinimalBanner />
      <AppNavigation />
      
      {/* Main Content */}
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
} 
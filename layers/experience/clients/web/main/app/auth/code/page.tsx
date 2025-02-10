"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Banner } from "@/components/ui/banner"
import Image from "next/image"
import { OTPInput } from "@/components/ui/otp-input"
import { useAuth } from "@/hooks/useAuth"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/toast/toast-provider"

interface ResendButtonProps {
  onResend: () => void
  isLoading?: boolean
}

function ResendButton({ onResend, isLoading }: ResendButtonProps) {
  const [countdown, setCountdown] = useState(0)
  const [isResendDisabled, setIsResendDisabled] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setIsResendDisabled(false)
    }
  }, [countdown])

  const handleResend = () => {
    onResend()
    setIsResendDisabled(true)
    setCountdown(60)
  }

  return (
    <button
      onClick={handleResend}
      disabled={isResendDisabled || isLoading}
      className="text-slate-600 text-md font-medium transition-colors"
    >
      Didn't receive a code?{" "}
      {countdown > 0 ? (
        <span className="text-slate-400">
          Resend in {countdown}s
        </span>
      ) : (
        <span className="text-purple-600 hover:text-purple-700 transition-colors cursor-pointer">
          Send again
        </span>
      )}
    </button>
  )
}

function VerificationContent() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const username = searchParams.get("username")
  const mode = searchParams.get("mode") as "signin" | "signup" | "signup_auto_confirmed"
  const { answerAuthenticationChallange, loading: verificationLoading } = useAuth()
  const { toast } = useToast()

  const isSignInMode = mode === "signin"
  const pageTitle = isSignInMode ? "Verify your identity" : "Check your inbox"
  const pageDescription = isSignInMode 
    ? "We've sent you a verification code to confirm it's really you."
    : "Enter the 6-digit code we sent you to continue."

  const handleVerify = async () => {
    if (!username) {
      toast("Missing username. Please try again.", { status: "error" })
      return
    }

    const code = otp.join("")
    if (code.length !== 6) {
      toast("Please enter the complete verification code.", { status: "error" })
      return
    }

    setLoading(true)
    try {
      await answerAuthenticationChallange(username, code)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed. Please try again."
      toast(errorMessage, { status: "error" })
      console.error("Verification error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!username) {
      toast("Missing username. Please try again.", { status: "error" })
      return
    }

    // TODO: Implement resend for both sign-up and sign-in modes
    toast("Verification code resent.", { status: "success" })
  }

  if (!username) {
    return (
     
      <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Invalid Request</h1>
            <p className="text-base sm:text-md md:text-lg text-slate-500">
              Please try again.
            </p>
          </div>
        </div>
    )
  }

  return (
  
  <div className="flex flex-col items-center justify-center w-full">
      <div className="flex-col text-center space-y-2 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Check your inbox
        </h1>
        <p className="text-base sm:text-md md:text-lg text-slate-500 max-w-md">
          We've sent you a verification code to confirm it's really you.
        </p>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="flex flex-col space-y-8">
          <OTPInput
            value={otp}
            onChange={setOtp}
            label="Verification code"
          />

          <Button
            className="w-full h-14 text-lg bg-[#9333EA] hover:bg-[#7928CA] hover:shadow-lg rounded-full"
            onClick={handleVerify}
            loading={loading || verificationLoading}
          >
            Continue
          </Button>

          <ResendButton onResend={handleResend} isLoading={loading || verificationLoading} />
        </div>
      </div>
    </div>
  )
}

export default function VerificationScreen() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Loading...</h1>
        </div>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  )
}
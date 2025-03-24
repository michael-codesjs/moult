'use client'

import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Banner } from '@/components/ui/banner'
import Image from 'next/image'
import { OTPInput } from '@/components/ui/otp-input'
import { useAuth } from '@/hooks/useAuth'
import { useSearchParams, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toast/toast-provider'
import { Logo } from '@/components/ui/logo'

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
        setCountdown(prev => prev - 1)
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
      className="text-gray-400 text-md font-medium transition-colors"
    >
      Didn't receive a code?{' '}
      {countdown > 0 ? (
        <span className="text-gray-500">Resend in {countdown}s</span>
      ) : (
        <span className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
          Send again
        </span>
      )}
    </button>
  )
}

function VerificationContent() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const mode = searchParams.get('mode') as 'signin' | 'signup' | 'signup_auto_confirmed'
  const { answerAuthenticationChallange, loading: verificationLoading } = useAuth()
  const { toast } = useToast()

  const isSignInMode = mode === 'signin'
  const pageTitle = isSignInMode ? 'Verify your identity' : 'Check your inbox'
  const pageDescription = isSignInMode
    ? "We've sent you a verification code to confirm it's really you."
    : 'Enter the 6-digit code we sent you to continue.'

  const handleVerify = async () => {
    if (!username) {
      toast('Missing username. Please try again.', { status: 'error' })
      return
    }

    const code = otp.join('')
    if (code.length !== 6) {
      toast('Please enter the complete verification code.', { status: 'error' })
      return
    }

    setLoading(true)
    try {
      await answerAuthenticationChallange(username, code)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Verification failed. Please try again.'
      toast(errorMessage, { status: 'error' })
      console.error('Verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!username) {
      toast('Missing username. Please try again.', { status: 'error' })
      return
    }

    // TODO: Implement resend for both sign-up and sign-in modes
    toast('Verification code resent.', { status: 'success' })
  }

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="mb-6">
          <Logo
            variant="minimal"
            size="xl"
            shape="square"
            className="hover:scale-95 transition-transform text-white"
          />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Invalid Request
          </h1>
          <p className="text-base sm:text-md md:text-lg text-gray-400">Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-6">
        <Logo
          variant="minimal"
          size="xl"
          shape="square"
          className="hover:scale-95 transition-transform text-white"
        />
      </div>
      <div className="flex-col text-center space-y-2 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Check your inbox
        </h1>
        <p className="text-base sm:text-md md:text-lg text-gray-400 max-w-md">
          We've sent you a verification code to confirm it's really you.
        </p>
        <div className="mt-2 px-4 py-2 bg-gray-800/50 text-purple-400 rounded-lg text-sm inline-block ring-1 ring-white/[0.05]">
          🛠️ Development mode: Use code <span className="font-mono font-medium">123456</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/[0.05] p-8">
        <div className="flex flex-col space-y-8">
          <OTPInput value={otp} onChange={setOtp} label="Verification code" />

          <Button
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 rounded-full shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40"
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
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Loading...</h1>
          </div>
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  )
}

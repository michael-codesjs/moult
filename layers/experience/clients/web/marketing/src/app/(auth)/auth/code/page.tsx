'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PinInput } from '@/components/input/Pin';
import Button from '@/components/button/Button';
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from 'react-hook-form';

export default function CodeVerificationPage() {
  const [code, setCode] = useState(''.padEnd(6, ''));
  const { handleSubmit, formState: { isSubmitting } } = useForm()
  const params = useSearchParams();
  const username = params.get('username') || '';

  const { answerAuthenticationChallenge } = useAuth()

  const handleVerify = async () => {
    if (!username) {
      toast.error('Missing username. Please try again.')
      return
    }

    if (code.length !== 6) {
      toast.error('Please enter the complete verification code.')
      return
    }

    try {
      await answerAuthenticationChallenge(username, code)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Verification failed. Please try again.'
      toast.error(errorMessage)
      console.error('Verification error:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent relative">
       <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">Check your inbox</h1>
        <p className="text-center text-gray-300">
           We've sent you a verification code to confirm it's really you.
        </p>
      </div>
      <div className="mb-8">
        <div className="bg-black/40 border border-purple-900/40 rounded-xl px-6 py-2 flex items-center justify-center text-purple-300 text-md font-mono">
          <span className="mr-2">🛠️ Development mode:</span> Use code <span className="font-bold underline ml-1">123456</span>
        </div>
      </div>
      <div className="w-full max-w-md bg-black/40 border border-purple-900/40 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col items-center">
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(handleVerify)}>
          <label className="w-full block bg text-lg font-medium text-gray-200 mb-6">Verification code</label>
          <PinInput value={code} onChange={setCode} length={6} />
          <Button
            type="submit"
            className="w-full mt-10 mb-2 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-lg font-semibold py-4 rounded-full shadow-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all"
            isLoading={isSubmitting}
            disabled={code.length !== 6 || isSubmitting}
          >
            Continue
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-md">
          Didn't receive a code?{' '}
          <a href="#" className="text-purple-300 hover:underline">Send again</a>
        </div>
      </div>
    </div>
  );
} 
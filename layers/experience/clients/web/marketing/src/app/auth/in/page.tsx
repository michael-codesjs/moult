'use client'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/input/Input';
import { Country } from '@/components/input/PhoneInput';
import Button from '@/components/button/Button';
import countriesData from '@/components/input/countries.json';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

export default function SignInPage() {
  const [useEmail, setUseEmail] = useState(false);
  const countries: Country[] = countriesData.countries || countriesData;
  const [country, setCountry] = useState<Country>(countries.find(c => c.code === 'US') || countries[0]);
  const { signInUser } = useAuth();

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email?: string; phone?: string; password: string }) => {
    const username = useEmail ? data.email : `${country.dialCode}${data.phone}`;
    await signInUser({
      username: username || '',
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">Welcome back</h1>
        <p className="text-center text-gray-300">
          Not part of the community?{' '}
          <a href="/auth/up" className="text-purple-300 hover:underline">Create an account →</a>
        </p>
      </div>
      <div className="relative z-10 w-full max-w-[460px] mx-auto bg-black/30 rounded-2xl shadow-xl p-8 md:p-10 lg:p-12 border border-purple-900/30 backdrop-blur-md">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor={useEmail ? 'email' : 'phone'} className="block text-md font-medium text-gray-300">{useEmail ? 'Email:' : 'Phone Number:'}</label>
                {useEmail && errors.email && <span className="text-red-400 text-xs">{errors.email.message as string}</span>}
                {!useEmail && errors.phone && <span className="text-red-400 text-xs">{errors.phone.message as string}</span>}
              </div>
              <button
                type="button"
                className="text-sm underline text-purple-300 hover:underline focus:outline-none"
                onClick={() => setUseEmail((v) => !v)}
              >
                use {useEmail ? 'phone' : 'email'}
              </button>
            </div>
            {useEmail ? (
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    autoComplete="email"
                  />
                )}
              />
            ) : (
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <Input
                    id="phone"
                    type="phone"
                    value={field.value}
                    onChange={field.onChange}
                    country={country}
                    onCountryChange={setCountry}
                    name="phone"
                    autoComplete="tel"
                  />
                )}
              />
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="password" className="block text-md font-medium text-gray-300">Password:</label>
              {errors.password && <span className="text-red-400 text-xs">{errors.password.message as string}</span>}
            </div>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    autoComplete="current-password"
                    className="pr-12"
                  />
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-lg font-semibold py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>
      </div>
      <div className="my-8 flex flex-col items-center">
        <span className="text-gray-400 text-lg mb-4">or continue with</span>
        <div className="flex flex-row gap-8">
          <button aria-label="Sign in with Google" className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-600 bg-transparent hover:bg-white/10 transition focus:outline-none">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <g>
                <circle fill="#fff" cx="16" cy="16" r="16"/>
                <path d="M25.6 16.2c0-.7-.1-1.4-.2-2H16v3.8h5.4c-.2 1.1-.9 2.1-1.9 2.7v2.2h3c1.7-1.6 2.7-4 2.7-6.7z" fill="#4285F4"/>
                <path d="M16 26c2.4 0 4.4-.8 5.9-2.2l-3-2.2c-.8.5-1.8.8-2.9.8-2.2 0-4-1.5-4.7-3.5h-3v2.2C9.6 24.5 12.6 26 16 26z" fill="#34A853"/>
                <path d="M11.3 19c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5v-2.2h-3C7.5 15.2 7 16.5 7 18s.5 2.8 1.3 4l3-2.2z" fill="#FBBC05"/>
                <path d="M16 11.5c1.3 0 2.5.4 3.4 1.2l2.5-2.5C20.4 8.8 18.4 8 16 8c-3.4 0-6.4 1.5-8.3 3.8l3 2.2c.7-2 2.5-3.5 4.7-3.5z" fill="#EA4335"/>
              </g>
            </svg>
          </button>
          <button aria-label="Sign in with Facebook" className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-600 bg-transparent hover:bg-white/10 transition focus:outline-none">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle fill="#fff" cx="16" cy="16" r="16"/>
              <path d="M20.7 16H18v8h-3v-8h-2v-3h2v-1.7C15 9.6 16.2 8 18.6 8c1 0 1.9.1 2.1.1v2.5h-1.4c-.8 0-1 .4-1 1V13h2.8l-.4 3z" fill="#1877F3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
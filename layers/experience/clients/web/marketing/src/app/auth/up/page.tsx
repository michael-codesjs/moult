'use client'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/input/Input';
import { Country } from '@/components/input/PhoneInput';
import Button from '@/components/button/Button';
import countriesData from '@/components/input/countries.json';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

export default function SignUpPage() {
  const [useEmail, setUseEmail] = useState(false);
  const countries: Country[] = countriesData.countries || countriesData;
  const [country, setCountry] = useState<Country>(countries.find(c => c.code === 'US') || countries[0]);
  const { signUpUser } = useAuth();

  const { register, handleSubmit,  control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: {
    fullName: string,
    email?: string,
    phone?: string,
    password: string
}) => {
    console.log('data:', { ...data, country })
    const username_attribute = {
        [useEmail ? 'email' : 'phone']:
          useEmail ? data.email : `${country.dialCode}${data.phone}`,
          email: ''
    }
    await signUpUser({
        fullName: data.fullName,
        ...username_attribute,
        password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
      {/* Subtle background dots or lines can be added here if desired */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Optionally add a background component here */}
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">Create an account</h1>
        <p className="text-center text-gray-300">
          Already part of the community?{' '}
          <a href="/auth/in" className="text-purple-300 hover:underline">Login →</a>
        </p>
      </div>
      <div className="relative z-10 w-full max-w-[460px] mx-auto bg-black/30 rounded-2xl shadow-xl p-8 md:p-10 lg:p-12 border border-purple-900/30 backdrop-blur-md">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="fullName" className="block text-md font-medium text-gray-300">Full Name:</label>
              {errors.fullName && <span className="text-red-400 text-xs">{errors.fullName.message as string}</span>}
            </div>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'Full name is required' }}
              render={({ field }) => (
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name here."
                  {...field}
                  autoComplete="name"
                />
              )}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor={useEmail ? "email" : "phone"} className="block text-md font-medium text-gray-300">{useEmail ? 'Email:' : 'Phone Number:'}</label>
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
                    placeholder="Create a strong password"
                    {...field}
                    autoComplete="new-password"
                    className="pr-12"
                  />
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-lg font-semibold py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all" isLoading={isSubmitting}>
            Create My Account
          </Button>
        </form>
      </div>
      <div className="my-6 flex items-center justify-center">
        <span className="h-px w-10 bg-purple-900/40" />
        <span className="mx-3 text-gray-400 text-sm">or sign-up using</span>
        <span className="h-px w-10 bg-purple-900/40" />
      </div>
      <div className="flex justify-center space-x-6">
        <button aria-label="Sign up with Facebook" className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-purple-900/40 hover:bg-black/60 transition">
          <svg className="h-6 w-6 mx-auto block" viewBox="0 0 32 32" fill="#1877F3">
            <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h13V20h-4v-5h4v-3.5C16 8.57 18.239 7 20.857 7c1.13 0 2.143.084 2.429.123v4.02h-1.668c-1.308 0-1.561.623-1.561 1.535V15h4.5l-.587 5h-3.913v12h7c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3z"/>
          </svg>
        </button>
        <button aria-label="Sign up with Apple" className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-purple-900/40 hover:bg-black/60 transition">
          <svg className="h-6 w-6 mx-auto block" viewBox="0 0 24 24" fill="#fff">
            <path d="M16.365 1.43c0 1.14-.93 2.61-2.07 2.61-.12 0-.24-.01-.36-.03-.18-.22-.33-.5-.45-.81-.12-.32-.19-.66-.19-1.01 0-1.13.94-2.56 2.09-2.56.13 0 .25.01.37.03.18.22.33.5.45.81.12.32.19.66.19 1.01zm3.13 4.13c-1.13-.02-2.48.63-3.29.63-.84 0-2.13-.61-3.5-.61-1.8 0-3.45 1.05-4.37 2.68-1.87 3.25-.48 8.06 1.34 10.7.89 1.29 1.95 2.73 3.36 2.68 1.34-.05 1.85-.87 3.47-.87 1.61 0 2.08.87 3.48.84 1.44-.03 2.34-1.31 3.22-2.6.56-.85.79-1.29 1.24-2.26-3.26-1.25-3.77-5.97.72-6.97-.14-.44-.28-.87-.44-1.29-.7-1.7-2.3-2.82-4.01-2.83zm-3.13-4.13c0 1.14-.93 2.61-2.07 2.61-.12 0-.24-.01-.36-.03-.18-.22-.33-.5-.45-.81-.12-.32-.19-.66-.19-1.01 0-1.13.94-2.56 2.09-2.56.13 0 .25.01.37.03.18.22.33.5.45.81.12.32.19.66.19 1.01z"/>
          </svg>
        </button>
      </div>
    </div>
  );
} 
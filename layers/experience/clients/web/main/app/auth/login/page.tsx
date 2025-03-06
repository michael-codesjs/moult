"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CountrySelector } from "@/components/ui/country-selector"
import countriesData from "@/components/ui/country-selector/countries.json"
const { countries } = countriesData;
import { useAuth } from "@/hooks/useAuth"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons"
import { Banner } from "@/components/ui/banner"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"

type ContactMethod = "phone" | "email"

interface SignInFormData {
  email: string
  phone: string
  password: string
}

export default function Login() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone")
  const [selectedCountry, setSelectedCountry] = useState(countries.find(country => country.code === 'US') || countries[0])
  const [showPassword, setShowPassword] = useState(false)
  const { signInUser, loading, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    }
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const username = contactMethod === "email" ? data.email : `${selectedCountry.dialCode}${data.phone}`
      await signInUser({
        username,
        password: data.password,
      })
    } catch (err) {
      console.error("Sign in error:", err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-6">
        <Logo 
          variant="default"
          size="xl"
          shape="square"
          className="hover:scale-95 transition-transform text-white"
        />
      </div>
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-base sm:text-md md:text-lg text-gray-400 max-w-md">
          Not part of the community? <Link href="/auth/register" className="text-purple-400 hover:text-purple-300 inline-flex items-center justify-center"><span>Create an account</span> <ArrowRight className="inline-block w-4 h-4 ml-1" /></Link>
        </p>
      </div>
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-white/[0.05] p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          {contactMethod === "phone" ? (
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex items-center justify-between">
                <Label htmlFor="phone" className="text-gray-300">Phone Number:</Label>
                <button
                  type="button"
                  onClick={() => setContactMethod("email")}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  use email
                </button>
              </div>
              <div className="flex gap-2">
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onSelect={setSelectedCountry}
                />
                <Input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers"
                    }
                  })}
                  placeholder="Enter your phone number"
                  className="h-12 flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              {errors.phone && (
                <span className="text-sm text-red-400">{errors.phone.message}</span>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="text-gray-300">Email:</Label>
                <button
                  type="button"
                  onClick={() => setContactMethod("phone")}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  use phone
                </button>
              </div>
              <Input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Enter your email address"
                className="h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              />
              {errors.email && (
                <span className="text-sm text-red-400">{errors.email.message}</span>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-4 w-full">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-300">Password:</Label>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your password"
                className="h-12 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-400">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 rounded-full shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40"
          >
            Sign In
          </Button>
        </form>
      </div>
      <div className="mt-8 text-center space-y-4">
        <p className="text-gray-400">or sign in using</p>
        <div className="flex justify-center gap-4">
          <button className="p-3 bg-gray-900/50 rounded-full border border-gray-700 hover:bg-gray-800/50 transition-colors">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              width={24}
              height={24}
            />
          </button>
          <button className="p-3 bg-gray-900/50 rounded-full border border-gray-700 hover:bg-gray-800/50 transition-colors">
            <Image
              src="https://authjs.dev/img/providers/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  )
} 
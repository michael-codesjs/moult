"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CountrySelector } from "@/components/ui/country-selector"
import { countries } from "@/components/ui/country-selector/countries.json"
import { useSignUp } from "@/hooks/useSignUp"
import { Modal } from "@/components/ui/modal"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons"
import { Banner } from "@/components/ui/banner"

type ContactMethod = "phone" | "email"

interface SignUpFormData {
  fullName: string
  email: string
  phone: string
  password: string
}

export default function CreateAccount() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { signUpUser, confirmUser, loading, error } = useSignUp()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    }
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUpUser({
        fullName: data.fullName,
        email: contactMethod === "email" ? data.email : undefined,
        phone: contactMethod === "phone" ? `${selectedCountry.dialCode}${data.phone}` : undefined,
        password: data.password,
      })
      setShowConfirmation(true)
    } catch (err) {
      console.error("Sign up error:", err)
    }
  }

  const handleConfirmation = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = watch()
    const username = contactMethod === "email" ? formData.email : `${selectedCountry.dialCode}${formData.phone}`
    await confirmUser(username, confirmationCode)
  }

  return (
    <div className="relative min-h-screen">
      <Banner />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Create an account</h1>
          <div> 
          </div>
          <p className="text-base sm:text-md md:text-lg text-slate-500 max-w-md">
            Step into the Future of Fashion <br />
            Connect, Create, and Catwalk in 3D & VR!
            <br />
            {error && <span className="text-red-500">{error.message}</span>}
          </p>
        </div>
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4 w-full">
              <Label htmlFor="fullName">Full Name:</Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Full name is required" })}
                placeholder="Enter your full name here."
                className="h-12"
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">{errors.fullName.message}</span>
              )}
            </div>

            {contactMethod === "phone" ? (
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phone">Phone Number:</Label>
                  <button
                    type="button"
                    onClick={() => setContactMethod("email")}
                    className="text-sm text-blue-600 hover:underline"
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
                    className="h-12 flex-1"
                  />
                </div>
                {errors.phone && (
                  <span className="text-sm text-red-500">{errors.phone.message}</span>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email:</Label>
                  <button
                    type="button"
                    onClick={() => setContactMethod("phone")}
                    className="text-sm text-blue-600 hover:underline"
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
                  className="h-12"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
              </div>
            )}

            <div className="flex flex-col space-y-4 w-full">
              <Label htmlFor="password">Password:</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  placeholder="Create a strong password"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg bg-[#9333EA] hover:bg-[#7928CA] hover:shadow-lg rounded-full"
            >
              {loading ? "Creating Account..." : "Create My Account"}
            </Button>
          </form>
        </div>
        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-500">or sign-up using</p>
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-white rounded-full border hover:bg-gray-50 transition-colors">
              <Image
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
            <button className="p-3 bg-white rounded-full border hover:bg-gray-50 transition-colors">
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
    </div>
  )
}
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CountrySelector } from "@/components/ui/country-selector"
import { countries } from "@/components/ui/country-selector/countries.json"

type ContactMethod = "phone" | "email"

export default function CreateAccount() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  return (
    <div className="min-h-screen flex flex-col items-center sm:justify-center justify-end space-y-8 py-[10vh] bg-white">
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Create an account</h1>
        <p className="text-base sm:text-md md:text-lg text-slate-400">
          Lorem ipsum dolor sit amet consectetur.
          <br />
          Felis cursus massa libero a et pulvinar.
        </p>
      </div>
      <div className="w-full space-y-8 bg-slate-100 flex items-center justify-center">
        <div className="w-full max-w-md py-20 px-8">
          <form className="flex items-center justify-center flex-wrap space-y-8">
            <div className="flex flex-col space-y-4 w-full">
              <Label htmlFor="fullName">Full Name:</Label>
              <Input id="fullName" placeholder="Enter your full name here." className="h-12" />
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
                  <Input type="tel" placeholder="Enter your phone number" className="h-12 flex-1" />
                </div>
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
                <Input type="email" id="email" placeholder="Enter your email address" className="h-12" />
              </div>
            )}

            <Button type="submit" className="w-full h-14 text-lg bg-[#9333EA] hover:bg-[#7928CA] hover:shadow-lg rounded-full">
              Create My Account
            </Button>
          </form>
        </div>
      </div>
      <div className="text-center space-y-4">
        <p className="text-slate-400">or sign-up using</p>
        <div className="flex justify-center gap-4">
          <button className="p-3 rounded-full border hover:bg-gray-50 transition-colors">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              width={24}
              height={24}
            />
          </button>
          <button className="p-3 rounded-full border hover:bg-gray-50 transition-colors">
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
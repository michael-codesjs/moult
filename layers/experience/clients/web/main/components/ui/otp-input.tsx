import { useRef, type KeyboardEvent, type ClipboardEvent, type ChangeEvent } from "react"
import { Label } from "./label"

interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
  label?: string
}

export function OTPInput({ length = 6, value, onChange, label }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length > 1) return // Prevent multi-character input

    const newOtp = [...value]
    newOtp[index] = newValue
    onChange(newOtp)

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    const newOtp = [...value]

    pastedData.split("").forEach((char, index) => {
      if (index < length) newOtp[index] = char
    })

    onChange(newOtp)
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus()
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      {label && <Label className="text-md text-gray-300">{label}</Label>}
      <div className="flex items-center gap-3 justify-center w-full">
        {value.map((digit, index) => (
          <>
            <input
              key={`input-${index}`}
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-[15%] h-12 text-center text-white bg-gray-800/50 border-2 border-gray-700 rounded-lg text-lg font-semibold
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                       transition-all backdrop-blur-sm placeholder-gray-500"
              aria-label={`Digit ${index + 1}`}
            />
            {index < value.length - 1 && index % 2 === 1 && (
              <span key={`dash-${index}`} className="text-gray-600 text-2xl font-light">-</span>
            )}
          </>
        ))}
      </div>
    </div>
  )
} 
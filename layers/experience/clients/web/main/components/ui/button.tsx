import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-[#9333EA] text-white hover:bg-[#7928CA] focus:ring-purple-500",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500"
    }

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner 
              size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} 
            />
          </>
        ) : children}
      </button>
    )
  }
) 
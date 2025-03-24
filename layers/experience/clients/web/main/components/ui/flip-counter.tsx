import { useEffect, useState } from 'react'

interface FlipCounterProps {
  value: number
  className?: string
}

export function FlipCounter({ value, className = '' }: FlipCounterProps) {
  const [prevValue, setPrevValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (prevValue !== value) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setPrevValue(value)
        setIsAnimating(false)
      }, 300) // Half of the animation duration
      return () => clearTimeout(timer)
    }
  }, [value, prevValue])

  return (
    <div className={`relative ${className}`}>
      {/* Current number */}
      <div
        className={`transform transition-all duration-600 ${
          isAnimating ? 'animate-flip-down' : ''
        }`}
      >
        {value.toLocaleString()}
      </div>

      {/* Previous number - shows during animation */}
      {isAnimating && (
        <div className="absolute top-0 left-0 w-full animate-flip-up">
          {prevValue.toLocaleString()}
        </div>
      )}
    </div>
  )
}

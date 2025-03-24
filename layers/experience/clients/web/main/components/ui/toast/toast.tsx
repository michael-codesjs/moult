'use client'

import { useEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckCircle2, XOctagon, AlertCircle, Info, BadgeAlert } from 'lucide-react'
import type { Toast as ToastType } from './toast-provider'

const toastVariants = cva(
  'flex items-center p-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl',
  {
    variants: {
      status: {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-400 text-gray-900',
        info: 'bg-blue-500 text-white',
      },
      isExiting: {
        true: 'animate-fade-out',
        false: 'animate-slide-in',
      },
    },
    defaultVariants: {
      status: 'info',
      isExiting: false,
    },
  }
)

const statusIcons: Record<ToastType['status'], React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />,
  error: <BadgeAlert className="h-5 w-5" strokeWidth={2.5} />,
  warning: <AlertCircle className="h-5 w-5" strokeWidth={2.5} />,
  info: <Info className="h-5 w-5" strokeWidth={2.5} />,
}

interface ToastProps extends ToastType {
  onClose: (id: string) => void
  onAnimationComplete: (id: string) => void
}

export const Toast = ({
  id,
  message,
  status,
  isExiting,
  onClose,
  onAnimationComplete,
}: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isExiting && toastRef.current) {
      const element = toastRef.current
      element.addEventListener('animationend', () => onAnimationComplete(id), { once: true })
      return () => element.removeEventListener('animationend', () => onAnimationComplete(id))
    }
  }, [isExiting, id, onAnimationComplete])

  return (
    <div ref={toastRef} className={toastVariants({ status, isExiting })} role="alert">
      <span className="flex-shrink-0">{statusIcons[status]}</span>
      <p className="font-medium text-sm flex-grow mx-3">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex items-center justify-center min-w-[28] min-h-[28px] rounded-full hover:bg-black/30 transition-colors"
        aria-label="Close"
      >
        <span className="text-xl">&times;</span>
      </button>
    </div>
  )
}

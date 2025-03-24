'use client'

import type { Toast as ToastType } from './toast-provider'
import { Toast } from './toast'

interface ToastContainerProps {
  toasts: ToastType[]
  onClose: (id: string) => void
  onAnimationComplete: (id: string) => void
}

export function ToastContainer({ toasts, onClose, onAnimationComplete }: ToastContainerProps) {
  // Sort toasts by creation time to ensure consistent stacking
  const sortedToasts = [...toasts].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-0 right-0 z-50 w-full max-w-sm p-4 md:p-6"
    >
      <div className="space-y-2">
        {sortedToasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={onClose}
            onAnimationComplete={onAnimationComplete}
          />
        ))}
      </div>
    </div>
  )
}

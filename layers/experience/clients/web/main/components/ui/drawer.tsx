import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  showHandle?: boolean
  showCloseButton?: boolean
  overlayBottomNav?: boolean
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  showCloseButton = true,
  overlayBottomNav = false,
}: DrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[9999] lg:hidden animate-drawer-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-x-0 bottom-0 z-[9999] bg-white rounded-t-2xl lg:hidden animate-drawer-in"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
      >
        <div className="p-4">
          {/* Handle bar */}
          {showHandle && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gray-300" />
          )}

          {/* Close button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Title */}
          {title && (
            <div className="mt-4 mb-6">
              <h3 className="text-lg font-semibold text-center">{title}</h3>
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </>
  )
}

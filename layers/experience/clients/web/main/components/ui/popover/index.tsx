import * as React from 'react'
import { cn } from '@/lib/utils'

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function Popover({
  children,
  content,
  open,
  onOpenChange,
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
}: PopoverProps) {
  const popoverRef = React.useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  React.useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onOpenChange, open])

  const getPositionClasses = () => {
    const positions = {
      top: 'bottom-full mb-2',
      right: 'left-full ml-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
    }

    const alignments = {
      start: 'start-0',
      center:
        side === 'top' || side === 'bottom'
          ? 'start-1/2 -translate-x-1/2'
          : 'top-1/2 -translate-y-1/2',
      end: 'end-0',
    }

    return `${positions[side]} ${alignments[align]}`
  }

  return (
    <div ref={popoverRef} className="inline-block relative">
      <div onClick={() => onOpenChange(!open)}>{children}</div>

      {open && (
        <div
          className={cn(
            'absolute z-50 min-w-[8rem] bg-white border rounded-lg shadow-lg',
            getPositionClasses(),
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

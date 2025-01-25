import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export function Popover({ children, content, open, onOpenChange, className }: PopoverProps) {
  const popoverRef = React.useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onOpenChange])

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => onOpenChange(!open)}>
        {children}
      </div>

      {open && (
        <div className={cn(
          "absolute z-50 w-[200px] max-h-[200px] overflow-y-auto mt-1 bg-white border rounded-md shadow-lg",
          className
        )}>
          {content}
        </div>
      )}
    </div>
  )
} 
'use client';

import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
  {
    variants: {
      backdrop: {
        default: "bg-black/50 backdrop-blur-sm",
        dark: "bg-black/70 backdrop-blur-sm",
        light: "bg-white/20 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      backdrop: "default",
    },
  }
);

const modalContentVariants = cva(
  "relative max-w-md w-full overflow-hidden flex flex-col shadow-xl",
  {
    variants: {
      background: {
        dark: "bg-gray-900",
        light: "bg-white",
      },
      rounded: {
        none: "rounded-none",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      background: "dark",
      rounded: "xl",
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants>, VariantProps<typeof modalContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  hideCloseButton = false,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  backdrop,
  background,
  rounded,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle ESC key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={modalVariants({ backdrop })}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        ref={modalRef}
        className={modalContentVariants({ background, rounded })}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || !hideCloseButton) && (
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            {title && <h3 id="modal-title" className="text-xl font-semibold text-white">{title}</h3>}
            {!hideCloseButton && (
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
        
        {footer && (
          <div className="p-4 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
} 
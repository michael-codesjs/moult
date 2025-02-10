'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { ToastContainer } from './toast-container';

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  status: ToastStatus;
  duration: number;
  createdAt: number;
  isExiting: boolean;
}

interface ToastContextType {
  toast: (message: string, options?: { status?: ToastStatus; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const generateId = () => `${new Date().valueOf()}-${Math.random().toString(36).slice(2)}`;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const startExitAnimation = useCallback((id: string) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, isExiting: true } : toast
    ));
  }, []);

  const toast = useCallback((message: string, options: { status?: ToastStatus; duration?: number } = {}) => {
    const id = generateId();
    const newToast = {
      id,
      message,
      status: options.status || 'info',
      duration: options.duration || 3000,
      createdAt: Date.now(),
      isExiting: false,
    };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      startExitAnimation(id);
    }, options.duration || 3000);
  }, [startExitAnimation]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer 
        toasts={toasts}
        onClose={startExitAnimation}
        onAnimationComplete={removeToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
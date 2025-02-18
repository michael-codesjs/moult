import { MinimalBanner } from '@/components/ui/minimal-banner';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
      <div className="relative min-h-screen text-white">
        <MinimalBanner />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-10 px-4">
          {children}
        </div>
      </div>
    );
}
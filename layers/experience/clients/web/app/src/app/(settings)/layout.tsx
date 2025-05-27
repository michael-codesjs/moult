import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles.css'
import { Toaster } from 'react-hot-toast'
// import ConfigureAmplifyClientSide from '@/app/amplify.config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'moult',
  description: 'out with the old, in with the new',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <ConfigureAmplifyClientSide /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #E5E7EB',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontFamily: 'var(--font-geist-sans)',
          },
          success: {
            iconTheme: {
              primary: '#8B5CF6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <div
        className={`
          flex flex-col sm:flex-row
          h-full w-full
          overflow-x-hidden overflow-y-scroll sm:overflow-y-hidden
        `}
      >
        <main
          className={`
            w-full h-full relative
            sm:order-2 sm:w-full sm:h-full sm:overflow-y-scroll
          `}
        >
          {children}
          <div className="h-60 min-h-60 w-full" />
        </main>
        <div className="sm:hidden">{/* <Navigation /> */}</div>
      </div>
    </>
  )
}

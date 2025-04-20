import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./layout/navigation";
import { Header } from './layout/header'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "moult",
  description: "out with the old, in with the new",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          flex
          flex-col
          h-screen
          w-screen
          bg-black/90
          text-white
        `}
      >
        <Header />
        <main
          className={`
            w-full
            flex-1
            pt-16
            pb-16
            overflow-auto
          `}
        >
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}

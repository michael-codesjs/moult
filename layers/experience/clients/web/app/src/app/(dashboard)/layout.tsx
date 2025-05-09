import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles.css";
import { Navigation, SidePanel, Header } from "@/layout";

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
          font-sans
          h-screen w-screen max-h-screen
          overflow-x-hidden overflow-y-hidden
        `}
      >
        <Header />
        <div className={`
          flex flex-col sm:flex-row
          h-full w-full
          overflow-x-hidden overflow-y-scroll sm:overflow-y-hidden
        `}>
          <main className={`
            w-full h-full relative
            sm:order-2 sm:w-full sm:h-full sm:overflow-y-scroll
          `}>
            {children}
            <div className='h-60 min-h-60 w-full' />
          </main>
          <Navigation />
          <SidePanel />
        </div>
      </body>
    </html>
  );
}

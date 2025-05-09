import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MinimalBackground } from "@/components/backgrounds";
import ConfigureAmplifyClientSide from "../amplify.config";
import { Suspense } from "react";
import { BottomNavigation } from "@/layout/navigation";
import { Header } from "@/layout/header";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigureAmplifyClientSide />
        <MinimalBackground />
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from "@ui/font";
import { ToastProvider } from "@/components/ui/toast/toast-provider";
import ConfigureAmplifyClientSide from "./amplify.config";

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
      <body className={`${inter.className}`}>
        <ConfigureAmplifyClientSide />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

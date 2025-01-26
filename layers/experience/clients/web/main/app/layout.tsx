import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from "@ui/font";
// import ConfigureAmplifyClientSide from "@/lib/auth/amplify";

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
      {/* <ConfigureAmplifyClientSide /> */}
      <body
        className={`${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";

import { FitLogProvider } from "@/components/fitlog-provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Track workouts, save plans, and build a focused training day.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full bg-[#0a0f14] text-white antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#0a0f14] text-white"> 
        <FitLogProvider>{children}</FitLogProvider>
        <ToastContainer position="top-right" autoClose={2200} theme="dark" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import HUD from "@/components/HUD";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "USER_PROFILE | DASHBOARD",
  description: "Cyberpunk Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${inter.variable} ${shareTechMono.variable} cyber-theme`}>
        <HUD />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

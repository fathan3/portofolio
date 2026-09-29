import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import data from "@/data/data.json";

export const metadata: Metadata = {
  title: "Fathan Ruhul Alam | Informatics Engineering & Developer Portfolio",
  description:
    "Portfolio of Fathan Ruhul Alam, an Informatics Engineering student focused on building clean, high-performance web and mobile applications.",
  keywords: [
    "Fathan Ruhul Alam",
    "Portfolio",
    "Informatics Engineering",
    "Web Developer",
    "Full-Stack",
    "PHP",
    "Laravel",
    "Tailwind CSS",
    "Python",
  ],
  authors: [{ name: "Fathan Ruhul Alam" }],
  creator: "Fathan Ruhul Alam",
  openGraph: {
    title: "Fathan Ruhul Alam | Informatics Engineering & Developer Portfolio",
    description:
      "Portfolio of Fathan Ruhul Alam, Informatics Engineering student and full-stack developer.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { personal_info } = data;

  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
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
      <body className="bg-black text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white min-h-screen">
        <Navbar
          githubUrl={personal_info.socials.github}
          linkedinUrl={personal_info.socials.linkedin}
          cvUrl={personal_info.cv_file}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

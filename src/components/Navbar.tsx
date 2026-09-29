"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function Navbar({
  githubUrl = "https://github.com/fathan3/",
  linkedinUrl = "https://linkedin.com/in/fathan-ruhul-alam-5422b5218/",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white font-medium tracking-tight text-lg focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-md outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
          <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
            Fathan Ruhul Alam
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <a
            href="#about"
            className="px-3.5 py-1.5 text-sm text-zinc-300 hover:text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            About
          </a>
          <a
            href="#skills"
            className="px-3.5 py-1.5 text-sm text-zinc-300 hover:text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1.5 text-sm text-zinc-300 hover:text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            Projects
          </a>
          <a
            href="#certifications"
            className="px-3.5 py-1.5 text-sm text-zinc-300 hover:text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            Certifications
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 text-sm text-zinc-300 hover:text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
          )}
          <a
            href="/assets/cv/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-zinc-900 bg-white hover:bg-zinc-200 transition-all rounded-lg shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-white outline-none"
          >
            <span>Resume</span>
            <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-lg outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <i
            className={`fas ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}
          ></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800/90 px-6 py-6 backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base text-zinc-300 hover:text-white font-medium transition-colors border-b border-zinc-900"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base text-zinc-300 hover:text-white font-medium transition-colors border-b border-zinc-900"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base text-zinc-300 hover:text-white font-medium transition-colors border-b border-zinc-900"
            >
              Projects
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base text-zinc-300 hover:text-white font-medium transition-colors border-b border-zinc-900"
            >
              Certifications
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-base text-zinc-300 hover:text-white font-medium transition-colors border-b border-zinc-900"
            >
              Contact
            </a>
            <div className="pt-3 flex items-center gap-3">
              <a
                href="/assets/cv/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-zinc-900 bg-white hover:bg-zinc-200 transition-colors rounded-lg"
              >
                Resume PDF
              </a>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

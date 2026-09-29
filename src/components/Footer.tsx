"use client";

interface FooterProps {
  personalInfo: {
    name: string;
    email: string;
    socials: {
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

export default function Footer({ personalInfo }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-zinc-200">
            {personalInfo.name}
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="text-zinc-500 text-xs sm:text-sm">
            Informatics Engineering Student & Developer
          </span>
        </div>

        <div className="flex items-center gap-6">
          {personalInfo.socials.github && (
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
          )}
          {personalInfo.socials.linkedin && (
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
          )}
          {personalInfo.socials.instagram && (
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
          )}
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 rounded px-2 py-1 outline-none ml-2"
            title="Scroll to top"
          >
            <span>Top</span>
            <i className="fas fa-arrow-up text-[10px]"></i>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-zinc-900/60 text-center text-xs text-zinc-600">
        <p>
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

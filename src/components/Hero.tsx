"use client";

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    about: string;
    location: string;
    profile_image?: string;
    email: string;
    socials: {
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

export default function Hero({ personalInfo }: HeroProps) {
  const imageSrc = personalInfo.profile_image
    ? personalInfo.profile_image.startsWith("/")
      ? personalInfo.profile_image
      : `/${personalInfo.profile_image}`
    : "/assets/images/profile.png";

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle radial spotlight in the background */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-zinc-800/20 via-zinc-700/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Intro */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available for internships and projects</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Hi, I&apos;m <span className="text-zinc-100">{personalInfo.name}</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 font-medium mb-6">
              {personalInfo.role} based in {personalInfo.location}
            </p>

            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl mb-8">
              {personalInfo.about}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8 text-xs text-zinc-400 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
                <i className="fas fa-location-dot text-zinc-500"></i>
                {personalInfo.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
                <i className="fas fa-graduation-cap text-zinc-500"></i>
                Informatics Engineering
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
                <i className="fas fa-code text-zinc-500"></i>
                Web & Mobile Development
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-white outline-none min-h-[44px]"
              >
                <span>Get in Touch</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none min-h-[44px]"
              >
                <span>View Projects</span>
              </a>

              <a
                href="/assets/cv/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60 border border-zinc-800/80 transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none min-h-[44px]"
              >
                <i className="fas fa-file-pdf text-xs"></i>
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8 pt-6 border-t border-zinc-900">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Connect:
              </span>
              {personalInfo.socials.github && (
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                  aria-label="GitHub Profile"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
              )}
              {personalInfo.socials.linkedin && (
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                  aria-label="LinkedIn Profile"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
              )}
              {personalInfo.socials.instagram && (
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                  aria-label="Instagram Profile"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                aria-label="Email Me"
              >
                <i className="fas fa-envelope text-base"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Profile Portrait */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-2 bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-800 shadow-2xl shadow-black/80">
              <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-900 relative">
                <img
                  src={imageSrc}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center filter grayscale contrast-[105%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Status card overlay */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-zinc-900/95 border border-zinc-800 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                  <i className="fas fa-laptop-code text-sm"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">Full-Stack Explorer</p>
                  <p className="text-[11px] text-zinc-500">Web & Mobile Dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

interface ContactProps {
  personalInfo: {
    email: string;
    phone: string;
    location: string;
    socials: {
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

export default function Contact({ personalInfo }: ContactProps) {
  const [state, handleSubmit] = useForm("mvzyqnog");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-zinc-900 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let&apos;s Connect &amp; Collaborate
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            I am always open to discussing new projects, internship opportunities, or potential partnerships. Feel free to drop a message!
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-400">Email</span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-xs text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none rounded px-2 py-0.5"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                        <i className="fas fa-check text-[10px]"></i> Copied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <i className="far fa-copy text-[10px]"></i> Copy
                      </span>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-base font-semibold text-white hover:text-zinc-200 transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <span className="text-xs font-medium text-zinc-400 block mb-2">
                  Phone / WhatsApp
                </span>
                <a
                  href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-white hover:text-zinc-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>{personalInfo.phone}</span>
                  <i className="fab fa-whatsapp text-emerald-400 text-sm"></i>
                </a>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <span className="text-xs font-medium text-zinc-400 block mb-2">
                  Location
                </span>
                <p className="text-base font-semibold text-white flex items-center gap-2">
                  <i className="fas fa-location-dot text-zinc-400 text-sm"></i>
                  <span>{personalInfo.location}</span>
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-zinc-900">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 block">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                {personalInfo.socials.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 text-xs font-medium transition-all"
                  >
                    <i className="fab fa-github text-sm"></i>
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.socials.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 text-xs font-medium transition-all"
                  >
                    <i className="fab fa-linkedin text-sm"></i>
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.socials.instagram && (
                  <a
                    href={personalInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 text-xs font-medium transition-all"
                  >
                    <i className="fab fa-instagram text-sm"></i>
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              <h3 className="text-lg font-semibold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Fill out the form below and I will respond to your email as soon as possible.
              </p>

              {state.succeeded ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-400">
                      <i className="fas fa-check text-sm"></i>
                    </div>
                    <h4 className="font-semibold text-emerald-100">
                      Message Sent Successfully
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-300/80 ml-11">
                    Thank you for reaching out! I have received your transmission and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell me about your project, idea, or questions..."
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors resize-none"
                    ></textarea>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-lg text-sm font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-white outline-none min-h-[44px]"
                  >
                    {state.submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

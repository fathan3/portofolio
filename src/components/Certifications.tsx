"use client";

interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credential_id?: string;
  credential_url?: string;
  file?: string;
  description?: string;
}

interface CertificationsProps {
  certifications?: CertificationItem[];
}

export default function Certifications({
  certifications = [],
}: CertificationsProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative py-24 border-t border-zinc-900 bg-black">
      {/* Background subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-zinc-800/10 via-zinc-700/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            <span>Licenses &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certifications
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Sertifikasi dan pelatihan profesional untuk memperdalam keahlian teknis dan standar industri.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const hasCredential =
              cert.credential_url &&
              cert.credential_url.trim() !== "" &&
              cert.credential_url !== "#";
            const hasFile = cert.file && cert.file.trim() !== "";

            return (
              <div
                key={cert.id || index}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
              >
                <div>
                  {/* Top Bar: Icon, Issuer & Year */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-zinc-700 transition-colors flex-shrink-0">
                      <i className="fas fa-certificate text-lg"></i>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Issuer name */}
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                    {cert.issuer}
                  </p>

                  {/* Certification Title */}
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2 group-hover:text-zinc-100 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Credential ID */}
                  {cert.credential_id && cert.credential_id.trim() !== "" && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mb-3">
                      <span className="text-zinc-500 text-[10px] uppercase font-sans font-semibold">Credential ID:</span>
                      <span className="bg-zinc-900/90 border border-zinc-800/90 px-2 py-0.5 rounded text-zinc-300 select-all font-mono tracking-wide">
                        {cert.credential_id}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {cert.description && (
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center gap-2 mt-auto">
                  {hasCredential && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                    >
                      <i className="fas fa-arrow-up-right-from-square text-[10px] text-zinc-400"></i>
                      <span>Credential</span>
                    </a>
                  )}

                  {hasFile && (
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
                    >
                      <i className="fas fa-file-pdf text-[10px] text-zinc-400"></i>
                      <span>Lihat File</span>
                    </a>
                  )}

                  {!hasCredential && !hasFile && (
                    <span className="text-[11px] text-zinc-600 italic">
                      Credential on file
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

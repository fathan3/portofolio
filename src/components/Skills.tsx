"use client";

import { useState } from "react";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "languages" | "frameworks" | "tools">("all");

  const skillMeta: Record<
    string,
    { icon: string; category: "languages" | "frameworks" | "tools" }
  > = {
    PHP: { icon: "devicon-php-plain", category: "languages" },
    JavaScript: { icon: "devicon-javascript-plain", category: "languages" },
    Python: { icon: "devicon-python-plain", category: "languages" },
    Kotlin: { icon: "devicon-kotlin-plain", category: "languages" },
    HTML: { icon: "devicon-html5-plain", category: "languages" },
    CSS: { icon: "devicon-css3-plain", category: "languages" },
    Laravel: { icon: "devicon-laravel-original", category: "frameworks" },
    "Next.js": { icon: "devicon-nextjs-plain", category: "frameworks" },
    "Node.js": { icon: "devicon-nodejs-plain", category: "frameworks" },
    Flutter: { icon: "devicon-flutter-plain", category: "frameworks" },
    Tailwind: { icon: "devicon-tailwindcss-original", category: "frameworks" },
    Bootstrap: { icon: "devicon-bootstrap-plain", category: "frameworks" },
    MySQL: { icon: "devicon-mysql-plain", category: "tools" },
    "UI/UX Design": { icon: "devicon-figma-plain", category: "tools" },
  };

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "languages", label: "Languages" },
    { id: "frameworks", label: "Frameworks & Libs" },
    { id: "tools", label: "Databases & Tools" },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === "all") return true;
    const meta = skillMeta[skill.name];
    return meta ? meta.category === activeTab : true;
  });

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-zinc-900 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
              Technical Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Skills &amp; Technologies
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Technologies and frameworks I use to build scalable web applications and intuitive mobile solutions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all min-h-[40px] focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none ${
                activeTab === cat.id
                  ? "bg-zinc-100 text-zinc-900 font-semibold shadow-sm"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const meta = skillMeta[skill.name] || {
              icon: "fas fa-code",
              category: "tools",
            };

            return (
              <div
                key={skill.name}
                className="group p-4 sm:p-5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-110 transition-all text-xl">
                    <i className={meta.icon}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500 capitalize">
                      {meta.category === "frameworks"
                        ? "Framework"
                        : meta.category === "languages"
                        ? "Language"
                        : "Tool / Design"}
                    </span>
                  </div>
                </div>

                {/* Level Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-medium">Proficiency</span>
                    <span className="text-zinc-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 group-hover:bg-white rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

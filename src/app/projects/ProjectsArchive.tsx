"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface RepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  all_languages?: string[];
  updated_at?: string;
}

interface ProjectsArchiveProps {
  initialRepos: RepoItem[];
  username: string;
}

export default function ProjectsArchive({
  initialRepos,
  username,
}: ProjectsArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const languageColors: Record<string, string> = {
    JavaScript: "bg-amber-400",
    TypeScript: "bg-blue-400",
    Python: "bg-emerald-400",
    PHP: "bg-indigo-400",
    HTML: "bg-orange-500",
    CSS: "bg-cyan-400",
    Dart: "bg-sky-400",
    Kotlin: "bg-purple-400",
    Java: "bg-red-400",
    "C++": "bg-pink-400",
    C: "bg-gray-400",
  };

  // Collect all unique languages
  const availableLanguages = useMemo(() => {
    const langSet = new Set<string>();
    initialRepos.forEach((repo) => {
      if (repo.language) langSet.add(repo.language);
      if (repo.all_languages) {
        repo.all_languages.forEach((l) => langSet.add(l));
      }
    });
    return Array.from(langSet).sort();
  }, [initialRepos]);

  // Filtered repos
  const filteredRepos = useMemo(() => {
    return initialRepos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedLanguage === "all" ||
        repo.language === selectedLanguage ||
        (repo.all_languages && repo.all_languages.includes(selectedLanguage));

      return matchesSearch && matchesLang;
    });
  }, [initialRepos, searchQuery, selectedLanguage]);

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Top Breadcrumb & Title */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left text-[11px]"></i>
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
              Repository Archive
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              All Projects &amp; Repositories
            </h1>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Archive of open-source repositories and code experiments by{" "}
            <span className="text-zinc-200 font-medium">@{username}</span>.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or description..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs p-1"
                title="Clear search"
              >
                <i className="fas fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 items-center">
          <span className="text-xs text-zinc-500 font-medium mr-1">Filter:</span>
          <button
            type="button"
            onClick={() => setSelectedLanguage("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedLanguage === "all"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80"
            }`}
          >
            All ({initialRepos.length})
          </button>
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedLanguage === lang
                  ? "bg-white text-zinc-950 font-semibold shadow-sm"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-500">
        <span>
          Showing {filteredRepos.length} of {initialRepos.length} repositories
        </span>
        {(searchQuery || selectedLanguage !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedLanguage("all");
            }}
            className="text-zinc-400 hover:text-white underline underline-offset-2"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Repos Grid */}
      {filteredRepos.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <i className="fas fa-folder-open text-xl"></i>
          </div>
          <h3 className="text-base font-semibold text-zinc-200 mb-1">
            No projects match your filter
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Try adjusting your search query or selecting a different language tag.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedLanguage("all");
            }}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => {
            const langColor = repo.language
              ? languageColors[repo.language] || "bg-zinc-400"
              : "bg-zinc-500";

            return (
              <div
                key={repo.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none rounded inline-flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <i className="fas fa-arrow-up-right-from-square text-[11px] opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400"></i>
                      </a>
                    </h3>

                    <div className="flex items-center gap-2.5 text-xs text-zinc-500 flex-shrink-0">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <i className="fas fa-star text-amber-400/80 text-[10px]"></i>
                          <span>{repo.stargazers_count}</span>
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <i className="fas fa-code-fork text-[10px]"></i>
                          <span>{repo.forks_count}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                    {repo.description || "No description provided for this repository."}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  {repo.language ? (
                    <span className="inline-flex items-center gap-1.5 text-zinc-300 font-medium">
                      <span className={`w-2 h-2 rounded-full ${langColor}`}></span>
                      <span>{repo.language}</span>
                    </span>
                  ) : (
                    <span className="text-zinc-500">Repository</span>
                  )}

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white font-medium transition-colors"
                  >
                    <span>View Source</span>
                    <i className="fas fa-chevron-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

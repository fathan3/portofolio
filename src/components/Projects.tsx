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
  topics?: string[];
}

interface CustomProject {
  name: string;
  description?: string;
  demo_url?: string;
  tags?: string[];
}

interface ProjectsProps {
  repos: RepoItem[];
  githubUsername?: string;
  customProjects?: CustomProject[];
  excludedProjects?: string[];
}

export default function Projects({
  repos,
  githubUsername = "fathan3",
  customProjects = [],
  excludedProjects = [],
}: ProjectsProps) {
  const languageColors: Record<string, string> = {
    JavaScript: "bg-amber-400",
    TypeScript: "bg-blue-400",
    Python: "bg-emerald-400",
    PHP: "bg-indigo-400",
    HTML: "bg-orange-500",
    CSS: "bg-cyan-400",
    Dart: "bg-sky-400",
    Kotlin: "bg-purple-400",
  };

  const excludedSet = new Set(
    excludedProjects.map((name) => name.toLowerCase().trim())
  );
  const activeRepos = repos.filter(
    (repo) => !excludedSet.has(repo.name.toLowerCase().trim())
  );

  const orderMap = new Map(
    customProjects.map((p, index) => [p.name.toLowerCase().trim(), index])
  );

  const sortedRepos = [...activeRepos].sort((a, b) => {
    const nameA = a.name.toLowerCase().trim();
    const nameB = b.name.toLowerCase().trim();
    const idxA = orderMap.has(nameA) ? orderMap.get(nameA)! : 999;
    const idxB = orderMap.has(nameB) ? orderMap.get(nameB)! : 999;
    return idxA - idxB;
  });

  const displayRepos = sortedRepos.slice(0, 6);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-zinc-900 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
              Portfolio &amp; Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors group"
          >
            <span>Browse all repositories</span>
            <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

        {/* Project Cards Grid */}
        {displayRepos.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <i className="fab fa-github text-xl"></i>
            </div>
            <h3 className="text-base font-semibold text-zinc-200 mb-2">
              Unable to load live GitHub repositories
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              You can explore all repositories directly on GitHub.
            </p>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <span>Visit GitHub Profile</span>
              <i className="fas fa-external-link-alt text-[10px]"></i>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRepos.map((repo) => {
              const customData = customProjects.find(
                (p) => p.name.toLowerCase() === repo.name.toLowerCase()
              );
              const description =
                customData?.description ||
                repo.description ||
                "Repositori open-source untuk implementasi fitur dan eksplorasi rekayasa perangkat lunak.";

              const langColor = repo.language
                ? languageColors[repo.language] || "bg-zinc-400"
                : "bg-zinc-500";

              const demoUrl =
                customData?.demo_url?.trim() || repo.homepage?.trim() || null;

              return (
                <div
                  key={repo.id}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 shadow-sm"
                >
                  <div>
                    {/* Top Row: Icon and Stars */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                        <i className="fab fa-github text-base"></i>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-star text-amber-400/80 text-[11px]"></i>
                            <span>{repo.stargazers_count}</span>
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-code-fork text-[11px]"></i>
                            <span>{repo.forks_count}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Repo Title */}
                    <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-zinc-100 transition-colors">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none rounded inline-flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <i className="fas fa-arrow-up-right-from-square text-xs opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400"></i>
                      </a>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                      {description}
                    </p>
                  </div>

                  {/* Footer / Meta */}
                  <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-2 text-xs">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 font-medium">
                        <span className={`w-2 h-2 rounded-full ${langColor}`}></span>
                        <span>{repo.language}</span>
                      </span>
                    ) : (
                      <span className="text-zinc-500">Repository</span>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/60 transition-colors"
                        title="Lihat Kode di GitHub"
                      >
                        <i className="fab fa-github text-[11px]"></i>
                        <span>Code</span>
                      </a>
                      {demoUrl && (
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors shadow-sm"
                          title="Kunjungi Live Demo / Deploy"
                        >
                          <span>Demo</span>
                          <i className="fas fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all footer banner */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all min-h-[44px]"
          >
            <span>View All Repositories ({activeRepos.length || "All"})</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Projects({ githubUsername }: { githubUsername: string }) {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    if (githubUsername) {
      fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
        .then((res) => {
          if (!res.ok) throw new Error("GitHub API Error");
          return res.json();
        })
        .then((data) => {
          setRepos(data);
        })
        .catch((err) => {
          console.error("Failed to fetch GitHub repos:", err);
        });
    }
  }, [githubUsername]);

  return (
    <section className="bento-box box-projects cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-folder-open"></i>
        </span>
        <span className="title">DATA_ARCHIVE // PROJECTS</span>
      </div>
      <div className="box-content projects-grid" id="projects-container">
        {repos.map((repo, index) => (
          <a
            key={repo.id || index}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card cyber-hover"
          >
            <div
              className="project-overlay-data"
              style={{
                background: "rgba(0, 255, 102, 0.2)",
                borderColor: "var(--neon-green)",
              }}
            >
              <span className="proj-id">GIT_REPO</span>
              <span
                className="proj-title"
                style={{ color: "var(--neon-green)" }}
              >
                {repo.name.toUpperCase()}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: "200px",
                background: "#0a0f14",
                border: "1px solid var(--neon-green-dim)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fab fa-github"
                style={{
                  fontSize: "4rem",
                  color: "var(--neon-green)",
                  opacity: 0.5,
                }}
              ></i>
            </div>
            <div
              className="hover-data"
              style={{ background: "rgba(0, 255, 102, 0.9)" }}
            >
              <p>&gt; DESC: {repo.description || "No description available."}</p>
              <div className="tags">
                {repo.language && (
                  <span className="tag">[{repo.language.toUpperCase()}]</span>
                )}
                <span className="tag">[⭐ {repo.stargazers_count}]</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

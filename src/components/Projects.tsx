import Link from "next/link";

export default function Projects({ repos }: { repos: any[] }) {
  return (
    <section className="bento-box box-projects cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-folder-open"></i>
        </span>
        <span className="title">DATA_ARCHIVE // PROJECTS</span>
      </div>
      <div className="box-content projects-grid" id="projects-container">
        {repos.slice(0, 4).map((repo, index) => (
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
                background: "rgba(255, 255, 255, 0.2)",
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
                background: "#000000",
                border: "1px solid var(--neon-blue-dim)",
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
              style={{ background: "rgba(255, 255, 255, 0.9)" }}
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
      <div style={{ padding: "15px", borderTop: "1px solid var(--neon-blue-dim)", textAlign: "center", background: "var(--panel-bg)" }}>
          <a href="/projects" className="cyber-btn" style={{ width: "100%", boxSizing: "border-box", display: "inline-block", background: "rgba(255,255,255,0.05)" }}>
              VIEW ALL PROJECTS
          </a>
      </div>
    </section>
  );
}

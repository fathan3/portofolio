"use client";

export default function Skills({ skills }: { skills: any[] }) {
  const skillIcons: Record<string, string[]> = {
    PHP: ["devicon-php-plain"],
    HTML: ["devicon-html5-plain"],
    CSS: ["devicon-css3-plain"],
    JavaScript: ["devicon-javascript-plain"],
    MySQL: ["devicon-mysql-plain"],
    "UI/UX Design": ["devicon-figma-plain"],
    Laravel: ["devicon-laravel-original"],
    Flutter: ["devicon-flutter-plain"],
    Kotlin: ["devicon-kotlin-plain"],
    "Node.js": ["devicon-nodejs-plain"],
    "Next.js": ["devicon-nextjs-plain"],
    Bootstrap: ["devicon-bootstrap-plain"],
    Tailwind: ["devicon-tailwindcss-original"],
  };

  return (
    <section className="bento-box box-skills cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-microchip"></i>
        </span>
        <span className="title">CORE_COMPETENCIES</span>
      </div>
      <div className="box-content flex-center">
        <div
          className="skills-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {skills.map((skill, index) => {
            const icons = skillIcons[skill.name] || ["fas fa-code"];
            return icons.map((iconClass, iconIndex) => (
              <div
                key={`${index}-${iconIndex}`}
                className="skill-icon cyber-hover"
                title={skill.name}
                style={{
                  fontSize: "2.5rem",
                  color: "var(--neon-blue)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = "var(--neon-green)";
                  target.style.textShadow = "0 0 15px var(--neon-green)";
                  target.style.transform = "translateY(-5px)";
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = "var(--neon-blue)";
                  target.style.textShadow = "none";
                  target.style.transform = "translateY(0)";
                }}
              >
                <i className={iconClass}></i>
              </div>
            ));
          })}
        </div>
      </div>
    </section>
  );
}

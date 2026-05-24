"use client";

import { useEffect, useState } from "react";

export default function Hero({ personalInfo }: { personalInfo: any }) {
  const [typedText, setTypedText] = useState("");
  const textToType = personalInfo.about;

  useEffect(() => {
    let i = 0;
    let current = "";
    let timeoutId: NodeJS.Timeout;

    function typeWriter() {
      if (i < textToType.length) {
        current += textToType.charAt(i);
        setTypedText(current);
        i++;
        timeoutId = setTimeout(typeWriter, Math.random() * 20 + 10);
      }
    }

    const startTyping = () => {
      // Start typing after a short delay
      timeoutId = setTimeout(typeWriter, 500);
    };

    window.addEventListener("boot-complete", startTyping);

    return () => {
      window.removeEventListener("boot-complete", startTyping);
      clearTimeout(timeoutId);
    };
  }, [textToType]);

  return (
    <section className="bento-box box-hero cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-id-badge"></i>
        </span>
        <span className="title">USER_PROFILE.EXE</span>
      </div>
      <div className="box-content flex-row">
        <div className="profile-img-container cyber-glitch" data-text="PROFILE">
          <img
            src={personalInfo.profile_image || "assets/images/profile.png"}
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="profile-info">
          <h1 className="neon-text">{personalInfo.name.toUpperCase()}</h1>
          <h2 className="sub-text">&gt; {personalInfo.role.toUpperCase()}</h2>
          <div className="divider"></div>
          <p className="typewriter">
            {typedText}
            {typedText.length === textToType.length ? (
              <span style={{ animation: "blink 1s infinite" }}>_</span>
            ) : null}
          </p>
          <div className="action-btns">
            <a href="#contact-box" className="cyber-btn">
              INITIATE_CONTACT
            </a>
            <a
              href="assets/cv/resume.pdf"
              download
              className="cyber-btn"
              style={{
                borderColor: "var(--neon-green)",
                color: "var(--neon-green)",
              }}
            >
              DOWNLOAD_CV.pdf
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

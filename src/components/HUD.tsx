"use client";

import { useEffect, useState } from "react";

export default function HUD() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState("00:00:00.00");
  const themes = ["monochrome", "matrix", "neon"];
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("cyber-theme");
    if (savedTheme) {
        const idx = themes.indexOf(savedTheme);
        if (idx !== -1) setThemeIndex(idx);
    }
  }, []);

  useEffect(() => {
    const activeTheme = themes[themeIndex];
    document.documentElement.setAttribute("data-theme", activeTheme);
    localStorage.setItem("cyber-theme", activeTheme);
  }, [themeIndex]);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", { hour12: false }) +
          "." +
          String(now.getMilliseconds()).padStart(3, "0").substring(0, 2)
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="scanlines"></div>
      <div className="grid-overlay"></div>
      <div className="hud-top-left">SYS.VER: 9.4.2 // ONLINE</div>
      <div className="hud-top-right" style={{ display: "flex", gap: "15px", alignItems: "center", pointerEvents: "auto" }}>
        <button 
          onClick={cycleTheme} 
          style={{ 
            background: "transparent", 
            color: "var(--neon-blue)", 
            border: "1px solid var(--neon-blue)", 
            padding: "2px 8px", 
            cursor: "pointer", 
            fontSize: "0.7rem", 
            fontFamily: "var(--font-mono)" 
          }}
          title="Switch Theme"
        >
           THEME: {themes[themeIndex].toUpperCase()}
        </button>
        <span>{timeStr}</span>
      </div>
      <div className="hud-bottom-left">
        X:{String(coords.x).padStart(3, "0")} Y:
        {String(coords.y).padStart(3, "0")}
      </div>
      <div className="hud-bottom-right">SECURE_CONNECTION: ESTABLISHED</div>
    </>
  );
}

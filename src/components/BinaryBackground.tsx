"use client";

import { useEffect, useRef } from "react";

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Binary 0 and 1
    const characters = "01".split("");
    const fontSize = 16;
    const columns = width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Randomize start position off-screen
    }

    let currentColor = "#ffffff";
    const updateColor = () => {
      try {
        const color = getComputedStyle(document.body)
          .getPropertyValue("--neon-blue")
          .trim();
        if (color) currentColor = color;
      } catch (e) {}
    };

    const colorInterval = setInterval(updateColor, 500);
    updateColor(); // Initial fetch

    let animationFrameId: number;
    let lastTime = 0;

    const draw = () => {
      // Fading effect for the trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = currentColor;
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = (time: number) => {
      if (time - lastTime > 50) {
        // approx 20fps for that retro feel
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      // Add more drops if screen gets wider
      while (drops.length < newColumns) {
        drops.push(Math.random() * -100);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(colorInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -5,
        opacity: 0.25,
        pointerEvents: "none",
      }}
    />
  );
}

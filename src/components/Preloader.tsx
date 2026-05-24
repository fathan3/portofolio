"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [bootText, setBootText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const bootMessages = [
      "SYS.INIT v9.4.2\n",
      "CONNECTING TO SECURE SERVER...\n",
      "BYPASSING FIREWALL... OK\n",
      "LOADING USER PROFILE... OK\n",
      "ACCESS GRANTED.\n",
    ];

    let msgIndex = 0;
    let charIndex = 0;
    let currentText = "";

    function typeBoot() {
      if (msgIndex < bootMessages.length) {
        if (charIndex < bootMessages[msgIndex].length) {
          currentText += bootMessages[msgIndex].charAt(charIndex);
          setBootText(currentText);
          charIndex++;
          setTimeout(typeBoot, Math.random() * 20 + 10);
        } else {
          msgIndex++;
          charIndex = 0;
          setTimeout(typeBoot, Math.random() * 200 + 100);
        }
      } else {
        setTimeout(() => {
          setIsHidden(true);
          document.body.style.overflow = "";
          setTimeout(() => {
            setShouldRender(false);
            window.dispatchEvent(new Event("boot-complete"));
          }, 400); // Wait for transition
        }, 600);
      }
    }

    setTimeout(typeBoot, 400);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`preloader ${isHidden ? "hidden" : ""}`}>
      <div className="preloader-content whitespace-pre-wrap">
        <span>{bootText}</span>
        <span className="cursor">_</span>
      </div>
    </div>
  );
}

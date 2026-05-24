"use client";

import { useEffect, useRef, useState } from "react";

export default function Terminal({ sysUser }: { sysUser: string }) {
  const [logs, setLogs] = useState<
    { text: string; isError?: boolean; isCommand?: boolean; timestamp?: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);
  const autoLogIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const sysLogs = [
    "Initializing system kernel...",
    "Loading dependencies: OK",
    "Checking security protocols: SECURE",
    "Connection established. Latency: 12ms",
    "Garbage collection triggered.",
    "Ping to node 0x8A9F: 14ms",
    "Firewall rules updated.",
    "Awaiting user input...",
  ];

  const appendLog = (text: string, isError = false, isCommand = false) => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => {
      const newLogs = [...prev, { text, isError, isCommand, timestamp }];
      if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
      return newLogs;
    });
  };

  const startAutoLogs = () => {
    autoLogIntervalRef.current = setInterval(() => {
      const text = sysLogs[Math.floor(Math.random() * sysLogs.length)];
      appendLog(text, text.includes("WARNING"));
    }, Math.random() * 5000 + 3000);
  };

  useEffect(() => {
    setTimeout(() => appendLog("Mounting virtual drives: SUCCESS"), 500);
    setTimeout(() => appendLog("Fetching user data..."), 1000);
    setTimeout(() => appendLog("User profile loaded."), 1500);
    setTimeout(startAutoLogs, 2000);

    return () => {
      if (autoLogIntervalRef.current) clearInterval(autoLogIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const processCommand = (cmd: string) => {
    const c = cmd.toLowerCase();
    if (c === "help") {
      appendLog("AVAILABLE COMMANDS: help, whoami, clear, sudo hack");
    } else if (c === "whoami") {
      appendLog("USER ALIAS: " + sysUser);
      appendLog("PRIVILEGE LEVEL: GUEST");
    } else if (c === "clear") {
      setLogs([]);
    } else if (c === "sudo hack") {
      appendLog("WARNING: UNAUTHORIZED PRIVILEGE ESCALATION ATTEMPTED.", true);
      if (autoLogIntervalRef.current) clearInterval(autoLogIntervalRef.current);
      setTimeout(() => appendLog("BYPASSING MAINFRAME...", true), 500);
      setTimeout(() => appendLog("INJECTING PAYLOAD...", true), 1000);
      setTimeout(() => {
        document.body.style.filter = "invert(1)";
        setTimeout(() => {
          document.body.style.filter = "";
          startAutoLogs();
        }, 300);
      }, 1500);
    } else {
      appendLog(`COMMAND NOT FOUND: ${cmd}. TYPE 'help' FOR LIST.`, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = inputValue.trim();
      if (cmd) {
        appendLog(cmd, false, true);
        processCommand(cmd);
      }
      setInputValue("");
    }
  };

  return (
    <section className="bento-box box-terminal cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-terminal"></i>
        </span>
        <span className="title">SYSTEM_LOGS</span>
      </div>
      <div
        className="box-content terminal-content"
        style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <div
          ref={logContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {logs.map((log, i) => (
            <p
              key={i}
              className={`terminal-line ${log.isError ? "terminal-error" : ""}`}
            >
              {log.isCommand ? (
                <>
                  <span style={{ color: "var(--neon-green)" }}>
                    guest@sys:~#
                  </span>{" "}
                  {log.text}
                </>
              ) : (
                `[${log.timestamp}] > ${log.text}`
              )}
            </p>
          ))}
        </div>
        <div
          className="terminal-input-line"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            borderTop: "1px dashed var(--neon-green-dim)",
            paddingTop: "10px",
            fontSize: "0.85rem",
          }}
        >
          <span style={{ color: "var(--neon-green)" }}>guest@sys:~#</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontFamily: "var(--font-mono)",
              outline: "none",
              width: "100%",
              fontSize: "0.85rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}

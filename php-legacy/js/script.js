document.addEventListener('DOMContentLoaded', () => {
    
    const preloader = document.getElementById('preloader');
    const bootTextEl = document.getElementById('boot-text');
    
    if (preloader && bootTextEl) {
        document.body.style.overflow = 'hidden';
        
        const bootMessages = [
            "SYS.INIT v9.4.2\n",
            "CONNECTING TO SECURE SERVER...\n",
            "BYPASSING FIREWALL... OK\n",
            "LOADING USER PROFILE... OK\n",
            "ACCESS GRANTED.\n"
        ];
        
        let msgIndex = 0;
        let charIndex = 0;
        
        function typeBoot() {
            if (msgIndex < bootMessages.length) {
                if (charIndex < bootMessages[msgIndex].length) {
                    let char = bootMessages[msgIndex].charAt(charIndex);
                    if (char === '\n') {
                        bootTextEl.innerHTML += '<br>';
                    } else {
                        bootTextEl.innerHTML += char;
                    }
                    charIndex++;
                    setTimeout(typeBoot, Math.random() * 20 + 10);
                } else {
                    msgIndex++;
                    charIndex = 0;
                    setTimeout(typeBoot, Math.random() * 200 + 100);
                }
            } else {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = ''; 
                    setTimeout(typeWriter, 500);
                }, 600);
            }
        }
        
        setTimeout(typeBoot, 400);
    }

    const mouseCoords = document.getElementById('mouse-coords');
    document.addEventListener('mousemove', (e) => {
        if(mouseCoords) {
            mouseCoords.innerText = `X:${String(e.clientX).padStart(3, '0')} Y:${String(e.clientY).padStart(3, '0')}`;
        }
    });

    const sysClock = document.getElementById('sys-clock');
    setInterval(() => {
        if(sysClock) {
            const now = new Date();
            sysClock.innerText = now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0').substring(0,2);
        }
    }, 50);

    const typewriterEl = document.getElementById('hero-typewriter');
    let textToType = typewriterEl ? typewriterEl.getAttribute('data-text') : "";
    let i = 0;
    
    function typeWriter() {
        if (typewriterEl && i < textToType.length) {
            typewriterEl.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 20 + 10);
        } else if (typewriterEl) {
            typewriterEl.innerHTML += '<span style="animation: blink 1s infinite">_</span>';
        }
    }
    
    const terminalLog = document.getElementById('terminal-log');
    const terminalInput = document.getElementById('terminal-input');
    
    function appendLog(text, isError = false, isCommand = false) {
        if (!terminalLog) return;
        const p = document.createElement('p');
        p.className = 'terminal-line';
        if (isError) p.classList.add('terminal-error');
        
        const timestamp = new Date().toLocaleTimeString('en-US', {hour12:false});
        if (isCommand) {
             p.innerHTML = `<span style="color:var(--neon-green)">guest@sys:~#</span> ${text}`;
        } else {
             p.innerText = `[${timestamp}] > ${text}`;
        }
        terminalLog.appendChild(p);
        
        if (terminalLog.children.length > 50) {
            terminalLog.removeChild(terminalLog.firstChild);
        }
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    const sysLogs = [
        "Initializing system kernel...",
        "Loading dependencies: OK",
        "Checking security protocols: SECURE",
        "Connection established. Latency: 12ms",
        "Garbage collection triggered.",
        "Ping to node 0x8A9F: 14ms",
        "Firewall rules updated.",
        "Awaiting user input..."
    ];
    
    let autoLogInterval;
    function startAutoLogs() {
        autoLogInterval = setInterval(() => {
            const text = sysLogs[Math.floor(Math.random() * sysLogs.length)];
            appendLog(text, text.includes("WARNING"));
        }, Math.random() * 5000 + 3000);
    }
    
    setTimeout(() => appendLog("Mounting virtual drives: SUCCESS"), 500);
    setTimeout(() => appendLog("Fetching user data..."), 1000);
    setTimeout(() => appendLog("User profile loaded."), 1500);
    setTimeout(startAutoLogs, 2000);

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim();
                if (cmd) {
                    appendLog(cmd, false, true);
                    processCommand(cmd);
                }
                terminalInput.value = '';
            }
        });
    }

    function processCommand(cmd) {
        const c = cmd.toLowerCase();
        if (c === 'help') {
             appendLog("AVAILABLE COMMANDS: help, whoami, clear, sudo hack, github");
        } else if (c === 'whoami') {
             appendLog("USER ALIAS: " + SYS_USER);
             appendLog("PRIVILEGE LEVEL: GUEST");
        } else if (c === 'clear') {
             terminalLog.innerHTML = '';
        } else if (c === 'sudo hack') {
             appendLog("WARNING: UNAUTHORIZED PRIVILEGE ESCALATION ATTEMPTED.", true);
             clearInterval(autoLogInterval);
             setTimeout(() => appendLog("BYPASSING MAINFRAME...", true), 500);
             setTimeout(() => appendLog("INJECTING PAYLOAD...", true), 1000);
             setTimeout(() => {
                 document.body.style.filter = 'invert(1)';
                 setTimeout(() => { document.body.style.filter = ''; startAutoLogs(); }, 300);
             }, 1500);
        } else if (c === 'github') {
             if (typeof GITHUB_USERNAME !== 'undefined' && GITHUB_USERNAME) {
                 appendLog("FETCHING GITHUB DATA FOR: " + GITHUB_USERNAME);
                 window.open('https://github.com/' + GITHUB_USERNAME, '_blank');
             } else {
                 appendLog("ERROR: GITHUB USERNAME NOT CONFIGURED.", true);
             }
        } else {
             appendLog(`COMMAND NOT FOUND: ${cmd}. TYPE 'help' FOR LIST.`, true);
        }
    }

    const projectsContainer = document.getElementById('projects-container');
    if (typeof GITHUB_USERNAME !== 'undefined' && GITHUB_USERNAME !== '' && projectsContainer) {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
            .then(res => {
                if (!res.ok) throw new Error('GitHub API Error');
                return res.json();
            })
            .then(repos => {
                repos.forEach(repo => {
                    const card = document.createElement('a');
                    card.href = repo.html_url;
                    card.target = "_blank";
                    card.className = "project-card cyber-hover";
                    
                    card.innerHTML = `
                        <div class="project-overlay-data" style="background: rgba(0, 255, 102, 0.2); border-color: var(--neon-green);">
                            <span class="proj-id">GIT_REPO</span>
                            <span class="proj-title" style="color: var(--neon-green);">${repo.name.toUpperCase()}</span>
                        </div>
                        <div style="width: 100%; height: 100%; min-height: 200px; background: #0a0f14; border: 1px solid var(--neon-green-dim); display:flex; justify-content:center; align-items:center;">
                            <i class="fab fa-github" style="font-size: 4rem; color: var(--neon-green); opacity: 0.5;"></i>
                        </div>
                        <div class="hover-data" style="background: rgba(0, 255, 102, 0.9);">
                            <p>> DESC: ${repo.description || 'No description available.'}</p>
                            <div class="tags">
                                ${repo.language ? `<span class="tag">[${repo.language.toUpperCase()}]</span>` : ''}
                                <span class="tag">[⭐ ${repo.stargazers_count}]</span>
                            </div>
                        </div>
                    `;
                    projectsContainer.appendChild(card);
                });
            })
            .catch(err => {
                console.error("Failed to fetch GitHub repos:", err);
            });
    }

});


<?php include_once 'includes/data.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ERROR 404 | SYSTEM FAILURE</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #050a0e;
            color: #ff003c;
            font-family: 'Share Tech Mono', monospace;
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            overflow: hidden;
            position: relative;
        }
        .scanlines {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
            background-size: 100% 4px;
            z-index: 999;
            pointer-events: none;
            opacity: 0.3;
        }
        h1 {
            font-size: 8rem;
            margin: 0;
            text-shadow: 0 0 10px #ff003c, 0 0 20px #ff003c, 0 0 40px #ff003c;
            animation: glitch 0.5s infinite alternate;
        }
        p {
            font-size: 1.5rem;
            color: #e0f8ff;
            margin-bottom: 30px;
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            color: #00f0ff;
            border: 1px solid #00f0ff;
            text-decoration: none;
            text-transform: uppercase;
            transition: 0.3s;
        }
        a:hover {
            background: #00f0ff;
            color: #000;
            box-shadow: 0 0 15px #00f0ff;
        }
        @keyframes glitch {
            0% { transform: translate(0) }
            20% { transform: translate(-3px, 3px) }
            40% { transform: translate(-3px, -3px) }
            60% { transform: translate(3px, 3px) }
            80% { transform: translate(3px, -3px) }
            100% { transform: translate(0) }
        }
    </style>
</head>
<body>
    <div class="scanlines"></div>
    <h1>404</h1>
    <p>> CRITICAL ERROR: DATA SECTOR CORRUPTED OR NOT FOUND.</p>
    <a href="index.php">REBOOT_SYSTEM (GO HOME)</a>
</body>
</html>

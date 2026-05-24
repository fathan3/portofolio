<?php 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
include_once 'data.php'; 

$analytics_file = __DIR__ . '/../analytics.json';
$analytics = ['views' => 0];
if (file_exists($analytics_file)) {
    $analytics = json_decode(file_get_contents($analytics_file), true) ?? ['views' => 0];
}
if (!isset($_SESSION['has_visited'])) {
    $analytics['views']++;
    file_put_contents($analytics_file, json_encode($analytics));
    $_SESSION['has_visited'] = true;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYS.USER_<?= strtoupper(str_replace(' ', '_', $personal_info['name'])) ?> | DASHBOARD</title>
    
    <meta name="description" content="<?= htmlspecialchars($personal_info['tagline']) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($personal_info['name']) ?> | Cyberpunk Portfolio">
    <meta property="og:description" content="<?= htmlspecialchars($personal_info['tagline']) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($personal_info['profile_image'] ?? 'assets/images/profile.png') ?>">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="cyber-theme">
    <div id="preloader" class="preloader">
        <div class="preloader-content">
            <span id="boot-text"></span><span class="cursor">_</span>
        </div>
    </div>

    <div class="scanlines"></div>
    <div class="grid-overlay"></div>
    
    <div class="hud-top-left">SYS.VER: 9.4.2 // ONLINE</div>
    <div class="hud-top-right" id="sys-clock">00:00:00</div>
    <div class="hud-bottom-left" id="mouse-coords">X:000 Y:000</div>
    <div class="hud-bottom-right">SECURE_CONNECTION: ESTABLISHED</div>


<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

$json_file = __DIR__ . '/../data.json';
$message = "";
$upload_msg = "";

if (isset($_FILES['image_upload'])) {
    $upload_target = $_POST['upload_target'] ?? 'general';
    
    if ($upload_target === 'cv') {
        $target_dir = "../assets/cv/";
        $filename = "resume.pdf";
    } else {
        $target_dir = "../assets/images/";
        $filename = basename($_FILES["image_upload"]["name"]);
    }
    
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $target_file = $target_dir . $filename;
    
    if (move_uploaded_file($_FILES["image_upload"]["tmp_name"], $target_file)) {
        if ($upload_target === 'profile') {
            $path_for_json = "assets/images/" . $filename;
            $current_json = json_decode(file_get_contents($json_file), true);
            $current_json['personal_info']['profile_image'] = $path_for_json;
            file_put_contents($json_file, json_encode($current_json, JSON_PRETTY_PRINT));
            $upload_msg = "<div class='alert success'>Profile picture automatically updated!</div>";
        } else if ($upload_target === 'cv') {
            $upload_msg = "<div class='alert success'>CV/Resume successfully updated!</div>";
        } else {
            $path_for_json = "assets/images/" . $filename;
            $upload_msg = "<div class='alert success'>Image uploaded! Use this URL in your Project JSON: <strong>" . $path_for_json . "</strong></div>";
        }
    } else {
        $upload_msg = "<div class='alert error'>Failed to upload file.</div>";
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['name'])) {
    $personal_info = [
        'profile_image' => $_POST['profile_image'] ?? 'assets/images/profile.png',
        'github_username' => $_POST['github_username'] ?? '',
        'name' => $_POST['name'],
        'role' => $_POST['role'],
        'tagline' => $_POST['tagline'],
        'about' => $_POST['about'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'location' => $_POST['location'],
        'socials' => json_decode($_POST['socials'], true)
    ];
    
    $skills = json_decode($_POST['skills'], true);
    
    $old_data = json_decode(file_get_contents($json_file), true);
    $projects = $old_data['projects'] ?? [];
    
    if (json_last_error() === JSON_ERROR_NONE) {
        $new_data = [
            'personal_info' => $personal_info,
            'skills' => $skills,
            'projects' => $projects
        ];
        
        if (file_put_contents($json_file, json_encode($new_data, JSON_PRETTY_PRINT))) {
            $message = "<div class='alert success'>Data successfully updated!</div>";
        } else {
            $message = "<div class='alert error'>Failed to write to data.json. Check permissions.</div>";
        }
    } else {
        $message = "<div class='alert error'>Invalid JSON format in Skills or Socials. Please check your syntax.</div>";
    }
}

$current_data = json_decode(file_get_contents($json_file), true);
$pi = $current_data['personal_info'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SYS.ADMIN_DASHBOARD</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #050a0e;
            color: #e0f8ff;
            font-family: 'Inter', sans-serif;
            margin: 0; padding: 20px;
        }
        h1, h2, h3 { font-family: 'Share Tech Mono', monospace; color: #00f0ff; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #00f0ff; padding-bottom: 10px; margin-bottom: 20px; }
        .btn-logout { background: transparent; border: 1px solid #ff003c; color: #ff003c; padding: 8px 15px; text-decoration: none; font-family: 'Share Tech Mono', monospace; transition: 0.3s;}
        .btn-logout:hover { background: #ff003c; color: #fff; }
        .btn-save { background: rgba(0, 240, 255, 0.1); border: 1px solid #00f0ff; color: #00f0ff; padding: 12px 25px; cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 1.1rem; width: 100%; transition: 0.3s;}
        .btn-save:hover { background: #00f0ff; color: #000; }
        
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: rgba(6, 15, 20, 0.85); border: 1px solid #333; padding: 20px; border-radius: 4px; }
        
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-family: 'Share Tech Mono', monospace; color: #00f0ff; font-size: 0.9rem;}
        input[type="text"], input[type="email"], textarea {
            width: 100%; padding: 10px; background: rgba(0,0,0,0.5);
            border: 1px solid #333; color: #fff; font-family: 'Share Tech Mono', monospace;
            box-sizing: border-box;
        }
        input:focus, textarea:focus { outline: none; border-color: #00f0ff; }
        
        .alert { padding: 10px; margin-bottom: 20px; border-left: 3px solid; }
        .success { border-color: #00ff66; color: #00ff66; background: rgba(0,255,102,0.1); }
        .error { border-color: #ff003c; color: #ff003c; background: rgba(255,0,60,0.1); }
        .helper-text { font-size: 0.8rem; color: #6b8a96; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SYS.ADMIN_DASHBOARD</h1>
        <a href="logout.php" class="btn-logout">LOGOUT</a>
    </div>
    
    <?= $message ?>

    <div class="card" style="margin-bottom: 20px;">
        <h2>> FILE_UPLOADER</h2>
        <?= $upload_msg ?>
        <form method="POST" enctype="multipart/form-data" style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <select name="upload_target" style="padding: 8px; background: rgba(0,0,0,0.5); color: #fff; border: 1px solid #333; font-family: inherit;">
                <option value="profile">Update Profile Picture (Auto)</option>
                <option value="cv">Update CV / Resume (PDF)</option>
            </select>
            <input type="file" name="image_upload" required style="border: none; background: transparent; color: #fff;">
            <button type="submit" class="btn-save" style="width: auto; padding: 8px 15px; font-size: 0.9rem;">UPLOAD_FILE</button>
        </form>
        <div class="helper-text">Select your target and upload. CVs must be PDF format.</div>
    </div>

    <?php
    $analytics_file = __DIR__ . '/../analytics.json';
    $analytics = ['views' => 0];
    if (file_exists($analytics_file)) {
        $analytics = json_decode(file_get_contents($analytics_file), true) ?? ['views' => 0];
    }
    ?>
    <div class="card" style="margin-bottom: 20px; border-color: #00ff66;">
        <h2 style="color: #00ff66;">> SYSTEM_ANALYTICS</h2>
        <div style="font-size: 2.5rem; color: #fff; text-shadow: 0 0 10px #00ff66; margin: 10px 0;">
            <i class="fas fa-eye"></i> <?= number_format($analytics['views']) ?> <span style="font-size: 1rem; color: #00ff66;">TOTAL_VIEWS</span>
        </div>
        <div class="helper-text">Number of times your portfolio has been visited.</div>
    </div>

    <?php
    $msg_file = __DIR__ . '/../messages.json';
    $inbox = [];
    if (file_exists($msg_file)) {
        $inbox = json_decode(file_get_contents($msg_file), true) ?? [];
    }
    ?>
    <div class="card" style="margin-bottom: 20px;">
        <h2>> SECURE_INBOX (<?= count($inbox) ?>)</h2>
        <div style="max-height: 250px; overflow-y: auto; border: 1px solid #333; padding: 15px; background: rgba(0,0,0,0.5);">
            <?php if(empty($inbox)): ?>
                <p style="color: #6b8a96;">No messages found.</p>
            <?php else: ?>
                <?php foreach($inbox as $msg): ?>
                    <div style="border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 15px;">
                        <div style="color: #00f0ff; font-size: 0.85rem; margin-bottom: 5px;">[<?= $msg['date'] ?>] FROM: <?= htmlspecialchars($msg['name']) ?> &lt;<?= htmlspecialchars($msg['email']) ?>&gt;</div>
                        <div style="color: #e0f8ff; line-height: 1.4;"><?= nl2br(htmlspecialchars($msg['message'])) ?></div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>

    <form method="POST">
        <div class="grid">
            <div class="card">
                <h2>> PERSONAL_INFO</h2>
                <div class="form-group">
                    <label>PROFILE IMAGE URL</label>
                    <input type="text" name="profile_image" value="<?= htmlspecialchars($pi['profile_image'] ?? 'assets/images/profile.png') ?>" required>
                </div>
                <div class="form-group">
                    <label>NAME</label>
                    <input type="text" name="name" value="<?= htmlspecialchars($pi['name']) ?>" required>
                </div>
                <div class="form-group">
                    <label>GITHUB USERNAME (For Live API)</label>
                    <input type="text" name="github_username" value="<?= htmlspecialchars($pi['github_username'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>ROLE</label>
                    <input type="text" name="role" value="<?= htmlspecialchars($pi['role']) ?>" required>
                </div>
                <div class="form-group">
                    <label>TAGLINE</label>
                    <input type="text" name="tagline" value="<?= htmlspecialchars($pi['tagline']) ?>" required>
                </div>
                <div class="form-group">
                    <label>ABOUT</label>
                    <textarea name="about" rows="4" required><?= htmlspecialchars($pi['about']) ?></textarea>
                </div>
                <div class="form-group">
                    <label>EMAIL</label>
                    <input type="email" name="email" value="<?= htmlspecialchars($pi['email']) ?>" required>
                </div>
                <div class="form-group">
                    <label>PHONE</label>
                    <input type="text" name="phone" value="<?= htmlspecialchars($pi['phone']) ?>" required>
                </div>
                <div class="form-group">
                    <label>LOCATION</label>
                    <input type="text" name="location" value="<?= htmlspecialchars($pi['location']) ?>" required>
                </div>
            </div>

            <div class="card">
                <h2>> DATA_ARRAYS (JSON FORMAT)</h2>
                
                <div class="form-group">
                    <label>SOCIAL_LINKS</label>
                    <textarea name="socials" rows="5" required><?= htmlspecialchars(json_encode($pi['socials'], JSON_PRETTY_PRINT)) ?></textarea>
                    <div class="helper-text">Must be valid JSON formatting.</div>
                </div>
                
                <div class="form-group">
                    <label>SKILLS</label>
                    <textarea name="skills" rows="8" required><?= htmlspecialchars(json_encode($current_data['skills'], JSON_PRETTY_PRINT)) ?></textarea>
                </div>
            </div>
        </div>
        <br>
        <button type="submit" class="btn-save">SAVE_SYSTEM_DATA</button>
    </form>
</body>
</html>


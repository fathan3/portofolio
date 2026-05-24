<?php
session_start();

$admin_user = "admin";
$admin_pass = "admin123";

$error = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === $admin_user && $password === $admin_pass) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: index.php");
        exit;
    } else {
        $error = "ACCESS_DENIED: Invalid credentials.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SYS.ADMIN_LOGIN</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #050a0e;
            color: #00f0ff;
            font-family: 'Share Tech Mono', monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-box {
            border: 1px solid #00f0ff;
            padding: 30px;
            background: rgba(6, 15, 20, 0.85);
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
            width: 300px;
        }
        h2 { text-align: center; margin-top: 0; }
        .input-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-size: 0.9rem; }
        input {
            width: 100%; padding: 8px; box-sizing: border-box;
            background: rgba(0,0,0,0.5); border: 1px solid #333;
            color: #fff; font-family: inherit;
        }
        input:focus { outline: none; border-color: #00f0ff; }
        button {
            width: 100%; padding: 10px; background: transparent;
            color: #00f0ff; border: 1px solid #00f0ff;
            font-family: inherit; cursor: pointer; text-transform: uppercase;
        }
        button:hover { background: #00f0ff; color: #000; }
        .error { color: #ff003c; font-size: 0.8rem; margin-bottom: 15px; border-left: 2px solid #ff003c; padding-left: 5px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>SYS_AUTH</h2>
        <?php if($error): ?><div class="error">> <?= $error ?></div><?php endif; ?>
        <form method="POST">
            <div class="input-group">
                <label>> USERNAME</label>
                <input type="text" name="username" required autofocus>
            </div>
            <div class="input-group">
                <label>> PASSWORD</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit">AUTHENTICATE</button>
        </form>
    </div>
</body>
</html>


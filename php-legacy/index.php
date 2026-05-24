<?php 
include_once 'includes/header.php'; 

$form_status = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['message'])) {
    $msg_file = __DIR__ . '/messages.json';
    $messages = [];
    if (file_exists($msg_file)) {
        $messages = json_decode(file_get_contents($msg_file), true) ?? [];
    }
    
    $new_msg = [
        'id' => uniqid(),
        'date' => date('Y-m-d H:i:s'),
        'name' => htmlspecialchars($_POST['name']),
        'email' => htmlspecialchars($_POST['email']),
        'message' => htmlspecialchars($_POST['message'])
    ];
    
    array_unshift($messages, $new_msg);
    
    if (file_put_contents($msg_file, json_encode($messages, JSON_PRETTY_PRINT))) {
        $form_status = "> TRANSMISSION SENT AND SECURELY LOGGED.";
    } else {
        $form_status = "> WARNING: TRANSMISSION FAILED.";
    }
}
?>

<script>
    const GITHUB_USERNAME = "<?= htmlspecialchars($personal_info['github_username'] ?? '') ?>";
    const SYS_USER = "<?= htmlspecialchars($personal_info['name'] ?? 'USER') ?>";
</script>

<main class="bento-container">
    
    <section class="bento-box box-hero cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-id-badge"></i></span>
            <span class="title">USER_PROFILE.EXE</span>
        </div>
        <div class="box-content flex-row">
            <div class="profile-img-container cyber-glitch" data-text="PROFILE">
                <img src="<?= htmlspecialchars($personal_info['profile_image'] ?? 'assets/images/profile.png') ?>" alt="Profile" class="profile-img">
            </div>
            <div class="profile-info">
                <h1 class="neon-text"><?= strtoupper($personal_info['name']) ?></h1>
                <h2 class="sub-text">> <?= strtoupper($personal_info['role']) ?></h2>
                <div class="divider"></div>
                <p class="typewriter" id="hero-typewriter" data-text="<?= htmlspecialchars($personal_info['about']) ?>"></p>
                <div class="action-btns">
                    <a href="#contact-box" class="cyber-btn">INITIATE_CONTACT</a>
                    <a href="assets/cv/resume.pdf" download class="cyber-btn" style="border-color: var(--neon-green); color: var(--neon-green);">DOWNLOAD_CV.pdf</a>
                </div>
            </div>
        </div>
    </section>

    <section class="bento-box box-terminal cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-terminal"></i></span>
            <span class="title">SYSTEM_LOGS</span>
        </div>
        <div class="box-content terminal-content" id="terminal-output" style="display: flex; flex-direction: column; overflow: hidden;">
            <div id="terminal-log" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; justify-content: flex-end;">
            </div>
            <div class="terminal-input-line" style="display: flex; gap: 10px; margin-top: 10px; border-top: 1px dashed var(--neon-green-dim); padding-top: 10px; font-size: 0.85rem;">
                <span style="color: var(--neon-green);">guest@sys:~#</span>
                <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" style="background: transparent; border: none; color: #fff; font-family: var(--font-mono); outline: none; width: 100%; font-size: 0.85rem;">
            </div>
        </div>
    </section>

    <section class="bento-box box-skills cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-microchip"></i></span>
            <span class="title">CORE_COMPETENCIES</span>
        </div>
        <div class="box-content flex-center">
            <div class="skills-grid" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; align-items: center; width: 100%;">
                <?php 
                $skill_icons = [
                    'PHP' => ['fa-brands fa-php'],
                    'HTML & CSS' => ['fa-brands fa-html5', 'fa-brands fa-css3-alt'],
                    'JavaScript' => ['fa-brands fa-js'],
                    'MySQL' => ['fa-solid fa-database'],
                    'UI/UX Design' => ['fa-brands fa-figma'],
                    'Laravel' => ['fa-brands fa-laravel'],
                    'Flutter' => ['fa-solid fa-mobile-screen-button'],
                    'Kotlin' => ['fa-solid fa-code'],
                    'Node.js' => ['fa-brands fa-node-js'],
                    'React.js' => ['fa-brands fa-react'],
                    'Bootstrap' => ['fa-brands fa-bootstrap'],
                    'Tailwind' => ['fa-solid fa-wind'],
                    'Vanilla CSS' => ['fa-brands fa-css3']
                ];
                foreach($skills as $skill): 
                    $icons = isset($skill_icons[$skill['name']]) ? $skill_icons[$skill['name']] : ['fas fa-code'];
                    foreach($icons as $icon_class):
                ?>
                    <div class="skill-icon cyber-hover" title="<?= htmlspecialchars($skill['name']) ?>" style="font-size: 2.5rem; color: var(--neon-blue); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.color='var(--neon-green)'; this.style.textShadow='0 0 15px var(--neon-green)'; this.style.transform='translateY(-5px)';" onmouseout="this.style.color='var(--neon-blue)'; this.style.textShadow='none'; this.style.transform='translateY(0)';">
                        <i class="<?= $icon_class ?>"></i>
                    </div>
                <?php 
                    endforeach;
                endforeach; 
                ?>
            </div>
        </div>
    </section>

    <section class="bento-box box-projects cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-folder-open"></i></span>
            <span class="title">DATA_ARCHIVE // PROJECTS</span>
        </div>
        <div class="box-content projects-grid" id="projects-container">
            <?php foreach($projects as $index => $project): ?>
            <a href="<?= $project['link'] ?>" class="project-card cyber-hover">
                <div class="project-overlay-data">
                    <span class="proj-id">FILE_<?= sprintf('%03d', $index + 1) ?></span>
                    <span class="proj-title"><?= strtoupper($project['title']) ?></span>
                </div>
                <img src="<?= $project['image'] ?>" alt="<?= $project['title'] ?>">
                <div class="hover-data">
                    <p>> DESC: <?= $project['description'] ?></p>
                    <div class="tags">
                        <?php foreach($project['tags'] as $tag): ?>
                            <span class="tag">[<?= strtoupper($tag) ?>]</span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="bento-box box-location cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-globe-asia"></i></span>
            <span class="title">GEOLOCATION</span>
        </div>
        <div class="box-content flex-center">
            <div class="radar">
                <div class="sweep"></div>
                <div class="blip"></div>
            </div>
            <div class="coord-text">
                <p>LOC: <?= strtoupper($personal_info['location']) ?></p>
                <p>STATUS: ACTIVE</p>
            </div>
        </div>
    </section>

    <section id="contact-box" class="bento-box box-contact cyber-border">
        <div class="box-header">
            <span class="icon"><i class="fas fa-satellite-dish"></i></span>
            <span class="title">SECURE_COMM_CHANNEL</span>
        </div>
        <div class="box-content">
            <?php if($form_status): ?>
                <div class="system-msg success"><?= $form_status ?></div>
            <?php endif; ?>
            
            <div class="contact-text" style="margin-bottom: 20px; color: var(--neon-blue); font-size: 0.9rem; padding: 10px; background: rgba(0, 240, 255, 0.05); border-left: 2px solid var(--neon-blue);">
                <div>> EMAIL_NODE: <?= htmlspecialchars($personal_info['email']) ?></div>
                <div>> COMM_LINK: <?= htmlspecialchars($personal_info['phone']) ?></div>
            </div>
            
            <form action="index.php" method="POST" class="cyber-form">
                <div class="input-group">
                    <label>> IDENTIFIER</label>
                    <input type="text" name="name" required placeholder="ENTER_NAME...">
                </div>
                <div class="input-group">
                    <label>> RETURN_NODE (EMAIL)</label>
                    <input type="email" name="email" required placeholder="ENTER_EMAIL...">
                </div>
                <div class="input-group">
                    <label>> PAYLOAD (MESSAGE)</label>
                    <textarea name="message" rows="3" required placeholder="ENTER_MESSAGE..."></textarea>
                </div>
                <button type="submit" class="cyber-btn full-width">TRANSMIT_DATA</button>
            </form>
            
            <div class="social-links">
                <?php foreach($personal_info['socials'] as $network => $link): ?>
                    <a href="<?= $link ?>" target="_blank" class="social-btn"><i class="fab fa-<?= $network ?>"></i></a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

</main>

<?php include_once 'includes/footer.php'; ?>


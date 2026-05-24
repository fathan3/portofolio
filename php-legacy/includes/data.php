<?php

$json_file = __DIR__ . '/../data.json';

if (file_exists($json_file)) {
    $json_data = file_get_contents($json_file);
    $data = json_decode($json_data, true);
    
    $personal_info = $data['personal_info'];
    $skills = $data['skills'];
    $projects = $data['projects'];
} else {
    die("ERROR: data.json file is missing!");
}
?>


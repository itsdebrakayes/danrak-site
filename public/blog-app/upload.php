<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';
require_once __DIR__ . '/lib/auth.php';

header('Content-Type: application/json');
require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}
verify_csrf();

$cfg = config();
$max = (int) ($cfg['max_upload_bytes'] ?? 8 * 1024 * 1024);

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    exit(json_encode(['error' => 'No file received, or it was too large.']));
}
$file = $_FILES['image'];

if ($file['size'] > $max) {
    http_response_code(400);
    exit(json_encode(['error' => 'That image is larger than ' . round($max / 1048576) . 'MB.']));
}

// Trust the file's actual contents, never the name or the browser-supplied type.
$info = @getimagesize($file['tmp_name']);
$allowed = [
    IMAGETYPE_JPEG => 'jpg',
    IMAGETYPE_PNG  => 'png',
    IMAGETYPE_GIF  => 'gif',
    IMAGETYPE_WEBP => 'webp',
];
if (!$info || !isset($allowed[$info[2]])) {
    http_response_code(400);
    exit(json_encode(['error' => 'That file isn’t a JPG, PNG, GIF or WebP image.']));
}
$ext = $allowed[$info[2]];

$dir = __DIR__ . '/uploads';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    http_response_code(500);
    exit(json_encode(['error' => 'Could not create the uploads folder.']));
}

// Random name: an attacker-chosen filename must never reach the filesystem.
$name = date('Y-m') . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
$dest = $dir . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500);
    exit(json_encode(['error' => 'Could not save the image.']));
}
@chmod($dest, 0644);

echo json_encode(['url' => '/blog-app/uploads/' . $name]);

<?php
/**
 * Generates the password hash for config.php.
 *
 *   php tools/make-password.php "her chosen password"
 *
 * Paste the printed line into config.php as 'password_hash'. The password
 * itself is never written anywhere.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Command line only.');
}
$password = $argv[1] ?? '';
if (strlen($password) < 8) {
    fwrite(STDERR, "Usage: php tools/make-password.php \"a password of at least 8 characters\"\n");
    exit(1);
}
echo "    'password_hash' => '" . password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]) . "',\n";

<?php
declare(strict_types=1);

require_once __DIR__ . '/store.php';

const MAX_ATTEMPTS   = 8;    // per window, per IP
const ATTEMPT_WINDOW = 900;  // 15 minutes

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,   // not readable by page JavaScript
        'secure'   => $https, // only sent over TLS
        'samesite' => 'Lax',  // blocks cross-site form posts
    ]);
    session_name('danrak_blog');
    session_start();
}

function is_logged_in(): bool
{
    start_session();
    return !empty($_SESSION['author']);
}

function current_author(): ?array
{
    if (!is_logged_in()) {
        return null;
    }
    $cfg = config();
    return [
        'email' => $cfg['author_email'] ?? '',
        'name'  => $cfg['author_name'] ?? 'Author',
    ];
}

function require_auth(): array
{
    $a = current_author();
    if (!$a) {
        header('Location: /blog-login');
        exit;
    }
    return $a;
}

/* ---------- Rate limiting (flat file, no database) ---------- */

function attempts_file(): string
{
    $dir = __DIR__ . '/../data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir . '/attempts.json';
}

function client_ip(): string
{
    return substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
}

function read_attempts(): array
{
    $f = attempts_file();
    if (!is_file($f)) {
        return [];
    }
    $data = json_decode((string) file_get_contents($f), true);
    return is_array($data) ? $data : [];
}

function too_many_attempts(): bool
{
    $now = time();
    $ip  = client_ip();
    $recent = array_filter(
        read_attempts()[$ip] ?? [],
        static fn($t) => is_int($t) && ($now - $t) < ATTEMPT_WINDOW
    );
    return count($recent) >= MAX_ATTEMPTS;
}

function record_attempt(): void
{
    $now = time();
    $ip  = client_ip();
    $all = read_attempts();

    // Drop anything outside the window, for every IP, so the file stays small.
    foreach ($all as $k => $times) {
        $all[$k] = array_values(array_filter(
            (array) $times,
            static fn($t) => is_int($t) && ($now - $t) < ATTEMPT_WINDOW
        ));
        if (!$all[$k]) {
            unset($all[$k]);
        }
    }
    $all[$ip][] = $now;
    file_put_contents(attempts_file(), json_encode($all), LOCK_EX);
}

function clear_attempts(): void
{
    $all = read_attempts();
    unset($all[client_ip()]);
    file_put_contents(attempts_file(), json_encode($all), LOCK_EX);
}

/* ---------- Login ---------- */

function attempt_login(string $email, string $password): bool
{
    $cfg  = config();
    $hash = (string) ($cfg['password_hash'] ?? '');

    $emailOk = hash_equals(
        strtolower(trim((string) ($cfg['author_email'] ?? ''))),
        strtolower(trim($email))
    );

    // Verify against a dummy hash when the email is wrong, so a bad email and
    // a bad password cost the same time and neither reveals which was wrong.
    $probe = $emailOk && $hash !== ''
        ? $hash
        : '$2y$12$usesomesillystringfore7hnbRJHxXVLeakoG8K30oukPsA.ztMG';

    $passOk = password_verify($password, $probe);

    if (!$emailOk || !$passOk) {
        record_attempt();
        return false;
    }

    start_session();
    session_regenerate_id(true); // new id whenever privilege changes
    $_SESSION['author'] = $cfg['author_email'];
    clear_attempts();
    return true;
}

function logout(): void
{
    start_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

/* ---------- CSRF ---------- */

function csrf_token(): string
{
    start_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="_csrf" value="' . htmlspecialchars(csrf_token(), ENT_QUOTES) . '">';
}

function verify_csrf(): void
{
    start_session();
    $sent = $_POST['_csrf'] ?? '';
    if (!is_string($sent) || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $sent)) {
        http_response_code(400);
        exit('Your session expired. Go back, reload the page and try again.');
    }
}

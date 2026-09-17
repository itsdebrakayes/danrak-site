<?php
declare(strict_types=1);

/**
 * Flat-file post storage.
 *
 * One JSON file per post under data/posts/. At this scale a database buys
 * nothing a directory listing doesn't already give us, and this way the whole
 * blog can be backed up, moved or hand-edited without any tooling.
 */

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $path = __DIR__ . '/../config.php';
        if (!is_file($path)) {
            http_response_code(500);
            exit('Blog is not configured yet: config.php is missing.');
        }
        $cfg = require $path;
    }
    return $cfg;
}

function posts_dir(): string
{
    $dir = __DIR__ . '/../data/posts';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

/** Slugs are used to build filenames, so they must never contain path parts. */
function safe_slug(string $raw): string
{
    $s = strtolower(trim($raw));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    $s = trim($s, '-');
    return substr($s, 0, 120);
}

function post_path(string $slug): ?string
{
    $slug = safe_slug($slug);
    if ($slug === '') {
        return null;
    }
    return posts_dir() . '/' . $slug . '.json';
}

function load_post(string $slug): ?array
{
    $path = post_path($slug);
    if (!$path || !is_file($path)) {
        return null;
    }
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : null;
}

/**
 * @param bool $publishedOnly Exclude drafts (used by every public view).
 * @return array<int,array> Newest first.
 */
function all_posts(bool $publishedOnly = true): array
{
    $out = [];
    foreach (glob(posts_dir() . '/*.json') ?: [] as $file) {
        $data = json_decode((string) file_get_contents($file), true);
        if (!is_array($data)) {
            continue;
        }
        if ($publishedOnly && ($data['status'] ?? 'draft') !== 'published') {
            continue;
        }
        $out[] = $data;
    }
    usort($out, static function (array $a, array $b): int {
        return strcmp(
            (string) ($b['published_at'] ?? $b['created_at'] ?? ''),
            (string) ($a['published_at'] ?? $a['created_at'] ?? '')
        );
    });
    return $out;
}

function save_post(array $post): bool
{
    $path = post_path((string) $post['slug']);
    if (!$path) {
        return false;
    }
    $json = json_encode($post, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return false;
    }
    // Write to a temp file then rename, so a failed write can never leave a
    // half-written post on disk.
    $tmp = $path . '.tmp';
    if (file_put_contents($tmp, $json, LOCK_EX) === false) {
        return false;
    }
    return rename($tmp, $path);
}

function delete_post(string $slug): bool
{
    $path = post_path($slug);
    return $path && is_file($path) ? unlink($path) : false;
}

function slug_exists(string $slug): bool
{
    $path = post_path($slug);
    return $path !== null && is_file($path);
}

/** Appends -2, -3 … until the slug is free. */
function unique_slug(string $desired, ?string $ignore = null): string
{
    $base = safe_slug($desired) ?: 'post';
    $slug = $base;
    $n = 2;
    while (slug_exists($slug) && $slug !== $ignore) {
        $slug = $base . '-' . $n++;
    }
    return $slug;
}

function reading_minutes(string $html): int
{
    $words = str_word_count(strip_tags($html));
    return max(1, (int) ceil($words / 200));
}

/** First ~40 words of the body, for listings and meta descriptions. */
function auto_excerpt(string $html, int $words = 40): string
{
    $text = trim(preg_replace('/\s+/', ' ', strip_tags($html)) ?? '');
    $parts = explode(' ', $text);
    if (count($parts) <= $words) {
        return $text;
    }
    return implode(' ', array_slice($parts, 0, $words)) . '…';
}

/** Topics she can file a post under. */
function topics(): array
{
    return [
        'Healing', 'Grief', 'Childhood Trauma', 'Faith', 'Relationships',
        'Caribbean Life', 'Women & Wellness', 'Writing & Storytelling',
        'Behind the Book', 'Announcements',
    ];
}

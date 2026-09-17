<?php
declare(strict_types=1);

require_once __DIR__ . '/store.php';

/**
 * Shared page shell for the blog.
 *
 * The blog reuses the React site's compiled stylesheet rather than carrying
 * its own, so the two can never drift apart visually. Tailwind is configured
 * to scan these PHP files, which is what keeps the utility classes used here
 * from being purged out of that build.
 */

/** Locates the hashed CSS/JS emitted by the last Vite build. */
function asset_url(string $ext): ?string
{
    $root = $_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__, 3);
    $matches = glob(rtrim($root, '/') . '/assets/index-*.' . $ext) ?: [];
    if (!$matches) {
        return null;
    }
    return '/assets/' . basename($matches[0]);
}

function e(?string $v): string
{
    return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
}

/**
 * Strips everything except a conservative whitelist of tags and attributes.
 *
 * The editor produces HTML, and HTML from a browser is untrusted input like
 * any other: without this, a pasted <script> or an onerror attribute would be
 * stored and then served to every reader.
 */
function sanitize_html(string $html): string
{
    // strip_tags removes the tags but keeps whatever was between them, which
    // would leave script and style source sitting in the article as text.
    // Drop those elements wholesale first.
    $html = preg_replace('#<(script|style|iframe|object|embed)\b[^>]*>.*?</\1>#is', '', $html) ?? $html;
    $html = preg_replace('#<(script|style|iframe|object|embed)\b[^>]*/?>#i', '', $html) ?? $html;

    $allowed = '<p><br><strong><b><em><i><u><s><h2><h3><h4><ul><ol><li>'
             . '<blockquote><a><img><figure><figcaption><pre><code><hr>';
    $clean = strip_tags($html, $allowed);

    if (trim($clean) === '') {
        return '';
    }

    $doc = new DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    $doc->loadHTML(
        '<?xml encoding="UTF-8"><div id="__root">' . $clean . '</div>',
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );
    libxml_clear_errors();

    $allowedAttrs = [
        'a'   => ['href', 'title'],
        'img' => ['src', 'alt', 'width', 'height'],
    ];

    $xpath = new DOMXPath($doc);

    // Grab the wrapper before the attribute pass runs: that pass strips every
    // attribute not on the whitelist, which includes this element's own id.
    $rootNodes = $xpath->query('//div[@id="__root"]');
    $root = ($rootNodes && $rootNodes->length) ? $rootNodes->item(0) : null;

    foreach (iterator_to_array($xpath->query('//*') ?: []) as $node) {
        if (!$node instanceof DOMElement) {
            continue;
        }
        foreach (iterator_to_array($node->attributes ?? []) as $attr) {
            $name = strtolower($attr->nodeName);
            $ok = in_array($name, $allowedAttrs[strtolower($node->nodeName)] ?? [], true);
            if (!$ok) {
                $node->removeAttribute($attr->nodeName);
                continue;
            }
            // Block javascript:, data: and other script-bearing URL schemes.
            if ($name === 'href' || $name === 'src') {
                $val = trim($attr->nodeValue ?? '');
                $isSafe = preg_match('#^(https?://|/|mailto:|\#)#i', $val) === 1;
                if (!$isSafe) {
                    $node->removeAttribute($attr->nodeName);
                }
            }
        }
        // External links should not hand the destination window.opener access.
        if (strtolower($node->nodeName) === 'a') {
            $href = $node->getAttribute('href');
            if (preg_match('#^https?://#i', $href)) {
                $node->setAttribute('target', '_blank');
                $node->setAttribute('rel', 'noopener noreferrer');
            }
        }
    }

    if (!$root) {
        return '';
    }
    $out = '';
    foreach ($root->childNodes as $child) {
        $out .= $doc->saveHTML($child);
    }
    return $out;
}

/**
 * @param array $opts title, description, canonical, image, type, schema(array), noindex(bool)
 */
function render_head(array $opts): void
{
    $cfg  = config();
    $site = rtrim((string) ($cfg['site_url'] ?? ''), '/');
    $css  = asset_url('css');

    $title = $opts['title'] ?? 'Blog | Danrak Productions';
    $desc  = $opts['description'] ?? '';
    $canon = $site . ($opts['canonical'] ?? '/blog');
    $img   = $opts['image'] ?? null;
    if ($img && !preg_match('#^https?://#', $img)) {
        $img = $site . $img;
    }
    ?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title><?= e($title) ?></title>
<meta name="description" content="<?= e($desc) ?>">
<meta name="robots" content="<?= !empty($opts['noindex']) ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1' ?>">
<link rel="canonical" href="<?= e($canon) ?>">

<meta property="og:type" content="<?= e($opts['type'] ?? 'website') ?>">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e($desc) ?>">
<meta property="og:url" content="<?= e($canon) ?>">
<meta property="og:site_name" content="Danrak Productions">
<?php if ($img): ?><meta property="og:image" content="<?= e($img) ?>">
<?php endif; ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($title) ?>">
<meta name="twitter:description" content="<?= e($desc) ?>">
<?php if ($img): ?><meta name="twitter:image" content="<?= e($img) ?>">
<?php endif; ?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;700&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">
<link rel="icon" href="/head-icon.ico" type="image/x-icon">
<?php if ($css): ?><link rel="stylesheet" href="<?= e($css) ?>">
<?php endif; ?>
<?php foreach (($opts['schema'] ?? []) as $graph): ?>
<script type="application/ld+json"><?= json_encode($graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
</head>
<body class="bg-background text-foreground">
<?php
}

function render_nav(): void
{
    $links = [
        '/'                  => 'Home',
        '/about'             => 'About',
        '/showcase'          => 'Services',
        '/time-does-not-heal'=> 'The Book',
        '/about-author'      => 'The Author',
        '/blog'              => 'Blog',
        '/contact'           => 'Contact',
    ];
    ?>
<header class="sticky top-0 z-50 w-full border-b border-border bg-background/92 backdrop-blur-md">
  <div class="content-shell flex items-center gap-3 py-3">
    <a href="/" class="shrink-0 font-playfair text-lg font-bold text-brand-crimson">DANRAK</a>
    <nav aria-label="Primary" class="flex-1 overflow-x-auto no-scrollbar">
      <ul class="flex min-w-max items-center justify-end gap-1">
        <?php foreach ($links as $href => $label): ?>
        <li><a href="<?= e($href) ?>" class="block whitespace-nowrap px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-ocean"><?= e($label) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </nav>
  </div>
</header>
<?php
}

function render_footer(): void
{
    ?>
<footer class="mt-20 border-t border-border bg-muted/30">
  <div class="content-shell py-10">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="max-w-sm text-sm text-muted-foreground">
        Danrak Productions is a Jamaican communications and media production business, built on the
        power of great storytelling and the fervent belief that everyone has a story worth telling.
      </p>
      <div class="flex gap-5 text-2xl text-foreground/70">
        <a href="https://instagram.com/danrakproductions" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
        <a href="https://www.linkedin.com/in/stacy-ann-williams-smith-039242b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        <a href="https://www.youtube.com/@danrakproductions2241" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
      </div>
    </div>
    <div class="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
      <p>&copy; <?= date('Y') ?> Danrak Productions. Communicating More.</p>
      <p>Built by <span class="font-signature align-middle text-2xl leading-none text-brand-crimson">DKS Technologies</span></p>
    </div>
  </div>
</footer>
</body>
</html>
<?php
}

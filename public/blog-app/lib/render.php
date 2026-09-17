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

/** Locates the hashed logo emitted by the last Vite build. */
function logo_url(): ?string
{
    $root = $_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__, 3);
    $matches = glob(rtrim($root, '/') . '/assets/danrak-logo-*.webp') ?: [];
    return $matches ? '/assets/' . basename($matches[0]) : null;
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
 * First few block elements of a post body, as HTML.
 *
 * Used for the catalogue previews. Takes whole blocks rather than slicing the
 * string at a character count, because cutting HTML mid-tag produces broken
 * markup — and the fade-out at the bottom of the card is what signals
 * truncation to the reader, so the text itself doesn't need an ellipsis.
 */
function preview_blocks(string $html, int $maxBlocks = 3): string
{
    $html = trim($html);
    if ($html === '') {
        return '';
    }

    $doc = new DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    $doc->loadHTML(
        '<?xml encoding="UTF-8"><div id="__pv">' . $html . '</div>',
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );
    libxml_clear_errors();

    $xpath = new DOMXPath($doc);
    $nodes = $xpath->query('//div[@id="__pv"]');
    $root  = ($nodes && $nodes->length) ? $nodes->item(0) : null;
    if (!$root) {
        return '';
    }

    $out = '';
    $taken = 0;
    foreach ($root->childNodes as $child) {
        if ($taken >= $maxBlocks) {
            break;
        }
        // Skip whitespace-only text nodes and leading images.
        if ($child->nodeType === XML_TEXT_NODE && trim($child->textContent) === '') {
            continue;
        }
        $out .= $doc->saveHTML($child);
        $taken++;
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
<script>
  /* next-themes stores the choice in localStorage under "theme". Applying it
     here, before the body parses, means a visitor in dark mode who clicks
     through to the blog does not get a flash of the light theme. The viewport
     stamp matches what index.html does for the React pages. */
  (function () {
    try {
      var t = localStorage.getItem('theme');
      var dark = t === 'dark' || ((!t || t === 'system') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (dark) document.documentElement.classList.add('dark');
      var w = window.innerWidth || document.documentElement.clientWidth;
      document.documentElement.setAttribute('data-vp', w < 768 ? 'mobile' : w < 1280 ? 'tablet' : 'desktop');
    } catch (e) {}
  })();
</script>
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
        '/'                   => 'Home',
        '/about'              => 'About',
        '/showcase'           => 'Services',
        '/time-does-not-heal' => 'The Book',
        '/about-author'       => 'The Author',
        '/blog'               => 'Blog',
        '/contact'            => 'Contact',
    ];
    // Matches the React site's pill so the blog doesn't look like a bolt-on.
    $glass = 'bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl';
    $here  = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $logo  = logo_url();

    $active = static function (string $to) use ($here): bool {
        return $to === '/' ? $here === '/' : str_starts_with($here, $to);
    };
    ?>
<header class="fixed inset-x-0 top-0 z-[9999]" style="padding-top: calc(max(var(--safe-t), 0px) + 1.25rem);">
  <div class="mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-4 pb-3 sm:px-7">
    <a href="/" aria-label="Danrak Productions home" class="shrink-0 rounded-full px-3 py-2 <?= $glass ?>">
      <?php if ($logo): ?>
        <img src="<?= e($logo) ?>" alt="Danrak Productions" class="h-7 w-auto object-contain sm:h-8">
      <?php else: ?>
        <span class="font-playfair text-base font-bold text-brand-crimson">DANRAK</span>
      <?php endif; ?>
    </a>

    <nav aria-label="Primary" class="hidden rounded-full px-3 py-2 lg:flex lg:gap-1 <?= $glass ?>">
      <?php foreach ($links as $href => $label): ?>
        <a href="<?= e($href) ?>"
           <?= $active($href) ? 'aria-current="page"' : '' ?>
           class="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 <?= $active($href)
               ? 'border border-white/30 bg-white/25 shadow-md backdrop-blur-sm dark:bg-white/10'
               : 'hover:bg-white/25 hover:shadow-lg dark:hover:bg-white/10' ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
    </nav>

    <button type="button" id="navToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full lg:hidden <?= $glass ?>">
      <span aria-hidden="true" class="relative block h-3.5 w-4">
        <span id="navBar1" class="absolute left-0 top-0 h-[1.5px] w-4 bg-foreground transition-all duration-300"></span>
        <span id="navBar2" class="absolute left-0 top-1.5 h-[1.5px] w-4 bg-foreground transition-opacity duration-200"></span>
        <span id="navBar3" class="absolute left-0 top-3 h-[1.5px] w-4 bg-foreground transition-all duration-300"></span>
      </span>
    </button>
  </div>

  <div id="mobileNav" hidden class="mx-4 overflow-hidden rounded-3xl lg:hidden <?= $glass ?>">
    <nav aria-label="Primary" class="p-2">
      <ul>
        <?php foreach ($links as $href => $label): ?>
          <li><a href="<?= e($href) ?>" class="block rounded-2xl px-4 py-3 text-base font-medium transition-colors <?= $active($href) ? 'bg-white/30 text-foreground dark:bg-white/10' : 'text-foreground/85' ?>"><?= e($label) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </nav>
  </div>
</header>
<!-- Reserve the fixed header's height. -->
<div aria-hidden class="h-[5rem] sm:h-[5.5rem]"></div>
<script>
(function () {
  var btn = document.getElementById('navToggle'),
      panel = document.getElementById('mobileNav'),
      b1 = document.getElementById('navBar1'),
      b2 = document.getElementById('navBar2'),
      b3 = document.getElementById('navBar3');
  if (!btn || !panel) return;
  function set(open) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    b1.style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
    b3.style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
    b2.style.opacity = open ? '0' : '1';
  }
  btn.addEventListener('click', function () { set(panel.hidden); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
</script>
    <?php
}

function render_footer(): void
{
    $logo = logo_url();
    // Inline SVG rather than the icon font the React side uses, so the blog
    // carries no extra dependency for three glyphs.
    $icons = [
        'Instagram' => ['https://instagram.com/danrakproductions', 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 5.1a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm6-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z'],
        'LinkedIn'  => ['https://www.linkedin.com/in/stacy-ann-williams-smith-039242b4/', 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.35 4.78 5.4V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z'],
        'YouTube'   => ['https://www.youtube.com/@danrakproductions2241', 'M23 12s0-3.2-.4-4.7a2.4 2.4 0 00-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.4 2.4 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.9.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.4 2.4 0 001.7-1.7c.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l6.2 3.3z'],
    ];
    ?>
<footer class="mt-20 border-t border-border bg-muted/30">
  <div class="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <?php if ($logo): ?>
          <img src="<?= e($logo) ?>" alt="" class="mb-3 h-10 w-auto object-contain">
        <?php endif; ?>
        <p class="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Danrak Productions is a Jamaican communications and media production business, built on the
          power of great storytelling and the fervent belief that everyone has a story worth telling.
        </p>
      </div>
      <div class="flex gap-4">
        <?php foreach ($icons as $label => [$href, $path]): ?>
          <a href="<?= e($href) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($label) ?>"
             class="text-foreground/70 transition-colors hover:text-brand-ocean">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="<?= $path ?>"/></svg>
          </a>
        <?php endforeach; ?>
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

<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';
require_once __DIR__ . '/lib/auth.php';

$cfg    = config();
$site   = rtrim((string) $cfg['site_url'], '/');
$posts  = all_posts(true);
$topic  = isset($_GET['topic']) ? trim((string) $_GET['topic']) : '';

if ($topic !== '') {
    $posts = array_values(array_filter($posts, static fn($p) => ($p['topic'] ?? '') === $topic));
}

$usedTopics = [];
foreach (all_posts(true) as $p) {
    if (!empty($p['topic'])) {
        $usedTopics[$p['topic']] = true;
    }
}
$usedTopics = array_keys($usedTopics);
sort($usedTopics);

render_head([
    'title'       => $topic !== ""
        ? "$topic | Notes on Healing & Storytelling"
        : 'Notes on Healing & Storytelling | Stacy-Ann Smith',
    'description' => 'Essays by Jamaican author and broadcaster Stacy-Ann Smith on emotional healing, childhood trauma, grief, faith and Caribbean storytelling.',
    'canonical'   => $topic !== '' ? '/blog?topic=' . rawurlencode($topic) : '/blog',
    'schema'      => [[
        '@context' => 'https://schema.org',
        '@type'    => 'Blog',
        '@id'      => $site . '/blog#blog',
        'name'     => 'Notes on Healing & Storytelling',
        'url'      => $site . '/blog',
        'author'   => ['@id' => $site . '/#stacy-ann-smith'],
        'publisher'=> ['@id' => $site . '/#organization'],
        'blogPost' => array_map(static fn($p) => [
            '@type'         => 'BlogPosting',
            'headline'      => $p['title'] ?? '',
            'url'           => $site . '/blog/' . ($p['slug'] ?? ''),
            'datePublished' => $p['published_at'] ?? null,
            'author'        => ['@id' => $site . '/#stacy-ann-smith'],
        ], array_slice($posts, 0, 20)),
    ]],
]);
render_nav();
?>

<!-- Masthead -->
<div class="relative overflow-hidden border-b border-border">
  <div class="absolute inset-0 bg-gradient-to-br from-brand-forest/10 via-background to-brand-ocean/10"></div>
  <div class="content-shell relative py-14 md:py-20">
    <p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-forest sm:text-sm">Writing</p>
    <h1 class="font-playfair text-4xl font-black tracking-tight text-foreground sm:text-6xl">
      Notes on Healing &amp; Storytelling
    </h1>
    <div class="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-brand-forest via-brand-sky to-brand-crimson"></div>
    <p class="max-w-2xl text-lg text-muted-foreground">
      Essays from <?= e($cfg['author_name'] ?? 'Stacy-Ann Smith') ?> on trauma, grief, intentional
      healing, Caribbean storytelling and the work of communicating honestly.
    </p>
  </div>
</div>

<main class="content-shell max-w-3xl py-12">

  <?php if ($usedTopics): ?>
  <nav aria-label="Topics" class="mb-10 flex flex-wrap gap-2">
    <a href="/blog" class="rounded-full border px-3 py-1.5 text-sm transition-colors <?= $topic === '' ? 'border-brand-ocean bg-brand-ocean text-white' : 'border-border text-muted-foreground hover:border-brand-ocean' ?>">All</a>
    <?php foreach ($usedTopics as $t): ?>
      <a href="/blog?topic=<?= rawurlencode($t) ?>" class="rounded-full border px-3 py-1.5 text-sm transition-colors <?= $topic === $t ? 'border-brand-ocean bg-brand-ocean text-white' : 'border-border text-muted-foreground hover:border-brand-ocean' ?>"><?= e($t) ?></a>
    <?php endforeach; ?>
  </nav>
  <?php endif; ?>

  <?php if (!$posts): ?>
    <p class="text-muted-foreground">No articles published yet. Check back soon.</p>
  <?php else: ?>
    <div class="divide-y divide-border">
      <?php foreach ($posts as $p):
        $slug  = (string) ($p['slug'] ?? '');
        $date  = !empty($p['published_at']) ? strtotime((string) $p['published_at']) : null;
        $cover = $p['cover_image'] ?? null;
      ?>
      <article class="py-8 first:pt-0">
        <a href="/blog/<?= e($slug) ?>" class="group grid gap-5 <?= $cover ? 'sm:grid-cols-[1fr_200px]' : '' ?>">
          <div>
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <?php if (!empty($p['topic'])): ?>
                <span class="font-semibold uppercase tracking-widest text-brand-ocean"><?= e($p['topic']) ?></span>
                <span aria-hidden="true">·</span>
              <?php endif; ?>
              <?php if ($date): ?><time datetime="<?= e(date('Y-m-d', $date)) ?>"><?= e(date('j F Y', $date)) ?></time><span aria-hidden="true">·</span><?php endif; ?>
              <span><?= (int) ($p['reading_minutes'] ?? 1) ?> min read</span>
            </div>
            <h2 class="font-playfair text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand-ocean sm:text-3xl">
              <?= e($p['title'] ?? 'Untitled') ?>
            </h2>
            <?php if (!empty($p['subtitle'])): ?>
              <p class="mt-1 text-lg text-muted-foreground"><?= e($p['subtitle']) ?></p>
            <?php endif; ?>
            <p class="mt-3 text-muted-foreground"><?= e($p['excerpt'] ?? '') ?></p>
          </div>
          <?php if ($cover): ?>
            <img src="<?= e($cover) ?>" alt="<?= e($p['cover_alt'] ?? '') ?>" loading="lazy" decoding="async"
                 class="h-40 w-full rounded-lg object-cover sm:h-32">
          <?php endif; ?>
        </a>
      </article>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</main>

<?php render_footer(); ?>

<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';

$cfg   = config();
$site  = rtrim((string) $cfg['site_url'], '/');
$all   = all_posts(true);
$topic = isset($_GET['topic']) ? trim((string) $_GET['topic']) : '';
$posts = $topic !== ''
    ? array_values(array_filter($all, static fn($p) => ($p['topic'] ?? '') === $topic))
    : $all;

$usedTopics = [];
foreach ($all as $p) {
    if (!empty($p['topic'])) { $usedTopics[$p['topic']] = true; }
}
$usedTopics = array_keys($usedTopics);
sort($usedTopics);

$lead = $topic === '' ? ($posts[0] ?? null) : null;
$rest = $lead ? array_slice($posts, 1) : $posts;

render_head([
    'title'       => $topic !== ''
        ? "$topic | Notes on Healing & Storytelling"
        : 'Notes on Healing & Storytelling | Stacy-Ann Smith',
    'description' => 'Essays by Jamaican author and broadcaster Stacy-Ann Smith on emotional healing, childhood trauma, grief, faith and Caribbean storytelling.',
    'canonical'   => $topic !== '' ? '/blog?topic=' . rawurlencode($topic) : '/blog',
    'schema'      => [[
        '@context'  => 'https://schema.org',
        '@type'     => 'Blog',
        '@id'       => $site . '/blog#blog',
        'name'      => 'Notes on Healing & Storytelling',
        'url'       => $site . '/blog',
        'author'    => ['@id' => $site . '/#stacy-ann-smith'],
        'publisher' => ['@id' => $site . '/#organization'],
        'blogPost'  => array_map(static fn($p) => [
            '@type'         => 'BlogPosting',
            'headline'      => $p['title'] ?? '',
            'url'           => $site . '/blog/' . ($p['slug'] ?? ''),
            'datePublished' => $p['published_at'] ?? null,
            'author'        => ['@id' => $site . '/#stacy-ann-smith'],
        ], array_slice($posts, 0, 20)),
    ]],
]);
render_nav();

/** Small caps metadata row shared by the lead and the list. */
function meta_row(array $p, bool $light = false): void
{
    $date = !empty($p['published_at']) ? strtotime((string) $p['published_at']) : null;
    $cls  = $light ? 'text-muted-foreground' : 'text-muted-foreground';
    ?>
    <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em] <?= $cls ?>">
      <?php if (!empty($p['topic'])): ?>
        <span class="font-semibold text-brand-ocean"><?= e($p['topic']) ?></span>
        <span class="opacity-40" aria-hidden="true">/</span>
      <?php endif; ?>
      <?php if ($date): ?>
        <time datetime="<?= e(date('Y-m-d', $date)) ?>"><?= e(date('j M Y', $date)) ?></time>
        <span class="opacity-40" aria-hidden="true">/</span>
      <?php endif; ?>
      <span><?= (int) ($p['reading_minutes'] ?? 1) ?> min</span>
    </div>
    <?php
}
?>

<!-- Masthead -->
<section class="border-b border-border/70">
  <div class="mx-auto w-full max-w-3xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
    <p class="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-forest">Writing</p>
    <h1 class="font-playfair text-[2.6rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
      Notes on Healing<br class="hidden sm:block"> &amp; Storytelling
    </h1>
    <p class="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
      Essays from <?= e($cfg['author_name'] ?? 'Stacy-Ann Smith') ?> on trauma, grief, intentional
      healing, Caribbean storytelling and the work of communicating honestly.
    </p>
    <div class="mx-auto mt-9 h-px w-16 bg-gradient-to-r from-transparent via-brand-crimson to-transparent"></div>
  </div>
</section>

<main class="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">

  <?php if ($usedTopics): ?>
  <nav aria-label="Topics" class="flex flex-wrap justify-center gap-2 border-b border-border/70 py-7">
    <a href="/blog" class="rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors <?= $topic === '' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground' ?>">All</a>
    <?php foreach ($usedTopics as $t): ?>
      <a href="/blog?topic=<?= rawurlencode($t) ?>" class="rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors <?= $topic === $t ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground' ?>"><?= e($t) ?></a>
    <?php endforeach; ?>
  </nav>
  <?php endif; ?>

  <?php if (!$posts): ?>
    <p class="py-20 text-center text-muted-foreground">No articles published yet. Check back soon.</p>
  <?php else: ?>

    <?php if ($lead): ?>
    <!-- Lead article -->
    <article class="border-b border-border/70 py-12 sm:py-16">
      <a href="/blog/<?= e((string) $lead['slug']) ?>" class="group block">
        <?php if (!empty($lead['cover_image'])): ?>
          <img src="<?= e($lead['cover_image']) ?>" alt="<?= e($lead['cover_alt'] ?? '') ?>"
               loading="eager" decoding="async"
               class="mb-9 aspect-[16/8] w-full rounded-xl object-cover">
        <?php endif; ?>
        <?php meta_row($lead); ?>
        <h2 class="mt-4 font-playfair text-3xl font-bold leading-[1.15] tracking-tight text-foreground transition-colors group-hover:text-brand-ocean sm:text-[2.6rem]">
          <?= e($lead['title'] ?? 'Untitled') ?>
        </h2>
        <?php if (!empty($lead['subtitle'])): ?>
          <p class="mt-3 text-lg leading-relaxed text-muted-foreground sm:text-xl"><?= e($lead['subtitle']) ?></p>
        <?php endif; ?>
        <p class="mt-4 leading-relaxed text-muted-foreground"><?= e($lead['excerpt'] ?? '') ?></p>
        <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ocean">
          Read <span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </span>
      </a>
    </article>
    <?php endif; ?>

    <?php if ($rest): ?>
    <div class="divide-y divide-border/70">
      <?php foreach ($rest as $p):
        $slug  = (string) ($p['slug'] ?? '');
        $cover = $p['cover_image'] ?? null;
      ?>
      <article class="py-10">
        <a href="/blog/<?= e($slug) ?>" class="group grid gap-6 <?= $cover ? 'sm:grid-cols-[1fr_9rem]' : '' ?> sm:items-start">
          <div class="min-w-0">
            <?php meta_row($p); ?>
            <h2 class="mt-3 font-playfair text-[1.4rem] font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-ocean sm:text-2xl">
              <?= e($p['title'] ?? 'Untitled') ?>
            </h2>
            <?php if (!empty($p['subtitle'])): ?>
              <p class="mt-1.5 leading-relaxed text-muted-foreground"><?= e($p['subtitle']) ?></p>
            <?php endif; ?>
            <p class="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground"><?= e($p['excerpt'] ?? '') ?></p>
          </div>
          <?php if ($cover): ?>
            <img src="<?= e($cover) ?>" alt="<?= e($p['cover_alt'] ?? '') ?>" loading="lazy" decoding="async"
                 class="aspect-[4/3] w-full rounded-lg object-cover">
          <?php endif; ?>
        </a>
      </article>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>

  <?php endif; ?>
</main>

<?php render_footer(); ?>

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


render_head([
    'title'       => $topic !== ''
        ? "$topic | Notes on Healing & Storytelling"
        : 'Notes on Healing & Storytelling | Stacy-Ann Smith',
    'description' => 'Articles by Jamaican author and broadcaster Stacy-Ann Smith on emotional healing, childhood trauma, grief, faith and Caribbean storytelling.',
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
      Articles from <?= e($cfg['author_name'] ?? 'Stacy-Ann Smith') ?> on trauma, grief, intentional
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
    <div class="py-20 text-center">
      <div aria-hidden="true" class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border text-2xl text-muted-foreground">✎</div>
      <?php if ($topic !== ''): ?>
        <h2 class="font-playfair text-2xl font-bold text-foreground">Nothing under <?= e($topic) ?> yet</h2>
        <p class="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
          There are no articles filed under this topic at the moment.
        </p>
        <a href="/blog" class="mt-7 inline-flex items-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">See all articles</a>
      <?php else: ?>
        <h2 class="font-playfair text-2xl font-bold text-foreground">The first article is on its way</h2>
        <p class="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          Stacy-Ann is writing about trauma, grief, intentional healing and Caribbean storytelling.
          In the meantime, there is the memoir that started it all.
        </p>
        <div class="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/time-does-not-heal" class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Read about the book</a>
          <a href="/about-author" class="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-ocean hover:text-brand-ocean">About the author</a>
        </div>
      <?php endif; ?>
    </div>
  <?php else: ?>

    <div class="space-y-8 py-10">
      <?php foreach ($posts as $p):
        $slug    = (string) ($p['slug'] ?? '');
        $cover   = $p['cover_image'] ?? null;
        $preview = preview_blocks((string) ($p['body_html'] ?? ''), 3);
      ?>
      <article class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <?php if ($cover): ?>
          <a href="/blog/<?= e($slug) ?>" tabindex="-1" aria-hidden="true">
            <img src="<?= e($cover) ?>" alt="" loading="lazy" decoding="async"
                 class="aspect-[16/7] w-full object-cover">
          </a>
        <?php endif; ?>

        <div class="px-6 pt-6 sm:px-8">
          <?php meta_row($p); ?>
          <h2 class="mt-3 font-playfair text-2xl font-bold leading-snug tracking-tight sm:text-[1.7rem]">
            <a href="/blog/<?= e($slug) ?>" class="text-foreground transition-colors hover:text-brand-ocean">
              <?= e($p['title'] ?? 'Untitled') ?>
            </a>
          </h2>
          <?php if (!empty($p['subtitle'])): ?>
            <p class="mt-1.5 leading-relaxed text-muted-foreground"><?= e($p['subtitle']) ?></p>
          <?php endif; ?>
        </div>

        <?php if ($preview !== ''): ?>
          <!-- Preview clipped to a fixed height with the text fading into the
               card, so the cut-off reads as intentional rather than broken. -->
          <div class="relative mt-4 max-h-44 overflow-hidden px-6 sm:px-8">
            <div class="prose prose-sm max-w-none dark:prose-invert
                        prose-headings:font-playfair prose-headings:text-foreground
                        prose-h2:mb-1.5 prose-h2:mt-3 prose-h2:text-base
                        prose-p:my-2 prose-p:leading-relaxed prose-p:text-muted-foreground
                        prose-strong:text-foreground prose-a:no-underline prose-a:text-muted-foreground">
              <?= $preview ?>
            </div>
            <div aria-hidden="true"
                 class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-card via-card/85 to-transparent"></div>
          </div>
        <?php endif; ?>

        <a href="/blog/<?= e($slug) ?>"
           class="mt-1 flex items-center justify-center gap-1.5 border-t border-border py-3.5 text-sm font-semibold text-brand-ocean transition-colors hover:bg-muted/50">
          Read more
          <span aria-hidden="true">→</span>
        </a>
      </article>
      <?php endforeach; ?>
    </div>

  <?php endif; ?>
</main>

<?php render_footer(); ?>

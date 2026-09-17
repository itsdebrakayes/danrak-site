<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';

$cfg  = config();
$site = rtrim((string) $cfg['site_url'], '/');
$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$post = $slug !== '' ? load_post($slug) : null;

// Drafts stay invisible to the public even if the URL is guessed.
if (!$post || ($post['status'] ?? 'draft') !== 'published') {
    http_response_code(404);
    render_head([
        'title'       => 'Article not found | Danrak Productions',
        'description' => 'This article could not be found.',
        'canonical'   => '/blog',
        'noindex'     => true,
    ]);
    render_nav();
    echo '<main class="mx-auto w-full max-w-xl px-5 py-32 text-center">'
       . '<h1 class="mb-3 font-playfair text-3xl font-bold text-foreground">Article not found</h1>'
       . '<p class="mb-7 text-muted-foreground">That article doesn’t exist, or the link has changed.</p>'
       . '<a href="/blog" class="text-sm font-semibold text-brand-ocean hover:underline">← Back to all articles</a>'
       . '</main>';
    render_footer();
    exit;
}

$url       = $site . '/blog/' . $post['slug'];
$published = !empty($post['published_at']) ? strtotime((string) $post['published_at']) : null;
$updated   = !empty($post['updated_at']) ? strtotime((string) $post['updated_at']) : $published;
$tags      = array_values(array_filter(array_map('trim', explode(',', (string) ($post['tags'] ?? '')))));
$settings  = load_settings();
$authorNm  = (string) ($post['author_name'] ?? $settings['author_name'] ?? 'Stacy-Ann Smith');
$avatar    = $settings['author_avatar'] ?? null;
$authorBio = (string) ($settings['author_bio'] ?? '');
$initials  = author_initials($authorNm);

$schema = [[
    '@context'         => 'https://schema.org',
    '@type'            => 'BlogPosting',
    '@id'              => $url . '#article',
    'headline'         => $post['title'] ?? '',
    'description'      => $post['meta_description'] ?? ($post['excerpt'] ?? ''),
    'url'              => $url,
    'datePublished'    => $published ? date('c', $published) : null,
    'dateModified'     => $updated ? date('c', $updated) : null,
    'author'           => ['@id' => $site . '/#stacy-ann-smith'],
    'publisher'        => ['@id' => $site . '/#organization'],
    'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $url],
    'isPartOf'         => ['@id' => $site . '/blog#blog'],
    'articleSection'   => $post['topic'] ?? null,
    'keywords'         => $tags ? implode(', ', $tags) : null,
    'image'            => !empty($post['cover_image']) ? $site . $post['cover_image'] : null,
]];
$schema[0] = array_filter($schema[0], static fn($v) => $v !== null && $v !== '');

render_head([
    'title'       => ($post['meta_title'] ?: $post['title']) . ' | Stacy-Ann Smith',
    'description' => $post['meta_description'] ?: ($post['excerpt'] ?? ''),
    'canonical'   => '/blog/' . $post['slug'],
    'type'        => 'article',
    'image'       => $post['cover_image'] ?? null,
    'schema'      => $schema,
]);
render_nav();
?>

<article class="mx-auto w-full max-w-[40rem] px-5 pb-20 pt-14 sm:px-8 sm:pt-20">

  <!-- Eyebrow -->
  <div class="mb-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
    <a href="/blog" class="font-semibold text-brand-ocean hover:underline">Blog</a>
    <?php if (!empty($post['topic'])): ?>
      <span class="opacity-40" aria-hidden="true">/</span>
      <a href="/blog?topic=<?= rawurlencode($post['topic']) ?>" class="font-semibold text-brand-ocean hover:underline"><?= e($post['topic']) ?></a>
    <?php endif; ?>
  </div>

  <h1 class="font-playfair text-[2.1rem] font-bold leading-[1.12] tracking-tight text-foreground sm:text-[2.9rem]">
    <?= e($post['title'] ?? '') ?>
  </h1>

  <?php if (!empty($post['subtitle'])): ?>
    <p class="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl"><?= e($post['subtitle']) ?></p>
  <?php endif; ?>

  <!-- Byline -->
  <div class="mt-8 flex items-center gap-3 border-y border-border/70 py-4">
    <?php if ($avatar): ?>
      <img src="<?= e($avatar) ?>" alt="<?= e($authorNm) ?>" width="36" height="36"
           class="h-9 w-9 shrink-0 rounded-full object-cover" loading="lazy" decoding="async">
    <?php else: ?>
      <span aria-hidden="true"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[0.7rem] font-semibold tracking-wide text-muted-foreground">
        <?= e($initials) ?>
      </span>
    <?php endif; ?>
    <div class="min-w-0 text-sm">
      <p class="font-semibold text-foreground"><?= e($authorNm) ?></p>
      <p class="text-[0.78rem] text-muted-foreground">
        <?php if ($published): ?><time datetime="<?= e(date('Y-m-d', $published)) ?>"><?= e(date('j F Y', $published)) ?></time> · <?php endif; ?>
        <?= (int) ($post['reading_minutes'] ?? 1) ?> min read
      </p>
    </div>
  </div>

  <?php if (!empty($post['cover_image'])): ?>
    <figure class="mt-10">
      <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['cover_alt'] ?? '') ?>"
           class="w-full rounded-xl object-cover" loading="eager" decoding="async">
      <?php if (!empty($post['cover_alt'])): ?>
        <figcaption class="mt-2.5 text-center text-[0.78rem] text-muted-foreground"><?= e($post['cover_alt']) ?></figcaption>
      <?php endif; ?>
    </figure>
  <?php endif; ?>

  <!-- Body -->
  <div class="prose prose-lg mt-10 max-w-none dark:prose-invert
              prose-headings:font-playfair prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-[1.6rem] prose-h2:leading-snug
              prose-h3:mt-9 prose-h3:mb-2 prose-h3:text-xl
              prose-p:leading-[1.8] prose-p:text-muted-foreground
              prose-li:leading-[1.8] prose-li:text-muted-foreground
              prose-strong:font-semibold prose-strong:text-foreground
              prose-a:font-medium prose-a:text-brand-ocean prose-a:underline-offset-2
              prose-blockquote:border-l-2 prose-blockquote:border-brand-crimson
              prose-blockquote:not-italic prose-blockquote:font-playfair
              prose-blockquote:text-lg prose-blockquote:text-foreground
              prose-img:rounded-xl prose-hr:border-border/70">
    <?= $post['body_html'] ?? '' ?>
  </div>

  <?php if ($tags): ?>
    <div class="mt-14 flex flex-wrap gap-2 border-t border-border/70 pt-7">
      <?php foreach ($tags as $t): ?>
        <span class="rounded-full border border-border/80 px-3 py-1 text-[0.72rem] text-muted-foreground"><?= e($t) ?></span>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>

  <!-- Author note -->
  <aside class="mt-12 rounded-2xl border border-border/80 bg-muted/25 p-7 sm:p-8">
    <div class="flex items-center gap-3">
      <?php if ($avatar): ?>
        <img src="<?= e($avatar) ?>" alt="<?= e($authorNm) ?>" width="56" height="56"
             class="h-14 w-14 shrink-0 rounded-full object-cover" loading="lazy" decoding="async">
      <?php else: ?>
        <span aria-hidden="true"
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
          <?= e($initials) ?>
        </span>
      <?php endif; ?>
      <div>
        <p class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-crimson">Written by</p>
        <h2 class="font-playfair text-xl font-bold text-foreground"><?= e($authorNm) ?></h2>
      </div>
    </div>
    <?php if ($authorBio !== ''): ?>
      <p class="mt-5 leading-relaxed text-muted-foreground"><?= e($authorBio) ?></p>
    <?php endif; ?>
    <div class="mt-6 flex flex-wrap gap-2.5">
      <a href="/time-does-not-heal" class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Read about the book</a>
      <a href="/about-author" class="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-ocean hover:text-brand-ocean">About the author</a>
    </div>
  </aside>

  <p class="mt-12 text-center">
    <a href="/blog" class="text-sm font-semibold text-brand-ocean hover:underline">← All articles</a>
  </p>
</article>

<?php render_footer(); ?>

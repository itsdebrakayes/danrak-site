<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';

$cfg  = config();
$site = rtrim((string) $cfg['site_url'], '/');
$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$post = $slug !== '' ? load_post($slug) : null;

// Drafts stay invisible to the public even if someone guesses the URL.
if (!$post || ($post['status'] ?? 'draft') !== 'published') {
    http_response_code(404);
    render_head([
        'title'       => 'Article not found | Danrak Productions',
        'description' => 'This article could not be found.',
        'canonical'   => '/blog',
        'noindex'     => true,
    ]);
    render_nav();
    echo '<main class="content-shell max-w-2xl py-24 text-center">'
       . '<h1 class="mb-3 font-playfair text-3xl font-bold text-foreground">Article not found</h1>'
       . '<p class="mb-6 text-muted-foreground">That article doesn’t exist, or the link has changed.</p>'
       . '<a href="/blog" class="font-semibold text-brand-ocean hover:underline">← Back to all articles</a>'
       . '</main>';
    render_footer();
    exit;
}

$url       = $site . '/blog/' . $post['slug'];
$published = !empty($post['published_at']) ? strtotime((string) $post['published_at']) : null;
$updated   = !empty($post['updated_at']) ? strtotime((string) $post['updated_at']) : $published;
$tags      = array_values(array_filter(array_map('trim', explode(',', (string) ($post['tags'] ?? '')))));

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

<article class="content-shell max-w-2xl py-12">
  <div class="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
    <a href="/blog" class="font-semibold text-brand-ocean hover:underline">Blog</a>
    <?php if (!empty($post['topic'])): ?>
      <span aria-hidden="true">·</span>
      <a href="/blog?topic=<?= rawurlencode($post['topic']) ?>" class="font-semibold uppercase tracking-widest text-brand-ocean hover:underline"><?= e($post['topic']) ?></a>
    <?php endif; ?>
    <?php if ($published): ?>
      <span aria-hidden="true">·</span>
      <time datetime="<?= e(date('Y-m-d', $published)) ?>"><?= e(date('j F Y', $published)) ?></time>
    <?php endif; ?>
    <span aria-hidden="true">·</span>
    <span><?= (int) ($post['reading_minutes'] ?? 1) ?> min read</span>
  </div>

  <h1 class="font-playfair text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
    <?= e($post['title'] ?? '') ?>
  </h1>
  <?php if (!empty($post['subtitle'])): ?>
    <p class="mt-3 text-xl leading-relaxed text-muted-foreground"><?= e($post['subtitle']) ?></p>
  <?php endif; ?>

  <div class="my-7 h-1 w-20 rounded-full bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest"></div>

  <?php if (!empty($post['cover_image'])): ?>
    <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['cover_alt'] ?? '') ?>"
         class="mb-10 w-full rounded-xl object-cover shadow-lg" loading="eager" decoding="async">
  <?php endif; ?>

  <div class="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-playfair prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-li:text-muted-foreground
              prose-a:text-brand-ocean prose-strong:text-foreground
              prose-blockquote:border-brand-crimson prose-blockquote:text-foreground
              prose-img:rounded-xl">
    <?= $post['body_html'] ?? '' ?>
  </div>

  <?php if ($tags): ?>
    <div class="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
      <?php foreach ($tags as $t): ?>
        <span class="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"><?= e($t) ?></span>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>

  <aside class="mt-12 rounded-2xl border border-border bg-gradient-to-br from-brand-crimson/5 to-brand-ocean/5 p-6 sm:p-8">
    <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-crimson">About the author</p>
    <h2 class="mb-3 font-playfair text-2xl font-bold text-foreground"><?= e($cfg['author_name'] ?? 'Stacy-Ann Smith') ?></h2>
    <p class="mb-5 text-muted-foreground">
      Jamaican author, journalist and broadcaster. Founder and CEO of Danrak Productions, creator and
      host of It’s A Woman’s World, and author of the memoir <em>Time Does Not Heal</em>.
    </p>
    <div class="flex flex-wrap gap-3">
      <a href="/time-does-not-heal" class="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Read about the book</a>
      <a href="/about-author" class="rounded-xl bg-secondary px-5 py-2.5 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">About the author</a>
    </div>
  </aside>

  <p class="mt-10"><a href="/blog" class="font-semibold text-brand-ocean hover:underline">← All articles</a></p>
</article>

<?php render_footer(); ?>

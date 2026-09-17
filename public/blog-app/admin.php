<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';
require_once __DIR__ . '/lib/auth.php';

$author = require_auth();

// Delete goes through POST + CSRF so it can't be triggered by a stray link.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    verify_csrf();
    delete_post((string) ($_POST['slug'] ?? ''));
    header('Location: /blog-admin?deleted=1');
    exit;
}

$posts = all_posts(false); // drafts included
$drafts    = array_filter($posts, static fn($p) => ($p['status'] ?? '') !== 'published');
$published = array_filter($posts, static fn($p) => ($p['status'] ?? '') === 'published');

render_head([
    'title'     => 'Your posts',
    'canonical' => '/blog-admin',
    'noindex'   => true,
]);
?>
<div class="min-h-screen bg-muted/20">
  <header class="border-b border-border bg-background">
    <div class="content-shell flex flex-wrap items-center justify-between gap-3 py-4">
      <div>
        <p class="font-playfair text-lg font-bold text-brand-crimson">DANRAK</p>
        <p class="text-xs text-muted-foreground">Signed in as <?= e($author['name']) ?></p>
      </div>
      <div class="flex items-center gap-3">
        <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-brand-ocean">View blog</a>
        <a href="/blog-admin/new" class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Write a new post</a>
        <a href="/blog-logout" class="text-sm font-medium text-muted-foreground hover:text-destructive">Sign out</a>
      </div>
    </div>
  </header>

  <main class="content-shell max-w-4xl py-10">
    <?php if (isset($_GET['saved'])): ?>
      <div class="mb-6 rounded-xl border border-brand-forest/40 bg-brand-forest/10 px-4 py-3 text-sm text-foreground">Saved.</div>
    <?php endif; ?>
    <?php if (isset($_GET['deleted'])): ?>
      <div class="mb-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">Post deleted.</div>
    <?php endif; ?>

    <h1 class="mb-8 font-playfair text-3xl font-bold text-foreground">Your posts</h1>

    <?php
    $render = function (array $list, string $heading, string $empty) {
        echo '<section class="mb-10">';
        echo '<h2 class="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">' . e($heading) . '</h2>';
        if (!$list) {
            echo '<p class="text-sm text-muted-foreground">' . e($empty) . '</p></section>';
            return;
        }
        echo '<ul class="space-y-3">';
        foreach ($list as $p) {
            $slug = e((string) ($p['slug'] ?? ''));
            $when = !empty($p['published_at']) ? date('j M Y', strtotime((string) $p['published_at'])) : 'Not published';
            ?>
            <li class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
              <div class="min-w-0">
                <p class="truncate font-semibold text-foreground"><?= e($p['title'] ?? 'Untitled') ?></p>
                <p class="text-xs text-muted-foreground">
                  <?= e($when) ?><?= !empty($p['topic']) ? ' · ' . e($p['topic']) : '' ?> · /blog/<?= $slug ?>
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <?php if (($p['status'] ?? '') === 'published'): ?>
                  <a href="/blog/<?= $slug ?>" class="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-brand-ocean hover:text-brand-ocean">View</a>
                <?php endif; ?>
                <a href="/blog-admin/edit/<?= $slug ?>" class="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-ocean hover:text-brand-ocean">Edit</a>
                <form method="post" onsubmit="return confirm('Delete this post permanently? This cannot be undone.');" class="inline">
                  <?= csrf_field() ?>
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="slug" value="<?= $slug ?>">
                  <button type="submit" class="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-destructive hover:text-destructive">Delete</button>
                </form>
              </div>
            </li>
            <?php
        }
        echo '</ul></section>';
    };
    $render($drafts, 'Drafts', 'No drafts.');
    $render($published, 'Published', 'Nothing published yet.');
    ?>
  </main>
</div>
</body>
</html>

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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'profile') {
    verify_csrf();
    $settings = load_settings();
    $settings['author_avatar'] = trim((string) ($_POST['author_avatar'] ?? '')) ?: null;
    $settings['author_bio']    = trim((string) ($_POST['author_bio'] ?? ''));
    save_settings($settings);
    header('Location: /blog-admin?profile=1');
    exit;
}

$settings = load_settings();
$initials = author_initials((string) $settings['author_name']);

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
    <?php if (isset($_GET['profile'])): ?>
      <div class="mb-6 rounded-xl border border-brand-forest/40 bg-brand-forest/10 px-4 py-3 text-sm text-foreground">Profile updated.</div>
    <?php endif; ?>

    <!-- Author profile: shown on every article byline -->
    <form method="post" class="mb-10 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="profile">
      <h2 class="mb-1 font-playfair text-xl font-bold text-foreground">Your author profile</h2>
      <p class="mb-5 text-sm text-muted-foreground">Shown beside your name on every article.</p>

      <div class="flex flex-wrap items-start gap-5">
        <div class="shrink-0 text-center">
          <?php if (!empty($settings['author_avatar'])): ?>
            <img id="avatarPreview" src="<?= e($settings['author_avatar']) ?>" alt=""
                 class="h-20 w-20 rounded-full object-cover">
          <?php else: ?>
            <span id="avatarInitials" class="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground"><?= e($initials) ?></span>
            <img id="avatarPreview" src="" alt="" class="hidden h-20 w-20 rounded-full object-cover">
          <?php endif; ?>
        </div>

        <div class="min-w-[16rem] flex-1">
          <label class="inline-block cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-ocean hover:text-brand-ocean">
            <?= !empty($settings['author_avatar']) ? 'Change photo' : 'Add a photo' ?>
            <input type="file" id="avatarFile" accept="image/*" class="hidden">
          </label>
          <?php if (!empty($settings['author_avatar'])): ?>
            <button type="button" id="avatarRemove" class="ml-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-destructive">Remove</button>
          <?php endif; ?>
          <span id="avatarStatus" class="ml-2 text-xs text-muted-foreground"></span>
          <p class="mt-2 text-xs text-muted-foreground">A square headshot works best.</p>
          <input type="hidden" name="author_avatar" id="author_avatar" value="<?= e($settings['author_avatar'] ?? '') ?>">

          <label for="author_bio" class="mb-1.5 mt-5 block text-sm font-semibold text-foreground">Short bio</label>
          <textarea id="author_bio" name="author_bio" rows="3"
                    class="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand-ocean"><?= e($settings['author_bio'] ?? '') ?></textarea>
          <p class="mt-1.5 text-xs text-muted-foreground">One or two sentences, shown under your name at the end of each article.</p>

          <button type="submit" class="mt-4 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">Save profile</button>
        </div>
      </div>
    </form>

    <script>
    (function () {
      var csrf = document.querySelector('input[name="_csrf"]').value;
      var file = document.getElementById('avatarFile');
      if (!file) return;
      file.addEventListener('change', function (ev) {
        if (!ev.target.files || !ev.target.files[0]) return;
        var status = document.getElementById('avatarStatus');
        status.textContent = 'Uploading…';
        var fd = new FormData();
        fd.append('image', ev.target.files[0]);
        fd.append('_csrf', csrf);
        fetch('/blog-app/upload.php', { method: 'POST', body: fd })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (d.error) { status.textContent = d.error; return; }
            status.textContent = 'Added — press Save profile.';
            document.getElementById('author_avatar').value = d.url;
            var img = document.getElementById('avatarPreview');
            img.src = d.url; img.classList.remove('hidden');
            var ini = document.getElementById('avatarInitials');
            if (ini) ini.classList.add('hidden');
          })
          .catch(function () { status.textContent = 'Upload failed. Please try again.'; });
      });
      var rm = document.getElementById('avatarRemove');
      if (rm) rm.addEventListener('click', function () {
        document.getElementById('author_avatar').value = '';
        document.getElementById('avatarPreview').classList.add('hidden');
        document.getElementById('avatarStatus').textContent = 'Removed — press Save profile.';
      });
    })();
    </script>

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

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

    <!-- Circular crop picker. The file is framed locally and only the chosen
         region is uploaded, so she controls what the avatar shows the same way
         she would on Instagram. -->
    <div id="cropModal" style="display:none"
         class="fixed inset-0 z-[200] items-center justify-center bg-black/60 p-4"
         role="dialog" aria-modal="true" aria-labelledby="cropTitle">
      <div class="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl">
        <h3 id="cropTitle" class="mb-1 font-playfair text-lg font-bold text-foreground">Position your photo</h3>
        <p class="mb-4 text-xs text-muted-foreground">Drag to move. Use the slider to zoom.</p>

        <div id="cropStage"
             class="relative mx-auto touch-none overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800"
             style="width: 260px; height: 260px; cursor: grab;">
          <img id="cropImg" alt="" class="pointer-events-none absolute left-0 top-0 select-none" draggable="false">
          <!-- Everything outside the circle is dimmed by a huge inset shadow. -->
          <div class="pointer-events-none absolute inset-0 rounded-xl"
               style="box-shadow: 0 0 0 9999px rgba(0,0,0,.45) inset, 0 0 0 1px rgba(255,255,255,.6) inset;
                      clip-path: circle(50% at 50% 50%); mix-blend-mode: normal;"></div>
          <div class="pointer-events-none absolute inset-0 rounded-full border-2 border-white/80"></div>
          <!-- Rule-of-thirds guides, to help her line a face up. -->
          <div class="pointer-events-none absolute inset-0" style="clip-path: circle(50% at 50% 50%);">
            <div class="absolute inset-y-0" style="left:33.333%; width:1px; background:rgba(255,255,255,.35)"></div>
            <div class="absolute inset-y-0" style="left:66.666%; width:1px; background:rgba(255,255,255,.35)"></div>
            <div class="absolute inset-x-0" style="top:33.333%; height:1px; background:rgba(255,255,255,.35)"></div>
            <div class="absolute inset-x-0" style="top:66.666%; height:1px; background:rgba(255,255,255,.35)"></div>
          </div>
        </div>

        <label for="cropZoom" class="mt-4 block text-xs font-semibold text-muted-foreground">Zoom</label>
        <input id="cropZoom" type="range" min="1" max="3" step="0.01" value="1" class="mt-1 w-full accent-brand-ocean">

        <div class="mt-5 flex items-center justify-end gap-2">
          <span id="cropStatus" class="mr-auto text-xs text-muted-foreground"></span>
          <button type="button" id="cropCancel" class="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</button>
          <button type="button" id="cropSave" class="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90">Use photo</button>
        </div>
      </div>
    </div>

    <script>
    (function () {
      var csrf   = document.querySelector('input[name="_csrf"]').value;
      var file   = document.getElementById('avatarFile');
      var modal  = document.getElementById('cropModal');
      var stage  = document.getElementById('cropStage');
      var img    = document.getElementById('cropImg');
      var zoom   = document.getElementById('cropZoom');
      var status = document.getElementById('cropStatus');
      var save   = document.getElementById('cropSave');
      if (!file) return;

      var STAGE = 260, OUT = 512;
      var nat = { w: 0, h: 0 }, base = 1, z = 1, off = { x: 0, y: 0 };
      var drag = null, ready = false, busy = false;

      function show(on) {
        // Inline display, not the `hidden` attribute: this element carries a
        // flex utility, and a class beats an attribute selector.
        modal.style.display = on ? 'flex' : 'none';
      }
      function close() {
        show(false);
        ready = false; busy = false;
        img.removeAttribute('src');
        status.textContent = '';
        save.disabled = false;
        save.textContent = 'Use photo';
      }

      function layout() {
        var s = base * z;
        var dw = nat.w * s, dh = nat.h * s;
        // Keep the frame covered: never let an edge pull inside the circle.
        off.x = Math.min(0, Math.max(STAGE - dw, off.x));
        off.y = Math.min(0, Math.max(STAGE - dh, off.y));
        img.style.width = dw + 'px';
        img.style.height = dh + 'px';
        img.style.transform = 'translate(' + off.x + 'px,' + off.y + 'px)';
      }

      // Only opens once the chosen file has actually decoded, so the circle
      // never appears over an empty frame.
      function open(src) {
        img.onload = function () {
          nat.w = img.naturalWidth; nat.h = img.naturalHeight;
          if (!nat.w || !nat.h) { alert('That image could not be read. Please try another file.'); return; }
          base = STAGE / Math.min(nat.w, nat.h);   // cover at zoom 1
          z = 1; zoom.value = '1';
          var dw = nat.w * base, dh = nat.h * base;
          off.x = (STAGE - dw) / 2; off.y = (STAGE - dh) / 2;  // centre it
          layout();
          ready = true;
          show(true);
        };
        img.onerror = function () {
          alert('That file could not be opened as an image. Please choose a JPG, PNG, GIF or WebP.');
          close();
        };
        img.src = src;
      }

      file.addEventListener('change', function (ev) {
        var f = ev.target.files && ev.target.files[0];
        if (!f) return;
        status.textContent = '';
        var fr = new FileReader();
        fr.onload = function () { open(fr.result); };
        fr.readAsDataURL(f);
        ev.target.value = '';  // allow re-picking the same file
      });

      // --- pan ---
      stage.addEventListener('pointerdown', function (e) {
        drag = { x: e.clientX - off.x, y: e.clientY - off.y };
        stage.setPointerCapture(e.pointerId);
        stage.style.cursor = 'grabbing';
      });
      stage.addEventListener('pointermove', function (e) {
        if (!drag) return;
        off.x = e.clientX - drag.x; off.y = e.clientY - drag.y;
        layout();
      });
      ['pointerup', 'pointercancel'].forEach(function (evt) {
        stage.addEventListener(evt, function () { drag = null; stage.style.cursor = 'grab'; });
      });

      // --- zoom, anchored on the frame centre ---
      zoom.addEventListener('input', function () {
        var prev = z;
        z = parseFloat(zoom.value);
        var k = z / prev;
        off.x = STAGE / 2 - (STAGE / 2 - off.x) * k;
        off.y = STAGE / 2 - (STAGE / 2 - off.y) * k;
        layout();
      });

      document.getElementById('cropCancel').addEventListener('click', close);
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') close();
      });

      save.addEventListener('click', function () {
        if (!ready) { status.textContent = 'Choose a picture first.'; return; }
        if (busy) return;
        busy = true;
        save.disabled = true;
        save.textContent = 'Uploading…';
        status.textContent = '';

        function fail(msg) {
          busy = false;
          save.disabled = false;
          save.textContent = 'Use photo';
          status.textContent = msg;
        }
        var c = document.createElement('canvas');
        c.width = OUT; c.height = OUT;
        var ctx = c.getContext('2d');
        // Same transform as the preview, scaled from stage px to output px.
        var r = OUT / STAGE, s = base * z;
        ctx.drawImage(img, off.x * r, off.y * r, nat.w * s * r, nat.h * s * r);

        c.toBlob(function (blob) {
          if (!blob) { fail('Could not process that image.'); return; }
          var fd = new FormData();
          fd.append('image', blob, 'avatar.png');
          fd.append('_csrf', csrf);

          // Never leave the button stuck on "Uploading…" if the network stalls.
          var ac = ('AbortController' in window) ? new AbortController() : null;
          var timer = setTimeout(function () { if (ac) ac.abort(); }, 30000);

          fetch('/blog-app/upload.php', {
            method: 'POST', body: fd, signal: ac ? ac.signal : undefined
          })
            .then(function (res) { return res.json().catch(function () { throw new Error('bad response'); }); })
            .then(function (d) {
              clearTimeout(timer);
              if (d.error) { fail(d.error); return; }
              document.getElementById('author_avatar').value = d.url;
              var prev = document.getElementById('avatarPreview');
              prev.src = d.url; prev.classList.remove('hidden');
              var ini = document.getElementById('avatarInitials');
              if (ini) ini.classList.add('hidden');
              document.getElementById('avatarStatus').textContent = 'Added — now press Save profile.';
              close();
            })
            .catch(function () {
              clearTimeout(timer);
              fail('Upload failed. Please try again.');
            });
        }, 'image/png');
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

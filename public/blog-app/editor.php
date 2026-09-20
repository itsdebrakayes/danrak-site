<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';
require_once __DIR__ . '/lib/auth.php';

$author  = require_auth();
$editing = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$post    = $editing !== '' ? load_post($editing) : null;
$notice  = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();

    $title    = trim((string) ($_POST['title'] ?? ''));
    $bodyHtml = sanitize_html((string) ($_POST['body_html'] ?? ''));
    $action   = (string) ($_POST['action'] ?? 'draft');

    if ($title === '') {
        $notice = 'Give the post a title before saving.';
    } else {
        $desiredSlug = trim((string) ($_POST['slug'] ?? '')) ?: $title;
        $slug = $editing !== '' ? safe_slug($desiredSlug) : unique_slug($desiredSlug);
        if ($editing !== '' && $slug !== $editing) {
            $slug = unique_slug($desiredSlug, $editing);
        }

        $excerpt = trim((string) ($_POST['excerpt'] ?? '')) ?: auto_excerpt($bodyHtml);
        $now     = date('c');

        $record = [
            'slug'             => $slug,
            'title'            => $title,
            'subtitle'         => trim((string) ($_POST['subtitle'] ?? '')),
            'excerpt'          => $excerpt,
            'body_html'        => $bodyHtml,
            'cover_image'      => trim((string) ($_POST['cover_image'] ?? '')) ?: null,
            'cover_alt'        => trim((string) ($_POST['cover_alt'] ?? '')),
            'topic'            => trim((string) ($_POST['topic'] ?? '')),
            'tags'             => trim((string) ($_POST['tags'] ?? '')),
            'meta_title'       => trim((string) ($_POST['meta_title'] ?? '')),
            'meta_description' => trim((string) ($_POST['meta_description'] ?? '')) ?: $excerpt,
            'reading_minutes'  => reading_minutes($bodyHtml),
            'author_name'      => $author['name'],
            'status'           => $action === 'publish' ? 'published' : 'draft',
            'created_at'       => $post['created_at'] ?? $now,
            'updated_at'       => $now,
            'published_at'     => $action === 'publish'
                ? ($post['published_at'] ?? $now)
                : ($post['published_at'] ?? null),
        ];

        // Renaming the slug moves the file; drop the old one.
        if ($editing !== '' && $editing !== $slug) {
            delete_post($editing);
        }

        if (save_post($record)) {
            header('Location: /blog-admin?saved=1');
            exit;
        }
        $notice = 'Could not save. Check that the data folder is writable.';
    }
    $post = array_merge($post ?? [], $_POST);
}

$v = static fn(string $k, string $default = ''): string => e((string) ($post[$k] ?? $default));

render_head([
    'title'     => $editing !== '' ? 'Edit post' : 'Write a new post',
    'canonical' => '/blog-admin/new',
    'noindex'   => true,
]);
?>
<link href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.snow.min.css" rel="stylesheet">
<style>
  /* Make the writing surface feel like a document, not a form field. */
  #editor .ql-editor {
    min-height: 26rem; padding: 2rem 0; font-size: 1.125rem; line-height: 1.75;
    font-family: 'Poppins', system-ui, sans-serif; color: hsl(var(--foreground));
  }
  #editor .ql-editor h2, #editor .ql-editor h3 {
    font-family: 'Playfair Display', serif; font-weight: 700; color: hsl(var(--foreground));
  }
  #editor .ql-editor.ql-blank::before { font-style: normal; color: hsl(var(--muted-foreground)); left: 0; }
  /* Sticks beneath the page header rather than at top:0, where the header
     (taller than it looks once its buttons wrap, and z-30) covered it.
     --editor-header-h is measured at runtime because that height changes with
     the viewport width. */
  .ql-toolbar.ql-snow {
    position: sticky;
    top: var(--editor-header-h, 4rem);
    z-index: 20; border: 0;
    border-top: 1px solid hsl(var(--border));
    border-bottom: 1px solid hsl(var(--border));
    background: hsl(var(--background)); border-radius: 0;
  }
  .ql-container.ql-snow { border: 0; }
  .field-label { display:block; margin-bottom:.35rem; font-size:.875rem; font-weight:600; }
  .field-help  { margin-top:.35rem; font-size:.75rem; line-height:1.5; }
  .field-input {
    width:100%; border-radius:.75rem; border:1px solid hsl(var(--border));
    background:hsl(var(--background)); padding:.65rem .9rem; outline:none;
  }
  .field-input:focus { border-color: hsl(var(--brand-ocean)); }
</style>

<div class="min-h-screen bg-background">
  <form method="post" id="postForm">
    <?= csrf_field() ?>

    <header class="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div class="content-shell flex flex-wrap items-center justify-between gap-3 py-3">
        <a href="/blog-admin" class="text-sm font-medium text-muted-foreground hover:text-brand-ocean">← Your posts</a>
        <div class="flex items-center gap-2">
          <span id="saveState" class="mr-2 text-xs text-muted-foreground"></span>
          <button type="submit" name="action" value="draft"
                  class="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand-ocean hover:text-brand-ocean">
            Save draft
          </button>
          <button type="submit" name="action" value="publish"
                  class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <?= ($post['status'] ?? '') === 'published' ? 'Update' : 'Publish' ?>
          </button>
        </div>
      </div>
    </header>

    <?php if ($notice): ?>
      <div class="content-shell max-w-3xl pt-6">
        <div role="alert" class="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"><?= e($notice) ?></div>
      </div>
    <?php endif; ?>

    <!-- ===== The writing surface ===== -->
    <main class="content-shell max-w-3xl py-10">
      <input type="text" name="title" id="title" required
             value="<?= $v('title') ?>" placeholder="Your title"
             class="w-full border-0 bg-transparent p-0 font-playfair text-4xl font-black leading-tight text-foreground outline-none placeholder:text-muted-foreground/40 sm:text-5xl">

      <input type="text" name="subtitle" id="subtitle"
             value="<?= $v('subtitle') ?>" placeholder="Add a subtitle (optional)"
             class="mt-4 w-full border-0 bg-transparent p-0 text-xl text-muted-foreground outline-none placeholder:text-muted-foreground/40">

      <!-- Cover image -->
      <div class="mt-8 rounded-2xl border border-dashed border-border p-4">
        <div class="flex flex-wrap items-center gap-4">
          <img id="coverPreview" src="<?= $v('cover_image') ?>"
               alt="" class="h-24 w-36 rounded-lg object-cover <?= empty($post['cover_image']) ? 'hidden' : '' ?>">
          <div class="flex-1">
            <p class="font-semibold text-foreground">Cover picture <span class="font-normal text-muted-foreground">(optional)</span></p>
            <p class="field-help text-muted-foreground">A photo at the top of the post. Skip it if you'd rather not have one.</p>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <label class="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-ocean hover:text-brand-ocean">
                Choose a picture
                <input type="file" id="coverFile" accept="image/*" class="hidden">
              </label>
              <button type="button" id="coverRemove" class="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-destructive <?= empty($post['cover_image']) ? 'hidden' : '' ?>">Remove</button>
              <span id="coverStatus" class="text-xs text-muted-foreground"></span>
            </div>
          </div>
        </div>
        <input type="hidden" name="cover_image" id="cover_image" value="<?= $v('cover_image') ?>">
        <div class="mt-4 <?= empty($post['cover_image']) ? 'hidden' : '' ?>" id="coverAltWrap">
          <label class="field-label text-foreground" for="cover_alt">Describe the picture</label>
          <input class="field-input" type="text" name="cover_alt" id="cover_alt" value="<?= $v('cover_alt') ?>"
                 placeholder="e.g. Stacy-Ann speaking at the book launch">
          <p class="field-help text-muted-foreground">Read aloud to visually impaired readers, and used by search engines. One short sentence.</p>
        </div>
      </div>

      <!-- Body -->
      <div class="mt-8 border-t border-border">
        <div id="editor"></div>
      </div>
      <p class="mt-3 text-xs text-muted-foreground">
        Shortcuts: <kbd class="rounded border border-border px-1">⌘</kbd>/<kbd class="rounded border border-border px-1">Ctrl</kbd>
        + <b>B</b> bold, <b>I</b> italic, <b>U</b> underline, <b>K</b> link, <b>Z</b> undo,
        <b>⇧Z</b> redo, <b>V</b> paste.
      </p>
      <textarea name="body_html" id="body_html" class="hidden"><?= e((string) ($post['body_html'] ?? '')) ?></textarea>
    </main>

    <!-- ===== Details ===== -->
    <section class="border-t border-border bg-muted/20">
      <div class="content-shell max-w-3xl py-10">
        <h2 class="mb-1 font-playfair text-2xl font-bold text-foreground">Post details</h2>
        <p class="mb-8 text-sm text-muted-foreground">
          These help people and search engines find the post. Anything left blank gets filled in automatically.
        </p>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label class="field-label text-foreground" for="topic">Topic</label>
            <select class="field-input" name="topic" id="topic">
              <option value="">Choose a topic…</option>
              <?php foreach (topics() as $t): ?>
                <option value="<?= e($t) ?>" <?= ($post['topic'] ?? '') === $t ? 'selected' : '' ?>><?= e($t) ?></option>
              <?php endforeach; ?>
            </select>
            <p class="field-help text-muted-foreground">Groups the post with others like it, so readers can browse by subject.</p>
          </div>

          <div>
            <label class="field-label text-foreground" for="tags">Keywords</label>
            <input class="field-input" type="text" name="tags" id="tags" value="<?= $v('tags') ?>"
                   placeholder="grief, healing, Caribbean">
            <p class="field-help text-muted-foreground">A few words describing the post, separated by commas.</p>
          </div>
        </div>

        <div class="mt-6">
          <label class="field-label text-foreground" for="excerpt">Short summary</label>
          <textarea class="field-input" name="excerpt" id="excerpt" rows="2"
                    placeholder="One or two sentences shown on the blog list"><?= $v('excerpt') ?></textarea>
          <p class="field-help text-muted-foreground">Shown under the title on the blog page. Leave blank and we'll use your opening lines.</p>
        </div>

        <div class="mt-6">
          <label class="field-label text-foreground" for="web_address">Web address</label>
          <div class="flex items-center gap-2">
            <span class="whitespace-nowrap text-sm text-muted-foreground">danrakprod.com/blog/</span>
            <input class="field-input" type="text" name="slug" id="slug" value="<?= $v('slug') ?>" placeholder="auto-generated-from-your-title">
          </div>
          <p class="field-help text-muted-foreground">The link people share. Created from your title automatically — only change it before publishing.</p>
        </div>

        <details class="mt-8 rounded-xl border border-border bg-card p-4">
          <summary class="cursor-pointer font-semibold text-foreground">Search engine settings (optional)</summary>
          <div class="mt-5 space-y-6">
            <div>
              <label class="field-label text-foreground" for="meta_title">Title for search results</label>
              <input class="field-input" type="text" name="meta_title" id="meta_title" value="<?= $v('meta_title') ?>"
                     maxlength="70" placeholder="Leave blank to use your title">
              <p class="field-help text-muted-foreground">About 60 characters. <span id="metaTitleCount"></span></p>
            </div>
            <div>
              <label class="field-label text-foreground" for="meta_description">Description for search results</label>
              <textarea class="field-input" name="meta_description" id="meta_description" rows="2" maxlength="180"
                        placeholder="Leave blank to use your summary"><?= $v('meta_description') ?></textarea>
              <p class="field-help text-muted-foreground">
                About 155 characters. Answer the question the post answers — AI search tools often quote this directly.
                <span id="metaDescCount"></span>
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  </form>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.min.js"></script>
<script>
(function () {
  var CSRF = document.querySelector('input[name="_csrf"]').value;

  var quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Start writing…',
    modules: {
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote', 'link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ],
        handlers: {
          image: function () {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function () {
              if (!input.files || !input.files[0]) return;
              uploadImage(input.files[0], function (url) {
                var range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', url, 'user');
                quill.setSelection(range.index + 1);
              });
            };
            input.click();
          }
        }
      }
    }
  });

  // Load existing content.
  var existing = document.getElementById('body_html').value;
  if (existing) { quill.clipboard.dangerouslyPasteHTML(existing); }

  // --- Keyboard shortcuts -------------------------------------------------
  // Quill maps its "shortKey" to Cmd on macOS, so Ctrl+B and friends do
  // nothing there. These aliases register the Ctrl variants as well, so the
  // same keys work whichever machine she is on.
  var FORMATS = { 66: 'bold', 73: 'italic', 85: 'underline' };
  Object.keys(FORMATS).forEach(function (code) {
    quill.keyboard.addBinding(
      { key: parseInt(code, 10), ctrlKey: true },
      function (range) {
        var name = FORMATS[code];
        var current = quill.getFormat(range)[name];
        quill.format(name, !current, 'user');
      }
    );
  });

  // Undo / redo on Ctrl as well as Cmd.
  quill.keyboard.addBinding({ key: 90, ctrlKey: true, shiftKey: false }, function () {
    quill.history.undo();
  });
  quill.keyboard.addBinding({ key: 90, ctrlKey: true, shiftKey: true }, function () {
    quill.history.redo();
  });
  quill.keyboard.addBinding({ key: 89, ctrlKey: true }, function () {
    quill.history.redo();
  });

  // Ctrl+K for links, matching the toolbar button.
  quill.keyboard.addBinding({ key: 75, ctrlKey: true }, function (range) {
    var url = prompt('Link address');
    if (url) { quill.format('link', url, 'user'); }
  });

  // The browser only raises a paste event for the platform's own shortcut, so
  // on a Mac Ctrl+V never reaches the editor. Read the clipboard directly in
  // that case. If the browser refuses permission we simply do nothing and the
  // platform shortcut still works.
  quill.root.addEventListener('keydown', function (e) {
    var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
    if (!isMac || !e.ctrlKey || e.metaKey || e.key.toLowerCase() !== 'v') return;
    if (!navigator.clipboard || !navigator.clipboard.readText) return;
    e.preventDefault();
    navigator.clipboard.readText().then(function (text) {
      if (!text) return;
      var range = quill.getSelection(true);
      quill.deleteText(range.index, range.length, 'user');
      quill.insertText(range.index, text, 'user');
      quill.setSelection(range.index + text.length, 0, 'user');
    }).catch(function () { /* permission denied — Cmd+V still works */ });
  });

  function uploadImage(file, onDone) {
    var status = document.getElementById('coverStatus');
    status.textContent = 'Uploading…';
    var fd = new FormData();
    fd.append('image', file);
    fd.append('_csrf', CSRF);
    fetch('/blog-app/upload.php', { method: 'POST', body: fd })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.error) { status.textContent = d.error; return; }
        status.textContent = '';
        onDone(d.url);
      })
      .catch(function () { status.textContent = 'Upload failed. Please try again.'; });
  }

  // Cover image
  document.getElementById('coverFile').addEventListener('change', function (ev) {
    if (!ev.target.files || !ev.target.files[0]) return;
    uploadImage(ev.target.files[0], function (url) {
      document.getElementById('cover_image').value = url;
      var img = document.getElementById('coverPreview');
      img.src = url; img.classList.remove('hidden');
      document.getElementById('coverRemove').classList.remove('hidden');
      document.getElementById('coverAltWrap').classList.remove('hidden');
    });
  });
  document.getElementById('coverRemove').addEventListener('click', function () {
    document.getElementById('cover_image').value = '';
    document.getElementById('coverPreview').classList.add('hidden');
    this.classList.add('hidden');
    document.getElementById('coverAltWrap').classList.add('hidden');
  });

  // Suggest a web address from the title until she edits it herself.
  var slugField = document.getElementById('slug');
  var slugTouched = slugField.value.trim() !== '';
  slugField.addEventListener('input', function () { slugTouched = true; });
  document.getElementById('title').addEventListener('input', function (e) {
    if (slugTouched) return;
    slugField.value = e.target.value.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
  });

  // Character counters
  function counter(id, out, ideal) {
    var el = document.getElementById(id), label = document.getElementById(out);
    function update() {
      var n = el.value.length;
      label.textContent = n === 0 ? '' : n + ' characters' + (n > ideal ? ' — a little long' : '');
    }
    el.addEventListener('input', update); update();
  }
  counter('meta_title', 'metaTitleCount', 60);
  counter('meta_description', 'metaDescCount', 155);

  // Move the editor's HTML into the form field on submit.
  document.getElementById('postForm').addEventListener('submit', function () {
    document.getElementById('body_html').value = quill.root.innerHTML;
  });

  // Keep --editor-header-h in step with the header, whose height changes when
  // its buttons wrap at narrow widths.
  var pageHeader = document.querySelector('header');
  function syncHeaderHeight() {
    if (!pageHeader) return;
    document.documentElement.style.setProperty(
      '--editor-header-h', Math.round(pageHeader.getBoundingClientRect().height) + 'px'
    );
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  if ('ResizeObserver' in window && pageHeader) {
    new ResizeObserver(syncHeaderHeight).observe(pageHeader);
  }

  // Warn before losing unsaved work.
  var dirty = false;
  quill.on('text-change', function () { dirty = true; });
  document.getElementById('postForm').addEventListener('submit', function () { dirty = false; });
  window.addEventListener('beforeunload', function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });
})();
</script>
</body>
</html>

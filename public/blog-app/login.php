<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/render.php';
require_once __DIR__ . '/lib/auth.php';

if (is_logged_in()) {
    header('Location: /blog-admin');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    if (too_many_attempts()) {
        $error = 'Too many attempts. Please wait 15 minutes and try again.';
    } elseif (attempt_login((string) ($_POST['email'] ?? ''), (string) ($_POST['password'] ?? ''))) {
        header('Location: /blog-admin');
        exit;
    } else {
        // Deliberately vague: never reveal which half was wrong.
        $error = 'That email and password combination didn’t work.';
    }
}

render_head([
    'title'       => 'Sign in',
    'description' => 'Author sign in.',
    'canonical'   => '/blog-login',
    'noindex'     => true, // never index the sign-in page
]);
?>
<main class="flex min-h-screen items-center justify-center px-5 py-16">
  <div class="w-full max-w-sm">
    <div class="mb-10 text-center">
      <a href="/" class="font-playfair text-xl font-bold tracking-tight text-brand-crimson">DANRAK</a>
      <div class="mx-auto mt-7 h-px w-12 bg-gradient-to-r from-transparent via-brand-crimson to-transparent"></div>
      <h1 class="mt-7 font-playfair text-[1.75rem] font-bold tracking-tight text-foreground">Welcome back</h1>
      <p class="mt-2 text-sm text-muted-foreground">Sign in to write and publish.</p>
    </div>

    <?php if ($error): ?>
      <div role="alert" class="mb-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        <?= e($error) ?>
      </div>
    <?php endif; ?>

    <form method="post" class="space-y-5">
      <?= csrf_field() ?>
      <div>
        <label for="email" class="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Email</label>
        <input id="email" name="email" type="email" required autocomplete="username"
               value="<?= e($_POST['email'] ?? '') ?>"
               class="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-brand-ocean">
      </div>
      <div>
        <label for="password" class="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Password</label>
        <input id="password" name="password" type="password" required autocomplete="current-password"
               class="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-brand-ocean">
      </div>
      <button type="submit"
              class="w-full rounded-xl bg-foreground px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90">
        Sign in
      </button>
    </form>

    <p class="mt-8 text-center text-sm">
      <a href="/" class="text-muted-foreground transition-colors hover:text-brand-ocean">← Back to the site</a>
    </p>
  </div>
</main>
</body>
</html>

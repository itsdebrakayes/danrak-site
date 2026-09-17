# Blog setup — one time, about five minutes

The blog stores posts as files. There is **no database to create**.

## 1. Create the config file

In cPanel → File Manager, open `public_html/blog-app/`.

Copy `config.sample.php` to `config.php`, then edit it:

- `author_email` — the email she signs in with
- `password_hash` — the long line generated in step 2
- `site_url` — `https://danrakprod.com` (no trailing slash)

## 2. Generate the password hash

The password is never stored, only a one-way hash of it. Ask me to run:

    php tools/make-password.php "her chosen password"

and paste the line it prints into `config.php`.

To change the password later, generate a new line and replace the old one.

## 3. Make two folders writable

In File Manager, right-click → Change Permissions, set **755** on:

- `public_html/blog-app/data/posts`
- `public_html/blog-app/uploads`

If uploads fail, try 775 on those two folders only.

## 4. Sign in

Go to **https://danrakprod.com/blog-login**

Nothing links to this page — the address is the only way in. Bookmark it for her.

## Day-to-day

| What | Where |
|---|---|
| Write a post | /blog-admin → "Write a new post" |
| Edit or delete | /blog-admin |
| Public blog | /blog |
| Sign out | /blog-admin → "Sign out" |

Drafts are saved but invisible to the public until she presses **Publish**.

## Backing it up

Everything lives in two folders — download them and you have the whole blog:

- `blog-app/data/posts/` — the posts (one JSON file each)
- `blog-app/uploads/` — the pictures

## If something breaks

- **"Blog is not configured yet"** — `config.php` is missing (step 1).
- **Can't save a post** — permissions on `data/posts` (step 3).
- **Images won't upload** — permissions on `uploads` (step 3).
- **Locked out** — eight wrong attempts locks that address for 15 minutes. Wait,
  or delete `blog-app/data/attempts.json`.

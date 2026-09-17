<?php
/**
 * Copy this file to config.php and fill in the two marked values.
 * config.php is git-ignored, so the real credentials never reach the repo.
 *
 * There is no database. Posts are stored as JSON files in data/posts/, which
 * means backing the blog up is just copying that folder.
 */
return [
    // Public origin, no trailing slash.
    'site_url' => 'https://danrakprod.com',

    // --- Login ------------------------------------------------------------
    'author_email' => 'danrakproductions@gmail.com',
    'author_name'  => 'Stacy-Ann Smith',

    // Generated with: php tools/make-password.php "the password"
    // This is a one-way hash: it lets the site check a password without ever
    // storing the password itself.
    'password_hash' => 'PASTE_THE_GENERATED_HASH_HERE',

    // --- Uploads ----------------------------------------------------------
    'max_upload_bytes' => 8 * 1024 * 1024, // 8 MB
];

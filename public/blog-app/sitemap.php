<?php
declare(strict_types=1);
require_once __DIR__ . '/lib/store.php';

/**
 * Sitemap for blog posts, served at /blog-sitemap.xml.
 *
 * Kept separate from the static sitemap.xml because posts appear between
 * builds — this one is generated on request, so a post is listed the moment
 * it is published rather than at the next deploy.
 */
header('Content-Type: application/xml; charset=utf-8');

$cfg  = config();
$site = rtrim((string) $cfg['site_url'], '/');
$posts = all_posts(true);

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($posts as $p) {
    $when = $p['updated_at'] ?? $p['published_at'] ?? null;
    $lastmod = $when ? date('Y-m-d', strtotime((string) $when)) : date('Y-m-d');
    printf(
        "  <url>\n    <loc>%s/blog/%s</loc>\n    <lastmod>%s</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n",
        htmlspecialchars($site, ENT_XML1),
        htmlspecialchars((string) $p['slug'], ENT_XML1),
        $lastmod
    );
}
echo '</urlset>' . "\n";

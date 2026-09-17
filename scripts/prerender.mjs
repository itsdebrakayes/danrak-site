/**
 * Build-time prerenderer.
 *
 * The site is a client-rendered Vite SPA, which means every crawler that does
 * not execute JavaScript receives `<div id="root"></div>` and nothing else.
 * GPTBot, ClaudeBot, PerplexityBot and much of Bingbot fall in that category,
 * so the book, the author bio and the articles were effectively invisible to
 * answer engines.
 *
 * This runs after `vite build`: it serves ./dist, loads each route in real
 * Chromium, waits for React to finish, then writes the resulting DOM to
 * dist/<route>/index.html. Apache serves those files directly (the .htaccess
 * rewrite only falls through to the SPA shell when no real file matches), so
 * crawlers get complete HTML while browsers still hydrate the full React app.
 *
 * Fail-soft by design: if Chromium is unavailable the build still succeeds and
 * ships a working, non-prerendered site rather than failing outright.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 45817;

/** Routes to bake into static HTML. */
const ROUTES = [
  '/',
  '/about',
  '/showcase',
  '/contact',
  '/time-does-not-heal',
  '/about-author',
  '/blog',
  '/blog/does-time-heal-all-wounds',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = join(DIST, urlPath);
      if (!extname(filePath) || !existsSync(filePath)) filePath = join(DIST, 'index.html');
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html missing — run vite build first.');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch {
    console.warn('[prerender] puppeteer unavailable — skipping prerender. The site will still work, but crawlers will only see the SPA shell.');
    return;
  }

  const server = await startServer();
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    let ok = 0;
    for (const route of ROUTES) {
      const page = await browser.newPage();
      // Desktop viewport: the mobile layout is a different component tree, and
      // baking the phone markup into the shared HTML would ship the wrong tree
      // to desktop visitors before hydration corrects it.
      await page.setViewport({ width: 1366, height: 900 });

      // Media is irrelevant to the serialised HTML and only slows this down.
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        const type = r.resourceType();
        if (type === 'image' || type === 'media' || type === 'font') r.abort();
        else r.continue();
      });

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 45000,
      });

      // Wait for React to actually commit content into #root.
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.children.length > 0;
        },
        { timeout: 20000 }
      ).catch(() => console.warn(`[prerender] ${route}: #root never populated`));

      // Give effect-driven <head> writes (Seo component) a chance to land.
      await new Promise((r) => setTimeout(r, 350));

      const html = await page.evaluate(() => {
        // The inline loader is a pre-hydration affordance; it must not be
        // baked into the static HTML or crawlers would read it as content.
        document.getElementById('app-loader')?.remove();

        // Animation libraries write their intermediate state to inline styles.
        // Serialising the DOM mid-tween bakes a half-faded, off-position
        // element into the static HTML — and because React does not clear
        // inline styles it did not author, the hero could stay invisible for
        // real visitors. Normalise anything still transparent or displaced to
        // its final resting state.
        document.querySelectorAll('[style]').forEach((el) => {
          const st = el.style;
          const opacity = parseFloat(st.opacity);
          const midTween = !Number.isNaN(opacity) && opacity < 1;
          // GSAP's fingerprint: it always writes these three alongside transform.
          const gsapOwned = st.translate === 'none' && st.rotate === 'none' && st.scale === 'none';

          if (midTween || gsapOwned) {
            st.removeProperty('opacity');
            st.removeProperty('transform');
            st.removeProperty('translate');
            st.removeProperty('rotate');
            st.removeProperty('scale');
            if (!el.getAttribute('style')) el.removeAttribute('style');
          }
        });

        return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
      });

      const outDir = route === '/' ? DIST : join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf8');

      const textLen = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
      console.log(`[prerender] ${route.padEnd(34)} ${(html.length / 1024).toFixed(0).padStart(4)} KB  ~${textLen} chars of text`);
      ok++;
      await page.close();
    }
    console.log(`[prerender] ${ok}/${ROUTES.length} routes written.`);
  } catch (err) {
    console.warn('[prerender] failed, shipping non-prerendered build:', err.message);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main();

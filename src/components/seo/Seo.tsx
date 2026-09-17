import { useEffect } from 'react';

/**
 * Head manager for titles, meta and JSON-LD.
 *
 * Deliberately dependency-free: the prerender step runs the app in a real
 * browser and serialises the resulting DOM, so whatever this writes into
 * <head> is baked into the static HTML that crawlers receive. That means AI
 * crawlers which never execute JavaScript still get complete metadata.
 */

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/time-does-not-heal". Combined with the site origin. */
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  /** One or more JSON-LD graphs to emit. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
}

const ORIGIN = 'https://danrakprod.com';
const MANAGED = 'data-seo-managed';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const Seo = ({
  title,
  description,
  path,
  image,
  type = 'website',
  schema,
  publishedTime,
  modifiedTime,
  keywords,
  noindex,
}: SeoProps) => {
  useEffect(() => {
    const url = `${ORIGIN}${path}`;
    const img = image ? (image.startsWith('http') ? image : `${ORIGIN}${image}`) : undefined;

    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords?.length) setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setMeta('meta[name="robots"]', 'name', 'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Danrak Productions');
    if (img) setMeta('meta[property="og:image"]', 'property', 'og:image', img);

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    if (img) setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img);

    if (publishedTime)
      setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
    if (modifiedTime)
      setMeta('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.setAttribute(MANAGED, 'true');
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD — replaced wholesale on each navigation so stale graphs from a
    // previous route never linger in the document.
    document.head.querySelectorAll('script[type="application/ld+json"][data-seo-managed]').forEach((n) => n.remove());
    if (schema) {
      const graphs = Array.isArray(schema) ? schema : [schema];
      graphs.forEach((g) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute(MANAGED, 'true');
        s.textContent = JSON.stringify(g);
        document.head.appendChild(s);
      });
    }
  }, [title, description, path, image, type, schema, publishedTime, modifiedTime, keywords, noindex]);

  return null;
};

export default Seo;

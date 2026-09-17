/**
 * Responsive image sources.
 *
 * The hero was shipping a single 2000px-wide file to every device. Phones now
 * receive the 480px variant (~26KB) instead of the full-resolution image,
 * which is the single biggest win for a first-time visitor on mobile data.
 *
 * Because the routes are prerendered, these <img> tags exist in the static
 * HTML — so the browser's preload scanner starts the download while the JS
 * bundle is still being fetched, rather than after React mounts.
 */
import hero480 from './hero-portrait-480.webp';
import hero768 from './hero-portrait-768.webp';
import hero1200 from './hero-portrait-1200.webp';
import hero2000 from './hero-portrait-2000.webp';

import leaning480 from './about-leaning-480.webp';
import leaning768 from './about-leaning-768.webp';
import leaning1200 from './about-leaning-1200.webp';
import leaning2000 from './about-leaning-2000.webp';

export const heroPortrait = {
  src: hero1200,
  srcSet: `${hero480} 480w, ${hero768} 768w, ${hero1200} 1200w, ${hero2000} 2000w`,
  /** Hero fills the viewport height, so width tracks the viewport. */
  sizes: '(max-width: 767px) 100vw, (max-width: 1439px) 60vw, 50vw',
  width: 2000,
  height: 2612,
};

export const aboutLeaning = {
  src: leaning1200,
  srcSet: `${leaning480} 480w, ${leaning768} 768w, ${leaning1200} 1200w, ${leaning2000} 2000w`,
  sizes: '(max-width: 767px) 80vw, 40vw',
};

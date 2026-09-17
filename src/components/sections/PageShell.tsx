import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SITE } from '@/data/site';
import logo from '@/assets/DanRak Prod Logo.webp';

/**
 * Layout for standalone content pages (book, author, blog).
 *
 * These sit outside the Swiper deck, so they use ordinary document flow: a
 * sticky header and a footer that ends the page instead of a fixed overlay.
 * No transformed ancestors means no containing-block surprises.
 */

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/showcase' },
  { label: 'The Book', to: '/time-does-not-heal' },
  { label: 'The Author', to: '/about-author' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

interface PageShellProps {
  children: ReactNode;
  /** Rendered full-bleed above the content column. */
  hero?: ReactNode;
}

const PageShell = ({ children, hero }: PageShellProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled ? 'bg-background/92 backdrop-blur-md border-b border-border' : 'bg-background/70 backdrop-blur-sm'
        }`}
        style={{ paddingTop: 'var(--safe-t)' }}
      >
        <div className="content-shell flex items-center gap-3 py-3">
          <Link to="/" className="shrink-0" aria-label="Danrak Productions home">
            <img src={logo} alt="Danrak Productions" className="h-9 w-auto object-contain" />
          </Link>
          <nav aria-label="Primary" className="flex-1 overflow-x-auto no-scrollbar">
            <ul className="flex items-center gap-1 min-w-max justify-end">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand-ocean whitespace-nowrap transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {hero}

      <main className="flex-1 w-full">{children}</main>

      <footer className="mt-20 border-t border-border bg-muted/30">
        <div className="content-shell py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <img src={logo} alt="" className="h-10 w-auto object-contain mb-2" />
              <p className="text-sm text-muted-foreground max-w-sm">{SITE.description}</p>
            </div>
            <div className="flex gap-5 text-2xl">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-brand-crimson transition-colors"><FaInstagram /></a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-brand-ocean transition-colors"><FaLinkedin /></a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/70 hover:text-brand-forest transition-colors"><FaYoutube /></a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-2 sm:justify-between text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.</p>
<p className="text-xs text-muted-foreground">
              Built by{' '}
              <span className="font-signature text-2xl leading-none align-middle text-brand-crimson">DKS Technologies</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;

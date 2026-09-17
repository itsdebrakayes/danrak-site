import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SITE } from '@/data/site';
import logo from '@/assets/danrak-logo.webp';

/**
 * Layout for standalone content pages (book, author, media kit).
 *
 * The nav deliberately reuses the Swiper deck's liquid-glass pill so the site
 * reads as one thing — it just sits to the right of the logo here, because
 * these pages have a masthead the deck doesn't. On phones the pill collapses
 * to a single glass button that opens a full-width sheet: a horizontally
 * scrolling strip of seven links is not usable with a thumb.
 */

/**
 * `server: true` marks a route Apache hands to PHP rather than React Router.
 * These must be plain anchors: a <Link> navigates client-side, the request
 * never reaches the server, and React falls through to its catch-all 404.
 */
const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/showcase' },
  { label: 'The Book', to: '/time-does-not-heal' },
  { label: 'The Author', to: '/about-author' },
  { label: 'Blog', to: '/blog', server: true },
  { label: 'Contact', to: '/contact' },
];

const GLASS =
  'bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl';

interface PageShellProps {
  children: ReactNode;
  /** Rendered full-bleed above the content column. */
  hero?: ReactNode;
}

const PageShell = ({ children, hero }: PageShellProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the sheet on navigation, and on Escape.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header
        className="fixed inset-x-0 top-0 z-[9999]"
        style={{ paddingTop: 'calc(max(var(--safe-t), 0px) + 1.25rem)' }}
      >
        {/* pr-* keeps the links pill clear of the fixed theme toggle, which
            sits at top-6 right-6 outside this component. */}
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-4 pb-3 pr-16 sm:px-7 sm:pr-24">
          <Link
            to="/"
            aria-label="Danrak Productions home"
            className={`shrink-0 rounded-full px-3 py-2 ${GLASS}`}
          >
            <img src={logo} alt="Danrak Productions" className="h-7 w-auto object-contain sm:h-8" />
          </Link>

          {/* Desktop: the same pill used across the site. */}
          <nav aria-label="Primary" className={`hidden rounded-full px-3 py-2 lg:flex lg:gap-1 ${GLASS}`}>
            {LINKS.map((l) => {
              const cls = `rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 ${
                isActive(l.to)
                  ? 'border border-white/30 bg-white/25 shadow-md backdrop-blur-sm dark:bg-white/10'
                  : 'hover:bg-white/25 hover:shadow-lg dark:hover:bg-white/10'
              }`;
              return l.server ? (
                <a key={l.to} href={l.to} className={cls}>{l.label}</a>
              ) : (
                <Link key={l.to} to={l.to} aria-current={isActive(l.to) ? 'page' : undefined} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile: one glass button opening a sheet. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full lg:hidden ${GLASS}`}
          >
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-foreground transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>

        {/* Mobile sheet */}
        <div
          id="mobile-nav"
          hidden={!open}
          className={`mx-4 overflow-hidden rounded-3xl lg:hidden ${GLASS}`}
        >
          <nav aria-label="Primary" className="p-2">
            <ul>
              {LINKS.map((l) => {
                const cls = `block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(l.to) ? 'bg-white/30 text-foreground dark:bg-white/10' : 'text-foreground/85'
                }`;
                return (
                  <li key={l.to}>
                    {l.server ? (
                      <a href={l.to} className={cls}>{l.label}</a>
                    ) : (
                      <Link to={l.to} aria-current={isActive(l.to) ? 'page' : undefined} className={cls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Reserve the fixed header's height so heroes don't start underneath it. */}
      <div aria-hidden className="h-[5rem] sm:h-[5.5rem]" />

      {hero}

      <main className="w-full flex-1">{children}</main>

      <footer className="mt-20 border-t border-border bg-muted/30">
        <div className="content-shell py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <img src={logo} alt="" className="mb-3 h-10 w-auto object-contain" />
              <p className="max-w-sm text-sm text-muted-foreground">{SITE.description}</p>
            </div>
            <div className="flex gap-5 text-2xl">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-brand-crimson"><FaInstagram /></a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 transition-colors hover:text-brand-ocean"><FaLinkedin /></a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/70 transition-colors hover:text-brand-forest"><FaYoutube /></a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.</p>
            <p>
              Built by{' '}
              <span className="font-signature align-middle text-2xl leading-none text-brand-crimson">DKS Technologies</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { SITE, COMPANY_COPY } from '@/data/site';
import { heroPortrait } from '@/assets/responsive';
import danrakLogoFull from '@/assets/danrak-logo.webp';

/**
 * Dedicated mobile experience.
 *
 * The desktop site is a horizontal Swiper deck sized in viewport units, which
 * does not degrade gracefully to a phone — it was being scaled rather than
 * re-laid-out. This is a separate vertical, touch-first composition that keeps
 * the same brand language (Playfair display type, the ocean→sky→crimson
 * gradient, glass cards) without inheriting any desktop layout assumptions.
 */

const NAV = [
  { label: 'Home', href: '#m-home' },
  { label: 'About', href: '#m-about' },
  { label: 'Services', href: '#m-services' },
  { label: 'Book', href: '/time-does-not-heal', route: true },
  { label: 'Contact', href: '#m-contact' },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#m-home');

  // Highlight the section currently filling the viewport.
  useEffect(() => {
    const ids = NAV.filter((n) => !n.route).map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const GLASS =
    'bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl';

  return (
    <header
      className="fixed right-4 top-0 z-[9999]"
      style={{ paddingTop: 'calc(max(var(--safe-t), 0px) + 1rem)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="m-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={`ml-auto flex h-11 w-11 items-center justify-center rounded-full ${GLASS}`}
      >
        <span aria-hidden className="relative block h-3.5 w-4">
          <span className={`absolute left-0 h-[1.5px] w-4 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-foreground transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute left-0 h-[1.5px] w-4 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
        </span>
      </button>

      <div id="m-nav" hidden={!open} className={`mt-3 w-[62vw] max-w-[16rem] overflow-hidden rounded-3xl ${GLASS}`}>
        <nav aria-label="Primary" className="p-2">
          <ul>
            {NAV.map((item) => {
              const cls =
                'block rounded-2xl px-4 py-3 text-base font-medium transition-colors';
              if (item.route) {
                return (
                  <li key={item.label}>
                    <Link to={item.href} onClick={() => setOpen(false)} className={`${cls} text-brand-crimson`}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.href ? 'true' : undefined}
                    className={`${cls} ${active === item.href ? 'bg-white/30 text-foreground dark:bg-white/10' : 'text-foreground/85'}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const MobileHero = () => (
  <section
    id="m-home"
    className="relative flex flex-col overflow-hidden"
    style={{ minHeight: '100svh' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/5 to-brand-sky/10" />
    {/* Brand glow, sized in viewport units so it can never overflow a phone. */}
    <div
      aria-hidden
      className="absolute left-1/2 top-[34%] h-[85vw] max-h-[420px] w-[85vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-50 blur-3xl"
    />

    {/*
      Anchored to the bottom of the section rather than sitting in flow. The
      source portrait is cropped at her thighs, so wherever its lower edge
      lands is a visible hard line — putting it exactly on the viewport edge
      is what makes the crop read as intentional, the same way the desktop
      hero does it. Horizontal overflow is clipped by the section.
    */}
    <img
      src={heroPortrait.src}
      srcSet={heroPortrait.srcSet}
      sizes="(max-width: 767px) 190vw, 100vw"
      alt="Stacy-Ann Smith, Founder and CEO of Danrak Productions"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="absolute bottom-0 left-1/2 z-10 w-auto max-w-none -translate-x-1/2"
      style={{ height: 'min(84svh, 680px)' }}
    />

    <div className="relative z-20 mt-auto flex w-full flex-col items-center gap-4 px-5 pb-8">
      <img
        src={danrakLogoFull}
        alt="Danrak Productions"
        loading="eager"
        decoding="async"
        className="w-full max-w-[300px] object-contain drop-shadow-lg"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-ocean drop-shadow">
        {SITE.tagline}
      </p>
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        <Link to="/showcase">
          <Button size="lg" className="w-full rounded-xl font-semibold shadow-lg">Explore Our Work</Button>
        </Link>
        <Link to="/contact">
          <Button size="lg" variant="secondary" className="w-full rounded-xl font-semibold shadow-lg">
            Start Your Project
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const MobileAbout = () => (
  <section id="m-about" className="relative px-5 py-16 bg-background">
    <h2 className="font-black tracking-tight text-brand-crimson leading-[1.05]">
      THE STORY BEHIND
      <span className="block text-foreground">THE COMPANY</span>
    </h2>
    <div className="w-20 h-1 my-5 rounded-full bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest" />

    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 space-y-4">
      <p className="font-bold text-foreground">{COMPANY_COPY.lead}</p>
      <p className="text-muted-foreground">{COMPANY_COPY.para1}</p>
      <p className="text-muted-foreground">{COMPANY_COPY.para2}</p>
    </div>

    <Link
      to="/about-author"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-ocean"
    >
      Meet Stacy-Ann Smith →
    </Link>
  </section>
);

const MobileServices = () => (
  <section id="m-services" className="px-5 py-16 bg-muted/30">
    <h2 className="font-black text-center text-foreground">Our Suite of Services</h2>
    <div className="w-20 h-1 mx-auto my-5 rounded-full bg-gradient-to-r from-brand-ocean via-brand-sky to-brand-crimson" />

    <ul className="space-y-4">
      {projects.map((p) => (
        <li key={p.id}>
          <Link
            to={`/project/${p.id}`}
            className="block rounded-2xl overflow-hidden border border-border bg-card shadow-sm active:scale-[0.99] transition-transform"
          >
            <img
              src={p.carouselImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-[0.7rem] uppercase tracking-widest text-brand-ocean font-semibold mb-1">
                {p.category}
              </p>
              <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const MobileContact = () => (
  <section id="m-contact" className="px-5 py-16 bg-background">
    <h2 className="font-black text-center text-foreground">Let’s Create Together</h2>
    <div className="w-20 h-1 mx-auto my-5 rounded-full bg-gradient-to-r from-brand-forest via-brand-sage to-brand-ocean" />

    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
        <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground break-all">
          {SITE.email}
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
        <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} className="font-semibold text-foreground">
          {SITE.phone}
        </a>
      </div>
      <Link to="/contact">
        <Button size="lg" className="w-full rounded-xl font-semibold mt-2">Send us a message</Button>
      </Link>
    </div>
  </section>
);

const MobileFooter = () => (
  <footer
    className="px-5 py-8 border-t border-border bg-background"
    style={{ paddingBottom: 'calc(2rem + var(--safe-b))' }}
  >
    <div className="flex items-center justify-center gap-6 mb-5 text-2xl">
      <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-brand-crimson">
        <FaInstagram />
      </a>
      <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-brand-ocean">
        <FaLinkedin />
      </a>
      <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground/70 hover:text-brand-forest">
        <FaYoutube />
      </a>
    </div>
    <p className="text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
    </p>
    <p className="text-center text-xs text-muted-foreground mt-2">
      Built by{' '}
      <span className="font-signature text-2xl leading-none align-middle text-brand-crimson">DKS Technologies</span>
    </p>
  </footer>
);

const MobileIndex = () => {
  const { hash } = useLocation();

  // Honour deep links like /about by scrolling to the matching section.
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />
      <main>
        <MobileHero />
        <MobileAbout />
        <MobileServices />
        <MobileContact />
      </main>
      <MobileFooter />
    </div>
  );
};

export default MobileIndex;

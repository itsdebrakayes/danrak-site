import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { SITE, COMPANY_COPY } from '@/data/site';
import heroPortrait from '@/assets/hero-portrait.webp';
import danrakLogoFull from '@/assets/DanRak Prod Logo.webp';

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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#m-home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'var(--safe-t)' }}
    >
      <nav aria-label="Primary" className="overflow-x-auto no-scrollbar">
        <ul className="flex items-center gap-1 px-3 py-2 min-w-max">
          {NAV.map((item) =>
            item.route ? (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="block px-3 py-2 text-sm font-semibold rounded-full text-brand-crimson whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                  className={`block px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    active === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

const MobileHero = () => (
  <section
    id="m-home"
    className="relative flex flex-col items-center justify-end overflow-hidden"
    style={{ minHeight: '100svh' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/5 to-brand-sky/10" />
    {/* Brand glow, sized in viewport units so it can never overflow a phone. */}
    <div
      aria-hidden
      className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[420px] max-h-[420px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-50 blur-3xl"
    />

    <img
      src={heroPortrait}
      alt="Stacy-Ann Smith, Founder and CEO of Danrak Productions"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="relative z-10 w-auto max-w-none object-contain object-bottom"
      style={{ height: 'min(68svh, 560px)' }}
    />

    <div className="relative z-20 w-full px-5 pb-8 -mt-12 flex flex-col items-center gap-5">
      <img
        src={danrakLogoFull}
        alt="Danrak Productions"
        loading="eager"
        decoding="async"
        className="w-full max-w-[320px] object-contain drop-shadow-lg"
      />
      <p className="text-xs tracking-[0.3em] uppercase text-brand-ocean font-semibold">
        {SITE.tagline}
      </p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        <Link to="/showcase">
          <Button size="lg" className="w-full rounded-xl font-semibold">Explore Our Work</Button>
        </Link>
        <Link to="/contact">
          <Button size="lg" variant="secondary" className="w-full rounded-xl font-semibold">
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
    <p className="text-center text-[0.7rem] text-muted-foreground/70 mt-1 font-playfair font-bold">
      Built by DS Technologies
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

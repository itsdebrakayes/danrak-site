import { Link } from 'react-router-dom';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { AUTHOR, BOOK, SITE } from '@/data/site';
import { personSchema, organizationSchema, breadcrumb } from '@/data/schema';
import { formatDate } from '@/lib/date';
import { aboutLeaning } from '@/assets/responsive';

/**
 * Author entity page.
 *
 * This is the page that closes the gap between the public persona and the
 * book. Her broadcasting and PR credentials are well represented online; the
 * authorship is not. Stating both on one page, in plain text, with the Person
 * and Book schemas cross-referenced, is what merges them into one entity.
 */

const PRESS = [
  {
    label: 'Jamaica Observer — memoir launch coverage',
    href: 'https://www.jamaicaobserver.com/allwoman/2021/04/11/time-does-not-heal-tv-show-host-stacy-ann-smith-launches-memoir/',
  },
  {
    label: 'ShoutOut Miami — author interview',
    href: 'https://shoutoutmiami.com/meet-stacy-ann-smith-author-storyteller-orator-executive-producer/',
  },
  {
    label: 'LinkedIn — professional profile',
    href: SITE.social.linkedin,
  },
  {
    label: 'YouTube — Danrak Productions',
    href: SITE.social.youtube,
  },
];

const AboutAuthor = () => (
  <PageShell
    hero={
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-ocean/10 via-background to-brand-crimson/10" />
        <div className="content-shell relative py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-brand-crimson font-semibold mb-4">
                About the author
              </p>
              <h1 className="font-black tracking-tight text-foreground">{AUTHOR.name}</h1>
              <p className="mt-3 text-lg text-brand-ocean font-semibold">{AUTHOR.jobTitle}</p>
              <div className="w-24 h-1 my-6 rounded-full bg-gradient-to-r from-brand-ocean via-brand-sky to-brand-crimson" />
              <p className="max-w-2xl text-lg text-muted-foreground">{AUTHOR.shortBio}</p>
            </div>
            <div className="relative mx-auto w-full max-w-xs md:max-w-none">
              <img
                src={aboutLeaning.src}
                srcSet={aboutLeaning.srcSet}
                sizes={aboutLeaning.sizes}
                alt={`${AUTHOR.name}, Jamaican author and broadcaster`}
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    }
  >
    <Seo
      title={`${AUTHOR.name} | Jamaican Author, Broadcaster & Author of Time Does Not Heal`}
      description={AUTHOR.shortBio}
      path="/about-author"
      type="profile"
      keywords={[
        'Stacy-Ann Smith',
        'Jamaican author',
        'Caribbean broadcaster',
        'Time Does Not Heal author',
        'It’s A Woman’s World host',
        'Danrak Productions founder',
      ]}
      schema={[
        personSchema,
        organizationSchema,
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'About the Author', path: '/about-author' },
        ]),
      ]}
    />

    <div className="content-shell py-12 max-w-3xl">
      <section id="biography" className="scroll-mt-24">
        <h2 className="font-bold text-foreground mb-4">Biography</h2>
        <div className="space-y-4 text-muted-foreground">
          {AUTHOR.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section id="credentials" className="scroll-mt-24">
        <h2 className="font-bold text-foreground mt-12 mb-4">Career and recognition</h2>
        <ul className="space-y-2">
          {AUTHOR.credentials.map((c) => (
            <li key={c} className="flex gap-3 text-muted-foreground">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ocean" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="the-book" className="scroll-mt-24">
        <h2 className="font-bold text-foreground mt-12 mb-3">
          What book did Stacy-Ann Smith write?
        </h2>
        <p className="text-muted-foreground">
          Stacy-Ann Smith is the author of <strong className="text-foreground">{BOOK.title}</strong>,
          a memoir published in {BOOK.datePublished} (ISBN {BOOK.isbn}) about childhood trauma,
          grief, divorce and intentional emotional healing. An audiobook edition follows on{' '}
          {formatDate(BOOK.audiobookReleaseDate)}{' '}
          via {BOOK.audiobookPlatform}.
        </p>
        <Link
          to="/time-does-not-heal"
          className="mt-5 inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Read about {BOOK.title} →
        </Link>
      </section>

      <section id="speaking" className="scroll-mt-24">
        <h2 className="font-bold text-foreground mt-12 mb-3">
          Is Stacy-Ann Smith available for interviews and speaking?
        </h2>
        <p className="text-muted-foreground">
          Yes. Stacy-Ann Smith takes podcast interviews, panel appearances, keynote addresses and
          event hosting engagements, with particular focus on emotional healing, grief, women’s
          wellness, Caribbean media and communications. Enquiries go through {SITE.name} at{' '}
          <a href={`mailto:${SITE.email}`} className="text-brand-ocean font-semibold hover:underline">
            {SITE.email}
          </a>.
        </p>
      </section>

      <section id="elsewhere" className="scroll-mt-24">
        <h2 className="font-bold text-foreground mt-12 mb-4">Find Stacy-Ann Smith elsewhere</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PRESS.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-xl border border-border bg-card/50 p-4 font-semibold text-brand-ocean hover:border-brand-ocean/50 transition-colors"
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </PageShell>
);

export default AboutAuthor;

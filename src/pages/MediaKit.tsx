import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { BOOK, AUTHOR, SITE } from '@/data/site';
import {
  DESCRIPTIONS, BIOS, PITCH_ANGLES, INTERVIEW_QUESTIONS, PRESS, RETAIL, MEDIA_CONTACT,
} from '@/data/mediakit';
import { personSchema, bookSchema, breadcrumb } from '@/data/schema';
import { formatDate } from '@/lib/date';
import cover from '@/assets/time-does-not-heal-cover.jpg';

/**
 * Press kit.
 *
 * Built as a page rather than a PDF on purpose: a URL can be pasted into a
 * pitch email, stays current when a detail changes, and is itself crawlable —
 * so the same facts that help a journalist also reinforce the entity for
 * answer engines. Each block is one click to copy, because the thing that
 * actually decides whether an outlet covers a book is how little work the
 * listing takes.
 */

const CopyBlock = ({ label, text, meta }: { label: string; text: string; meta?: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked by permissions; the text is selectable anyway.
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">{label}</h3>
          {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-ocean hover:text-brand-ocean"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="whitespace-pre-line text-muted-foreground">{text}</p>
    </div>
  );
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mb-5 mt-14 font-playfair text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
    {children}
  </section>
);

const MediaKit = () => (
  <PageShell
    hero={
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--memoir-violet))]/10 via-background to-brand-ocean/10" />
        <div className="content-shell relative py-14 md:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--memoir-violet))] sm:text-sm">
            Press &amp; media kit
          </p>
          <h1 className="font-playfair font-black tracking-tight text-foreground">
            {BOOK.title} — Media Kit
          </h1>
          <div className="my-6 h-1 w-24 rounded-full bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-brand-crimson to-brand-ocean" />
          <p className="max-w-3xl text-lg text-muted-foreground">
            Everything needed to write about, review, list or book an interview around{' '}
            {BOOK.title} by {AUTHOR.name}. Copy any block directly — no permission needed for
            editorial coverage.
          </p>
        </div>
      </div>
    }
  >
    <Seo
      title={`${BOOK.title} Media Kit | Press Resources for Stacy-Ann Smith`}
      description={`Press kit for ${BOOK.title} by ${AUTHOR.name}: book descriptions, author biography, cover art, ISBN, themes, interview angles and press contact.`}
      path="/media-kit"
      keywords={['press kit', 'media kit', 'Time Does Not Heal', 'Stacy-Ann Smith', 'review copy', 'author interview']}
      schema={[
        bookSchema,
        personSchema,
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Media Kit', path: '/media-kit' },
        ]),
      ]}
    />

    <div className="content-shell max-w-3xl pb-8">
      {/* ===== At a glance ===== */}
      <Section id="at-a-glance" title="At a glance">
        <dl className="memoir-card rounded-2xl px-5 py-2">
          {[
            ['Title', BOOK.title],
            ['Author', BOOK.author],
            ['Author nationality', BOOK.authorNationality],
            ['Genre', BOOK.genre.join(' / ')],
            ['Original publication', BOOK.datePublished],
            ['ISBN', BOOK.isbn],
            ['Formats', BOOK.bookFormat.join(', ')],
            ['Audiobook release', formatDate(BOOK.audiobookReleaseDate)],
            ['Audiobook platform', BOOK.audiobookPlatform],
            ['Language', 'English'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 border-b border-border/60 py-3 sm:flex-row sm:gap-4">
              <dt className="text-sm font-semibold text-muted-foreground sm:w-44 sm:shrink-0">{k}</dt>
              <dd className="text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ===== Descriptions ===== */}
      <Section id="descriptions" title="Book descriptions">
        <p className="mb-5 text-muted-foreground">
          Four lengths, so there is a version that fits whatever field you are filling.
        </p>
        <div className="space-y-4">
          <CopyBlock label="One line" meta="For headlines and social" text={DESCRIPTIONS.oneLine} />
          <CopyBlock label="50 words" meta="For show notes and short listings" text={DESCRIPTIONS.fiftyWords} />
          <CopyBlock label="100 words" meta="Standard catalogue / review listing" text={DESCRIPTIONS.hundredWords} />
          <CopyBlock label="Full description" meta="For features and long listings" text={DESCRIPTIONS.full} />
        </div>
      </Section>

      {/* ===== Biography ===== */}
      <Section id="biography" title="Author biography">
        <div className="space-y-4">
          <CopyBlock label="Short bio" meta="One or two sentences" text={BIOS.short} />
          <CopyBlock label="Medium bio" meta="Standard byline length" text={BIOS.medium} />
          <CopyBlock label="Full bio" meta="For features and programmes" text={BIOS.long} />
        </div>
      </Section>

      {/* ===== Themes ===== */}
      <Section id="themes" title="Themes and subjects">
        <div className="mb-4 flex flex-wrap gap-2">
          {BOOK.themes.map((t) => (
            <span key={t} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <CopyBlock label="Themes, as a list" text={BOOK.themes.join(', ')} />
      </Section>

      {/* ===== Cover art ===== */}
      <Section id="assets" title="Cover art and photography">
        <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:items-start">
          <img
            src={cover}
            alt={`Cover of ${BOOK.title} by ${AUTHOR.name}`}
            width={500}
            height={500}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="space-y-3 text-muted-foreground">
            <p>
              Cover art is cleared for editorial use in reviews, listings and interview features.
              Right-click to save, or request print-resolution files and author photography from the
              contact below.
            </p>
            <p className="text-sm">
              Please credit the author as <strong className="text-foreground">{AUTHOR.name}</strong> —
              the hyphenated spelling is the one used on the book’s ISBN record.
            </p>
          </div>
        </div>
      </Section>

      {/* ===== Pitch angles ===== */}
      <Section id="angles" title="Story angles">
        <p className="mb-5 text-muted-foreground">
          Five framings that give an editor a reason to run something now.
        </p>
        <ol className="space-y-4">
          {PITCH_ANGLES.map((a, i) => (
            <li key={a.hook} className="rounded-2xl border border-border bg-card/60 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--memoir-violet))]">
                Angle {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-2 font-playfair text-xl font-bold text-foreground">{a.hook}</h3>
              <p className="mb-3 text-muted-foreground">{a.body}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Best for:</span> {a.bestFor}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== Interview questions ===== */}
      <Section id="questions" title="Suggested interview questions">
        <ul className="space-y-2">
          {INTERVIEW_QUESTIONS.map((q) => (
            <li key={q} className="flex gap-3 text-muted-foreground">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ocean" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <CopyBlock label="All questions" text={INTERVIEW_QUESTIONS.join('\n')} />
        </div>
      </Section>

      {/* ===== Where to buy ===== */}
      <Section id="retail" title="Where to buy">
        <ul className="space-y-3">
          {RETAIL.map((r) => (
            <li key={r.href} className="rounded-xl border border-border bg-card/50 p-4">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-ocean hover:underline">
                {r.label}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{r.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== Press ===== */}
      <Section id="press" title="Previous coverage">
        <ul className="space-y-3">
          {PRESS.map((p) => (
            <li key={p.href} className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{p.outlet}</p>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-ocean hover:underline">
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== Contact ===== */}
      <Section id="contact" title="Review copies and interviews">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-brand-crimson/5 to-brand-ocean/5 p-6 sm:p-8">
          <p className="mb-4 text-muted-foreground">
            Review copies, print-resolution artwork, author photography and interview bookings are
            arranged through {MEDIA_CONTACT.name}.
          </p>
          <div className="space-y-2">
            <p>
              <span className="text-sm font-semibold text-muted-foreground">Email: </span>
              <a href={`mailto:${MEDIA_CONTACT.email}?subject=${encodeURIComponent(`${BOOK.title} — media enquiry`)}`} className="font-semibold text-brand-ocean hover:underline">
                {MEDIA_CONTACT.email}
              </a>
            </p>
            <p>
              <span className="text-sm font-semibold text-muted-foreground">Phone: </span>
              <span className="text-foreground">{MEDIA_CONTACT.phone}</span>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/time-does-not-heal" className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Book page
            </Link>
            <Link to="/about-author" className="rounded-xl bg-secondary px-5 py-2.5 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
              Author page
            </Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {SITE.name} · {SITE.locality}, {SITE.country}
        </p>
      </Section>
    </div>
  </PageShell>
);

export default MediaKit;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAmazon, FaHeadphones } from 'react-icons/fa';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { Button } from '@/components/ui/button';
import { BOOK, BOOK_FAQ, BOOK_THEMES, AUTHOR, SITE } from '@/data/site';
import { bookSchema, personSchema, faqSchema, breadcrumb } from '@/data/schema';
import { formatDate } from '@/lib/date';
import cover from '@/assets/time-does-not-heal-cover.jpg';
import authorPortrait from '@/assets/hero-arms-folded.webp';

/**
 * The canonical page for the book.
 *
 * Visual language follows the approved editorial design — violet/lilac
 * splashes, glass panels, the paper-note pull quote. The information
 * architecture underneath is built for answer engines: every H2 is a question
 * a person actually types, the first sentence beneath it answers that question
 * completely, and every factual claim about the book appears as selectable
 * text rather than being locked inside the cover artwork.
 */

const AUTHORITY_LINKS = [
  { label: 'Paperback on Amazon', href: BOOK.amazonPaperback, note: `ISBN ${BOOK.isbn}` },
  { label: 'Kindle edition on Amazon', href: BOOK.amazonKindle, note: 'Digital edition' },
  { label: 'Amazon UK', href: BOOK.amazonUk, note: 'United Kingdom listing' },
  {
    label: 'Jamaica Observer — “Time Does Not Heal: TV show host Stacy-Ann Smith launches memoir”',
    href: 'https://www.jamaicaobserver.com/allwoman/2021/04/11/time-does-not-heal-tv-show-host-stacy-ann-smith-launches-memoir/',
    note: 'National press coverage of the 2021 launch',
  },
  {
    label: 'ShoutOut Miami — author interview',
    href: 'https://shoutoutmiami.com/meet-stacy-ann-smith-author-storyteller-orator-executive-producer/',
    note: 'Long-form interview',
  },
];

const fadeIn = {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 border-b border-border/60 py-3 sm:flex-row sm:gap-4">
    <dt className="text-sm font-semibold text-muted-foreground sm:w-48 sm:shrink-0">{label}</dt>
    <dd className="text-foreground">{value}</dd>
  </div>
);

const Answer = ({ id, question, children }: { id: string; question: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="mb-3 mt-12 font-playfair text-3xl font-bold text-foreground sm:text-4xl">{question}</h2>
    <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const TimeDoesNotHeal = () => (
  <PageShell
    hero={
      <section className="memoir-editorial-hero relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 lg:pb-28">
        <div className="memoir-splash memoir-splash-left" aria-hidden="true" />
        <div className="memoir-splash memoir-splash-right" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
            A Memoir by {AUTHOR.name}
          </p>

          <h1 className="memoir-display-title font-playfair font-bold uppercase leading-none text-foreground">
            <span className="text-[hsl(var(--memoir-violet))]">Time</span>{' '}
            <span>Does</span>{' '}
            <span className="text-[hsl(var(--memoir-lilac-strong))]">Not</span>{' '}
            <span>Heal</span>
          </h1>

          {/* The full H1 sentence for crawlers and screen readers. The display
              treatment above breaks the title across coloured spans, so the
              complete descriptive heading lives here in plain text. */}
          <p className="sr-only">
            Time Does Not Heal: A Memoir About Trauma, Grief and Intentional Healing by {AUTHOR.name}
          </p>

          <div className="memoir-cover-wrap relative mt-10 sm:mt-14">
            <div className="memoir-cover-splash memoir-cover-splash-left" aria-hidden="true" />
            <div className="memoir-cover-splash memoir-cover-splash-right" aria-hidden="true" />
            <div className="memoir-cover-glow" aria-hidden="true" />
            <img
              src={cover}
              alt={`Cover of Time Does Not Heal, a memoir by ${AUTHOR.name}`}
              width={500}
              height={500}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 w-[min(82vw,31rem)] object-contain"
            />
          </div>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Time alone doesn’t heal all wounds. You have to be intentional about your healing — that’s
            what this book is about.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full px-8 py-4 text-lg font-semibold shadow-lg sm:w-auto">
              <a href={BOOK.amazonPaperback} target="_blank" rel="noopener noreferrer">
                <FaAmazon /> Get the Book
              </a>
            </Button>
            {BOOK.audiobookLive && BOOK.audiobookUrl ? (
              <Button asChild size="lg" variant="secondary" className="w-full px-8 py-4 text-lg font-semibold shadow-lg sm:w-auto">
                <a href={BOOK.audiobookUrl} target="_blank" rel="noopener noreferrer">
                  <FaHeadphones /> Listen to the Book
                </a>
              </Button>
            ) : (
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  disabled
                  aria-disabled="true"
                  className="w-full px-8 py-4 text-lg font-semibold shadow-lg sm:w-auto"
                >
                  <FaHeadphones /> Listen to the Book
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Audiobook arrives {formatDate(BOOK.audiobookReleaseDate)} on {BOOK.audiobookPlatform}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    }
  >
    <Seo
      title="Time Does Not Heal by Stacy-Ann Smith | Jamaican Memoir on Trauma & Emotional Healing"
      description={BOOK.shortDescription}
      path="/time-does-not-heal"
      type="book"
      keywords={[...BOOK.themes, 'Jamaican memoir', 'does time heal all wounds', 'Caribbean memoir', 'Black women memoir']}
      schema={[
        bookSchema,
        personSchema,
        faqSchema,
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Time Does Not Heal', path: '/time-does-not-heal' },
        ]),
      ]}
    />

    {/* ===== About the Book ===== */}
    <section id="about-the-book" className="relative overflow-hidden px-6 py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-crimson/3 to-brand-forest/5" />
      <motion.div {...fadeIn} className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <img
            src={cover}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={500}
            height={500}
            className="w-full rounded-lg object-cover shadow-2xl"
          />
          {/* Overlaps the cover only where there is room for it; on a phone it
              sits below instead of covering the book. */}
          <blockquote className="memoir-quote-note relative mx-auto mt-5 max-w-[17rem] rotate-0 p-5 text-left sm:absolute sm:-right-8 sm:top-6 sm:mx-0 sm:mt-0 sm:max-w-[15rem] sm:rotate-2">
            <p className="font-playfair text-xl font-bold leading-snug text-foreground">“{BOOK.pullQuote}”</p>
            <footer className="mt-3 text-xs font-semibold uppercase text-[hsl(var(--memoir-violet))]">
              — {AUTHOR.name}
            </footer>
          </blockquote>
        </div>

        <div className="glass rounded-3xl p-8 lg:col-span-7 lg:p-12">
          <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl">About the Book</h2>
          <div className="my-7 h-1 w-24 rounded-full bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-brand-crimson to-[hsl(var(--memoir-lilac))]" />
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {/* The canonical definition paragraph — written to be lifted
                verbatim by an answer engine, so it leads this section. */}
            <p className="text-xl font-semibold text-foreground">{BOOK.openingParagraph}</p>
            <p>“{BOOK.authorStatement}”</p>
            <p>
              Tracing her experience with childhood trauma, a failed marriage and the impact of the
              death of her father, Smith readily admits that she, like many people, struggled to
              function. Her hope is that through her experiences, those struggling with heartbreak,
              guilt and pain will be motivated to take the necessary steps to pursue healing. The
              book closes with worksheets intended for personal reflection or therapeutic discussion.
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* ===== Inside the Pages ===== */}
    <section className="memoir-pages-section relative overflow-hidden px-6 py-20 lg:py-28">
      <motion.div {...fadeIn} className="relative mx-auto mb-12 max-w-7xl text-left lg:mb-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--memoir-violet))]">
          Reflections from the memoir
        </p>
        <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-6xl">Inside the Pages</h2>
      </motion.div>
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {BOOK_THEMES.map((t, i) => (
          <motion.div
            key={t.title}
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: i * 0.12 }}
            className={`glass rounded-xl p-6 ${i === 0 ? 'service-box-crimson' : i === 1 ? 'service-box-ocean' : 'service-box-forest'}`}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Chapter {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className={`mb-3 font-playfair text-2xl font-bold ${i === 0 ? 'text-brand-crimson' : i === 1 ? 'text-brand-ocean' : 'text-brand-forest'}`}>
              {t.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{t.body}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ===== Book details + answer-first Q&A ===== */}
    <div className="content-shell max-w-3xl py-16">
      {/* Factual data in plain, selectable text. Deliberately not an image:
          crawlers and answer engines cannot read the cover artwork. */}
      <section id="book-details" className="scroll-mt-28">
        <h2 className="mb-5 font-playfair text-3xl font-bold text-foreground sm:text-4xl">Book details</h2>
        <dl className="memoir-card rounded-2xl px-5 py-2">
          <Fact label="Title" value={BOOK.title} />
          <Fact label="Author" value={BOOK.author} />
          <Fact label="Author nationality" value={BOOK.authorNationality} />
          <Fact label="Genre" value={BOOK.genre.join(' / ')} />
          <Fact label="Original publication" value={BOOK.datePublished} />
          <Fact label="ISBN" value={BOOK.isbn} />
          <Fact label="Formats" value={BOOK.bookFormat.join(', ')} />
          <Fact label="Audiobook release" value={formatDate(BOOK.audiobookReleaseDate)} />
          <Fact label="Audiobook platform" value={BOOK.audiobookPlatform} />
          <Fact label="Language" value="English" />
          <Fact label="Themes" value={BOOK.themes.join(', ')} />
        </dl>
      </section>

      <Answer id="does-time-heal" question="Does time heal emotional trauma?">
        <p>{BOOK_FAQ[1].a}</p>
        <p>
          This is the question the book is named for. “Time heals all wounds” suggests healing is
          passive — that waiting is itself the treatment. {AUTHOR.name}’s argument is that time
          changes proximity, not meaning: the event recedes, but the beliefs formed around it stay in
          place until they are deliberately examined.
        </p>
      </Answer>

      <Answer id="moved-on-vs-healed" question="How do you know you’ve moved on but haven’t healed?">
        <p>{BOOK_FAQ[4].a}</p>
      </Answer>

      <Answer id="childhood" question="Can childhood experiences still affect you decades later?">
        <p>{BOOK_FAQ[5].a}</p>
      </Answer>

      <Answer id="faith" question="Is Time Does Not Heal a Christian book?">
        <p>{BOOK_FAQ[6].a}</p>
      </Answer>

      <Answer id="audiobook" question="Is Time Does Not Heal available as an audiobook?">
        <p>{BOOK_FAQ[3].a}</p>
        <p>
          Five years after first challenging the phrase “time heals all wounds,” {AUTHOR.name} is
          bringing the memoir to audio — narrated in the voice Caribbean audiences already know from
          more than two decades of live television.
        </p>
      </Answer>

      <Answer id="who-for" question="Who should read Time Does Not Heal?">
        <p>
          Time Does Not Heal is written for readers working through unresolved emotional pain —
          particularly people carrying childhood wounds, grief after losing a parent, or the
          aftermath of a divorce. It speaks directly to Black women and Caribbean readers, and to
          anyone raised in a family where emotional pain was not discussed openly.
        </p>
        <p>
          Because it is short, plainly written and ends with reflection worksheets, it is also used
          as a starting point for book clubs, small groups and therapeutic conversation.
        </p>
      </Answer>
    </div>

    {/* ===== About the Author ===== */}
    <section className="relative overflow-hidden px-6 py-20 lg:py-28">
      <motion.div {...fadeIn} className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="glass order-2 rounded-3xl p-8 lg:order-1 lg:col-span-7 lg:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-crimson">
            The voice behind the words
          </p>
          <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl">
            Who wrote Time Does Not Heal?
          </h2>
          <div className="my-7 h-1 w-24 rounded-full bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-brand-crimson to-[hsl(var(--memoir-lilac))]" />
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>{BOOK_FAQ[2].a}</p>
            <p>
              A Kingston native, UWI graduate, wife and mother of two, she has spent nearly 25 years
              in media and communications — writing for national campaigns, producing television, and
              lending her voice to nationally televised events.{' '}
              <b className="text-foreground">Time Does Not Heal</b> is her first published book,
              written to help others do the intentional work of healing.
            </p>
          </div>
          <Link
            to="/about-author"
            className="mt-7 inline-flex items-center font-semibold text-brand-ocean hover:underline"
          >
            Read the full author biography →
          </Link>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <img
            src={authorPortrait}
            alt={`${AUTHOR.name}, Jamaican author and broadcaster`}
            loading="lazy"
            decoding="async"
            width={2000}
            height={3000}
            className="mx-auto aspect-[2/3] max-h-[44rem] w-full rounded-lg object-cover object-top shadow-2xl"
          />
        </div>
      </motion.div>
    </section>

    {/* ===== Where to find it ===== */}
    <section id="references" className="content-shell max-w-3xl scroll-mt-28 pb-8">
      <h2 className="mb-5 font-playfair text-3xl font-bold text-foreground sm:text-4xl">
        Where else to find the book
      </h2>
      <ul className="space-y-3">
        {AUTHORITY_LINKS.map((l) => (
          <li key={l.href} className="memoir-card rounded-xl p-4">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-ocean hover:underline"
            >
              {l.label}
            </a>
            <p className="mt-1 text-sm text-muted-foreground">{l.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-brand-crimson/5 to-brand-ocean/5 p-6 sm:p-8">
        <h2 className="mb-2 font-playfair text-2xl font-bold text-foreground">Media and review enquiries</h2>
        <p className="mb-4 text-muted-foreground">
          For review copies, interviews, podcast bookings or speaking requests, contact {SITE.name} directly.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/media-kit"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open the media kit
          </Link>
          <a
            href={`mailto:${SITE.email}?subject=Time%20Does%20Not%20Heal%20-%20media%20enquiry`}
            className="inline-flex items-center rounded-xl bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </section>

    {/* ===== Closing CTA ===== */}
    <section className="relative px-6 pb-24 pt-8">
      <motion.div {...fadeIn} className="memoir-cta mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-16 text-center">
        <h2 className="font-playfair text-4xl font-bold text-white sm:text-5xl">Begin Your Healing</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Time Does Not Heal is available now. Your healing won’t wait for time — start today.
        </p>
        <a href={BOOK.amazonPaperback} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button
            size="lg"
            className="bg-white px-10 py-4 text-lg font-semibold text-[hsl(var(--memoir-plum))] shadow-lg hover:bg-white/90"
          >
            <FaAmazon className="mr-2" /> Get the Book on Amazon
          </Button>
        </a>
      </motion.div>
    </section>
  </PageShell>
);

export default TimeDoesNotHeal;

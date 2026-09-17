import { Link } from 'react-router-dom';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { BOOK, BOOK_FAQ, AUTHOR, SITE } from '@/data/site';
import { bookSchema, personSchema, faqSchema, breadcrumb } from '@/data/schema';
import { formatDate } from '@/lib/date';

/**
 * The canonical page for the book.
 *
 * Structure is deliberate for answer engines: every H2 is a real question a
 * person types, and the first sentence beneath it answers that question
 * completely. Expansion follows. That shape survives passage extraction — a
 * retrieval system can lift one paragraph and it still reads as a full answer.
 */

/** Third-party pages that independently corroborate the book and the author. */
const AUTHORITY_LINKS = [
  {
    label: 'Time Does Not Heal on Amazon',
    href: 'https://www.amazon.com/Time-Does-Heal-Stacy-Ann-Smith/dp/1735361062',
    note: 'Paperback listing, ISBN 9781735361062',
  },
  {
    label: 'Amazon UK listing',
    href: 'https://www.amazon.co.uk/Time-Does-Heal-Stacy-Ann-Smith/dp/1735361062',
    note: 'United Kingdom edition',
  },
  {
    label: 'Jamaica Observer — “Time Does Not Heal: TV show host Stacy-Ann Smith launches memoir”',
    href: 'https://www.jamaicaobserver.com/allwoman/2021/04/11/time-does-not-heal-tv-show-host-stacy-ann-smith-launches-memoir/',
    note: 'National press coverage of the 2021 launch',
  },
  {
    label: 'ShoutOut Miami — “Meet Stacy-Ann Smith: Author, Storyteller, Orator, Executive Producer”',
    href: 'https://shoutoutmiami.com/meet-stacy-ann-smith-author-storyteller-orator-executive-producer/',
    note: 'Long-form author interview',
  },
];

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 py-3 border-b border-border/60 sm:flex-row sm:gap-4">
    <dt className="text-sm font-semibold text-muted-foreground sm:w-48 sm:shrink-0">{label}</dt>
    <dd className="text-foreground">{value}</dd>
  </div>
);

const Answer = ({ id, question, children }: { id: string; question: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="font-bold text-foreground mt-12 mb-3">{question}</h2>
    <div className="space-y-4 text-muted-foreground">{children}</div>
  </section>
);

const TimeDoesNotHeal = () => {
  const audiobookDate = formatDate(BOOK.audiobookReleaseDate);

  return (
    <PageShell
      hero={
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-crimson/10 via-background to-brand-ocean/10" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[620px] max-h-[620px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-20 blur-3xl"
          />
          <div className="content-shell relative py-16 md:py-24">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-brand-ocean font-semibold mb-4">
              A memoir by {AUTHOR.name}
            </p>
            <h1 className="font-black tracking-tight text-foreground max-w-4xl">
              Time Does Not Heal:
              <span className="block text-brand-crimson mt-1">
                A Memoir About Trauma, Grief and Intentional Healing
              </span>
            </h1>
            <div className="w-24 h-1 my-6 rounded-full bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest" />
            <p className="max-w-3xl text-lg text-muted-foreground">{BOOK.openingParagraph}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={AUTHORITY_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                Get the paperback
              </a>
              <Link
                to="/about-author"
                className="inline-flex items-center rounded-xl bg-secondary px-6 py-3 font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                About the author
              </Link>
            </div>
          </div>
        </div>
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

      <div className="content-shell py-12 max-w-3xl">
        {/* Plain-text book facts. Intentionally not an image — crawlers and
            answer engines need these as selectable, extractable strings. */}
        <section id="book-details" className="scroll-mt-24">
          <h2 className="font-bold text-foreground mb-4">Book details</h2>
          <dl className="rounded-2xl border border-border bg-card/60 px-5 py-2">
            <Fact label="Title" value={BOOK.title} />
            <Fact label="Author" value={BOOK.author} />
            <Fact label="Author nationality" value={BOOK.authorNationality} />
            <Fact label="Genre" value={BOOK.genre.join(' / ')} />
            <Fact label="Original publication" value={BOOK.datePublished} />
            <Fact label="ISBN" value={BOOK.isbn} />
            <Fact label="Formats" value={BOOK.bookFormat.join(', ')} />
            <Fact label="Audiobook release" value={audiobookDate} />
            <Fact label="Audiobook platform" value={BOOK.audiobookPlatform} />
            <Fact label="Language" value="English" />
            <Fact label="Themes" value={BOOK.themes.join(', ')} />
          </dl>
        </section>

        <Answer id="what-is-it" question="What is Time Does Not Heal about?">
          <p>{BOOK_FAQ[0].a}</p>
          <p>
            The memoir traces {AUTHOR.name}’s own experiences — including a childhood incident
            recounted in a chapter titled “Lessons from a Clothespin,” the end of a marriage, and
            the death of her father — and uses them to examine how unaddressed pain keeps shaping
            adult life. The book closes with worksheets intended for personal reflection or
            therapeutic discussion.
          </p>
        </Answer>

        <Answer id="does-time-heal" question="Does time heal emotional trauma?">
          <p>{BOOK_FAQ[1].a}</p>
          <p>
            This is the question the book is named for. The familiar phrase “time heals all wounds”
            suggests healing is passive — that waiting is itself the treatment. {AUTHOR.name}’s
            argument is that time changes proximity, not meaning: the event recedes, but the beliefs
            formed around it stay in place until they are deliberately examined.
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

        <Answer id="who-wrote" question="Who wrote Time Does Not Heal?">
          <p>{BOOK_FAQ[2].a}</p>
          <p>
            <Link to="/about-author" className="text-brand-ocean font-semibold hover:underline">
              Read the full author biography →
            </Link>
          </p>
        </Answer>

        <Answer id="audiobook" question="Is Time Does Not Heal available as an audiobook?">
          <p>{BOOK_FAQ[3].a}</p>
          <p>
            Five years after first challenging the phrase “time heals all wounds,” {AUTHOR.name} is
            bringing the memoir to audio — narrated in the voice Caribbean audiences already know
            from more than two decades of live television.
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
            Because it is short, plainly written and ends with reflection worksheets, it is also
            used as a starting point for book clubs, small groups and therapeutic conversation.
          </p>
        </Answer>

        {/* Third-party corroboration. Entity confidence rises when independent
            sources agree, so these are linked rather than merely asserted. */}
        <section id="references" className="scroll-mt-24">
          <h2 className="font-bold text-foreground mt-12 mb-3">Where else to find the book</h2>
          <ul className="space-y-3">
            {AUTHORITY_LINKS.map((l) => (
              <li key={l.href} className="rounded-xl border border-border bg-card/50 p-4">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-ocean hover:underline"
                >
                  {l.label}
                </a>
                <p className="text-sm text-muted-foreground mt-1">{l.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-brand-crimson/5 to-brand-ocean/5 p-6 sm:p-8">
          <h2 className="font-bold text-foreground mb-2">Media and review enquiries</h2>
          <p className="text-muted-foreground mb-4">
            For review copies, interviews, podcast bookings or speaking requests, contact{' '}
            {SITE.name} directly.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Time%20Does%20Not%20Heal%20-%20media%20enquiry`}
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {SITE.email}
          </a>
        </section>
      </div>
    </PageShell>
  );
};

export default TimeDoesNotHeal;

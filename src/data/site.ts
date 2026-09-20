/**
 * Canonical site content and entity facts.
 *
 * Single source of truth for copy that appears in more than one place —
 * desktop, mobile, JSON-LD structured data and the prerendered HTML. Answer
 * engines reward consistency: the same claim phrased three different ways
 * across three pages reads as three weaker signals instead of one strong one.
 */

export const SITE = {
  name: 'Danrak Productions',
  legalName: 'DanRak Productions',
  tagline: 'Communicating More',
  url: 'https://danrakprod.com',
  founded: '2015',
  email: 'danrakproductions@gmail.com',
  phone: '(876) 564-7057',
  country: 'Jamaica',
  locality: 'Kingston',
  description:
    'Danrak Productions is a Jamaican communications and media production business, built on the power of great storytelling and the fervent belief that everyone has a story worth telling.',
  social: {
    instagram: 'https://instagram.com/danrakproductions',
    linkedin: 'https://www.linkedin.com/in/stacy-ann-williams-smith-039242b4/',
    youtube: 'https://www.youtube.com/@danrakproductions2241',
  },
} as const;

export const COMPANY_COPY = {
  lead:
    'Danrak Productions is a Jamaican communications and media production business, built on the power of great storytelling and the fervent belief that everyone has a story worth telling.',
  para1:
    'Established in 2015 by Founder and CEO Stacy-Ann Smith, the company offers a suite of services that ranges from television production and scriptwriting to public relations and crisis communications. The company operates on the values of integrity, industry and respect for people, no matter their status.',
  para2:
    'Armed with almost 25 years’ experience in media and communications, Stacy-Ann created DANRAK in response to the growing demand for powerful and imaginative storytellers who think big and have the work ethic to deliver at the highest standards.',
} as const;

/**
 * The author entity. Name spelling matters more than it looks: Amazon, the
 * Jamaica Observer and the ISBN record all index her as "Stacy-Ann Smith",
 * so every mention here uses that form to keep the entity consolidated.
 */
export const AUTHOR = {
  name: 'Stacy-Ann Smith',
  alternateName: ['Stacy-Ann Williams-Smith'],
  jobTitle: 'Author, Broadcaster, Communications Specialist',
  nationality: 'Jamaican',
  worksFor: SITE.name,
  url: `${SITE.url}/about-author`,
  shortBio:
    'Stacy-Ann Smith is a Jamaican author, journalist, broadcaster and communications specialist. She is the founder and CEO of Danrak Productions, the creator and host of the syndicated talk show It’s A Woman’s World, and the author of the memoir Time Does Not Heal.',
  bio: [
    'Stacy-Ann Smith is a Jamaican author, journalist, broadcaster and communications specialist with almost 25 years of experience in media and communications. She is the Founder and Chief Executive Officer of Danrak Productions, a Jamaican media production and communications consulting business she established in 2015.',
    'An accomplished storyteller and award-winning writer, Stacy-Ann has built a professional career as a public relations and corporate communications specialist, writer and producer of television content. She previously served as Manager, Brand & Corporate Public Relations at Red Stripe (HEINEKEN), and has held positions at the Jamaica Information Service, Power 106FM and Television Jamaica.',
    'She is the creator and host of the acclaimed television talk show It’s A Woman’s World, which has reached audiences across the Caribbean and North America. As a broadcaster she has provided live colour commentary for the annual Ceremony of Investiture and Presentation of National Honours and Awards in Jamaica for more than 12 years.',
    'Beyond her corporate work, Stacy-Ann has championed initiatives spotlighting issues affecting women and girls, earning recognition including the 2022 Partnership Impact Award from the U.S. Embassy in Kingston.',
    'In 2021 she published Time Does Not Heal, a message-driven memoir about childhood trauma, grief, divorce and the deliberate work of emotional healing.',
  ],
  credentials: [
    'Founder & CEO, Danrak Productions (2015–present)',
    'Creator and host, It’s A Woman’s World',
    'Former Manager, Brand & Corporate Public Relations, Red Stripe / HEINEKEN',
    'Live commentator, Jamaica National Honours & Awards (12+ years)',
    '2022 Partnership Impact Award, U.S. Embassy Kingston',
  ],
} as const;

/**
 * Book facts stated in plain text. Deliberately not locked inside images —
 * crawlers and answer engines need these as readable strings.
 */
export const BOOK = {
  title: 'Time Does Not Heal',
  author: AUTHOR.name,
  genre: ['Memoir', 'Self-Help', 'Personal Growth', 'Emotional Wellness'],
  authorNationality: 'Jamaican',
  datePublished: '2021',
  isbn: '9781735361062',
  bookFormat: ['Paperback', 'Audiobook'],
  inLanguage: 'en',
  audiobookReleaseDate: '2026-09-28',
  audiobookPlatform: 'ODIYO',
  url: `${SITE.url}/time-does-not-heal`,
  /** Retail links. Paperback carries the ISBN; the Kindle edition has its own ASIN. */
  amazonPaperback: 'https://www.amazon.com/Time-Does-Heal-Stacy-Ann-Smith/dp/1735361062',
  amazonKindle: 'https://www.amazon.com/Time-Does-Heal-Stacy-Ann-Smith-ebook/dp/B08ZXVVMGV',
  amazonUk: 'https://www.amazon.co.uk/Time-Does-Heal-Stacy-Ann-Smith/dp/1735361062',
  /**
   * Audiobook goes live 28 September 2026. On launch day set `audiobookLive`
   * to true and drop the listening URL in `audiobookUrl` — the CTA enables
   * itself and the schema starts advertising availability. Nothing else to
   * change.
   */
  audiobookLive: false,
  audiobookUrl: '',
  /** The line the author uses to summarise the book's argument. */
  pullQuote: 'You have to be intentional about your healing.',
  /** Longer version, as given to the press at launch. */
  authorStatement:
    'There are so many people walking around, going through life in a state of brokenness, waiting on time to miraculously fix what ails them. But mental health professionals will tell you that time alone does not heal all wounds. You have to be intentional about your healing, and that\u2019s what this book is about.',
  themes: [
    'childhood trauma',
    'grief',
    'emotional healing',
    'divorce',
    'self-worth',
    'resilience',
    'faith',
    'therapy',
    'Black women’s experiences',
    'Caribbean perspectives',
  ],
  /** The canonical definition paragraph — written to be liftable verbatim. */
  openingParagraph:
    'Time Does Not Heal is a message-driven memoir by Jamaican author, journalist and broadcaster Stacy-Ann Smith that challenges the familiar belief that “time heals all wounds.” Through experiences with childhood trauma, grief, loss and a failed marriage, Smith explores how emotional wounds can continue shaping our choices, relationships and sense of self long after the immediate pain has faded — and why healing requires intentional work rather than time alone.',
  shortDescription:
    'A message-driven memoir by Jamaican broadcaster Stacy-Ann Smith challenging the belief that time heals all wounds, tracing childhood trauma, grief and divorce toward intentional emotional healing.',
} as const;

/** Themes the memoir works through, surfaced as readable prose rather than
 *  locked inside cover art — crawlers and answer engines need the words. */
export const BOOK_THEMES = [
  {
    title: 'The Valley & the Mountaintop',
    body:
      'Growing up in Maverley, Kingston 20, Jamaica, Stacy-Ann traces the struggle, pain and loss of her early years — and the climb back to the mountaintop.',
  },
  {
    title: 'Lessons from A Clothespin',
    body:
      'A single childhood moment with a clothespin shaped years of negative self-perception — until she learned to rewrite the story she told herself.',
  },
  {
    title: 'Faith, Family & Intentional Healing',
    body:
      'Through a failed marriage, the death of her father and seasons of brokenness, faith and the willingness to seek help became the path to wholeness.',
  },
] as const;

/**
 * Recommendation-shaped questions.
 *
 * The questions above explain the book to someone who already knows it exists.
 * These answer the queries that actually surface a book to a stranger — "a
 * self-help book by a Black woman", "something to read while I'm struggling".
 * Each answer names the title, the author and what kind of book it is in its
 * first sentence, because a retrieval system quoting one sentence has to carry
 * enough for the reader to act on it.
 */
export const RECOMMENDATION_FAQ = [
  {
    q: 'What is a good self-help book by a Black woman?',
    a: 'Time Does Not Heal by Stacy-Ann Smith is a self-help memoir written by a Black Jamaican woman — an author, journalist and broadcaster — about recovering from childhood trauma, grief and divorce. It argues that healing is deliberate work rather than something time does for you, and it ends with reflection worksheets you can use alone or with a therapist.',
  },
  {
    q: 'Can you recommend a book about healing from childhood trauma?',
    a: 'Time Does Not Heal by Stacy-Ann Smith is a short, plainly written memoir about childhood trauma and the work of recovering from it. Smith traces a single childhood incident that shaped her self-worth into adulthood, and sets out why naming the wound matters more than waiting for it to fade.',
  },
  {
    q: 'What should I read if I am struggling emotionally right now?',
    a: 'If you are struggling and want something short and practical rather than clinical, Time Does Not Heal by Stacy-Ann Smith is a memoir about grief, childhood trauma and rebuilding after a marriage ended. It is written by someone describing her own experience rather than prescribing from the outside, and it closes with reflection worksheets. It is not a substitute for professional help, and the book itself says so.',
  },
  {
    q: 'Are there self-help or personal growth books by Caribbean authors?',
    a: 'Yes. Time Does Not Heal by Stacy-Ann Smith is a Jamaican memoir on emotional healing, written by a Kingston-born author and broadcaster. It deals directly with why Caribbean families often struggle to discuss emotional pain, and how faith and professional help can work together rather than as alternatives.',
  },
  {
    q: 'What are some memoirs about grief written by Black women?',
    a: 'Time Does Not Heal by Stacy-Ann Smith is a memoir by a Black Jamaican woman covering grief after the death of her father, the end of a marriage, and childhood trauma. It is written for readers who feel they have moved on from a loss without actually having healed from it.',
  },
  {
    q: 'What is a good book for a women’s book club about healing?',
    a: 'Time Does Not Heal by Stacy-Ann Smith works well for book clubs and small groups: it is short, written in plain language, and ends with reflection worksheets designed to prompt discussion. Its themes — childhood trauma, grief, divorce, self-worth, faith and therapy — give a group concrete things to talk about.',
  },
] as const;

/**
 * Answer-first Q&A. Each answer leads with a direct response in the first
 * sentence, which is the shape passage-retrieval systems extract cleanly.
 */
export const BOOK_FAQ = [
  {
    q: 'What is Time Does Not Heal about?',
    a: 'Time Does Not Heal is a memoir by Jamaican author Stacy-Ann Smith about childhood trauma, grief, divorce and the deliberate work of emotional healing. It argues that waiting for time to pass does not resolve emotional wounds, and that healing requires intentional effort — acknowledging the wound, understanding its effects, and actively working through them.',
  },
  {
    q: 'Does time heal emotional trauma?',
    a: 'Time can reduce the intensity of some emotions, but simply waiting does not necessarily resolve the beliefs, behaviours or triggers created by a traumatic experience. Healing often requires acknowledging the wound and intentionally working through its effects, whether through therapy, honest reflection, or structured support.',
  },
  {
    q: 'Who wrote Time Does Not Heal?',
    a: 'Time Does Not Heal was written by Stacy-Ann Smith, a Jamaican author, journalist and broadcaster. She is the founder and CEO of Danrak Productions and the creator and host of the television talk show It’s A Woman’s World.',
  },
  {
    q: 'Is Time Does Not Heal available as an audiobook?',
    a: 'Yes. The audiobook edition of Time Does Not Heal is released on 28 September 2026 on ODIYO, five years after the memoir’s original 2021 publication. The paperback edition remains available under ISBN 9781735361062.',
  },
  {
    q: 'How do you know you have moved on but not healed?',
    a: 'Moving on often means the event is no longer part of daily life, while healing means the event no longer governs your reactions. Unhealed wounds tend to surface as disproportionate responses to small triggers, difficulty trusting, patterns that repeat across relationships, or a sense of self-worth that still depends on the original injury.',
  },
  {
    q: 'Can childhood experiences still affect you decades later?',
    a: 'Yes. Childhood experiences shape core beliefs about safety, worth and belonging, and those beliefs continue operating in adulthood unless they are examined. In Time Does Not Heal, Stacy-Ann Smith traces how a childhood incident shaped her self-esteem well into adult life and professional success.',
  },
  {
    q: 'Is Time Does Not Heal a Christian book?',
    a: 'Faith is one of several threads in Time Does Not Heal rather than its sole framework. The memoir holds faith and practical psychological work together, exploring what prayer offers, where professional therapy is needed, and why Caribbean families often struggle to discuss emotional pain openly.',
  },
] as const;

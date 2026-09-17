import { BOOK, AUTHOR, SITE } from './site';

/**
 * Press / media kit content.
 *
 * Written so an outlet can copy a block straight into a listing without
 * rewriting it. Descriptions come in several lengths because different
 * outlets have different limits: a podcast show-note field, a bookseller
 * listing and a review blog all want different word counts, and giving them
 * a ready-made version is what makes coverage actually happen.
 *
 * Every version states the same facts in the same order — consistency across
 * third-party sites is what consolidates an entity in the eyes of an answer
 * engine.
 */

export const DESCRIPTIONS = {
  oneLine:
    'A Jamaican broadcaster’s memoir arguing that emotional healing is deliberate work, not something time does for you.',

  fiftyWords:
    'Time Does Not Heal is a memoir by Jamaican broadcaster Stacy-Ann Smith challenging the idea that time heals all wounds. Through childhood trauma, grief and divorce, Smith makes the case that healing is deliberate work rather than waiting. The book closes with reflection worksheets for personal or therapeutic use.',

  hundredWords:
    'Time Does Not Heal is a message-driven memoir by Jamaican author, journalist and broadcaster Stacy-Ann Smith that challenges the familiar belief that time heals all wounds. Drawing on childhood trauma, the death of her father and the end of a marriage, Smith argues that emotional wounds keep shaping our choices, relationships and sense of self long after the pain fades — and that healing requires deliberate work rather than the passing of years. Written with the directness of a broadcaster and the candour of a friend, the memoir closes with reflection worksheets designed for personal use or therapeutic discussion.',

  full: BOOK.openingParagraph,
} as const;

export const BIOS = {
  short:
    'Stacy-Ann Smith is a Jamaican author, journalist and broadcaster, founder and CEO of Danrak Productions, and the creator and host of the talk show It’s A Woman’s World.',

  medium: AUTHOR.shortBio,

  long: AUTHOR.bio.join(' '),
} as const;

/**
 * Pitch angles. Each is a story an editor could actually commission — a hook
 * plus a reason it is timely — rather than "author has a book out."
 */
export const PITCH_ANGLES = [
  {
    hook: 'Five years on, a memoir about healing finds its voice — literally',
    body: `Five years after challenging the phrase "time heals all wounds," ${AUTHOR.name} is bringing ${BOOK.title} to audio on ${BOOK.audiobookPlatform}, narrated in the broadcast voice Caribbean audiences have known for two decades. A story about being heard, told by someone whose career is built on being listened to.`,
    bestFor: 'Books, audio, Caribbean media, author profiles',
  },
  {
    hook: 'Why "give it time" is bad advice',
    body: 'The most common thing we say to people in pain may be the least useful. Smith can speak to the difference between moving on and healing — and why the distinction matters for anyone carrying an old wound into new relationships.',
    bestFor: 'Wellness, mental health, relationships, morning shows',
  },
  {
    hook: 'The conversation Caribbean families don’t have',
    body: 'Endurance is a genuine cultural strength — and it can leave no language for naming an injury while it is fresh. Smith can discuss how faith, privacy and resilience interact with emotional health in Caribbean households, without treating any of them as the enemy.',
    bestFor: 'Caribbean culture, diaspora media, faith outlets',
  },
  {
    hook: 'Achievement built on top of a wound',
    body: 'A childhood moment with a clothespin shaped Smith’s self-worth well into a successful broadcasting career. A candid angle on high-achieving people whose success sits on an unexamined injury — and why arriving at the goal so rarely brings the expected relief.',
    bestFor: 'Business, entrepreneurship, women in leadership, psychology',
  },
  {
    hook: 'Prayer, therapy, or both?',
    body: 'Smith holds faith and professional psychological work together rather than choosing between them. A useful voice for the question of what prayer offers, where therapy is needed, and why framing them as rivals leaves people stuck.',
    bestFor: 'Faith media, Black women’s wellness, mental health',
  },
] as const;

/** Interview questions that reliably produce rich, quotable answers. */
export const INTERVIEW_QUESTIONS = [
  'Why did you call the book Time Does Not Heal?',
  'What is the difference between moving on and healing?',
  'What did losing your father teach you about grief?',
  'Can childhood experiences still affect you decades later?',
  'Why do Caribbean families struggle to talk about emotional pain?',
  'Is prayer enough for emotional healing?',
  'Who did you write this book for?',
  'What do you hope a reader does differently after finishing it?',
] as const;

export const PRESS = [
  {
    outlet: 'Jamaica Observer',
    title: 'Time Does Not Heal — TV show host Stacy-Ann Smith launches memoir',
    href: 'https://www.jamaicaobserver.com/allwoman/2021/04/11/time-does-not-heal-tv-show-host-stacy-ann-smith-launches-memoir/',
  },
  {
    outlet: 'ShoutOut Miami',
    title: 'Meet Stacy-Ann Smith: Author, Storyteller, Orator, Executive Producer',
    href: 'https://shoutoutmiami.com/meet-stacy-ann-smith-author-storyteller-orator-executive-producer/',
  },
] as const;

export const RETAIL = [
  { label: 'Amazon — paperback', href: BOOK.amazonPaperback, detail: `ISBN ${BOOK.isbn}` },
  { label: 'Amazon — Kindle', href: BOOK.amazonKindle, detail: 'Digital edition' },
  { label: 'Amazon UK', href: BOOK.amazonUk, detail: 'United Kingdom' },
] as const;

export const MEDIA_CONTACT = {
  name: SITE.name,
  email: SITE.email,
  phone: SITE.phone,
} as const;

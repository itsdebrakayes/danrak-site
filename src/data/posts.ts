import { AUTHOR } from './site';

/**
 * Blog posts.
 *
 * Every post follows the same shape: an H2 that is a real question, and a
 * `answer` sentence that resolves it before any expansion. `answer` is what
 * gets lifted into an AI summary, so it must stand alone without the
 * surrounding paragraphs.
 */

export interface PostSection {
  /** Phrased as a question a person would actually type. */
  heading: string;
  /** Self-contained answer. First thing under the heading, always. */
  answer: string;
  /** Supporting paragraphs. */
  body?: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** Meta description / card summary. */
  excerpt: string;
  /** Lead paragraph, written to be quotable. */
  intro: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  sections: PostSection[];
  /** Optional closing call to action. */
  closing?: string;
}

export const posts: Post[] = [
  {
    slug: 'does-time-heal-all-wounds',
    title: 'Does Time Heal All Wounds? What Five Years of Writing About Trauma Taught Me',
    excerpt:
      'Time reduces the intensity of emotion but does not resolve the beliefs a wound creates. Here is the difference between moving on and healing, and why the distinction matters.',
    intro:
      '“Time heals all wounds” is one of the most repeated pieces of comfort we offer people in pain — and one of the least accurate. Time changes your distance from an event. It does not, on its own, change what that event taught you about yourself.',
    datePublished: '2026-09-17',
    author: AUTHOR.name,
    readingMinutes: 6,
    tags: ['emotional healing', 'childhood trauma', 'grief', 'intentional healing'],
    sections: [
      {
        heading: 'Does time heal emotional wounds?',
        answer:
          'Time can reduce the intensity of some emotions, but simply waiting does not necessarily resolve the beliefs, behaviours or triggers created by a traumatic experience. Healing often requires acknowledging the wound and intentionally working through its effects.',
        body: [
          'What time reliably does is create distance. The event stops being the first thing you think about each morning. You stop retelling it. People around you stop asking.',
          'What time does not do is revisit the conclusion you drew in the moment the wound was made. If a childhood experience taught you that you were not worth defending, that lesson does not expire on a schedule. It simply goes quiet, and then surfaces later as a reaction that feels disproportionate to whatever just happened.',
        ],
      },
      {
        heading: 'What is the difference between moving on and healing?',
        answer:
          'Moving on means the event is no longer part of your daily life. Healing means the event no longer governs your reactions. You can have the first without the second, and most people do.',
        body: [
          'Moving on is measured externally: a new job, a new relationship, a new city, years elapsed. Healing is measured internally, by how much power the memory still holds over your present decisions.',
          'A useful test: when something small touches the old wound, is your response proportionate to what just happened, or to what happened years ago? If the second, the wound is still open — regardless of how much time has passed.',
        ],
      },
      {
        heading: 'How do you heal emotional wounds intentionally?',
        answer:
          'Intentional healing means naming the wound specifically, identifying the belief it created, and then testing that belief against present evidence — usually with support, whether from a therapist, a trusted community, or structured reflection.',
        body: [
          'The word that matters is intentional. Healing is work you schedule, not weather you wait out.',
          'That work is rarely dramatic. It looks like noticing a pattern, tracing it back honestly, and choosing a different response while the old one is still louder. It often needs a professional, because the beliefs formed in a wound are the hardest ones to see from inside.',
        ],
      },
      {
        heading: 'Why do Caribbean families struggle to talk about emotional pain?',
        answer:
          'Many Caribbean families hold a strong cultural value around endurance — the idea that hardship is carried privately and survived rather than discussed. That resilience is real and protective, but it can leave no accepted language for naming an injury while it is still fresh.',
        body: [
          'There is often a spiritual dimension too: pain is brought to prayer, which offers genuine comfort, and the conversation can end there rather than continuing into practical support.',
          'Faith and therapy are not competitors. Prayer can carry you through a night; it does not replace the work of examining what a wound taught you. Holding both is not a contradiction.',
        ],
      },
      {
        heading: 'Can childhood trauma still affect you as an adult?',
        answer:
          'Yes. Childhood experiences shape core beliefs about safety, worth and belonging, and those beliefs continue operating in adulthood until they are examined. Professional success does not overwrite them.',
        body: [
          'This is the part people find hardest to accept, particularly high-achieving people. A career, a family and a public reputation can all coexist with a belief formed at eight years old that you are fundamentally not enough.',
          'The achievement is often built on top of the wound rather than instead of it — which is why arriving at the goal so rarely produces the relief that was expected.',
        ],
      },
    ],
    closing:
      'Time Does Not Heal explores these questions through lived experience rather than theory — childhood trauma, the end of a marriage, and the death of a father.',
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

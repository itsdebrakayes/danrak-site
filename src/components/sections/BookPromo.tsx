import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOK } from '@/data/site';
import { formatDate } from '@/lib/date';
import coverCutout from '@/assets/time-does-not-heal-cover-cutout.png';

/**
 * Dismissible promo for the memoir, floating at the bottom-left of the home
 * page.
 *
 * The badge text is derived rather than hard-coded: until the audiobook is
 * actually out it advertises the release date, and flips to "Now in audiobook"
 * by itself once `audiobookLive` is set. Claiming it exists before 28
 * September would just be wrong.
 *
 * Dismissal is remembered per browser, so it asks once rather than every time
 * someone returns.
 */

const DISMISS_KEY = 'danrak.bookPromo.dismissed';

const BookPromo = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // Private browsing can throw on access; showing the promo is the safe default.
    }
    if (dismissed) return;
    // Let the hero land first rather than competing with it.
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* nothing to do */
    }
  };

  if (!visible) return null;

  const badge = BOOK.audiobookLive
    ? 'Now in audiobook'
    : `Audiobook ${formatDate(BOOK.audiobookReleaseDate).replace(/ \d{4}$/, '')}`;

  return (
    <div
      /*
        Bottom-right and lifted clear of the chrome: the desktop footer is
        fixed at bottom-0 with the DKS credit on the left and the social icons
        on the right, so bottom-24 sits above both. Kept smaller and lower on
        phones, where a 16rem card would cover the hero's own buttons.
      */
      className="promo-enter fixed bottom-4 right-3 z-[70] w-[9.5rem] sm:bottom-32 sm:right-6 sm:w-[16rem]"
      style={{ paddingBottom: 'var(--safe-b)' }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute -right-1 -top-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-sm leading-none text-neutral-600 shadow-md transition-colors hover:text-brand-crimson dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300"
      >
        <span aria-hidden>✕</span>
      </button>

      <Link to="/time-does-not-heal" className="group block" aria-label={`${BOOK.title} — ${badge}`}>
        {/* Oval sticker, angled like a price tag. */}
        <span className="absolute -left-2 top-3 z-10 -rotate-[14deg] rounded-full bg-brand-crimson px-2.5 py-1.5 text-center text-[0.55rem] font-bold uppercase leading-tight tracking-wider text-white shadow-lg ring-2 ring-white/70 sm:-left-3 sm:top-5 sm:px-4 sm:py-2 sm:text-[0.72rem] dark:ring-white/20">
          {badge}
        </span>

        <img
          src={coverCutout}
          alt={`${BOOK.title} by ${BOOK.author}`}
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
          className="promo-float w-full drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.04]"
        />

        <span className="mt-1 block text-center text-[0.68rem] font-semibold text-foreground/80 group-hover:text-brand-ocean sm:mt-2 sm:text-[0.82rem]">
          Read about the book →
        </span>
      </Link>
    </div>
  );
};

export default BookPromo;

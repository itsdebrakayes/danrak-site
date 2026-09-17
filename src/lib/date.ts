/**
 * Formats an ISO date (YYYY-MM-DD) for display.
 *
 * `new Date('2026-09-28')` is parsed as UTC midnight, so formatting it in a
 * timezone behind UTC renders the previous day — which silently turned the
 * audiobook release date into 27 September. Formatting in UTC keeps a
 * date-only value meaning the same thing everywhere it is displayed.
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

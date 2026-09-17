import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Reads the viewport synchronously on first render.
 *
 * The previous version initialised to `undefined` and only resolved inside an
 * effect, so phones rendered the desktop tree for one frame before swapping.
 * That flash is also what breaks prerendered markup, since the server-rendered
 * HTML and the first client render disagreed.
 */
function getIsMobile(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

/** Generic breakpoint query, for cases that aren't just phone-vs-desktop. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  )

  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener("change", onChange)
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

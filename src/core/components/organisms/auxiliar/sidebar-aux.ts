/**
 * Determines if a given href matches or is a parent of the current pathname
 *
 * @param href - The reference path to compare against
 * @param pathname - The current pathname to check
 * @returns `true` if href matches pathname exactly, or if pathname starts with href (excluding root path case)
 */
export function sidebarLinkMatch(href: string, pathname: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href)
}

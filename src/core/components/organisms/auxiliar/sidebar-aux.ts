export function sidebarLinkMatch(href: string, pathname: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

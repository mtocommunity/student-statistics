import { LuBookmarkCheck, LuLayoutDashboard } from "react-icons/lu"

// Links
interface HeaderLink {
  svg: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

export const sidebarLinks: HeaderLink[] = [
  {
    svg: LuLayoutDashboard,
    href: "/",
    label: "Dashboard",
  },
  {
    svg: LuBookmarkCheck,
    href: "/semesters",
    label: "Ciclos",
  },
]

import { TbBookmark, TbLayoutDashboard } from "react-icons/tb"

// Links
interface HeaderLink {
  svg: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

export const sidebarLinks: HeaderLink[] = [
  {
    svg: TbLayoutDashboard,
    href: "/",
    label: "Dashboard",
  },
  {
    svg: TbBookmark,
    href: "/semesters",
    label: "Ciclos",
  },
]

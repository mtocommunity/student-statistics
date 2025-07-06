import type { SVGComponent } from "@/core/types/assets-types";
import Dashboard from "@assets/svg/lu-dashboard.svg";

// Links
interface HeaderLink {
  svg: SVGComponent;
  href: string;
  label: string;
}

export const sidebarLinks: HeaderLink[] = [
  {
    svg: Dashboard,
    href: "/",
    label: "Dashboard",
  },
];

import type { SVGComponent } from "@/core/types/assets-types";
import Book from "@assets/svg/lu-book.svg";
import BookmarkCheck from "@assets/svg/lu-bookmark-check.svg";
import ClipboardPenLine from "@assets/svg/lu-clipboard-pen-line.svg";
import Dashboard from "@assets/svg/lu-dashboard.svg";
import GraduationCap from "@assets/svg/lu-graduation-cap.svg";

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
  {
    svg: BookmarkCheck,
    href: "/semesters",
    label: "Ciclos",
  },
  {
    svg: Book,
    href: "/courses",
    label: "Cursos",
  },
  {
    svg: ClipboardPenLine,
    href: "/exams",
    label: "Exámenes",
  },
  {
    svg: GraduationCap,
    href: "/students",
    label: "Estudiantes",
  },
];

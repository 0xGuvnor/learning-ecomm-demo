"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const guestRoutes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/search" },
];

const teacherRoutes = [
  { icon: List, label: "Courses", href: "/teacher/courses" },
  { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
];

const SidebarRoutes = ({ setOpen }: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem key={route.href} setOpen={setOpen} {...route} />
      ))}
    </div>
  );
};
export default SidebarRoutes;

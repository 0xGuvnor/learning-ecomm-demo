"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/chapter");

  return (
    <div className="ml-auto flex gap-2">
      {isTeacherPage || isPlayerPage ? (
        <Button size={"sm"} variant={"ghost"} asChild>
          <Link href={"/"}>
            <LogOut className="mr-1 h-4 w-4" />
            Exit
          </Link>
        </Button>
      ) : (
        <Button size={"sm"} variant={"ghost"} asChild>
          <Link href="/teacher/courses">Teacher Mode</Link>
        </Button>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default NavbarRoutes;

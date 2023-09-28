"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchInput from "./search-input";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses");
  const isSearchPage = pathname.startsWith("/search");

  return (
    <>
      {isSearchPage && (
        <div className={cn("hidden", "md:block")}>
          <SearchInput />
        </div>
      )}

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
            <Link href="/teacher/courses">Enter Teacher Mode</Link>
          </Button>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
export default NavbarRoutes;

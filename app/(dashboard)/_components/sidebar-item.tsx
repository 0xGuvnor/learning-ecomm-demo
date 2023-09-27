"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ setOpen, icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={"link"}
      onClick={setOpen ? () => setOpen((prev) => !prev) : () => {}}
      asChild
      className={cn(
        "h-auto justify-start rounded-none px-0 py-0 pl-6 font-medium text-foreground transition-all duration-300 ease-in-out",
        "hover:bg-primary/20 focus-visible:rounded-md focus-visible:ring-foreground",
        isActive &&
          "group bg-primary/20 text-foreground decoration-primary-foreground hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary",
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-1 py-4">
          <Icon
            size={22}
            className={cn(
              "text-foreground transition-all duration-300 ease-in-out",
              isActive && "group-hover:text-primary-foreground",
            )}
          />
          {label}
        </div>

        <div
          className={cn(
            "ml-auto h-full border-2 border-primary opacity-0 transition-all",
            isActive && "opacity-100",
          )}
        ></div>
      </Link>
    </Button>
  );
};
export default SidebarItem;

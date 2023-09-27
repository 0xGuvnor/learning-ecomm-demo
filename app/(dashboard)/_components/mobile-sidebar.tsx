"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { useState } from "react";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn("pr-4 transition-all", "hover:opacity-75", "md:hidden")}
      >
        <Menu />
      </SheetTrigger>

      <SheetContent forceMount className="p-0">
        <Sidebar setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;

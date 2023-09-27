"use client";

import { Dispatch, SetStateAction } from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";

interface Props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setOpen }: Props) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-background shadow-sm">
      <Link
        href={"/"}
        onClick={setOpen ? () => setOpen((prev) => !prev) : () => {}}
        className="h-20 p-6"
      >
        <Logo />
      </Link>

      <div className="flex w-full flex-col">
        <SidebarRoutes setOpen={setOpen} />
      </div>
    </div>
  );
};
export default Sidebar;

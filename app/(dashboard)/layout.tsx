import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className={cn("fixed left-0 top-0 h-20 w-full", "md:pl-56")}>
        <Navbar />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 hidden h-full w-56 flex-col",
          "md:flex",
        )}
      >
        <Sidebar />
      </div>

      <main className="h-full pt-20 md:pl-56">{children}</main>
    </div>
  );
};
export default DashboardLayout;

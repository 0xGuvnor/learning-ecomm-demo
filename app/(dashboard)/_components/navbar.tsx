import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="flex h-full items-center border-b bg-background p-4 shadow-sm ">
      <MobileSidebar />
      <NavbarRoutes />
    </nav>
  );
};
export default Navbar;

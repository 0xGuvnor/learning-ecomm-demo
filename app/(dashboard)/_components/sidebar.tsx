import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-black/10 bg-background shadow-sm">
      <div className="h-20 p-6">
        <Logo />
      </div>

      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
export default Sidebar;

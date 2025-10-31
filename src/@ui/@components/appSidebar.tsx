import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "../../components/ui/sidebar";
import { LayoutDashboard, Settings, User } from "lucide-react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const active = location.pathname;

  return (
    <Sidebar
      collapsible="icon"
      className={cn("transition-all duration-300", collapsed ? "w-10" : "w-64")}
    >
      <SidebarHeader className = {!collapsed ? "flex flex-row justify-between" : ""}>
        <div className="font-bold">OMS</div>
        <SidebarTrigger className="self-end hover:bg-gray-400 hover:text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
          <NavLink to="/dashboard">
            <SidebarGroupContent
              className={cn(
                "flex items-center gap-3 p-2 rounded-md  transition",
                active === "/dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-gray-400 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </SidebarGroupContent>
          </NavLink>
          <NavLink to="/profile">
            <SidebarGroupContent
              className={cn(
                "flex items-center gap-3 p-2 rounded-md  transition",
                active === "/profile"
                  ? "bg-black text-white"
                  : "hover:bg-gray-400 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <User size={20} />
              {!collapsed && <span>My profile</span>}
            </SidebarGroupContent>
          </NavLink>
          <NavLink to="/settings">
            <SidebarGroupContent
              className={cn(
                "flex items-center gap-3 p-2 rounded-md  transition",
                active === "/settings"
                  ? "bg-black text-white"
                  : "hover:bg-gray-400 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </SidebarGroupContent>
          </NavLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-center text-gray-400">
        {!collapsed && <span className="text-xs">Version 0.0.1</span>}
        {collapsed && <span className="text-xs">0.0.1</span>}
      </SidebarFooter>
    </Sidebar>
  );
}

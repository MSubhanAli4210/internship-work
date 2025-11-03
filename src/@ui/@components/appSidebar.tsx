import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../../components/ui/sidebar";
import { ChevronUp, LayoutDashboard, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const active = location.pathname;

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300"
    >
      <SidebarHeader
        className={!collapsed ? "flex flex-row justify-between" : ""}
      >
        <div className="font-bold">OMS</div>
        <SidebarTrigger className="self-end hover:bg-gray-400 hover:text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
          <NavLink to="/dashboard">
            <SidebarGroupContent
              className={cn(
                "flex items-center gap-3 p-2 rounded-md  transition"
                ,
                active === "/dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-gray-400 hover:text-white"
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
                  : "hover:bg-gray-400 hover:text-white"
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
                  : "hover:bg-gray-400 hover:text-white"
              )}
            >
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </SidebarGroupContent>
          </NavLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User size={20} />
                  Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={collapsed ? "right" : "top"}
                className={cn(
                  "w-50 p-5 rounded-2xl bg-gray-100 self-left shadow-md ",
                  collapsed && "mb-12 ml-1 w-auto"
                )}
              >
                <NavLink to="/profile">
                  <DropdownMenuItem
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md  transition text-xs w-full",
                      active === "/profile"
                        ? "bg-black text-white"
                        : "hover:bg-gray-400 hover:text-white"
                    )}
                  >
                    <User size={20} />
                    <span>My profile</span>
                  </DropdownMenuItem>
                </NavLink>
                <NavLink to="/settings">
                  <DropdownMenuItem
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md  transition text-xs w-full",
                      active === "/settings"
                        ? "bg-black text-white"
                        : "hover:bg-gray-400 hover:text-white"
                    )}
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </NavLink>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="text-center text-gray-400">
          {!collapsed && <span className="text-xs">Version 0.0.1</span>}
          {collapsed && <span className="text-xs">0.0.1</span>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

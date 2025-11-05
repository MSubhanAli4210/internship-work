import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../@components/appSidebar";

export function AuthLayout() {
  return (
    <>
      <div
        className="
          flex
          justify-center
        "
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger
            className="
              absolute top-1 left-1
              sm:block
              md:hidden
            "
          />
          <main
            className="
              w-full
              p-5 pt-10
              md:p-10
            "
          >
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}

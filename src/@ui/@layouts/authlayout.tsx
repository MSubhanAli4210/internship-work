import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger} from "../../components/ui/sidebar";
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
          <SidebarTrigger className=" sm:block md:hidden" />
          <main className="w-full md:p-10  p-10 pl-4">
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}

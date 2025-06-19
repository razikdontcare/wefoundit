import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="background-3">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

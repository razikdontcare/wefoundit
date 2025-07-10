import type { Route } from "./+types/dashboard-layout";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";

async function dummyData() {
  return {
    email: "name@example.com",
    name: "Krisna Federico Utami",
    avatar: "https://avatars.githubusercontent.com/u/42261380?v=4",
  };
}

export async function loader() {
  const user = await dummyData();
  return { user };
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="background-3">
        <Outlet context={loaderData} />
      </SidebarInset>
    </SidebarProvider>
  );
}

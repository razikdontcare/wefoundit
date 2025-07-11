import type { Route } from "./+types/dashboard-layout";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { redirect } from "react-router";
import axios from "axios";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/auth/me",
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    // If the user is not authenticated, redirect to the login page
    return redirect("/auth");
  }
  return response.data.data;
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="background-3">
        <Outlet context={user} />
      </SidebarInset>
    </SidebarProvider>
  );
}

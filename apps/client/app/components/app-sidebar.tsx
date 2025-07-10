import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import {
  LayoutDashboard,
  BadgeInfo,
  MessageSquare,
  UserPen,
  UserCog,
  ClipboardList,
  Home,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { NavUser } from "./nav-user";
import { useLocation } from "react-router";
import { useAuth } from "~/hooks/useSession";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  const defineUrl = (path: string) => {
    return pathname === path ? "#" : path;
  };

  const data = {
    navMain: [
      {
        title: "General",
        url: "#",
        items: [
          {
            title: "Dashboard",
            url: defineUrl("/dashboard"),
            icon: LayoutDashboard,
            isActive: isActive("/dashboard"),
          },
          {
            title: "Status Laporan",
            url: defineUrl("/dashboard/reports"),
            icon: BadgeInfo,
            isActive: isActive("/dashboard/reports"),
          },
          {
            title: "Chats",
            url: "/chats",
            icon: MessageSquare,
            isActive: isActive("/dashboard/chats"),
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        items: [
          {
            title: "Account",
            url: defineUrl("/dashboard/settings/account"),
            icon: UserPen,
            isActive: isActive("/dashboard/settings/account"),
          },
        ],
      },
      {
        title: "Admin",
        url: "#",
        items: [
          {
            title: "Kelola User",
            url: defineUrl("/dashboard/admin/users"),
            icon: UserCog,
            isActive: isActive("/dashboard/admin/users"),
          },
          {
            title: "Kelola Laporan",
            url: defineUrl("/dashboard/admin/reports"),
            icon: ClipboardList,
            isActive: isActive("/dashboard/admin/reports"),
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm /> */}
        <Button asChild variant={"ghost"}>
          <Link to={"/"}>
            <Home />
            Back to Homepage
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive ?? false}
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

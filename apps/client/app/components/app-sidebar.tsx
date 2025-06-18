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

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "General",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Status Laporan",
          url: "#",
          icon: BadgeInfo,
        },
        {
          title: "Chats",
          url: "#",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Account",
          url: "#",
          icon: UserPen,
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      items: [
        {
          title: "Kelola User",
          url: "#",
          icon: UserCog,
        },
        {
          title: "Kelola Laporan",
          url: "#",
          icon: ClipboardList,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser
          user={{
            name: "rikadoescare",
            email: "rikautamii23@gmail.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

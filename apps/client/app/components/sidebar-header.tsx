import React from "react";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import DarkModeToggle from "./toggleTheme";
import { Link } from "react-router";
import { ClipboardPlus } from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { EllipsisIcon } from "lucide-react";
import useTheme from "~/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

type SidebarHeaderProps = {
  breadcrumbLinks: {
    href?: string;
    label: string;
  }[];
};

export default function SidebarHeader({ breadcrumbLinks }: SidebarHeaderProps) {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbLinks.map((link, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbLinks.length - 1 ? (
                    <BreadcrumbPage>{link.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={link.href}>
                      {link.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbLinks.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
            {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">General</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {!isMobile ? (
        <div className="flex items-center gap-5">
          <DarkModeToggle />
          <Button asChild className="btn-primary">
            <Link to={"/submit"}>
              {" "}
              <ClipboardPlus />
              <span>Laporan Baru</span>
            </Link>
          </Button>
        </div>
      ) : (
        <Menubar className="bg-transparent border-none">
          <MenubarMenu>
            <MenubarTrigger className="bg-transparent">
              <EllipsisIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={toggleTheme}>
                <span className="flex items-center">
                  {theme === "light" ? (
                    <Moon className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Sun className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  <span className="ml-2">Ganti Tema</span>
                </span>
              </MenubarItem>
              <MenubarItem>
                <Link to={"/submit"} className="flex items-center">
                  <ClipboardPlus className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="ml-2">Laporan Baru</span>
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </header>
  );
}

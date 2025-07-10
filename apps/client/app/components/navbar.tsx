import DarkModeToggle from "./toggleTheme";
import SearchBar from "./search-bar";
import BetIcon from "./icons/bet";
import { Link, useLocation, useNavigate } from "react-router";
import { useIsMobile } from "~/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useAuth } from "../hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathname = location.pathname;
  const { user, loading, logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const links = [
    { href: "/", label: "Home", isActive: isActive("/") },
    { href: "/browse", label: "Browse", isActive: isActive("/browse") },
  ];

  return (
    <>
      <div className="container max-w-7xl flex items-center justify-between p-4 primary-text mx-auto">
        <div className="flex items-center md:gap-5 w-full">
          <a href="/" className="text-xl md:text-3xl flex items-center">
            We<span className="font-bold">Found</span>It
          </a>
          <DarkModeToggle />
        </div>

        <div className="items-center hidden lg:flex">
          <SearchBar onSearch={(query) => navigate(`/search?q=${query}`)} />
        </div>
        <div className="items-center justify-end font-bold text-base gap-8 w-full hidden lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="hover:text-primary transition-colors text-nowrap"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Menubar className="bg-transparent border-none focus:bg-transparent w-fit">
                <MenubarMenu>
                  <MenubarTrigger className="bg-transparent border-none focus:bg-transparent cursor-pointer">
                    <Avatar>
                      <AvatarImage src={user.photo_url} />
                      <AvatarFallback className="bg-primary text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent>
                    <div className="flex items-center text-sm px-2 pb-5 pt-2">
                      <Avatar className="size-12 mr-3">
                        <AvatarImage src={user.photo_url} />
                        <AvatarFallback className="bg-primary text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-xs">{user.email}</span>
                      </div>
                    </div>
                    <MenubarItem>
                      <Link to="/dashboard/settings/account" className="w-full">
                        Akun Saya
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/dashboard/reports" className="w-full">
                        Laporan Saya
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem variant="destructive" onClick={logout}>
                      Logout
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </>
          ) : (
            <Link
              to="/auth"
              className="hover:text-primary transition-colors text-nowrap"
            >
              Sign In
            </Link>
          )}
          <Link
            to={user ? "/laporan" : "/auth"}
            className="pl-2 pr-4 py-2 border border-primary text-primary rounded-lg text-sm/4 uppercase tracking-widest flex items-center gap-2"
          >
            <BetIcon />
            Submit
          </Link>
        </div>
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="w-[20rem]">
            <SheetHeader>
              <SheetTitle className="mb-5">Menu</SheetTitle>
              <SearchBar onSearch={(query) => navigate(`/search?q=${query}`)} />
              <div className="flex flex-col text-center mt-2 font-bold text-base gap-1 w-full">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`hover:text-primary transition-colors rounded-md p-2 ${
                      link.isActive && "bg-primary hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <span className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {user.name}
                    </span>
                    <button
                      onClick={logout}
                      className="mt-2 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="hover:text-primary transition-colors text-nowrap mt-2"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/laporan"
                  className="pl-2 pr-4 py-2 mt-2 border border-primary text-primary rounded-lg text-sm/4 uppercase tracking-widest flex items-center gap-2"
                >
                  <BetIcon />
                  Submit
                </Link>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

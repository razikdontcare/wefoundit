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
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
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
            to="/laporan"
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

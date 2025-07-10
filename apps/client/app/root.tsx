import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Navbar from "./components/navbar";
import { Button } from "./components/ui/button";
import { useIsMobile } from "./hooks/use-mobile";

import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "500";
  let submessage = "Oops! Something went wrong :')";
  let details = "We apologize for the inconvenience.+Please try again later.";
  let stack: string | undefined;

  const isMobile = useIsMobile();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        message = "404";
        submessage = "Page Not Found";
        details =
          "The page you are looking for does not exist.+Please check the URL and try again.";
        break;
      case 403:
        message = "403";
        submessage = "Access Forbidden";
        details = "You don't have necessary permission+to view this resource.";
        break;
      case 401:
        message = "401";
        submessage = "Unauthorized Access";
        details =
          "Please log in with the appropriate credentials+to access this resource.";
        break;
      case 503:
        message = "503";
        submessage = "Website is under maintenance!";
        details =
          "The site is not available at the moment.+We'll be back online shortly.";
        break;
      default:
        message = "500";
        submessage = "Oops! Something went wrong :')";
        details = "We apologize for the inconvenience.+Please try again later.";
        break;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      {!isMobile && <Navbar />}
      <main className="container mx-auto max-w-7xl flex flex-col items-center justify-center h-[calc(100vh-72px)] text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{message}</h1>
        <p className="text-sm md:text-lg mb-4 font-bold">{submessage}</p>
        <p className="mb-2 text-xs md:text-base">
          {details.split("+").map((v) => (
            <span key={v} className="block">
              {v}
            </span>
          ))}
        </p>
        <Button asChild className="mt-4">
          <Link to={"/"} className="text-xs md:text-base">
            Back to Home
          </Link>
        </Button>
      </main>
    </>
  );
}

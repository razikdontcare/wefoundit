import Navbar from "~/components/navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

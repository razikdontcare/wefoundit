import Navbar from "~/components/navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

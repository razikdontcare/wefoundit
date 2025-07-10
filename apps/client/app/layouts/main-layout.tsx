import Navbar from "~/components/navbar";
import { Outlet } from "react-router";
import Footer from "~/components/footer";
import { AuthProvider } from "../hooks/useSession";

export default function MainLayout() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <nav>
          <Navbar />
        </nav>
        <main className="flex-grow">
          <Outlet />
        </main>
        <footer className="border-t border-white">
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  );
}

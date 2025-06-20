import type { Route } from "./+types/home";
import DarkModeToggle from "~/components/toggleTheme";
import SidebarHeader from "~/components/sidebar-header";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ClipboardPlus } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "General" },
  { label: "Dashboard" },
];

export default function Dashboard() {
  return (
    <>
      <SidebarHeader breadcrumbLinks={breadcrumbLinks} />
      <main className="container mx-auto h-full flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center flex-col max-w-2xl gap-2">
          <h1 className="font-bold text-2xl text-center">
            Welcome back, rikadoescare!
          </h1>
          <p className="text-center">
            Lihat dan kelola laporan barang hilang atau ditemukan yang telah
            kamu buat. Tetap terhubung dan bantu proses pencarian lebih cepat.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center box-primary px-5 py-8 mt-5 rounded-md">
          <div className="w-full flex items-center gap-5">
            <span className="min-w-40">Report Submitted</span>
            <span className="w-full">: 5</span>
          </div>
          <div className="w-full flex items-center gap-5">
            <span className="min-w-40">Last Report</span>
            <span className="w-full">: 2 days ago</span>
          </div>
        </div>
        <Button asChild className="btn-primary">
          <Link to={"/submit"}>
            {" "}
            <ClipboardPlus />
            <span>Laporan Baru</span>{" "}
          </Link>
        </Button>
      </main>
    </>
  );
}

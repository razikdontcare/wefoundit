import type { Route } from "./+types/home";
import SidebarHeader from "~/components/sidebar-header";
import { Button } from "~/components/ui/button";
import { Link, useOutletContext } from "react-router";
import { ClipboardPlus } from "lucide-react";
import type { User } from "~/hooks/useSession";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "General" },
  { label: "Dashboard" },
];

export async function clientLoader({ request }: Route.LoaderArgs) {
  const userResponse = await axios.get("http://localhost:5000/api/auth/me", {
    withCredentials: true,
  });
  if (userResponse.status !== 200) {
    throw new Error("User not authenticated");
  }
  const user = userResponse.data.data;
  const response = await axios.get(
    "http://localhost:5000/api/reports?created_by=" + user.id,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch reports");
  }
  return response.data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = useOutletContext<User>();
  const reports = loaderData as any[];
  return (
    <>
      <SidebarHeader breadcrumbLinks={breadcrumbLinks} />
      <main className="container mx-auto max-w-xs md:max-w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center flex-col max-w-2xl gap-2">
          <h1 className="font-bold text-xl md:text-2xl text-center">
            Welcome back, {user.name}!
          </h1>
          <p className="text-center text-xs md:text-base">
            Lihat dan kelola laporan barang hilang atau ditemukan yang telah
            kamu buat. Tetap terhubung dan bantu proses pencarian lebih cepat.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center box-primary px-5 py-8 mt-5 rounded-md text-xs md:text-base">
          <div className="w-full flex items-center gap-5">
            <span className="min-w-40">Report Submitted</span>
            <span className="w-full">: {reports.length}</span>
          </div>
          <div className="w-full flex items-center gap-5">
            <span className="min-w-40">Last Report</span>
            <span className="w-full">
              :{" "}
              {reports.length > 0
                ? formatDistanceToNow(
                    new Date(
                      reports.sort(
                        (a, b) =>
                          new Date(a.created_at).getTime() -
                          new Date(b.created_at).getTime()
                      )[0].created_at
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )
                : "-"}
            </span>
          </div>
        </div>
        <Button asChild className="btn-primary text-xs md:text-base">
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

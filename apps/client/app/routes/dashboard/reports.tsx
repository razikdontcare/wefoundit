import type { Route } from "./+types/reports";
import SidebarHeader from "~/components/sidebar-header";
import { DataTable, reportColumns } from "~/components/tables";
import type { Report } from "~/types/reports";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "General" },
  { label: "Status Laporan" },
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

export default function Reports({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <>
      <SidebarHeader breadcrumbLinks={breadcrumbLinks} />
      <main className="flex flex-col m-10 gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="font-bold text-3xl">Status Laporan</h1>
          <p>
            Lihat dan kelola laporan barang hilang atau ditemukan yang telah
            kamu buat. Tetap terhubung dan bantu proses pencarian lebih cepat.
          </p>
        </div>
        <DataTable
          columns={reportColumns}
          data={data}
          filterPlaceholder="Search Reports..."
        />
      </main>
    </>
  );
}

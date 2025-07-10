import type { Route } from "./+types/reports";
import SidebarHeader from "~/components/sidebar-header";
import { DataTable, reportColumns } from "~/components/tables";
import type { Report } from "~/types/reports";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "Admin" },
  { label: "Kelola Laporan" },
];

export async function clientLoader({ request }: Route.LoaderArgs) {
  const response = await axios.get("http://localhost:5000/api/reports", {
    withCredentials: true,
  });
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
          <h1 className="font-bold text-3xl">Kelola Laporan</h1>
          <p>
            Tinjau dan kelola semua laporan kehilangan dan penemuan yang dikirim
            oleh pengguna.
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

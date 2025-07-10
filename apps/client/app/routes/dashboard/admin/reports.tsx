import type { Route } from "./+types/reports";
import DarkModeToggle from "~/components/toggleTheme";
import SidebarHeader from "~/components/sidebar-header";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ClipboardPlus } from "lucide-react";
import { DataTable, reportColumns } from "~/components/tables";
import type { Report } from "~/types/reports";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "Admin" },
  { label: "Kelola Laporan" },
];

async function dummyData(): Promise<Report[]> {
  return [
    {
      id: "102505140002",
      name: "MeowPhone 7",
      variant: "found",
      status: "unclaimed",
    },
    {
      id: "102505140003",
      name: "Charger Xiaomi 65W",
      variant: "found",
      status: "unclaimed",
    },
    {
      id: "202505140001",
      name: "Buku Gambar",
      variant: "lost",
      status: "notfound",
    },
    {
      id: "102505140001",
      name: "Earbuds Hitam",
      variant: "found",
      status: "claimed",
    },
    {
      id: "202505140002",
      name: "Totebag Indomaret",
      variant: "lost",
      status: "found",
    },
  ];
}

export async function loader() {
  const data = await dummyData();
  return { data };
}

export default function Reports({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
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

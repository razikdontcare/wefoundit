import type { Route } from "./+types/users";
import DarkModeToggle from "~/components/toggleTheme";
import SidebarHeader from "~/components/sidebar-header";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ClipboardPlus } from "lucide-react";
import { DataTable, userColumns } from "~/components/tables";
import type { User } from "~/types/users";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "Admin" },
  { label: "Kelola Users" },
];

async function dummyData(): Promise<User[]> {
  return [
    {
      id: "102505140002",
      name: "PPP",
      email: "user@email.com",
      role: "user",
      phone: "081234567890",
      status: "active",
    },
    {
      id: "102505140003",
      name: "PPPPPPP",
      email: "userrrrr@email.com",
      role: "user",
      status: "inactive",
    },
    {
      id: "102505140001",
      name: "Admin",
      email: "admin@email.com",
      role: "admin",
      status: "active",
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
          <h1 className="font-bold text-3xl">Kelola User</h1>
          <p>
            Pantau dan kelola seluruh akun pengguna dalam sistem. Anda dapat
            memperbarui informasi, menonaktifkan akun, atau menghapus pengguna.
          </p>
        </div>
        <DataTable
          columns={userColumns}
          data={data}
          filterPlaceholder="Search Users..."
        />
      </main>
    </>
  );
}

import type { Route } from "./+types/users";
import SidebarHeader from "~/components/sidebar-header";
import { DataTable, userColumns } from "~/components/tables";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "Admin" },
  { label: "Kelola Users" },
];

export async function clientLoader({ request }: Route.LoaderArgs) {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "/api/auth/users",
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch reports");
  }

  return response.data.data;
}

export default function Reports({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
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

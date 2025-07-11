import type { ColumnDef } from "@tanstack/react-table";
import type { Report } from "~/types/reports";
import type { User } from "~/types/users";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

export const reportColumns: ColumnDef<Report>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No. Laporan",
  },
  {
    id: "name",
    accessorKey: "barang.nama_barang",
    header: "Nama Barang",
  },
  {
    id: "variant",
    accessorKey: "jenis_lap",
    header: "Jenis Barang",
    cell: ({ row }) => {
      const variant = row.original.jenis_lap;

      return (
        <span
          className={`w-full inline-block rounded-full text-center ${
            variant === "menemukan" ? "bg-secondary" : "bg-danger"
          }`}
        >
          {variant === "menemukan" ? "Found" : "Lost"}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status_lap",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_lap;

      return (
        <span
          className={`w-full inline-block rounded-full text-center ${
            status === "found" || status === "lost" ? "bg-danger" : "bg-success"
          }`}
        >
          {status === "found"
            ? "Belum Diklaim"
            : status === "lost"
            ? "Belum Ditemukan"
            : status === "claimed"
            ? "Diklaim"
            : "Ditemukan"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const selected = row.original;
      console.log(row.original);
      const navigate = useNavigate();

      let markAsLabel = "";
      let nextStatus: "lost" | "found" | "claimed" | null = null;

      if (selected.jenis_lap === "kehilangan") {
        if (selected.status_lap === "lost") {
          markAsLabel = "Ditemukan";
          nextStatus = "found";
        } else if (selected.status_lap === "founded") {
          markAsLabel = "Belum Ditemukan";
          nextStatus = "lost";
        } else if (selected.status_lap === "claimed") {
          markAsLabel = "Sudah Diklaim";
          nextStatus = null;
        }
      } else if (selected.jenis_lap === "menemukan") {
        if (selected.status_lap === "found") {
          markAsLabel = "Diklaim";
          nextStatus = "claimed";
        } else if (selected.status_lap === "claimed") {
          markAsLabel = "Belum Diklaim";
          nextStatus = "found";
        }
      }

      const handleMarkAs: React.MouseEventHandler<HTMLDivElement> = async (
        e
      ) => {
        e.preventDefault();
        if (!nextStatus) {
          toast.error("Status tidak valid untuk diperbarui.");
          return;
        }
        try {
          await axios.put(
            import.meta.env.VITE_API_URL + `/api/reports/${selected.id}`,
            { status_lap: nextStatus },
            { withCredentials: true }
          );
          toast.success("Status laporan berhasil diperbarui");
          window.location.reload();
        } catch (err) {
          toast.error("Gagal memperbarui status laporan");
        }
      };

      const handleEdit = () => {
        navigate(`/dashboard/reports/edit/${selected.id}`);
      };

      const handleDelete = async () => {
        if (!window.confirm("Yakin ingin menghapus laporan ini?")) return;
        try {
          await axios.delete(
            import.meta.env.VITE_API_URL + `/api/reports/${selected.id}`,
            {
              withCredentials: true,
            }
          );
          toast.success("Laporan berhasil dihapus");
          window.location.reload(); // Or update the table state instead of reload
        } catch (err) {
          toast.error("Gagal menghapus laporan");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleMarkAs}>
              <span>Mark as</span>
              <span
                className={`font-medium ${
                  selected.status_lap === "lost" ||
                  selected.status_lap === "found"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {markAsLabel}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit Laporan
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(selected.id);
                toast.success("No. Laporan telah disalin ke clipboard", {
                  description: `No. Laporan: ${selected.id}`,
                });
              }}
            >
              Copy No. Laporan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID User",
  },
  {
    id: "displayName",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   id: "phone",
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  {
    id: "status",
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.active;

      return (
        <span
          className={`w-full inline-block rounded-full text-center ${
            Boolean(status) ? "bg-secondary" : "bg-danger"
          }`}
        >
          {Boolean(status) ? "Active" : "Suspend"}
        </span>
      );
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return <span className="capitalize">{role}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const selected = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuItem>Reset Password</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(selected.id);
                toast.success("No. Laporan telah disalin ke clipboard", {
                  description: `No. Laporan: ${selected.id}`,
                });
              }}
            >
              Copy ID User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger">Suspend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

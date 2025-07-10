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
            variant === "penemuan" ? "bg-secondary" : "bg-danger"
          }`}
        >
          {variant === "penemuan" ? "Found" : "Lost"}
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

      let markAsLabel = "Diklaim";
      if (selected.jenis_lap === "kehilangan") {
        if (selected.status_lap === "lost") {
          markAsLabel = "Ditemukan";
        } else {
          markAsLabel = "Belum Ditemukan";
        }
      } else if (selected.jenis_lap === "penemuan") {
        if (selected.status_lap === "found") {
          markAsLabel = "Diklaim";
        } else {
          markAsLabel = "Belum Diklaim";
        }
      }

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
            <DropdownMenuItem>
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
            <DropdownMenuItem>Edit Laporan</DropdownMenuItem>
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
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
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

import type { ColumnDef } from "@tanstack/react-table";
import type { Report } from "~/types/reports";
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
    accessorKey: "name",
    header: "Nama Barang",
  },
  {
    id: "variant",
    accessorKey: "variant",
    header: "Jenis Barang",
    cell: ({ row }) => {
      const variant = row.original.variant;

      return (
        <span
          className={`w-full inline-block rounded-full text-center ${
            variant === "found" ? "bg-secondary" : "bg-danger"
          }`}
        >
          {variant === "found" ? "Found" : "Lost"}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`w-full inline-block rounded-full text-center ${
            status === "unclaimed" || status === "notfound"
              ? "bg-danger"
              : "bg-success"
          }`}
        >
          {status === "unclaimed"
            ? "Belum Diklaim"
            : status === "notfound"
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
      if (selected.variant === "lost") {
        if (selected.status === "notfound") {
          markAsLabel = "Ditemukan";
        } else {
          markAsLabel = "Belum Ditemukan";
        }
      } else if (selected.variant === "found") {
        if (selected.status === "unclaimed") {
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
                  selected.status === "notfound" ||
                  selected.status === "unclaimed"
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

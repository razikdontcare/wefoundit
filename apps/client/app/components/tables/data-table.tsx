import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterPlaceholder?: string;
  columnWidths?: Record<string, string>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterPlaceholder = "Search...",
  columnWidths,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder={filterPlaceholder}
          className="border border-text-muted rounded-md px-4 py-2 w-full max-w-xs"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border">
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <colgroup>
            {table.getHeaderGroups()[0]?.headers.map((header) => {
              const columnId = header.column.id;
              let width = columnWidths?.[columnId];

              // Set default widths based on column type
              if (!width) {
                switch (columnId) {
                  case "id":
                    width = "120px"; // Fixed width for ID
                    break;
                  case "name":
                    width = "400px"; // Takes remaining space
                    break;
                  case "variant":
                    width = "200px"; // Min width for variant
                    break;
                  case "status":
                    width = "200px"; // Min width for status
                    break;
                  case "actions":
                    width = "100px"; // Fixed width for actions
                    break;
                  case "email":
                    width = "250px"; // Fixed width for email
                    break;
                  case "phone":
                    width = "150px"; // Fixed width for phone
                    break;
                  case "role":
                    width = "150px"; // Fixed width for role
                    break;
                  case "displayName":
                    width = "200px"; // Fixed width for displayName
                    break;
                  default:
                    width = "auto";
                }
              }

              return <col key={header.id} style={{ width }} />;
            })}
          </colgroup>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center px-4 py-3"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

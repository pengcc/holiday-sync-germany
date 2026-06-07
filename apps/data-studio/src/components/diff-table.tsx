import type { DiffEntry } from "@hsg/data-core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<DiffEntry>();

const columns = [
  columnHelper.accessor("kind", {
    header: "Change",
    cell: (context) => <Status value={context.getValue()} />,
  }),
  columnHelper.accessor("recordId", {
    header: "Holiday",
    cell: (context) => {
      const entry = context.row.original;
      return (
        <strong>{entry.after?.names.de ?? entry.before?.names.de ?? context.getValue()}</strong>
      );
    },
  }),
  columnHelper.accessor((row) => formatRange(row.before), {
    id: "before",
    header: "Before",
  }),
  columnHelper.accessor((row) => formatRange(row.after), {
    id: "after",
    header: "After",
  }),
  columnHelper.accessor((row) => formatScopeChange(row), {
    id: "scope",
    header: "Scope",
  }),
  columnHelper.accessor((row) => row.changedFields.join(", ") || "—", {
    id: "fields",
    header: "Changed fields",
  }),
  columnHelper.accessor("decisionRequired", {
    header: "Review",
    cell: (context) => (context.getValue() ? "Decision required" : "Standard review"),
  }),
];

export function DiffTable({ entries }: { entries: DiffEntry[] }) {
  const table = useReactTable({
    data: entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (entries.length === 0) {
    return <p className="empty-inline">No changes from the accepted batch.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Status({ value }: { value: DiffEntry["kind"] }) {
  return <span className={`status status-${value}`}>{value}</span>;
}

function formatRange(record: DiffEntry["before"]): string {
  if (!record) {
    return "—";
  }
  return record.startDate === record.endDate
    ? record.startDate
    : `${record.startDate} to ${record.endDate}`;
}

function formatScopeChange(entry: DiffEntry): string {
  const before = entry.before
    ? `${entry.before.scope}${entry.before.regions.length ? ` (${entry.before.regions.join(", ")})` : ""}`
    : "—";
  const after = entry.after
    ? `${entry.after.scope}${entry.after.regions.length ? ` (${entry.after.regions.join(", ")})` : ""}`
    : "—";
  return before === after ? after : `${before} → ${after}`;
}

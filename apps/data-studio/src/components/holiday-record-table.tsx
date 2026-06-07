import type { HolidayRecord } from "@hsg/data-core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { filterHolidayRecords, inclusiveDayCount, type RecordFilters } from "../lib/review-model";

const columnHelper = createColumnHelper<HolidayRecord>();

const columns = [
  columnHelper.accessor((record) => record.names.de, {
    id: "name",
    header: "German name",
    cell: (context) => <strong>{context.getValue()}</strong>,
  }),
  columnHelper.accessor("startDate", { header: "Start" }),
  columnHelper.accessor("endDate", { header: "End" }),
  columnHelper.accessor((record) => inclusiveDayCount(record), {
    id: "days",
    header: "Days",
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (context) => <span className="category-label">{context.getValue()}</span>,
  }),
  columnHelper.accessor("scope", {
    header: "Scope",
    cell: (context) => (
      <span className={`status status-${context.getValue()}`}>{context.getValue()}</span>
    ),
  }),
  columnHelper.accessor((record) => record.regions.join(", ") || "—", {
    id: "regions",
    header: "Regions",
  }),
  columnHelper.accessor((record) => record.source.sourceEventId ?? "—", {
    id: "sourceEvent",
    header: "Source event",
    cell: (context) => <code className="source-event">{context.getValue()}</code>,
  }),
];

export function HolidayRecordTable({
  records,
  targetYears,
}: {
  records: HolidayRecord[];
  targetYears: number[];
}) {
  const [filters, setFilters] = useState<RecordFilters>({
    query: "",
    category: "all",
    scope: "all",
    year: "all",
  });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const filteredRecords = useMemo(() => filterHolidayRecords(records, filters), [filters, records]);
  const table = useReactTable({
    data: filteredRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <fieldset className="record-filters">
        <legend className="sr-only">Holiday record filters</legend>
        <label className="search-field">
          Name
          <span>
            <Search aria-hidden="true" />
            <input
              disabled={!hydrated}
              placeholder="Search holiday name"
              type="search"
              value={filters.query}
              onChange={(event) => setFilters({ ...filters, query: event.target.value })}
            />
          </span>
        </label>
        <label>
          Category
          <select
            disabled={!hydrated}
            value={filters.category}
            onChange={(event) =>
              setFilters({
                ...filters,
                category: event.target.value as RecordFilters["category"],
              })
            }
          >
            <option value="all">All</option>
            <option value="school">School</option>
            <option value="public">Public</option>
          </select>
        </label>
        <label>
          Scope
          <select
            disabled={!hydrated}
            value={filters.scope}
            onChange={(event) =>
              setFilters({ ...filters, scope: event.target.value as RecordFilters["scope"] })
            }
          >
            <option value="all">All</option>
            <option value="statewide">Statewide</option>
            <option value="regional">Regional</option>
            <option value="schoolSpecific">School-specific</option>
          </select>
        </label>
        <label>
          Year
          <select
            disabled={!hydrated}
            value={filters.year}
            onChange={(event) =>
              setFilters({
                ...filters,
                year: event.target.value === "all" ? "all" : Number(event.target.value),
              })
            }
          >
            <option value="all">All</option>
            {targetYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <p className="result-count" aria-live="polite">
        Showing {filteredRecords.length} of {records.length} records
      </p>
      {filteredRecords.length ? (
        <div className="table-scroll record-table">
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
                <tr key={row.original.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-inline">No holiday records match these filters.</p>
      )}
    </>
  );
}

import type { CoverageCell } from "../lib/review-model";

export function CoverageMatrix({
  cells,
  targetYears,
}: {
  cells: CoverageCell[];
  targetYears: number[];
}) {
  const jurisdictions = [...new Set(cells.map((cell) => cell.jurisdiction))];

  return (
    <div className="table-scroll coverage-table">
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>State</th>
            {targetYears.map((year) => (
              <th key={year} colSpan={2}>
                {year}
              </th>
            ))}
          </tr>
          <tr>
            {targetYears.flatMap((year) => [
              <th key={`${year}-school`}>School</th>,
              <th key={`${year}-public`}>Public</th>,
            ])}
          </tr>
        </thead>
        <tbody>
          {jurisdictions.map((jurisdiction) => (
            <tr key={jurisdiction}>
              <th scope="row">{jurisdiction}</th>
              {targetYears.flatMap((year) =>
                (["school", "public"] as const).map((category) => {
                  const cell = cells.find(
                    (item) =>
                      item.jurisdiction === jurisdiction &&
                      item.year === year &&
                      item.category === category,
                  );
                  return (
                    <td key={`${jurisdiction}-${year}-${category}`}>
                      <span
                        className={`coverage-status coverage-${cell?.status ?? "missing"}`}
                        title={cell?.sourceIds.join(", ") || "No matching batch"}
                      >
                        {cell?.status ?? "missing"}
                      </span>
                    </td>
                  );
                }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { SourceRunArtifacts } from "@hsg/data-core";

export function BatchSummary({ artifacts }: { artifacts: SourceRunArtifacts }) {
  const regionalCount = artifacts.records.filter((record) => record.scope === "regional").length;
  const schoolSpecificCount = artifacts.records.filter(
    (record) => record.scope === "schoolSpecific",
  ).length;

  return (
    <dl className="batch-summary">
      <div>
        <dt>Source document</dt>
        <dd>
          <a href={artifacts.source.homepageUrl} rel="noreferrer" target="_blank">
            {artifacts.source.name}
          </a>
        </dd>
      </div>
      <div>
        <dt>Batch period</dt>
        <dd>
          {artifacts.source.period.id} · {artifacts.source.period.startDate} to{" "}
          {artifacts.source.period.endDate}
        </dd>
      </div>
      <div>
        <dt>Records</dt>
        <dd>{artifacts.records.length}</dd>
      </div>
      <div>
        <dt>Regional records</dt>
        <dd>{regionalCount}</dd>
      </div>
      <div>
        <dt>School-specific</dt>
        <dd>{schoolSpecificCount}</dd>
      </div>
      <div>
        <dt>Retrieved</dt>
        <dd>{formatTimestamp(artifacts.fingerprint.retrievedAt)}</dd>
      </div>
      <div>
        <dt>Review by</dt>
        <dd>{artifacts.source.freshness.reviewBy}</dd>
      </div>
      <div className="summary-fingerprint">
        <dt>Source fingerprint</dt>
        <dd>
          <code title={artifacts.fingerprint.sha256}>{artifacts.fingerprint.sha256}</code>
        </dd>
      </div>
    </dl>
  );
}

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(value));
}

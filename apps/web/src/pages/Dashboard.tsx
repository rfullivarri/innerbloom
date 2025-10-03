import { useEffect, useState } from "react";

import type { HealthResponse } from "@innerbloom/shared";

import { api } from "../lib/api";

export const DashboardPage = () => {
  const [status, setStatus] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    api.getHealth().then((result) => {
      setStatus(result.data);
      setError(result.error);
    });
  }, []);

  return (
    <section>
      <h1>Innerbloom Control</h1>
      <p>All systems in one quick glance.</p>
      <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(148, 163, 184, 0.1)" }}>
        <h2>API Health</h2>
        {status ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <strong>Status:</strong> {status.status}
            </li>
            <li>
              <strong>Uptime:</strong> {status.uptime.toFixed(0)}s
            </li>
            <li>
              <strong>Timestamp:</strong> {new Date(status.timestamp).toLocaleString()}
            </li>
          </ul>
        ) : (
          <p>Loading status…</p>
        )}
        {error ? <p style={{ color: "#facc15" }}>Warning: {error}</p> : null}
      </div>
    </section>
  );
};

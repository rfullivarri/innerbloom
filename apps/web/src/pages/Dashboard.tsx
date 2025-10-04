import { useEffect, useState } from "react";

import { api } from "../lib/api";

export const DashboardPage = () => {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    api.getHealth().then((result) => {
      setError(result.error);
    });
  }, []);

  return (
    <section>
      <h1>Innerbloom Control</h1>
      <p>All systems in one quick glance.</p>
      <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(148, 163, 184, 0.1)" }}>
        <h2>API Health</h2>

        {error ? <p style={{ color: "#facc15" }}>Warning: {error}</p> : null}
      </div>
    </section>
  );
};

import { useEffect, useMemo, useState } from "react";

import { useAuth, useUser } from "@clerk/clerk-react";

import { api } from "../lib/api";
import type { HealthResponse, PingResponse } from "../lib/api";

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleString();
};

export const DashboardPage = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthError, setHealthError] = useState<string | undefined>();
  const [ping, setPing] = useState<PingResponse | null>(null);
  const [pingError, setPingError] = useState<string | undefined>();

  useEffect(() => {
    let isActive = true;

    api.getHealth().then((result) => {
      if (!isActive) return;
      setHealth(result.data);
      setHealthError(result.error);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        const token = await getToken();
        if (!isActive) return;
        if (!token) {
          setPingError("Authentication token unavailable");
          return;
        }
        const result = await api.ping(token);
        if (!isActive) return;
        setPing(result.data);
        setPingError(result.error);
      } catch (error) {
        if (!isActive) return;
        setPingError((error as Error).message);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [getToken]);

  const operatorName = useMemo(() => {
    const fallbackName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    const baseName = user?.fullName || user?.username || fallbackName;
    const trimmed = baseName?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : "Operator";
  }, [user?.firstName, user?.fullName, user?.lastName, user?.username]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-semibold text-white">Welcome back, {operatorName}</h1>
        <p className="text-sm text-slate-400">
          Mission telemetry syncs automatically when you are signed in. Your API token is used behind the scenes to talk to the
          Innerbloom API.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-inner shadow-slate-900/20">
          <h2 className="text-lg font-semibold text-white">API health</h2>
          <p className="mt-2 text-sm text-slate-400">Real-time status for the Innerbloom REST API.</p>
          <dl className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
              <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Status</dt>
              <dd className="font-semibold text-emerald-300">
                {healthError ? "degraded" : health?.status ?? "unknown"}
              </dd>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
              <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Uptime (s)</dt>
              <dd className="font-semibold text-white">{health?.uptime?.toFixed(0) ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
              <dt className="uppercase tracking-[0.3em] text-xs text-slate-500">Checked</dt>
              <dd className="font-semibold text-white">{formatTimestamp(health?.timestamp)}</dd>
            </div>
          </dl>
          {healthError ? <p className="mt-4 text-sm text-amber-300">{healthError}</p> : null}
        </article>

        <article className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/60 via-slate-950 to-indigo-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Session verification</h2>
          <p className="mt-2 text-sm text-slate-300">
            Every request to <code className="rounded bg-black/30 px-1">/v1/ping</code> is authenticated with Clerk.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
            {ping ? (
              <div className="space-y-2">
                <p className="font-semibold text-purple-200">Authenticated</p>
                <p className="text-slate-300">Clerk verified user ID: {ping.userId}</p>
              </div>
            ) : (
              <p className="text-slate-400">Requesting signed-in session…</p>
            )}
          </div>
          {pingError ? <p className="mt-4 text-sm text-amber-300">{pingError}</p> : null}
        </article>
      </div>
    </section>
  );
};

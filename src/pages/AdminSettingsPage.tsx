import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  clearSettingsCache,
  deleteScopedSetting,
  fetchAdminSettings,
  fetchBootstrapState,
  fetchSettingDefinitions,
  updateDataSourceCredentials,
  updateSettingValue
} from "../api/client";
import type { DataSourceResponse, SettingDefinitionGroup, SettingValueResponse } from "../api/types";
import { AdminSettingCard } from "../components/AdminSettingCard";
import { AdminAuditPlaceholder } from "../components/AdminAuditPlaceholder";
import { useAdminAuth } from "../hooks/useAdminAuth";

type SettingRowProps = {
  setting: SettingValueResponse;
  onSave: (value: unknown, scope?: string, scopeRef?: string | null) => Promise<void>;
  onDelete: (scope: string, scopeRef: string) => Promise<void>;
};

const SCOPE_OPTIONS = [
  { value: "global", label: "Global" },
  { value: "stream", label: "Stream" },
  { value: "microphone", label: "Microphone" }
];

function SettingRow({ setting, onSave, onDelete }: SettingRowProps) {
  const initialValue = setting.data_type === "bool" ? Boolean(setting.value) : setting.value ?? "";
  const [draft, setDraft] = useState<unknown>(initialValue);
  const [overrideScope, setOverrideScope] = useState<string>("stream");
  const [overrideRef, setOverrideRef] = useState("");
  const [overrideValue, setOverrideValue] = useState("");
  const [pendingOverride, setPendingOverride] = useState(false);
  const [overrideError, setOverrideError] = useState<string | null>(null);

  useEffect(() => {
    const nextValue = setting.data_type === "bool" ? Boolean(setting.value) : setting.value ?? "";
    setDraft(nextValue);
  }, [setting.data_type, setting.value]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!setting.editable) {
      return;
    }
    try {
      setSaving(true);
      setError(null);
      await onSave(draft);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update setting");
    } finally {
      setSaving(false);
    }
  };

  const handleOverride = async () => {
    if (!overrideRef.trim()) {
      setOverrideError("Provide a scope reference (e.g., stream ID).");
      return;
    }
    try {
      setPendingOverride(true);
      setOverrideError(null);
      await onSave(overrideValue || draft, overrideScope, overrideRef.trim());
      setOverrideValue("");
      setOverrideRef("");
    } catch (err) {
      setOverrideError(err instanceof Error ? err.message : "Failed to save override");
    } finally {
      setPendingOverride(false);
    }
  };

  const handleDeleteOverride = async () => {
    if (!setting.scope_ref || setting.scope === "global") {
      return;
    }
    try {
      setPendingOverride(true);
      await onDelete(setting.scope, setting.scope_ref);
    } catch (err) {
      setOverrideError(err instanceof Error ? err.message : "Failed to delete override");
    } finally {
      setPendingOverride(false);
    }
  };

  const renderInput = () => {
    if (setting.data_type === "bool") {
      return (
        <input
          type="checkbox"
          disabled={!setting.editable}
          checked={Boolean(draft)}
          onChange={(event) => setDraft(event.target.checked)}
        />
      );
    }
    return (
      <input
        className="w-full rounded-md border border-brand-border px-2 py-1 text-sm"
        type="text"
        disabled={!setting.editable}
        value={typeof draft === "string" ? draft : draft ?? ""}
        onChange={(event) => setDraft(event.target.value)}
      />
    );
  };

  return (
    <div className="rounded-lg border border-brand-border bg-white/80 p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-navy">{setting.label ?? setting.key}</p>
          {setting.description ? (
            <p className="text-xs text-brand-muted">{setting.description}</p>
          ) : null}
        </div>
        <div className="text-xs uppercase tracking-wide text-brand-muted">{setting.data_type}</div>
      </div>
      <div className="mt-3 flex flex-col gap-2 border-b border-dashed border-brand-border pb-3 sm:flex-row sm:items-center">
        <div className="flex-1">{renderInput()}</div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!setting.editable || saving}
            className="rounded-md bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
      {error ? <p className="mt-2 text-sm text-brand-signal-error">{error}</p> : null}

      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Scoped override</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            className="rounded-md border border-brand-border px-2 py-1 text-sm"
            value={overrideScope}
            onChange={(event) => setOverrideScope(event.target.value)}
          >
            {SCOPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            className="flex-1 rounded-md border border-brand-border px-2 py-1 text-sm"
            placeholder="Scope reference (ID)"
            value={overrideRef}
            onChange={(event) => setOverrideRef(event.target.value)}
          />
          <input
            className="flex-1 rounded-md border border-brand-border px-2 py-1 text-sm"
            placeholder="Override value"
            value={overrideValue}
            onChange={(event) => setOverrideValue(event.target.value)}
          />
          <button
            type="button"
            onClick={handleOverride}
            className="rounded-md bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
            disabled={pendingOverride}
          >
            Save override
          </button>
        </div>
        {setting.scope !== "global" && setting.scope_ref ? (
          <button
            type="button"
            onClick={handleDeleteOverride}
            className="text-xs font-semibold text-brand-signal-error"
          >
            Remove existing override ({setting.scope}:{setting.scope_ref})
          </button>
        ) : null}
        {overrideError ? <p className="text-sm text-brand-signal-error">{overrideError}</p> : null}
      </div>
    </div>
  );
}

export function AdminSettingsPage(): JSX.Element {
  const { isAuthenticated } = useAdminAuth();
  const queryClient = useQueryClient();
const [credentialSource, setCredentialSource] = useState("NOAA NWS");
const [credentialValue, setCredentialValue] = useState("");

  const settingsQuery = useQuery({
    queryKey: ["admin-settings"],
    queryFn: fetchAdminSettings,
    enabled: isAuthenticated
  });

  const definitionsQuery = useQuery({
    queryKey: ["admin-settings-definitions"],
    queryFn: fetchSettingDefinitions,
    enabled: isAuthenticated
  });

  const bootstrapQuery = useQuery({
    queryKey: ["admin-bootstrap"],
    queryFn: fetchBootstrapState,
    enabled: isAuthenticated
  });

  const updateSettingMutation = useMutation({
    mutationFn: ({ key, value, scope, scopeRef }: { key: string; value: unknown; scope?: string; scopeRef?: string | null }) =>
      updateSettingValue(key, value, scope, scopeRef ?? undefined),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    }
  });

  const deleteSettingMutation = useMutation({
    mutationFn: ({ key, scope, scopeRef }: { key: string; scope: string; scopeRef: string }) =>
      deleteScopedSetting(key, scope, scopeRef),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    }
  });

  const clearCacheMutation = useMutation({
    mutationFn: clearSettingsCache
  });

  const credentialMutation = useMutation({
    mutationFn: async () => {
      const payload = { api_key: credentialValue };
      return updateDataSourceCredentials(credentialSource, payload);
    },
    onSuccess: (data: DataSourceResponse) => {
      setCredentialValue("");
      void queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      console.info("Updated credentials for", data.name);
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="space-y-4 text-sm text-brand-muted">
        <p>Sign in to manage runtime settings and credentials.</p>
      </div>
    );
  }

  if (settingsQuery.isLoading) {
    return <p className="text-sm text-brand-muted">Loading settings…</p>;
  }

  if (settingsQuery.error) {
    return <p className="text-sm text-brand-signal-error">Failed to load settings.</p>;
  }

  const settings = settingsQuery.data ?? [];
  const bootstrapState = bootstrapQuery.data?.state ?? {};

  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 rounded-lg border border-brand-border bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-navy">Cache Control</p>
            <p className="text-xs text-brand-muted">Force Redis to reload all settings.</p>
          </div>
          <button
            type="button"
            onClick={() => clearCacheMutation.mutate()}
            className="rounded-md bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
            disabled={clearCacheMutation.isPending}
          >
            Clear cache
          </button>
        </div>
        {clearCacheMutation.isSuccess ? (
          <p className="text-xs text-brand-lagoon">Cache cleared.</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-brand-border bg-white/80 p-4 shadow-sm">
        <p className="text-sm font-semibold text-brand-navy">Bootstrap state</p>
        <pre className="mt-2 max-h-40 overflow-auto rounded bg-brand-surface p-3 text-xs text-brand-navy">
          {JSON.stringify(bootstrapState, null, 2)}
        </pre>
      </div>

      <div className="rounded-lg border border-brand-border bg-white/80 p-4 shadow-sm">
        <p className="text-sm font-semibold text-brand-navy">Rotate credentials</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-md border border-brand-border px-3 py-2 text-sm"
            placeholder="Data source name"
            value={credentialSource}
            onChange={(event) => setCredentialSource(event.target.value)}
          />
          <input
            className="flex-1 rounded-md border border-brand-border px-3 py-2 text-sm"
            placeholder="New API key"
            value={credentialValue}
            onChange={(event) => setCredentialValue(event.target.value)}
          />
          <button
            type="button"
            onClick={() => credentialMutation.mutate()}
            className="rounded-md bg-brand-navy px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
            disabled={!credentialValue}
          >
            Update
          </button>
        </div>
      </div>
      <SettingsSections
        settings={settings}
        definitions={definitionsQuery.data ?? []}
        onSave={(key, value, scope, scopeRef) =>
          updateSettingMutation.mutateAsync({ key, value, scope, scopeRef })
        }
        onDelete={(key, scope, scopeRef) => deleteSettingMutation.mutateAsync({ key, scope, scopeRef })}
      />

      <AdminAuditPlaceholder />
    </div>
  );
}

interface SectionsProps {
  settings: SettingValueResponse[];
  definitions: SettingDefinitionGroup[];
  onSave: (key: string, value: unknown, scope?: string, scopeRef?: string | null) => Promise<void>;
  onDelete: (key: string, scope: string, scopeRef: string) => Promise<void>;
}

function SettingsSections({ settings, definitions, onSave, onDelete }: SectionsProps): JSX.Element {
  const grouped = useMemo(() => {
    const map = new Map<string, SettingValueResponse[]>();
    settings.forEach((setting) => {
      const groupName = setting.key.split(".")[0] ?? "other";
      const entries = map.get(groupName) ?? [];
      entries.push(setting);
      map.set(groupName, entries);
    });
    return map;
  }, [settings]);

  if (settings.length === 0) {
    return <p className="text-sm text-brand-muted">No settings returned from the API.</p>;
  }

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([groupName, groupSettings]) => (
        <section key={groupName} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy">{groupName}</h2>
            <small className="text-xs text-brand-muted">
              {(definitions.find((group) => group.category.toLowerCase() === groupName.toLowerCase())?.settings.length ?? groupSettings.length)}
              {" "}
              definitions reference
            </small>
          </div>
          <div className="space-y-4">
            {groupSettings.map((setting) => (
              <AdminSettingCard key={`${setting.key}-${setting.scope}-${setting.scope_ref ?? "global"}`} setting={setting}>
                <SettingRow
                  setting={setting}
                  onSave={(value, scopeOverride, scopeRefOverride) =>
                    onSave(setting.key, value, scopeOverride, scopeRefOverride)
                  }
                  onDelete={(scopeValue, scopeRef) => onDelete(setting.key, scopeValue, scopeRef)}
                />
              </AdminSettingCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

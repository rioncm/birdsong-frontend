import type { SettingValueResponse } from "../api/types";

interface Props {
  setting: SettingValueResponse;
  children: React.ReactNode;
}

export function AdminSettingCard({ setting, children }: Props): JSX.Element {
  return (
    <div className="rounded-xl border border-brand-border bg-white/90 p-5 shadow-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-navy">{setting.label ?? setting.key}</p>
          {setting.description ? <p className="text-xs text-brand-muted">{setting.description}</p> : null}
        </div>
        <span className="text-xs uppercase tracking-wide text-brand-muted">{setting.data_type}</span>
      </div>
      <div className="mt-3 space-y-2">{children}</div>
      {!setting.editable ? (
        <p className="mt-3 text-xs text-brand-muted">Read-only</p>
      ) : null}
    </div>
  );
}

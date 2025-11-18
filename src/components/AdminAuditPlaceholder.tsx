export function AdminAuditPlaceholder(): JSX.Element {
  return (
    <div className="rounded-xl border border-dashed border-brand-border bg-brand-surfaceAlt/60 p-4 text-sm text-brand-muted">
      <p className="font-semibold text-brand-navy">Audit history</p>
      <p className="mt-2">
        Audit log UI coming soon. Backend is already capturing setting changes, and this panel will render that
        history once the endpoint lands.
      </p>
    </div>
  );
}

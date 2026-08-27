/**
 * Ô thống kê nhanh trên dashboard (KPI card).
 * icon: một ký tự / emoji đơn giản để tránh phụ thuộc thư viện icon.
 */
export default function StatCard({ label, value, icon, tone = 'primary', hint }) {
  const toneStyles = {
    primary: 'bg-primary-light text-primary',
    accent: 'bg-accent-light text-accent',
    success: 'bg-success-light text-success',
    danger: 'bg-danger-light text-danger',
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${toneStyles[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

import { useAuth } from '../../context/AuthContext.jsx'
import Badge from '../../components/common/Badge.jsx'
import {
  MOCK_RESIDENT_UNIT,
  MOCK_RESIDENT_INVOICES,
  MOCK_RESIDENT_SUPPORT_REQUESTS,
  MOCK_NOTIFICATIONS,
} from '../../data/mockData.js'

const INVOICE_BADGE = {
  paid: { label: 'Đã thanh toán', variant: 'success' },
  pending: { label: 'Chờ thanh toán', variant: 'warning' },
  overdue: { label: 'Quá hạn', variant: 'danger' },
}

const REQUEST_BADGE = {
  open: { label: 'Đang xử lý', variant: 'warning' },
  resolved: { label: 'Đã xử lý', variant: 'success' },
}

function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' đ'
}

export default function ResidentDashboard() {
  const { user } = useAuth()
  const { contract } = MOCK_RESIDENT_UNIT
  const pendingInvoice = MOCK_RESIDENT_INVOICES.find((inv) => inv.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Xin chào, {user?.name}</h1>
        <p className="mt-1 text-sm text-muted">
          Đây là thông tin phòng <span className="unit-code text-ink">{MOCK_RESIDENT_UNIT.unitCode}</span> của bạn.
        </p>
      </div>

      {/* Pending invoice callout — hành động quan trọng nhất được đưa lên đầu */}
      {pendingInvoice && (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-accent/30 bg-accent-light p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink">
              Hóa đơn {pendingInvoice.period} cần thanh toán trước {pendingInvoice.dueDate}
            </p>
            <p className="mt-0.5 text-sm text-muted">Số tiền: {formatVND(pendingInvoice.amount)}</p>
          </div>
          <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark sm:w-auto">
            Thanh toán ngay
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Unit + contract info */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card lg:col-span-2">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Thông tin phòng & hợp đồng</h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">Mã phòng</dt>
              <dd className="unit-code mt-1 text-ink">{MOCK_RESIDENT_UNIT.unitCode}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Tòa nhà</dt>
              <dd className="mt-1 text-sm text-ink">{MOCK_RESIDENT_UNIT.buildingName}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Diện tích</dt>
              <dd className="mt-1 text-sm text-ink">{MOCK_RESIDENT_UNIT.area} m²</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Mã hợp đồng</dt>
              <dd className="unit-code mt-1 text-ink">{contract.id}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Thời hạn</dt>
              <dd className="mt-1 text-sm text-ink">{contract.startDate} → {contract.endDate}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Tiền thuê / tháng</dt>
              <dd className="mt-1 text-sm text-ink">{formatVND(contract.monthlyRent)}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <Badge variant="success">Hợp đồng đang hiệu lực</Badge>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Thông báo</h2>
          <ul className="space-y-3">
            {MOCK_NOTIFICATIONS.map((n) => (
              <li key={n.id} className="flex items-start gap-2.5">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.unread ? 'bg-accent' : 'bg-border'}`} />
                <div>
                  <p className="text-sm text-ink">{n.title}</p>
                  <p className="text-xs text-muted">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Invoices */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Hóa đơn của tôi</h2>
          <ul className="space-y-3">
            {MOCK_RESIDENT_INVOICES.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{inv.period}</p>
                  <p className="text-xs text-muted">Hạn: {inv.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ink">{formatVND(inv.amount)}</p>
                  <Badge variant={INVOICE_BADGE[inv.status].variant}>{INVOICE_BADGE[inv.status].label}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Support requests */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Yêu cầu hỗ trợ của tôi</h2>
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink hover:bg-bg">
              + Tạo yêu cầu
            </button>
          </div>
          <ul className="space-y-3">
            {MOCK_RESIDENT_SUPPORT_REQUESTS.map((req) => (
              <li key={req.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-ink">{req.title}</p>
                  <p className="unit-code mt-0.5 text-muted">{req.id} · {req.createdAt}</p>
                </div>
                <Badge variant={REQUEST_BADGE[req.status].variant}>{REQUEST_BADGE[req.status].label}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

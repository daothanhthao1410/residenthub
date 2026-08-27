import { useAuth } from '../../context/AuthContext.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import Badge from '../../components/common/Badge.jsx'
import {
  MOCK_STATS,
  MOCK_BUILDINGS,
  MOCK_RECENT_INVOICES,
  MOCK_SUPPORT_REQUESTS_ADMIN,
} from '../../data/mockData.js'

const INVOICE_BADGE = {
  paid: { label: 'Đã thanh toán', variant: 'success' },
  pending: { label: 'Chờ thanh toán', variant: 'warning' },
  overdue: { label: 'Quá hạn', variant: 'danger' },
}

const REQUEST_BADGE = {
  open: { label: 'Mới', variant: 'primary' },
  in_progress: { label: 'Đang xử lý', variant: 'warning' },
  resolved: { label: 'Đã xử lý', variant: 'success' },
}

const PRIORITY_BADGE = {
  high: { label: 'Cao', variant: 'danger' },
  medium: { label: 'Trung bình', variant: 'warning' },
  low: { label: 'Thấp', variant: 'neutral' },
}

function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' đ'
}

export default function CompanyDashboard() {
  const { user } = useAuth()
  const occupancyRate = Math.round((MOCK_STATS.occupiedRooms / MOCK_STATS.totalRooms) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Chào {user?.name.split(' ').at(-1)}, đây là tổng quan hôm nay
        </h1>
        <p className="mt-1 text-sm text-muted">
          Tình hình vận hành của {user?.companyName} tính đến {new Date().toLocaleDateString('vi-VN')}.
        </p>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng số phòng" value={MOCK_STATS.totalRooms} icon="◫" tone="primary" hint={`${occupancyRate}% đã lấp đầy`} />
        <StatCard label="Cư dân đang ở" value={MOCK_STATS.totalResidents} icon="◍" tone="primary" />
        <StatCard label="Doanh thu tháng này" value={formatVND(MOCK_STATS.monthlyRevenue)} icon="◒" tone="accent" />
        <StatCard label="Hóa đơn quá hạn" value={MOCK_STATS.overdueInvoices} icon="!" tone="danger" hint="Cần nhắc thanh toán" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Buildings overview */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Tòa nhà đang quản lý</h2>
            <span className="text-xs text-muted">{MOCK_BUILDINGS.length} tòa nhà</span>
          </div>

          <div className="space-y-3">
            {MOCK_BUILDINGS.map((building) => {
              const rate = Math.round((building.occupied / building.rooms) * 100)
              return (
                <div key={building.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{building.name}</p>
                    <p className="text-xs text-muted">{building.address}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-28">
                      <div className="mb-1 flex justify-between text-xs text-muted">
                        <span>{building.occupied}/{building.rooms}</span>
                        <span>{rate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-bg">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${rate}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Support requests */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Yêu cầu hỗ trợ gần đây</h2>
            <span className="text-xs text-muted">{MOCK_STATS.openSupportRequests} đang mở</span>
          </div>

          <ul className="space-y-3">
            {MOCK_SUPPORT_REQUESTS_ADMIN.map((req) => (
              <li key={req.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{req.title}</p>
                    <p className="unit-code mt-0.5 text-muted">{req.unit} · {req.id}</p>
                  </div>
                  <Badge variant={PRIORITY_BADGE[req.priority].variant}>{PRIORITY_BADGE[req.priority].label}</Badge>
                </div>
                <div className="mt-2">
                  <Badge variant={REQUEST_BADGE[req.status].variant}>{REQUEST_BADGE[req.status].label}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent invoices table */}
      <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink">Hóa đơn gần đây</h2>
          <span className="text-xs text-muted">5 gần nhất</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <th className="pb-3 font-medium">Mã hóa đơn</th>
                <th className="pb-3 font-medium">Phòng</th>
                <th className="pb-3 font-medium">Cư dân</th>
                <th className="pb-3 font-medium">Số tiền</th>
                <th className="pb-3 font-medium">Hạn thanh toán</th>
                <th className="pb-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_INVOICES.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0">
                  <td className="unit-code py-3 text-ink">{invoice.id}</td>
                  <td className="unit-code py-3 text-muted">{invoice.unit}</td>
                  <td className="py-3 text-ink">{invoice.resident}</td>
                  <td className="py-3 text-ink">{formatVND(invoice.amount)}</td>
                  <td className="py-3 text-muted">{invoice.dueDate}</td>
                  <td className="py-3">
                    <Badge variant={INVOICE_BADGE[invoice.status].variant}>
                      {INVOICE_BADGE[invoice.status].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

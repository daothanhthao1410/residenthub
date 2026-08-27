import { NavLink } from 'react-router-dom'

// Danh sách menu của Company Admin. Các mục chưa xây (path "#")
// vẫn hiển thị để định hình cấu trúc sản phẩm, nhưng ở trạng thái disabled.
const NAV_ITEMS = [
  { label: 'Dashboard', icon: '◧', path: '/company/dashboard', enabled: true },
  { label: 'Cư dân', icon: '◍', path: '#', enabled: false },
  { label: 'Tòa nhà & Phòng', icon: '◫', path: '#', enabled: false },
  { label: 'Hợp đồng', icon: '▤', path: '#', enabled: false },
  { label: 'Hóa đơn & Công nợ', icon: '◒', path: '#', enabled: false },
  { label: 'Yêu cầu hỗ trợ', icon: '◎', path: '#', enabled: false },
  { label: 'Thông báo', icon: '◭', path: '#', enabled: false },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay cho mobile khi sidebar mở */}
      {open && (
        <button
          aria-label="Đóng menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-ink text-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-semibold">
            R
          </div>
          <span className="font-display text-lg font-semibold">ResidentHub</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) =>
            item.enabled ? (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ) : (
              <div
                key={item.label}
                title="Sắp ra mắt"
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/30"
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
              </div>
            ),
          )}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-white/40">ResidentHub MVP · v0.1</p>
        </div>
      </aside>
    </>
  )
}

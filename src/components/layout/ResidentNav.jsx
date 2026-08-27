import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../common/Avatar.jsx'

// Menu đơn giản, dạng thanh ngang — phù hợp resident vì họ chỉ có ít tác vụ.
const NAV_ITEMS = [
  { label: 'Tổng quan', path: '/resident/dashboard', enabled: true },
  { label: 'Phòng của tôi', path: '#', enabled: false },
  { label: 'Hợp đồng', path: '#', enabled: false },
  { label: 'Hóa đơn', path: '#', enabled: false },
  { label: 'Yêu cầu hỗ trợ', path: '#', enabled: false },
]

export default function ResidentNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-semibold text-white">
            R
          </div>
          <span className="font-display text-lg font-semibold text-ink">ResidentHub</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
            item.enabled ? (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-light text-primary' : 'text-muted hover:bg-bg hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                title="Sắp ra mắt"
                className="cursor-not-allowed rounded-lg px-3 py-2 text-sm font-medium text-muted/40"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Avatar initials={user?.avatarInitials} size="sm" />
          <button
            onClick={handleLogout}
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-bg"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Nav ngang cho mobile, cuộn được */}
      <div className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        {NAV_ITEMS.map((item) =>
          item.enabled ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                  isActive ? 'bg-primary-light text-primary' : 'text-muted'
                }`
              }
            >
              {item.label}
            </NavLink>
          ) : (
            <span key={item.label} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-muted/40">
              {item.label}
            </span>
          ),
        )}
      </div>
    </header>
  )
}

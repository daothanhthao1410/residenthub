import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../common/Avatar.jsx'

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Mở menu"
          className="rounded-md p-2 text-ink hover:bg-bg lg:hidden"
        >
          ☰
        </button>
        <div>
          <p className="text-sm font-medium text-ink">{user?.companyName}</p>
          <p className="text-xs text-muted">Bảng điều khiển quản trị</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Thông báo"
          className="relative rounded-full p-2 text-ink hover:bg-bg"
        >
          ◭
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <Avatar initials={user?.avatarInitials} />
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">{user?.name}</p>
            <p className="text-xs text-muted">Company Admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-bg"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  )
}

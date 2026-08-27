import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Danh sách nhỏ để hiển thị gợi ý tài khoản demo trên UI,
// giúp người dùng test nhanh không cần đọc README.
const DEMO_ACCOUNTS = [
  { role: 'Company Admin', email: 'admin@demo.com', password: '123456' },
  { role: 'Resident', email: 'resident@demo.com', password: '123456' },
]

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Nếu đã đăng nhập, đưa thẳng vào dashboard tương ứng
  if (isAuthenticated) {
    const path = user.role === 'company_admin' ? '/company/dashboard' : '/resident/dashboard'
    return <Navigate to={path} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Giả lập độ trễ mạng nhẹ để trải nghiệm gần với thật hơn
    setTimeout(() => {
      const result = login(email, password)
      setIsSubmitting(false)

      if (!result.success) {
        setError(result.message)
        return
      }

      const path = result.user.role === 'company_admin' ? '/company/dashboard' : '/resident/dashboard'
      navigate(path, { replace: true })
    }, 400)
  }

  function fillDemoAccount(account) {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel trái: brand + tín hiệu thị giác "sơ đồ phòng" */}
      <div className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-mono text-sm font-semibold text-white">
            R
          </div>
          <span className="font-display text-xl font-semibold text-white">ResidentHub</span>
        </div>

        <div className="relative">
          <p className="unit-code text-primary/70">SUNRISE-A / FLOOR-02</p>
          <h1 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-white">
            Quản lý cư dân, tòa nhà và công nợ trên một nền tảng duy nhất.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            Dành cho các công ty vận hành nhà trọ, chung cư mini và căn hộ cho thuê —
            theo dõi từng phòng, từng hợp đồng, từng khoản thu một cách rõ ràng.
          </p>

          {/* Signature element: dãy "thẻ phòng" mã hoá như sơ đồ tầng */}
          <div className="mt-8 grid grid-cols-4 gap-2">
            {['A-201', 'A-202', 'A-203', 'A-204', 'A-205', 'A-206', 'A-207', 'A-208'].map((code, i) => (
              <div
                key={code}
                className={`rounded-md border px-2 py-3 text-center unit-code ${
                  i === 2
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 text-white/40'
                }`}
              >
                {code}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/30">© 2026 ResidentHub. Bản dựng MVP nội bộ.</p>
      </div>

      {/* Panel phải: form đăng nhập */}
      <div className="flex items-center justify-center bg-bg p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-mono text-sm font-semibold text-white">
              R
            </div>
            <span className="font-display text-xl font-semibold text-ink">ResidentHub</span>
          </div>

          <h2 className="font-display text-2xl font-semibold text-ink">Đăng nhập</h2>
          <p className="mt-1 text-sm text-muted">Truy cập bảng điều khiển của bạn.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@congty.com"
                className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-primary"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-danger-light px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-8 rounded-lg border border-border bg-surface p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Tài khoản demo</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => fillDemoAccount(account)}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs hover:bg-bg"
                >
                  <span className="font-medium text-ink">{account.role}</span>
                  <span className="unit-code text-muted">{account.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

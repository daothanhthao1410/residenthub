import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

/**
 * Bọc quanh một route để yêu cầu đăng nhập, và (tuỳ chọn) giới hạn theo role.
 *
 * Cách dùng:
 *   <ProtectedRoute allowedRoles={['company_admin']}>
 *     <CompanyDashboard />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-muted">Đang tải...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Đăng nhập rồi nhưng sai role -> đưa về đúng dashboard của họ
    const redirectPath = user.role === 'company_admin' ? '/company/dashboard' : '/resident/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return children
}

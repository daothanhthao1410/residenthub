import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx'
import CompanyLayout from '../components/layout/CompanyLayout.jsx'
import ResidentLayout from '../components/layout/ResidentLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import CompanyDashboard from '../pages/company/CompanyDashboard.jsx'
import ResidentDashboard from '../pages/resident/ResidentDashboard.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Khu vực Company Admin — có sidebar riêng */}
      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRoles={['company_admin']}>
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CompanyDashboard />} />
        {/* Các module khác (cư dân, tòa nhà, hợp đồng...) sẽ thêm sau tại đây */}
      </Route>

      {/* Khu vực Resident — có nav đơn giản riêng */}
      <Route
        path="/resident"
        element={
          <ProtectedRoute allowedRoles={['resident']}>
            <ResidentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ResidentDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

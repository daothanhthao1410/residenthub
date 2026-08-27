import { createContext, useContext, useEffect, useState } from 'react'
import { MOCK_USERS } from '../data/mockData.js'

// AuthContext mô phỏng một phiên đăng nhập thật bằng localStorage.
// Ở giai đoạn MVP, "đăng nhập" chỉ là tìm user khớp trong MOCK_USERS.
// Khi có backend, ta chỉ cần thay hàm login() bằng một API call thật,
// phần còn lại của app (routing, role-based access) không cần đổi.

const AuthContext = createContext(null)
const STORAGE_KEY = 'residenthub_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Khôi phục phiên đăng nhập khi tải lại trang
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  function login(email, password) {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )

    if (!found) {
      return { success: false, message: 'Email hoặc mật khẩu không đúng.' }
    }

    // Không lưu password vào session
    const { password: _password, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider')
  }
  return ctx
}

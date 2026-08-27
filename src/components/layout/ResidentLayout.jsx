import { Outlet } from 'react-router-dom'
import ResidentNav from './ResidentNav.jsx'

export default function ResidentLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <ResidentNav />
      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}

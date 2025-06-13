"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { WebSocketProvider } from "./contexts/WebSocketContext"
import { DatabaseProvider } from "./contexts/DatabaseContext"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import FleetManagement from "./pages/FleetManagement"
import LiveTracking from "./pages/LiveTracking"
import ComplaintManagement from "./pages/ComplaintManagement"
import RidesManagement from "./pages/RidesManagement"
import UserManagement from "./pages/UserManagement"
import PaymentsManagement from "./pages/PaymentsManagement"
import ReportsManagement from "./pages/ReportsManagement"
import SupportManagement from "./pages/SupportManagement"
import SettingsManagement from "./pages/SettingsManagement"
import Login from "./pages/Login"
import "./App.css"

function AppContent() {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading IdharUdhar Admin Panel...</p>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fleet" element={<FleetManagement />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/complaints" element={<ComplaintManagement />} />
          <Route path="/rides" element={<RidesManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/payments" element={<PaymentsManagement />} />
          <Route path="/reports" element={<ReportsManagement />} />
          <Route path="/support" element={<SupportManagement />} />
          <Route path="/settings" element={<SettingsManagement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <WebSocketProvider>
            <AppContent />
          </WebSocketProvider>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

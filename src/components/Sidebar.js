"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useWebSocket } from "../contexts/WebSocketContext"
import {
  FaTachometerAlt,
  FaCar,
  FaMapMarkerAlt,
  FaComments,
  FaRoute,
  FaUsers,
  FaCreditCard,
  FaChartBar,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaGlobe,
} from "react-icons/fa"

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation()
  const { logout, user } = useAuth() || {};
  const { connected, liveData } = useWebSocket()
  const [showNotifications, setShowNotifications] = useState(false)

  const menuItems = [
    { path: "/", icon: FaTachometerAlt, label: "Dashboard" },
    { path: "/fleet", icon: FaCar, label: "Fleet Management" },
    { path: "/tracking", icon: FaMapMarkerAlt, label: "Live Tracking" },
    { path: "/complaints", icon: FaComments, label: "Complaints", badge: "12" },
    { path: "/rides", icon: FaRoute, label: "Rides Management" },
    { path: "/users", icon: FaUsers, label: "User Management" },
    { path: "/payments", icon: FaCreditCard, label: "Payments" },
    { path: "/reports", icon: FaChartBar, label: "Reports" },
    { path: "/support", icon: FaHeadset, label: "Support" },
    { path: "/settings", icon: FaCog, label: "Settings" },
  ]

  const handleLogout = async () => {
    const result = await logout()
    if (!result.success) {
      alert("Error logging out: " + result.error)
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <FaGlobe className="brand-icon" />
            <div className="brand-text">
              <h2>IdharUdhar</h2>
              <p>Admin Panel</p>
            </div>
          </div>
          <button className="sidebar-toggle" onClick={onToggle}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Connection Status */}
        <div className="connection-status">
          <div className={`status-indicator ${connected ? "connected" : "disconnected"}`}>
            <span className="status-dot"></span>
            {connected ? "Live Connected" : "Disconnected"}
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Main Navigation</span>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Notifications */}
          <div className="notifications-section">
            <button className="notifications-toggle" onClick={() => setShowNotifications(!showNotifications)}>
              <FaBell />
              {liveData.notifications.length > 0 && (
                <span className="notification-count">{liveData.notifications.length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h4>Live Notifications</h4>
                </div>
                <div className="notifications-list">
                  {liveData.notifications.slice(0, 5).map((notification, index) => (
                    <div key={index} className="notification-item">
                      <p>{notification.message}</p>
                      <span className="notification-time">{new Date(notification.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                  {liveData.notifications.length === 0 && <p className="no-notifications">No new notifications</p>}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar">
              <FaUsers />
            </div>
            <div className="user-info">
              <p className="user-name">{user?.email || "Admin User"}</p>
              <p className="user-role">Super Admin</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

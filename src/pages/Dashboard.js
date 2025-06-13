"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "../contexts/WebSocketContext"
import { useDatabase } from "../contexts/DatabaseContext"
import GoogleMap from "../components/GoogleMap"
import {
  // FaTrendingUp,
  FaCar,
  FaUsers,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaComments,
  FaRoute,
} from "react-icons/fa"
import { FaTrendingUp } from 'react-icons/fa';
import { RxActivity } from 'react-icons/rx';
import { FaActivity } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs'; // or another icon you prefer


const Dashboard = () => {
  const { liveData, sendMessage } = useWebSocket() || {};
  const { data } = useDatabase() || {};
  // const { data } = useDashboardHook() || {};
  if (!data) return null;

  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [activeFilter, setActiveFilter] = useState("All")

  // Mock live drivers data (in real app, this would come from WebSocket)
  const [liveDrivers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      vehicle: "Honda City - DL-01-AB-1234",
      location: { lat: 28.6139, lng: 77.209, address: "Connaught Place, Delhi" },
      passenger: "John Doe",
      tripId: "TR001",
      eta: "8 mins",
      status: "En Route",
      phone: "+91-9876543210",
    },
    {
      id: 2,
      name: "Amit Singh",
      vehicle: "Royal Enfield - DL-02-CD-5678",
      location: { lat: 28.5355, lng: 77.391, address: "Sector 18, Noida" },
      passenger: "Sarah Khan",
      tripId: "FD002",
      eta: "12 mins",
      status: "Pickup",
      phone: "+91-9876543211",
    },
    {
      id: 3,
      name: "Suresh Yadav",
      vehicle: "Tata Ace - DL-03-EF-9012",
      location: { lat: 28.4595, lng: 77.0266, address: "Gurgaon Sector 29" },
      passenger: "Mike Wilson",
      tripId: "CR003",
      eta: "15 mins",
      status: "Delivery",
      phone: "+91-9876543212",
    },
  ])

  const dashboardStats = {
    todayRides: { count: 1247, growth: 12.5 },
    totalDrivers: { count: 342, weekly: 28 },
    todayIncome: { amount: 45670, growth: 8.3 },
    completedRides: { count: 1189, rate: 95.3 },
    cancelledRides: { count: 58, rate: 4.7 },
  }

  const recentActivities = [
    { id: 1, type: "Ride", user: "John Doe", time: "2 mins ago", amount: 250, status: "Completed" },
    { id: 2, type: "Food", user: "Sarah Khan", time: "5 mins ago", amount: 180, status: "In-progress" },
    { id: 3, type: "Courier", user: "Mike Wilson", time: "8 mins ago", amount: 120, status: "Pending" },
    { id: 4, type: "Ride", user: "Priya Sharma", time: "12 mins ago", amount: 320, status: "Completed" },
    { id: 5, type: "Food", user: "Ahmed Ali", time: "15 mins ago", amount: 450, status: "Completed" },
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredActivities =
    activeFilter === "All" ? recentActivities : recentActivities.filter((activity) => activity.type === activeFilter)

  const getStatusColor = (status) => {
    const colors = {
      "En Route": "status-blue",
      Pickup: "status-yellow",
      Delivery: "status-purple",
      "Drop Off": "status-green",
    }
    return colors[status] || "status-gray"
  }

  const handleCall = (phone, name) => {
    alert(`Calling ${name} at ${phone}`)
    // In real implementation, integrate with VoIP service
  }

  const handleChat = (driverId, name) => {
    const message = prompt(`Send message to ${name}:`)
    if (message) {
      sendMessage(driverId, message)
      alert(`Message sent to ${name}: ${message}`)
    }
  }

  const handleTrack = (driverId) => {
    setSelectedDriver(driverId)
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with IdharUdhar today.</p>
        </div>
        <div className="header-time">
          <p>Current Time</p>
          <span className="live-time">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Live Tracking Section */}
      <div className="card live-tracking-card">
        <div className="card-header">
          <h2>
            <FaMapMarkerAlt className="header-icon" />
            Live Driver Tracking
          </h2>
        </div>
        <div className="card-content">
          <div className="tracking-grid">
            {/* Google Map */}
            <div className="map-container">
              <GoogleMap
                drivers={liveDrivers}
                selectedDriver={selectedDriver}
                onDriverSelect={setSelectedDriver}
                height="320px"
              />
            </div>

            {/* Driver List */}
            <div className="drivers-list">
              {liveDrivers.map((driver) => (
                <div key={driver.id} className={`driver-card ${selectedDriver === driver.id ? "selected" : ""}`}>
                  <div className="driver-header">
                    <div className="driver-info">
                      <h4>{driver.name}</h4>
                      <p>{driver.vehicle}</p>
                    </div>
                    <span className={`status-badge ${getStatusColor(driver.status)}`}>{driver.status}</span>
                  </div>
                  <div className="driver-details">
                    <p className="location">{driver.location.address}</p>
                    <p className="eta">ETA: {driver.eta}</p>
                  </div>
                  <div className="driver-actions">
                    <button className="btn btn-outline" onClick={() => handleCall(driver.phone, driver.name)}>
                      <FaPhone /> Call
                    </button>
                    <button className="btn btn-outline" onClick={() => handleChat(driver.id, driver.name)}>
                      <FaComments /> Chat
                    </button>
                    <button className="btn btn-primary" onClick={() => handleTrack(driver.id)}>
                      <FaRoute /> Track
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Today's Rides</span>
            <FaCar className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardStats.todayRides.count}</div>
            <div className="stat-growth positive">
              <BsGraphUp />+{dashboardStats.todayRides.growth}% from yesterday
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Drivers</span>
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardStats.totalDrivers.count}</div>
            <div className="stat-growth">+{dashboardStats.totalDrivers.weekly} this week</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Today's Income</span>
            <FaDollarSign className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">₹{dashboardStats.todayIncome.amount.toLocaleString()}</div>
            <div className="stat-growth positive">
              <BsGraphUp />+{dashboardStats.todayIncome.growth}% from yesterday
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Completed Rides</span>
            <FaCheckCircle className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardStats.completedRides.count}</div>
            <div className="stat-growth positive">{dashboardStats.completedRides.rate}% success rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Cancelled Rides</span>
            <FaTimesCircle className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{dashboardStats.cancelledRides.count}</div>
            <div className="stat-growth negative">{dashboardStats.cancelledRides.rate}% cancellation rate</div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <div className="card-header">
          <h2>Recent Activities</h2>
          <div className="filter-buttons">
            {["All", "Ride", "Food", "Courier"].map((filter) => (
              <button
                key={filter}
                className={`btn ${activeFilter === filter ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="card-content">
          <div className="activities-list">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-info">
                  <span className={`activity-type type-${activity.type.toLowerCase()}`}>{activity.type}</span>
                  <div className="activity-details">
                    <p className="activity-user">{activity.user}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
                <div className="activity-meta">
                  <p className="activity-amount">₹{activity.amount}</p>
                  <span className={`activity-status status-${activity.status.toLowerCase().replace("-", "")}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

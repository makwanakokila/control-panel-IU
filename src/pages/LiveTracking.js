"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "../contexts/WebSocketContext"
import GoogleMap from "../components/GoogleMap"
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaComments,
  FaRoute,
  FaUsers,
  FaChartLine,
  FaGlobe
} from "react-icons/fa"
// import { FaTrendingUp } from 'react-icons/fa';
// import { FaChartLine } from 'react-icons/fa';

const LiveTracking = () => {
  const { sendMessage } = useWebSocket() || {};
  const { liveData } = useWebSocket() || {};
  if (!liveData) return null; // or <Loading />, etc.

  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDriver, setSelectedDriver] = useState(null)

  // Mock live drivers data
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
    {
      id: 4,
      name: "Priya Sharma",
      vehicle: "Maruti Swift - DL-04-GH-3456",
      location: { lat: 28.7041, lng: 77.1025, address: "Rohini, Delhi" },
      passenger: "Ahmed Ali",
      tripId: "TR004",
      eta: "5 mins",
      status: "Drop Off",
      phone: "+91-9876543213",
    },
    {
      id: 5,
      name: "Vikash Gupta",
      vehicle: "Honda Activa - DL-05-IJ-7890",
      location: { lat: 28.6692, lng: 77.4538, address: "Laxmi Nagar, Delhi" },
      passenger: "Priya Patel",
      tripId: "FD005",
      eta: "20 mins",
      status: "En Route",
      phone: "+91-9876543214",
    },
  ])

  const trackingStats = {
    activeTrips: 127,
    totalDrivers: 342,
    averageETA: "12 mins",
    coverageArea: "450 km²",
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
    <div className="live-tracking">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Live Tracking Dashboard</h1>
          <p>Real-time monitoring of all active drivers and trips</p>
        </div>
        <div className="header-time">
          <p>Last Updated</p>
          <span className="live-time">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Active Trips</span>
            <FaChartLine className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{trackingStats.activeTrips}</div>
            <div className="stat-growth positive">Live tracking enabled</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Drivers</span>
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{trackingStats.totalDrivers}</div>
            <div className="stat-growth">Online and available</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Average ETA</span>
            <FaClock className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{trackingStats.averageETA}</div>
            <div className="stat-growth">Across all trips</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Coverage Area</span>
            <FaGlobe className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{trackingStats.coverageArea}</div>
            <div className="stat-growth">Service coverage</div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card">
        <div className="card-header">
          <h2>Live Map View</h2>
        </div>
        <div className="card-content">
          <GoogleMap
            drivers={liveDrivers}
            selectedDriver={selectedDriver}
            onDriverSelect={setSelectedDriver}
            height="500px"
          />
        </div>
      </div>

      {/* Live Driver Status */}
      <div className="card">
        <div className="card-header">
          <h2>Live Driver Status</h2>
        </div>
        <div className="card-content">
          <div className="drivers-grid">
            {liveDrivers.map((driver) => (
              <div
                key={driver.id}
                className={`driver-card ${selectedDriver === driver.id ? "selected" : ""}`}
                onClick={() => setSelectedDriver(selectedDriver === driver.id ? null : driver.id)}
              >
                <div className="driver-header">
                  <div className="driver-avatar">
                    {driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="driver-info">
                    <h3>{driver.name}</h3>
                    <p>{driver.vehicle}</p>
                  </div>
                  <div className="driver-status">
                    <span className={`status-badge ${getStatusColor(driver.status)}`}>{driver.status}</span>
                    <div className="eta-info">
                      <p>ETA: {driver.eta}</p>
                      <p>Trip: {driver.tripId}</p>
                    </div>
                  </div>
                </div>

                {selectedDriver === driver.id && (
                  <div className="driver-details">
                    <div className="details-grid">
                      <div className="detail-section">
                        <h4>Trip Details</h4>
                        <div className="detail-item">
                          <FaUsers className="detail-icon" />
                          <span>Passenger: {driver.passenger}</span>
                        </div>
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span>Location: {driver.location.address}</span>
                        </div>
                      </div>
                      <div className="detail-section">
                        <h4>Actions</h4>
                        <div className="action-buttons">
                          <button
                            className="btn btn-outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCall(driver.phone, driver.name)
                            }}
                          >
                            <FaPhone /> Call
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleChat(driver.id, driver.name)
                            }}
                          >
                            <FaComments /> Chat
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTrack(driver.id)
                            }}
                          >
                            <FaRoute /> Track
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveTracking

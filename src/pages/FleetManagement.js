"use client"

import { useState } from "react"
import { useDatabase } from "../contexts/DatabaseContext"
import {
  FaCar,
  FaTruck,
  FaBiking,
  FaSearch,
  FaEye,
  FaEdit,
  FaLink,
  FaGasPump,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa"

const FleetManagement = () => {
  const { data, updateDocument, addDocument } = useDatabase() || {};
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [linkingDriver, setLinkingDriver] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Mock vehicles data (in real app, this would come from database)
  const [vehicles] = useState([
    {
      id: 1,
      name: "Honda City",
      number: "DL-01-AB-1234",
      type: "Ride",
      fuelType: "Petrol",
      capacity: "4 Passengers",
      year: 2022,
      color: "White",
      status: "Active",
      lastService: "2024-01-15",
      driver: {
        name: "Rajesh Kumar",
        uid: "DR001",
        verified: true,
        phone: "+91-9876543210",
        email: "rajesh@example.com",
      },
    },
    {
      id: 2,
      name: "Royal Enfield",
      number: "DL-02-CD-5678",
      type: "Food",
      fuelType: "Petrol",
      capacity: "2 Bags",
      year: 2021,
      color: "Black",
      status: "Active",
      lastService: "2024-01-10",
      driver: {
        name: "Amit Singh",
        uid: "DR002",
        verified: true,
        phone: "+91-9876543211",
        email: "amit@example.com",
      },
    },
    {
      id: 3,
      name: "Tata Ace",
      number: "DL-03-EF-9012",
      type: "Courier",
      fuelType: "Diesel",
      capacity: "750 KG",
      year: 2020,
      color: "Blue",
      status: "Maintenance",
      lastService: "2024-01-05",
      driver: {
        name: "Suresh Yadav",
        uid: "DR003",
        verified: false,
        phone: "+91-9876543212",
        email: "suresh@example.com",
      },
    },
  ])

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || vehicle.type === typeFilter
    const matchesStatus = statusFilter === "All" || vehicle.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getVehicleIcon = (type) => {
    switch (type) {
      case "Ride":
        return FaCar
      case "Food":
        return FaBiking
      case "Courier":
        return FaTruck
      default:
        return FaCar
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "status-green"
      case "Inactive":
        return "status-gray"
      case "Maintenance":
        return "status-yellow"
      default:
        return "status-gray"
    }
  }

  const handleView = (vehicle) => {
    setSelectedVehicle(vehicle)
    setShowModal(true)
  }

  const handleEdit = async (vehicle) => {
    setEditingVehicle({ ...vehicle })
    setShowModal(true)
  }

  const handleSaveEdit = async () => {
    if (editingVehicle) {
      const result = await updateDocument("vehicles", editingVehicle.id, editingVehicle)
      if (result.success) {
        alert(`Vehicle ${editingVehicle.name} updated successfully!`)
        setEditingVehicle(null)
        setShowModal(false)
      } else {
        alert("Error updating vehicle: " + result.error)
      }
    }
  }

  const handleLinkDriver = (vehicle) => {
    setLinkingDriver(vehicle)
    setShowModal(true)
  }

  const handleSaveDriverLink = async () => {
    if (linkingDriver) {
      alert(`Driver linked to ${linkingDriver.name} successfully!`)
      setLinkingDriver(null)
      setShowModal(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedVehicle(null)
    setEditingVehicle(null)
    setLinkingDriver(null)
  }

  return (
    <div className="fleet-management">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Fleet Management</h1>
          <p>Manage all vehicles across Ride, Food Delivery, and Courier services</p>
        </div>
        <button className="btn btn-primary">Add Vehicle</button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-content">
          <div className="filters-grid">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search vehicles, numbers, or drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
              <option value="All">All Types</option>
              <option value="Ride">Ride</option>
              <option value="Food">Food Delivery</option>
              <option value="Courier">Courier</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="vehicles-grid">
        {filteredVehicles.map((vehicle) => {
          const VehicleIcon = getVehicleIcon(vehicle.type)
          return (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-header">
                <div className="vehicle-title">
                  <VehicleIcon className="vehicle-icon" />
                  <h3>{vehicle.name}</h3>
                </div>
                <span className={`status-badge ${getStatusColor(vehicle.status)}`}>{vehicle.status}</span>
              </div>

              <p className="vehicle-number">{vehicle.number}</p>

              <div className="vehicle-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Type</span>
                    <span className="detail-value">{vehicle.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year</span>
                    <span className="detail-value">{vehicle.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fuel</span>
                    <span className="detail-value">
                      <FaGasPump className="detail-icon" />
                      {vehicle.fuelType}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Color</span>
                    <span className="detail-value">{vehicle.color}</span>
                  </div>
                </div>

                <div className="capacity-info">
                  <span className="detail-label">Capacity</span>
                  <span className="detail-value">{vehicle.capacity}</span>
                </div>

                <div className="driver-info">
                  <div className="driver-header">
                    <span className="detail-label">Linked Driver</span>
                    <span className={`verification-badge ${vehicle.driver.verified ? "verified" : "pending"}`}>
                      {vehicle.driver.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <div className="driver-details">
                    <FaUser className="driver-icon" />
                    <div>
                      <p className="driver-name">{vehicle.driver.name}</p>
                      <p className="driver-uid">UID: {vehicle.driver.uid}</p>
                    </div>
                  </div>
                </div>

                <div className="service-info">
                  <FaCalendarAlt className="service-icon" />
                  <span>Last Service: {vehicle.lastService}</span>
                </div>

                <div className="vehicle-actions">
                  <button className="btn btn-outline" onClick={() => handleView(vehicle)}>
                    <FaEye /> View
                  </button>
                  <button className="btn btn-outline" onClick={() => handleEdit(vehicle)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn btn-outline" onClick={() => handleLinkDriver(vehicle)}>
                    <FaLink /> Link
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value">{vehicles.length}</div>
            <div className="stat-label">Total Vehicles</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value status-green">{vehicles.filter((v) => v.status === "Active").length}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value status-yellow">{vehicles.filter((v) => v.status === "Maintenance").length}</div>
            <div className="stat-label">Maintenance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value status-gray">{vehicles.filter((v) => v.status === "Inactive").length}</div>
            <div className="stat-label">Inactive</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {selectedVehicle && "Vehicle Details"}
                {editingVehicle && "Edit Vehicle"}
                {linkingDriver && "Link Driver"}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              {selectedVehicle && (
                <div className="vehicle-details-modal">
                  <div className="details-grid">
                    <div className="detail-section">
                      <h4>Vehicle Information</h4>
                      <div className="detail-list">
                        <div className="detail-row">
                          <span>Name:</span>
                          <span>{selectedVehicle.name}</span>
                        </div>
                        <div className="detail-row">
                          <span>Number:</span>
                          <span>{selectedVehicle.number}</span>
                        </div>
                        <div className="detail-row">
                          <span>Type:</span>
                          <span>{selectedVehicle.type}</span>
                        </div>
                        <div className="detail-row">
                          <span>Status:</span>
                          <span className={`status-badge ${getStatusColor(selectedVehicle.status)}`}>
                            {selectedVehicle.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="detail-section">
                      <h4>Driver Information</h4>
                      <div className="detail-list">
                        <div className="detail-row">
                          <span>Name:</span>
                          <span>{selectedVehicle.driver.name}</span>
                        </div>
                        <div className="detail-row">
                          <span>UID:</span>
                          <span>{selectedVehicle.driver.uid}</span>
                        </div>
                        <div className="detail-row">
                          <span>Phone:</span>
                          <span>{selectedVehicle.driver.phone}</span>
                        </div>
                        <div className="detail-row">
                          <span>Status:</span>
                          <span
                            className={`verification-badge ${selectedVehicle.driver.verified ? "verified" : "pending"}`}
                          >
                            {selectedVehicle.driver.verified ? "Verified" : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editingVehicle && (
                <div className="edit-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Vehicle Name</label>
                      <input
                        type="text"
                        value={editingVehicle.name}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Vehicle Number</label>
                      <input
                        type="text"
                        value={editingVehicle.number}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, number: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input
                        type="text"
                        value={editingVehicle.color}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={editingVehicle.status}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSaveEdit}>
                      Save Changes
                    </button>
                    <button className="btn btn-outline" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {linkingDriver && (
                <div className="link-form">
                  <div className="form-group">
                    <label>Driver Name</label>
                    <input type="text" placeholder="Enter driver name" />
                  </div>
                  <div className="form-group">
                    <label>Driver UID</label>
                    <input type="text" placeholder="Enter driver UID" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter phone number" />
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSaveDriverLink}>
                      Link Driver
                    </button>
                    <button className="btn btn-outline" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FleetManagement

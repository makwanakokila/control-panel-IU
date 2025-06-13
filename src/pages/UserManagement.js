"use client"

import { useState } from "react"
import { useDatabase } from "../contexts/DatabaseContext"
import {
  FaUser,
  FaSearch,
  FaEye,
  FaEdit,
  FaBan,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa"

const UserManagement = () => {
  const { data, updateDocument } = useDatabase() || {};
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Mock users data
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91-9876543210",
      role: "Customer",
      status: "Verified",
      joinDate: "2023-06-15",
      totalRides: 45,
      rating: 4.8,
      location: "Delhi, India",
      lastActive: "2024-01-15 14:30",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91-9876543211",
      role: "Driver",
      status: "Verified",
      joinDate: "2023-03-20",
      totalRides: 234,
      rating: 4.9,
      location: "Delhi, India",
      lastActive: "2024-01-15 16:45",
      vehicle: "Honda City - DL-01-AB-1234",
      license: "DL123456789",
    },
    {
      id: 3,
      name: "Pizza Palace",
      email: "contact@pizzapalace.com",
      phone: "+91-9876543212",
      role: "Vendor",
      status: "Pending",
      joinDate: "2024-01-10",
      totalOrders: 12,
      rating: 4.2,
      location: "Noida, India",
      lastActive: "2024-01-15 12:20",
      businessType: "Restaurant",
      gst: "GST123456789",
    },
    {
      id: 4,
      name: "Sarah Khan",
      email: "sarah.khan@example.com",
      phone: "+91-9876543213",
      role: "Customer",
      status: "Blocked",
      joinDate: "2023-08-12",
      totalRides: 23,
      rating: 3.5,
      location: "Gurgaon, India",
      lastActive: "2024-01-10 09:15",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    const matchesStatus = statusFilter === "All" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "status-green"
      case "Pending":
        return "status-yellow"
      case "Blocked":
        return "status-red"
      default:
        return "status-gray"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Customer":
        return "role-blue"
      case "Driver":
        return "role-green"
      case "Vendor":
        return "role-purple"
      default:
        return "role-gray"
    }
  }

  const handleView = (user) => {
    setSelectedUser(user)
    setActiveTab("profile")
    setShowModal(true)
  }

  const handleEdit = (user) => {
    setEditingUser({ ...user })
    setShowModal(true)
  }

  const handleSaveEdit = async () => {
    if (editingUser) {
      const result = await updateDocument("users", editingUser.id, editingUser)
      if (result.success) {
        alert(`User ${editingUser.name} updated successfully!`)
        setEditingUser(null)
        setShowModal(false)
      } else {
        alert("Error updating user: " + result.error)
      }
    }
  }

  const handleSuspend = async (user) => {
    const action = user.status === "Blocked" ? "unblock" : "suspend"
    if (window.confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      const newStatus = user.status === "Blocked" ? "Verified" : "Blocked"
      const result = await updateDocument("users", user.id, { status: newStatus })
      if (result.success) {
        alert(`User ${user.name} has been ${action}ed successfully!`)
      } else {
        alert("Error updating user status: " + result.error)
      }
    }
  }

  const handleCall = (phone, name) => {
    alert(`Calling ${name} at ${phone}`)
  }

  const handleEmail = (email, name) => {
    alert(`Opening email to ${name} at ${email}`)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
    setEditingUser(null)
  }

  return (
    <div className="user-management">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p>Manage customers, drivers, and vendors</p>
        </div>
        <button className="btn btn-primary">Add User</button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-content">
          <div className="filters-grid">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="filter-select">
              <option value="All">All Roles</option>
              <option value="Customer">Customer</option>
              <option value="Driver">Driver</option>
              <option value="Vendor">Vendor</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <div className="user-badges">
                  <span className={`role-badge ${getRoleColor(user.role)}`}>{user.role}</span>
                  <span className={`status-badge ${getStatusColor(user.status)}`}>{user.status}</span>
                </div>
              </div>
              <div className="user-rating">
                <FaStar className="star-icon" />
                <span>{user.rating}</span>
                <p>
                  {user.role === "Customer"
                    ? `${user.totalRides} rides`
                    : user.role === "Driver"
                      ? `${user.totalRides} trips`
                      : `${user.totalOrders} orders`}
                </p>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-section">
                <div className="detail-item">
                  <FaPhone className="detail-icon" />
                  <div>
                    <p>{user.phone}</p>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <div>
                    <p>{user.location}</p>
                    <span>Last active: {user.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-item">
                  <FaCalendarAlt className="detail-icon" />
                  <div>
                    <p>{user.joinDate}</p>
                    {user.role === "Driver" && user.vehicle && <span>{user.vehicle}</span>}
                    {user.role === "Vendor" && user.businessType && <span>{user.businessType}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="user-actions">
              <button className="btn btn-outline" onClick={() => handleView(user)}>
                <FaEye /> View Profile
              </button>
              <button className="btn btn-outline" onClick={() => handleEdit(user)}>
                <FaEdit /> Edit
              </button>
              <button
                className={`btn btn-outline ${user.status === "Blocked" ? "btn-success" : "btn-danger"}`}
                onClick={() => handleSuspend(user)}
              >
                <FaBan /> {user.status === "Blocked" ? "Unblock" : "Suspend"}
              </button>
              <button className="btn btn-outline" onClick={() => handleCall(user.phone, user.name)}>
                <FaPhone /> Call
              </button>
              <button className="btn btn-outline" onClick={() => handleEmail(user.email, user.name)}>
                <FaEnvelope /> Email
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value role-blue">{users.filter((u) => u.role === "Customer").length}</div>
            <div className="stat-label">Customers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value role-green">{users.filter((u) => u.role === "Driver").length}</div>
            <div className="stat-label">Drivers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-value role-purple">{users.filter((u) => u.role === "Vendor").length}</div>
            <div className="stat-label">Vendors</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {selectedUser && `User Profile - ${selectedUser.name}`}
                {editingUser && `Edit User - ${editingUser.name}`}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              {selectedUser && (
                <div className="user-profile-modal">
                  <div className="tab-navigation">
                    <button
                      className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
                      onClick={() => setActiveTab("profile")}
                    >
                      Profile
                    </button>
                    <button
                      className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
                      onClick={() => setActiveTab("activity")}
                    >
                      Activity
                    </button>
                    <button
                      className={`tab-btn ${activeTab === "documents" ? "active" : ""}`}
                      onClick={() => setActiveTab("documents")}
                    >
                      Documents
                    </button>
                  </div>

                  <div className="tab-content">
                    {activeTab === "profile" && (
                      <div className="profile-tab">
                        <div className="details-grid">
                          <div className="detail-section">
                            <h4>Personal Information</h4>
                            <div className="detail-list">
                              <div className="detail-row">
                                <span>Name:</span>
                                <span>{selectedUser.name}</span>
                              </div>
                              <div className="detail-row">
                                <span>Email:</span>
                                <span>{selectedUser.email}</span>
                              </div>
                              <div className="detail-row">
                                <span>Phone:</span>
                                <span>{selectedUser.phone}</span>
                              </div>
                              <div className="detail-row">
                                <span>Role:</span>
                                <span className={`role-badge ${getRoleColor(selectedUser.role)}`}>
                                  {selectedUser.role}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="detail-section">
                            <h4>Account Status</h4>
                            <div className="detail-list">
                              <div className="detail-row">
                                <span>Status:</span>
                                <span className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                                  {selectedUser.status}
                                </span>
                              </div>
                              <div className="detail-row">
                                <span>Rating:</span>
                                <div className="rating-display">
                                  <FaStar className="star-icon" />
                                  <span>{selectedUser.rating}</span>
                                </div>
                              </div>
                              <div className="detail-row">
                                <span>Join Date:</span>
                                <span>{selectedUser.joinDate}</span>
                              </div>
                              <div className="detail-row">
                                <span>Last Active:</span>
                                <span>{selectedUser.lastActive}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "activity" && (
                      <div className="activity-tab">
                        <h4>Recent Activity</h4>
                        <div className="activity-timeline">
                          <div className="timeline-item">
                            <div className="timeline-dot green"></div>
                            <div className="timeline-content">
                              <p>Completed ride to Airport</p>
                              <span>2 hours ago</span>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot blue"></div>
                            <div className="timeline-content">
                              <p>Profile updated</p>
                              <span>1 day ago</span>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot yellow"></div>
                            <div className="timeline-content">
                              <p>Payment method added</p>
                              <span>3 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "documents" && (
                      <div className="documents-tab">
                        <h4>Verification Documents</h4>
                        {selectedUser.role === "Driver" && (
                          <div className="document-list">
                            <div className="detail-row">
                              <span>License Number:</span>
                              <span>{selectedUser.license}</span>
                            </div>
                            <div className="detail-row">
                              <span>Vehicle:</span>
                              <span>{selectedUser.vehicle}</span>
                            </div>
                          </div>
                        )}
                        {selectedUser.role === "Vendor" && (
                          <div className="document-list">
                            <div className="detail-row">
                              <span>Business Type:</span>
                              <span>{selectedUser.businessType}</span>
                            </div>
                            <div className="detail-row">
                              <span>GST Number:</span>
                              <span>{selectedUser.gst}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editingUser && (
                <div className="edit-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        value={editingUser.phone}
                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={editingUser.status}
                        onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Blocked">Blocked</option>
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

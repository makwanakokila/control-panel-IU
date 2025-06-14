"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Search, Eye, Edit, Ban, Phone, Mail, MapPin, Star, Calendar } from "lucide-react"

const users = [
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
  {
    id: 5,
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91-9876543214",
    role: "Driver",
    status: "Verified",
    joinDate: "2023-05-08",
    totalRides: 189,
    rating: 4.7,
    location: "Delhi, India",
    lastActive: "2024-01-15 18:00",
    vehicle: "Maruti Swift - DL-02-CD-5678",
    license: "DL987654321",
  },
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<any>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    const matchesStatus = statusFilter === "All" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-600"
      case "Pending":
        return "bg-yellow-600"
      case "Blocked":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Customer":
        return "border-blue-500 text-blue-400"
      case "Driver":
        return "border-green-500 text-green-400"
      case "Vendor":
        return "border-purple-500 text-purple-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  const handleView = (user: any) => {
    setSelectedUser(user)
  }

  const handleEdit = (user: any) => {
    setEditingUser({ ...user })
  }

  const handleSaveEdit = () => {
    alert(`User ${editingUser.name} updated successfully!`)
    setEditingUser(null)
    // In real implementation, update the user data
  }

  const handleSuspend = (user: any) => {
    const action = user.status === "Blocked" ? "unblock" : "suspend"
    if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      alert(`User ${user.name} has been ${action}ed successfully!`)
      // In real implementation, update user status
    }
  }

  const handleCall = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}`)
    // In real implementation, integrate with VoIP service
  }

  const handleEmail = (email: string, name: string) => {
    alert(`Opening email to ${name} at ${email}`)
    // In real implementation, open email client or send email
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage customers, drivers, and vendors</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Add User</Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="User Role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Driver">Driver</SelectItem>
                <SelectItem value="Vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{user.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={`${getStatusColor(user.status)} text-white`}>{user.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">{user.rating}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {user.role === "Customer"
                      ? `${user.totalRides} rides`
                      : user.role === "Driver"
                      ? `${user.totalRides} trips`
                      : `${user.totalOrders} orders`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-medium">Contact</span>
                  </div>
                  <p className="text-white text-sm">{user.phone}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Location</span>
                  </div>
                  <p className="text-white text-sm">{user.location}</p>
                  <p className="text-gray-400 text-xs">Last active: {user.lastActive}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400 font-medium">Member Since</span>
                  </div>
                  <p className="text-white text-sm">{user.joinDate}</p>
                  {user.role === "Driver" && user.vehicle && <p className="text-gray-400 text-xs">{user.vehicle}</p>}
                  {user.role === "Vendor" && user.businessType && (
                    <p className="text-gray-400 text-xs">{user.businessType}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => handleView(user)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>User Profile - {user.name}</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                      <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="bg-gray-800 border-gray-700">
                          <TabsTrigger value="profile" className="data-[state=active]:bg-green-600">
                            Profile
                          </TabsTrigger>
                          <TabsTrigger value="activity" className="data-[state=active]:bg-green-600">
                            Activity
                          </TabsTrigger>
                          <TabsTrigger value="documents" className="data-[state=active]:bg-green-600">
                            Documents
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Personal Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Name:</span>
                                  <span className="text-white">{selectedUser.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Email:</span>
                                  <span className="text-white">{selectedUser.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Phone:</span>
                                  <span className="text-white">{selectedUser.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Role:</span>
                                  <Badge variant="outline" className={getRoleColor(selectedUser.role)}>
                                    {selectedUser.role}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Account Status</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Status:</span>
                                  <Badge className={`${getStatusColor(selectedUser.status)} text-white`}>
                                    {selectedUser.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Rating:</span>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                    <span className="text-white">{selectedUser.rating}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Join Date:</span>
                                  <span className="text-white">{selectedUser.joinDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Last Active:</span>
                                  <span className="text-white">{selectedUser.lastActive}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="activity" className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-3">Recent Activity</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">Completed ride to Airport</p>
                                  <p className="text-gray-400 text-xs">2 hours ago</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">Profile updated</p>
                                  <p className="text-gray-400 text-xs">1 day ago</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">Payment method added</p>
                                  <p className="text-gray-400 text-xs">3 days ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="documents" className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-3">Verification Documents</h4>
                            {selectedUser.role === "Driver" && (
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">License Number:</span>
                                  <span className="text-white">{selectedUser.license}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Vehicle:</span>
                                  <span className="text-white">{selectedUser.vehicle}</span>
                                </div>
                              </div>
                            )}
                            {selectedUser.role === "Vendor" && (
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Business Type:</span>
                                  <span className="text-white">{selectedUser.businessType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">GST Number:</span>
                                  <span className="text-white">{selectedUser.gst}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Edit button is now hidden from all cards */}
                {/*
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit User - {user.name}</DialogTitle>
                    </DialogHeader>
                    {editingUser && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <Input
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Email</label>
                            <Input
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Phone</label>
                            <Input
                              value={editingUser.phone}
                              onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Status</label>
                            <Select
                              value={editingUser.status}
                              onValueChange={(value) => setEditingUser({ ...editingUser, status: value })}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="Verified">Verified</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Blocked">Blocked</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setEditingUser(null)}
                            className="border-gray-700 text-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                */}

                {/* Suspend/Unblock button is now hidden from all cards */}
                {/*
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSuspend(user)}
                  className={`border-gray-700 hover:bg-gray-800 ${
                    user.status === "Blocked" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <Ban className="h-3 w-3 mr-1" />
                  {user.status === "Blocked" ? "Unblock" : "Suspend"}
                </Button>
                */}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCall(user.phone, user.name)}
                  className="border-gray-700 text-gray-400 hover:bg-gray-800"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEmail(user.email, user.name)}
                  className="border-gray-700 text-gray-400 hover:bg-gray-800"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{users.filter((u) => u.role === "Customer").length}</p>
              <p className="text-gray-400 text-sm">Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{users.filter((u) => u.role === "Driver").length}</p>
              <p className="text-gray-400 text-sm">Drivers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{users.filter((u) => u.role === "Vendor").length}</p>
              <p className="text-gray-400 text-sm">Vendors</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
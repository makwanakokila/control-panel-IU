"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Car, Truck, Bike, Search, Edit, Eye, Link, Fuel, Calendar, User } from "lucide-react"

const vehicles = [
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
    driver: { name: "Amit Singh", uid: "DR002", verified: true, phone: "+91-9876543211", email: "amit@example.com" },
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
  {
    id: 4,
    name: "Maruti Swift",
    number: "DL-04-GH-3456",
    type: "Ride",
    fuelType: "Petrol",
    capacity: "4 Passengers",
    year: 2023,
    color: "Red",
    status: "Inactive",
    lastService: "2024-01-20",
    driver: { name: "Priya Sharma", uid: "DR004", verified: true, phone: "+91-9876543213", email: "priya@example.com" },
  },
]

export default function FleetManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [editingVehicle, setEditingVehicle] = useState<any>(null)
  const [linkingDriver, setLinkingDriver] = useState<any>(null)

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || vehicle.type === typeFilter
    const matchesStatus = statusFilter === "All" || vehicle.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "Ride":
        return <Car className="h-5 w-5" />
      case "Food":
        return <Bike className="h-5 w-5" />
      case "Courier":
        return <Truck className="h-5 w-5" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600"
      case "Inactive":
        return "bg-gray-600"
      case "Maintenance":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleView = (vehicle: any) => {
    setSelectedVehicle(vehicle)
  }

  const handleEdit = (vehicle: any) => {
    setEditingVehicle({ ...vehicle })
  }

  const handleSaveEdit = () => {
    alert(`Vehicle ${editingVehicle.name} updated successfully!`)
    setEditingVehicle(null)
    // In real implementation, update the vehicle data
  }

  const handleLinkDriver = (vehicle: any) => {
    setLinkingDriver(vehicle)
  }

  const handleSaveDriverLink = () => {
    alert(`Driver linked to ${linkingDriver.name} successfully!`)
    setLinkingDriver(null)
    // In real implementation, link the driver to vehicle
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Fleet Management</h1>
          <p className="text-gray-400 mt-1">Manage all vehicles across Ride, Food Delivery, and Courier services</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Add Vehicle</Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vehicles, numbers, or drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Ride">Ride</SelectItem>
                <SelectItem value="Food">Food Delivery</SelectItem>
                <SelectItem value="Courier">Courier</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getVehicleIcon(vehicle.type)}
                  <CardTitle className="text-white text-lg">{vehicle.name}</CardTitle>
                </div>
                <Badge className={`${getStatusColor(vehicle.status)} text-white`}>{vehicle.status}</Badge>
              </div>
              <p className="text-gray-400 font-mono">{vehicle.number}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vehicle Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white">{vehicle.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Year</p>
                  <p className="text-white">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-gray-400">Fuel</p>
                  <p className="text-white flex items-center">
                    <Fuel className="h-3 w-3 mr-1" />
                    {vehicle.fuelType}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Color</p>
                  <p className="text-white">{vehicle.color}</p>
                </div>
              </div>

              {/* Capacity */}
              <div>
                <p className="text-gray-400 text-sm">Capacity</p>
                <p className="text-white">{vehicle.capacity}</p>
              </div>

              {/* Driver Info */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Linked Driver</p>
                  <Badge
                    variant={vehicle.driver.verified ? "default" : "secondary"}
                    className={vehicle.driver.verified ? "bg-green-600 text-white" : "bg-gray-600 text-white"}
                  >
                    {vehicle.driver.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">{vehicle.driver.name}</p>
                    <p className="text-gray-400 text-sm">UID: {vehicle.driver.uid}</p>
                  </div>
                </div>
              </div>

              {/* Last Service */}
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Last Service:</span>
                <span className="text-white">{vehicle.lastService}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => handleView(vehicle)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Vehicle Details - {vehicle.name}</DialogTitle>
                    </DialogHeader>
                    {selectedVehicle && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">Vehicle Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Name:</span>
                                <span className="text-white">{selectedVehicle.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Number:</span>
                                <span className="text-white">{selectedVehicle.number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white">{selectedVehicle.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <Badge className={`${getStatusColor(selectedVehicle.status)} text-white`}>
                                  {selectedVehicle.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">Driver Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Name:</span>
                                <span className="text-white">{selectedVehicle.driver.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">UID:</span>
                                <span className="text-white">{selectedVehicle.driver.uid}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Phone:</span>
                                <span className="text-white">{selectedVehicle.driver.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <Badge className={selectedVehicle.driver.verified ? "bg-green-600" : "bg-gray-600"}>
                                  {selectedVehicle.driver.verified ? "Verified" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => handleEdit(vehicle)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Vehicle - {vehicle.name}</DialogTitle>
                    </DialogHeader>
                    {editingVehicle && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">Vehicle Name</label>
                            <Input
                              value={editingVehicle.name}
                              onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Vehicle Number</label>
                            <Input
                              value={editingVehicle.number}
                              onChange={(e) => setEditingVehicle({ ...editingVehicle, number: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Color</label>
                            <Input
                              value={editingVehicle.color}
                              onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Status</label>
                            <Select
                              value={editingVehicle.status}
                              onValueChange={(value) => setEditingVehicle({ ...editingVehicle, status: value })}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Maintenance">Maintenance</SelectItem>
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
                            onClick={() => setEditingVehicle(null)}
                            className="border-gray-700 text-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-400 hover:bg-gray-800"
                      onClick={() => handleLinkDriver(vehicle)}
                    >
                      <Link className="h-3 w-3 mr-1" />
                      Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
                    <DialogHeader>
                      <DialogTitle>Link Driver to {vehicle.name}</DialogTitle>
                    </DialogHeader>
                    {linkingDriver && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">Driver Name</label>
                          <Input placeholder="Enter driver name" className="bg-gray-800 border-gray-700 text-white" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Driver UID</label>
                          <Input placeholder="Enter driver UID" className="bg-gray-800 border-gray-700 text-white" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Phone Number</label>
                          <Input placeholder="Enter phone number" className="bg-gray-800 border-gray-700 text-white" />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveDriverLink} className="bg-green-600 hover:bg-green-700">
                            Link Driver
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setLinkingDriver(null)}
                            className="border-gray-700 text-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
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
              <p className="text-2xl font-bold text-white">{vehicles.length}</p>
              <p className="text-gray-400 text-sm">Total Vehicles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {vehicles.filter((v) => v.status === "Active").length}
              </p>
              <p className="text-gray-400 text-sm">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {vehicles.filter((v) => v.status === "Maintenance").length}
              </p>
              <p className="text-gray-400 text-sm">Maintenance</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-400">
                {vehicles.filter((v) => v.status === "Inactive").length}
              </p>
              <p className="text-gray-400 text-sm">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

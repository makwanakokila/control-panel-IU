"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, User, Car, Search, Eye, MessageSquare, Navigation, CheckCircle, XCircle } from "lucide-react"

const rides = [
  {
    id: "TR001",
    rider: { name: "John Doe", phone: "+91-9876543210" },
    driver: { name: "Rajesh Kumar", phone: "+91-9876543211", vehicle: "Honda City - DL-01-AB-1234" },
    pickup: "Connaught Place, Delhi",
    dropoff: "IGI Airport, Delhi",
    time: "2024-01-15 14:30",
    status: "Completed",
    fare: 450,
    distance: "28.5 km",
    duration: "45 mins",
    paymentMethod: "UPI",
  },
  {
    id: "TR002",
    rider: { name: "Sarah Khan", phone: "+91-9876543212" },
    driver: { name: "Amit Singh", phone: "+91-9876543213", vehicle: "Maruti Swift - DL-02-CD-5678" },
    pickup: "Sector 18, Noida",
    dropoff: "Cyber City, Gurgaon",
    time: "2024-01-15 16:45",
    status: "Ongoing",
    fare: 380,
    distance: "32.1 km",
    duration: "52 mins",
    paymentMethod: "Cash",
  },
  {
    id: "TR003",
    rider: { name: "Mike Wilson", phone: "+91-9876543214" },
    driver: { name: "Priya Sharma", phone: "+91-9876543215", vehicle: "Honda Amaze - DL-03-EF-9012" },
    pickup: "Karol Bagh, Delhi",
    dropoff: "Lajpat Nagar, Delhi",
    time: "2024-01-15 18:20",
    status: "Cancelled",
    fare: 180,
    distance: "12.3 km",
    duration: "25 mins",
    paymentMethod: "Card",
  },
  {
    id: "TR004",
    rider: { name: "Priya Patel", phone: "+91-9876543216" },
    driver: { name: "Vikash Gupta", phone: "+91-9876543217", vehicle: "Hyundai i20 - DL-04-GH-3456" },
    pickup: "Rohini, Delhi",
    dropoff: "Dwarka, Delhi",
    time: "2024-01-15 19:15",
    status: "Ongoing",
    fare: 220,
    distance: "18.7 km",
    duration: "35 mins",
    paymentMethod: "Wallet",
  },
]

export default function RidesManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRide, setSelectedRide] = useState<string | null>(null)

  const filteredRides = rides.filter((ride) => {
    const matchesTab = activeTab === "All" || ride.status === activeTab
    const matchesSearch =
      ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600"
      case "Ongoing":
        return "bg-blue-600"
      case "Cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const selectedRideData = rides.find((ride) => ride.id === selectedRide)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Rides Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage all ride bookings</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search rides, riders, drivers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="All" className="data-[state=active]:bg-green-600">
                  All
                </TabsTrigger>
                <TabsTrigger value="Ongoing" className="data-[state=active]:bg-green-600">
                  Ongoing
                </TabsTrigger>
                <TabsTrigger value="Completed" className="data-[state=active]:bg-green-600">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="Cancelled" className="data-[state=active]:bg-green-600">
                  Cancelled
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Rides List */}
      <div className="space-y-4">
        {filteredRides.map((ride) => (
          <Card key={ride.id} className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">Ride {ride.id}</h3>
                    <p className="text-gray-400 text-sm">{ride.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${getStatusColor(ride.status)} text-white`}>{ride.status}</Badge>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">₹{ride.fare}</p>
                    <p className="text-gray-400 text-sm">{ride.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Rider & Driver Info */}
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">Rider</span>
                    </div>
                    <p className="text-white font-medium">{ride.rider.name}</p>
                    <p className="text-gray-400 text-sm">{ride.rider.phone}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Car className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">Driver</span>
                    </div>
                    <p className="text-white font-medium">{ride.driver.name}</p>
                    <p className="text-gray-400 text-sm">{ride.driver.phone}</p>
                    <p className="text-gray-400 text-xs">{ride.driver.vehicle}</p>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">Pickup</span>
                    </div>
                    <p className="text-white text-sm">{ride.pickup}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      <span className="text-red-400 font-medium">Drop-off</span>
                    </div>
                    <p className="text-white text-sm">{ride.dropoff}</p>
                  </div>
                </div>
              </div>

              {/* Trip Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Distance</p>
                  <p className="text-white font-medium">{ride.distance}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-medium">{ride.duration}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Fare</p>
                  <p className="text-white font-medium">₹{ride.fare}</p>
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
                      onClick={() => setSelectedRide(ride.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ride Details - {ride.id}</DialogTitle>
                    </DialogHeader>
                    {selectedRideData && (
                      <div className="space-y-4">
                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="bg-gray-800 border-gray-700">
                            <TabsTrigger value="details" className="data-[state=active]:bg-green-600">
                              Details
                            </TabsTrigger>
                            <TabsTrigger value="logs" className="data-[state=active]:bg-green-600">
                              Trip Logs
                            </TabsTrigger>
                            <TabsTrigger value="tracking" className="data-[state=active]:bg-green-600">
                              Live Tracking
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="details" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-white font-medium mb-2">Trip Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Ride ID:</span>
                                    <span className="text-white">{selectedRideData.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <Badge className={`${getStatusColor(selectedRideData.status)} text-white`}>
                                      {selectedRideData.status}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Distance:</span>
                                    <span className="text-white">{selectedRideData.distance}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Duration:</span>
                                    <span className="text-white">{selectedRideData.duration}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Fare:</span>
                                    <span className="text-white">₹{selectedRideData.fare}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-white font-medium mb-2">Payment Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Method:</span>
                                    <span className="text-white">{selectedRideData.paymentMethod}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Base Fare:</span>
                                    <span className="text-white">₹{Math.round(selectedRideData.fare * 0.8)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Tax:</span>
                                    <span className="text-white">₹{Math.round(selectedRideData.fare * 0.2)}</span>
                                  </div>
                                  <div className="flex justify-between font-medium">
                                    <span className="text-gray-400">Total:</span>
                                    <span className="text-white">₹{selectedRideData.fare}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="logs" className="space-y-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-3">Trip Timeline</h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <div>
                                    <p className="text-white text-sm">Ride booked</p>
                                    <p className="text-gray-400 text-xs">{selectedRideData.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <div>
                                    <p className="text-white text-sm">Driver assigned</p>
                                    <p className="text-gray-400 text-xs">2 mins after booking</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                  <div>
                                    <p className="text-white text-sm">Driver arrived at pickup</p>
                                    <p className="text-gray-400 text-xs">8 mins after booking</p>
                                  </div>
                                </div>
                                {selectedRideData.status === "Completed" && (
                                  <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <div>
                                      <p className="text-white text-sm">Trip completed</p>
                                      <p className="text-gray-400 text-xs">{selectedRideData.duration} after pickup</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="tracking" className="space-y-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-3">Live Location</h4>
                              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <MapPin className="h-12 w-12 text-green-400 mx-auto mb-2" />
                                  <p className="text-white">Live tracking map</p>
                                  <p className="text-gray-400 text-sm">Real-time location updates</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        {selectedRideData.status === "Ongoing" && (
                          <div className="flex space-x-2 pt-4 border-t border-gray-700">
                            <Button className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete Ride
                            </Button>
                            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Ride
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {ride.status === "Ongoing" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Navigation className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                )}

                <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chat
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
              <p className="text-2xl font-bold text-white">{rides.length}</p>
              <p className="text-gray-400 text-sm">Total Rides</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{rides.filter((r) => r.status === "Ongoing").length}</p>
              <p className="text-gray-400 text-sm">Ongoing</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {rides.filter((r) => r.status === "Completed").length}
              </p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{rides.filter((r) => r.status === "Cancelled").length}</p>
              <p className="text-gray-400 text-sm">Cancelled</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

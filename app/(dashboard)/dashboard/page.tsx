"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Car,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
} from "lucide-react"
import { LiveTrackingMap } from "@/components/live-tracking-map"

// Mock data for dashboard
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

const liveDrivers = [
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
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [currentTime, setCurrentTime] = useState<string | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString())
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredActivities =
    activeFilter === "All" ? recentActivities : recentActivities.filter((activity) => activity.type === activeFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Route":
        return "bg-blue-600"
      case "Pickup":
        return "bg-yellow-600"
      case "Delivery":
        return "bg-purple-600"
      case "Drop Off":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleCall = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}`)
  }

  const handleChat = (driverId: number, name: string) => {
    alert(`Opening chat with ${name}`)
  }

  const handleTrack = (driverId: number, name: string) => {
    setSelectedDriver(driverId)
  }

  return (
    <div className="w-full h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with IdharUdhar today.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">Current Time</p>
            <p className="text-xl font-mono text-green-400 font-bold">{currentTime ?? "Loading..."}</p>
          </div>
        </div>

        {/* Live Tracking Section */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center text-xl">
              <MapPin className="h-5 w-5 mr-3 text-green-400" />
              Live Driver Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Map */}
              <div className="lg:col-span-2 h-80 bg-gray-800/50 rounded-xl border border-gray-700">
                <LiveTrackingMap drivers={liveDrivers} selectedDriver={selectedDriver} />
              </div>

              {/* Driver List */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {liveDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`p-4 bg-gray-800/70 rounded-xl border transition-all duration-200 ${
                      selectedDriver === driver.id ? "border-green-500 bg-gray-800" : "border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base">{driver.name}</h4>
                        <p className="text-gray-400 text-sm">{driver.vehicle}</p>
                        <p className="text-gray-300 text-sm mt-1">{driver.location.address}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(driver.status)} text-white text-xs px-2 py-1`}>
                          {driver.status}
                        </Badge>
                        <p className="text-green-400 font-semibold text-sm mt-1">ETA: {driver.eta}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCall(driver.phone, driver.name)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs px-3 py-1 h-8"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChat(driver.id, driver.name)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs px-3 py-1 h-8"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleTrack(driver.id, driver.name)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-8"
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Today's Rides</CardTitle>
              <Car className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardStats.todayRides.count}</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{dashboardStats.todayRides.growth}% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Drivers</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardStats.totalDrivers.count}</div>
              <div className="text-xs text-gray-400 mt-1">+{dashboardStats.totalDrivers.weekly} this week</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Today's Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹{dashboardStats.todayIncome.amount.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />+{dashboardStats.todayIncome.growth}% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Completed Rides</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardStats.completedRides.count}</div>
              <div className="text-xs text-green-400 mt-1">{dashboardStats.completedRides.rate}% success rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Cancelled Rides</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardStats.cancelledRides.count}</div>
              <div className="text-xs text-red-400 mt-1">{dashboardStats.cancelledRides.rate}% cancellation rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Recent Activities</CardTitle>
              <div className="flex space-x-2">
                {["All", "Ride", "Food", "Courier"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={
                      activeFilter === filter
                        ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="outline"
                      className={`
                        ${activity.type === "Ride" ? "border-blue-500 text-blue-400 bg-blue-500/10" : ""}
                        ${activity.type === "Food" ? "border-orange-500 text-orange-400 bg-orange-500/10" : ""}
                        ${activity.type === "Courier" ? "border-purple-500 text-purple-400 bg-purple-500/10" : ""}
                      `}
                    >
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="text-white font-medium">{activity.user}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-white font-semibold">₹{activity.amount}</p>
                    <Badge
                      className={`
                        ${activity.status === "Completed" ? "bg-green-600 text-white" : ""}
                        ${activity.status === "In-progress" ? "bg-yellow-600 text-white" : ""}
                        ${activity.status === "Pending" ? "bg-gray-600 text-white" : ""}
                      `}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, User, Search, AlertCircle, CheckCircle, DollarSign, Phone, Mail } from "lucide-react"

const complaints = [
  {
    id: 1,
    customer: "John Doe",
    platform: "Uber",
    issue: "Driver was rude and took longer route",
    date: "2024-01-15 14:30",
    messageCount: 5,
    status: "Investigating",
    refundStatus: "Pending",
    priority: "High",
    amount: 250,
    messages: [
      {
        sender: "John Doe",
        message: "The driver was very rude and took a longer route than necessary.",
        time: "14:30",
      },
      {
        sender: "Support",
        message: "We apologize for the inconvenience. We are looking into this matter.",
        time: "14:45",
      },
      { sender: "John Doe", message: "I want a full refund for this trip.", time: "15:00" },
      {
        sender: "Support",
        message: "We have initiated the refund process. It will be processed within 3-5 business days.",
        time: "15:15",
      },
      { sender: "John Doe", message: "Thank you for the quick response.", time: "15:20" },
    ],
  },
  {
    id: 2,
    customer: "Sarah Khan",
    platform: "Swiggy",
    issue: "Food delivered cold and incomplete order",
    date: "2024-01-15 19:45",
    messageCount: 3,
    status: "Resolved",
    refundStatus: "Completed",
    priority: "Medium",
    amount: 180,
    messages: [
      { sender: "Sarah Khan", message: "My food was delivered cold and one item was missing.", time: "19:45" },
      {
        sender: "Support",
        message: "We sincerely apologize. We will process a full refund immediately.",
        time: "19:50",
      },
      { sender: "Sarah Khan", message: "Thank you for resolving this quickly.", time: "20:00" },
    ],
  },
  {
    id: 3,
    customer: "Mike Wilson",
    platform: "Porter",
    issue: "Package damaged during delivery",
    date: "2024-01-14 11:20",
    messageCount: 7,
    status: "Pending",
    refundStatus: "Not Applicable",
    priority: "High",
    amount: 120,
    messages: [
      {
        sender: "Mike Wilson",
        message: "My package was damaged during delivery. The box was completely crushed.",
        time: "11:20",
      },
      {
        sender: "Support",
        message: "We are sorry to hear about the damage. Can you please share photos of the damaged package?",
        time: "11:30",
      },
      { sender: "Mike Wilson", message: "I have attached the photos. This is unacceptable service.", time: "11:45" },
    ],
  },
  {
    id: 4,
    customer: "Priya Sharma",
    platform: "Uber",
    issue: "Overcharged for the trip",
    date: "2024-01-14 16:15",
    messageCount: 4,
    status: "Refunded",
    refundStatus: "Completed",
    priority: "Low",
    amount: 320,
    messages: [
      { sender: "Priya Sharma", message: "I was charged ₹320 for a trip that should have cost ₹200.", time: "16:15" },
      { sender: "Support", message: "Let us review your trip details and fare calculation.", time: "16:30" },
      { sender: "Support", message: "You are correct. We have processed a refund of ₹120.", time: "17:00" },
      { sender: "Priya Sharma", message: "Thank you for the refund.", time: "17:15" },
    ],
  },
]

export default function ComplaintManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesTab = activeTab === "All" || complaint.status === activeTab
    const matchesSearch =
      complaint.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.platform.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-600"
      case "Investigating":
        return "bg-yellow-600"
      case "Pending":
        return "bg-red-600"
      case "Refunded":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Uber":
        return "bg-black text-white"
      case "Swiggy":
        return "bg-orange-600 text-white"
      case "Porter":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Complaint Management</h1>
          <p className="text-gray-400 mt-1">Manage customer complaints across all platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Customer Complaints</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-gray-800 border-gray-700">
                  <TabsTrigger value="All" className="data-[state=active]:bg-green-600">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="Pending" className="data-[state=active]:bg-green-600">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="Investigating" className="data-[state=active]:bg-green-600">
                    Investigating
                  </TabsTrigger>
                  <TabsTrigger value="Resolved" className="data-[state=active]:bg-green-600">
                    Resolved
                  </TabsTrigger>
                  <TabsTrigger value="Refunded" className="data-[state=active]:bg-green-600">
                    Refunded
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className={`p-4 bg-gray-800 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedComplaint === complaint.id
                          ? "border-green-500"
                          : "border-transparent hover:border-gray-700"
                      }`}
                      onClick={() => setSelectedComplaint(complaint.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{complaint.customer}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getPlatformColor(complaint.platform)}>{complaint.platform}</Badge>
                              <span className={`text-sm ${getPriorityColor(complaint.priority)}`}>
                                {complaint.priority} Priority
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(complaint.status)} text-white mb-1`}>
                            {complaint.status}
                          </Badge>
                          <p className="text-gray-400 text-xs">{complaint.date}</p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{complaint.issue}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">{complaint.messageCount} messages</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">₹{complaint.amount}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              complaint.refundStatus === "Completed"
                                ? "border-green-500 text-green-400"
                                : complaint.refundStatus === "Pending"
                                  ? "border-yellow-500 text-yellow-400"
                                  : "border-gray-500 text-gray-400"
                            }`}
                          >
                            {complaint.refundStatus}
                          </Badge>
                          {complaint.status === "Investigating" && (
                            <Badge className="bg-green-600 text-white text-xs">Live Support</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Detail Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedComplaint ? "Complaint Details" : "Select a Complaint"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedComplaint ? (
                <div className="space-y-4">
                  {(() => {
                    const complaint = complaints.find((c) => c.id === selectedComplaint)
                    if (!complaint) return null

                    return (
                      <>
                        {/* Customer Info */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Name:</span>
                              <span className="text-white">{complaint.customer}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Platform:</span>
                              <Badge className={getPlatformColor(complaint.platform)}>{complaint.platform}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Amount:</span>
                              <span className="text-white">₹{complaint.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Issue Summary */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Issue Summary</h4>
                          <p className="text-gray-300 text-sm">{complaint.issue}</p>
                        </div>

                        {/* Chat History */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Chat History</h4>
                          <ScrollArea className="h-64">
                            <div className="space-y-3">
                              {complaint.messages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`p-2 rounded text-sm ${
                                    message.sender === "Support"
                                      ? "bg-green-600/20 border-l-2 border-green-500"
                                      : "bg-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-white">{message.sender}</span>
                                    <span className="text-xs text-gray-400">{message.time}</span>
                                  </div>
                                  <p className="text-gray-300">{message.message}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply to Customer
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:bg-gray-800"
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:bg-gray-800"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                          </div>
                          {complaint.status !== "Resolved" && complaint.status !== "Refunded" && (
                            <Button
                              variant="outline"
                              className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </Button>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a complaint to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{complaints.length}</p>
              <p className="text-gray-400 text-sm">Total Complaints</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">
                {complaints.filter((c) => c.status === "Pending").length}
              </p>
              <p className="text-gray-400 text-sm">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {complaints.filter((c) => c.status === "Resolved" || c.status === "Refunded").length}
              </p>
              <p className="text-gray-400 text-sm">Resolved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {complaints.filter((c) => c.refundStatus === "Completed").length}
              </p>
              <p className="text-gray-400 text-sm">Refunded</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

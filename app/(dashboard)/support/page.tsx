"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeadphonesIcon, MessageSquare, Phone, Mail, Clock, User, AlertCircle, CheckCircle } from "lucide-react"

const supportTickets = [
  {
    id: "SUP001",
    user: "John Doe",
    userType: "Customer",
    subject: "Payment not processed",
    priority: "High",
    status: "Open",
    category: "Payment",
    createdAt: "2024-01-15 14:30",
    lastUpdate: "2024-01-15 16:45",
    assignedTo: "Sarah Wilson",
    messages: [
      { sender: "John Doe", message: "My payment was deducted but ride wasn't confirmed", time: "14:30" },
      {
        sender: "Sarah Wilson",
        message: "I'm looking into this issue. Can you provide the transaction ID?",
        time: "14:45",
      },
      { sender: "John Doe", message: "Transaction ID: TXN123456789", time: "15:00" },
    ],
  },
  {
    id: "SUP002",
    user: "Rajesh Kumar",
    userType: "Driver",
    subject: "Account verification pending",
    priority: "Medium",
    status: "In Progress",
    category: "Account",
    createdAt: "2024-01-14 10:20",
    lastUpdate: "2024-01-15 09:15",
    assignedTo: "Mike Johnson",
    messages: [
      {
        sender: "Rajesh Kumar",
        message: "My documents were uploaded 3 days ago but still pending verification",
        time: "10:20",
      },
      {
        sender: "Mike Johnson",
        message: "We're reviewing your documents. You'll hear back within 24 hours.",
        time: "11:30",
      },
    ],
  },
  {
    id: "SUP003",
    user: "Pizza Palace",
    userType: "Vendor",
    subject: "Commission rate inquiry",
    priority: "Low",
    status: "Resolved",
    category: "Billing",
    createdAt: "2024-01-13 16:45",
    lastUpdate: "2024-01-14 12:20",
    assignedTo: "Lisa Chen",
    messages: [
      { sender: "Pizza Palace", message: "Can you explain the commission structure for food delivery?", time: "16:45" },
      {
        sender: "Lisa Chen",
        message: "Our commission is 15% for food delivery. I'll send you the detailed breakdown.",
        time: "17:00",
      },
      { sender: "Pizza Palace", message: "Thank you for the clarification!", time: "17:15" },
    ],
  },
]

const supportStats = {
  totalTickets: 156,
  openTickets: 23,
  resolvedToday: 18,
  averageResponseTime: "2.5 hours",
}

export default function SupportManagement() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesStatus = filterStatus === "All" || ticket.status === filterStatus
    const matchesPriority = filterPriority === "All" || ticket.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-600"
      case "In Progress":
        return "bg-yellow-600"
      case "Resolved":
        return "bg-green-600"
      case "Closed":
        return "bg-gray-600"
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

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTicket) {
      alert(`Message sent to ${selectedTicket.user}: ${newMessage}`)
      setNewMessage("")
      // In real implementation, send message and update ticket
    }
  }

  const handleCall = (ticket: any) => {
    alert(`Initiating call to ${ticket.user}`)
    // In real implementation, integrate with VoIP service
  }

  const handleEmail = (ticket: any) => {
    alert(`Opening email to ${ticket.user}`)
    // In real implementation, open email client
  }

  const handleStatusChange = (ticket: any, newStatus: string) => {
    alert(`Ticket ${ticket.id} status changed to ${newStatus}`)
    // In real implementation, update ticket status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Support Management</h1>
          <p className="text-gray-400 mt-1">Manage customer support tickets and communications</p>
        </div>
        {/* <Button className="bg-green-600 hover:bg-green-700 text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Ticket
        </Button> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Tickets</CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{supportStats.totalTickets}</div>
            <div className="text-xs text-gray-400">All time</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{supportStats.openTickets}</div>
            <div className="text-xs text-red-400">Requires attention</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{supportStats.resolvedToday}</div>
            <div className="text-xs text-green-400">Great progress!</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{supportStats.averageResponseTime}</div>
            <div className="text-xs text-blue-400">Within SLA</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 bg-gray-800 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id ? "border-green-500" : "border-transparent hover:border-gray-700"
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">{ticket.subject}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {ticket.id}
                          </Badge>
                          <Badge className={`${getStatusColor(ticket.status)} text-white`}>{ticket.status}</Badge>
                          <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{ticket.createdAt}</p>
                        <p className="text-gray-500 text-xs">Updated: {ticket.lastUpdate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{ticket.user}</span>
                        <span className="text-gray-400 text-sm">({ticket.userType})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Assigned to:</span>
                        <span className="text-white text-sm">{ticket.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedTicket ? `Ticket ${selectedTicket.id}` : "Select a Ticket"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTicket ? (
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger value="details" className="data-[state=active]:bg-green-600">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="data-[state=active]:bg-green-600">
                      Messages
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Ticket Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subject:</span>
                          <span className="text-white">{selectedTicket.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{selectedTicket.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Priority:</span>
                          <span className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <Badge className={`${getStatusColor(selectedTicket.status)} text-white`}>
                            {selectedTicket.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleCall(selectedTicket)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button
                        onClick={() => handleEmail(selectedTicket)}
                        variant="outline"
                        className="w-full border-gray-700 text-gray-400 hover:bg-gray-800"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Change Status</label>
                      <Select
                        value={selectedTicket.status}
                        onValueChange={(value) => handleStatusChange(selectedTicket, value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="messages" className="space-y-4">
                    <div className="bg-gray-800 p-3 rounded-lg max-h-64 overflow-y-auto">
                      <div className="space-y-3">
                        {selectedTicket.messages.map((message: any, index: number) => (
                          <div
                            key={index}
                            className={`p-2 rounded text-sm ${
                              message.sender === selectedTicket.user
                                ? "bg-gray-700"
                                : "bg-green-600/20 border-l-2 border-green-500"
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
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        rows={3}
                      />
                      <Button onClick={handleSendMessage} className="w-full bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8">
                  <HeadphonesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a ticket to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

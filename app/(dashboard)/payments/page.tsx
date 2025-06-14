"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Search, Eye, Download, RefreshCw, DollarSign, TrendingUp, Users, Calendar } from "lucide-react"

const payments = [
  {
    id: "PAY001",
    user: "John Doe",
    userType: "Customer",
    amount: 450,
    type: "Ride Payment",
    method: "UPI",
    status: "Completed",
    date: "2024-01-15 14:30",
    transactionId: "TXN123456789",
    commission: 45,
  },
  {
    id: "PAY002",
    user: "Rajesh Kumar",
    userType: "Driver",
    amount: 2340,
    type: "Weekly Payout",
    method: "Bank Transfer",
    status: "Processing",
    date: "2024-01-15 10:00",
    transactionId: "TXN123456790",
    commission: 234,
  },
  {
    id: "PAY003",
    user: "anata square",
    userType: "Vendor",
    amount: 1200,
    type: "Order Payment",
    method: "Wallet",
    status: "Completed",
    date: "2024-01-15 16:45",
    transactionId: "TXN123456791",
    commission: 120,
  },
  {
    id: "PAY004",
    user: "mahi panchal",
    userType: "Customer",
    amount: 180,
    type: "Order Payment",
    method: "Card",
    status: "Failed",
    date: "2024-01-15 12:20",
    transactionId: "TXN123456792",
    commission: 18,
  },
  {
    id: "PAY005",
    user: "Amit Singh",
    userType: "Driver",
    amount: 1890,
    type: "Daily Payout",
    method: "UPI",
    status: "Completed",
    date: "2024-01-15 18:00",
    transactionId: "TXN123456793",
    commission: 189,
  },
]

const paymentStats = {
  totalRevenue: 125670,
  totalCommission: 12567,
  totalPayouts: 89340,
  pendingPayments: 23,
}

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || payment.type.includes(typeFilter)
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600"
      case "Processing":
        return "bg-yellow-600"
      case "Failed":
        return "bg-red-600"
      case "Pending":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeColor = (type: string) => {
    if (type.includes("Payout")) return "border-green-500 text-green-400"
    if (type.includes("Payment") || type.includes("Order")) return "border-blue-500 text-blue-400"
    return "border-gray-500 text-gray-400"
  }

  const handleView = (payment: any) => {
    setSelectedPayment(payment)
  }

  const handleRefund = (payment: any) => {
    if (confirm(`Are you sure you want to refund ₹${payment.amount} to ${payment.user}?`)) {
      alert(`Refund of ₹${payment.amount} initiated for ${payment.user}`)
      // In real implementation, process refund
    }
  }

  const handleRetry = (payment: any) => {
    if (confirm(`Retry payment of ₹${payment.amount} for ${payment.user}?`)) {
      alert(`Payment retry initiated for ${payment.user}`)
      // In real implementation, retry payment
    }
  }

  const handleExport = () => {
    alert("Exporting payment data...")
    // In real implementation, export to CSV/Excel
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage all payments and payouts</p>
        </div>
        {/* <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{paymentStats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Commission Earned</CardTitle>
            <CreditCard className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{paymentStats.totalCommission.toLocaleString()}</div>
            <div className="text-xs text-gray-400">10% average commission</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Payouts</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{paymentStats.totalPayouts.toLocaleString()}</div>
            <div className="text-xs text-gray-400">To drivers and vendors</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Payments</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{paymentStats.pendingPayments}</div>
            <div className="text-xs text-yellow-400">Requires attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by payment ID, user, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Payment">Payments</SelectItem>
                <SelectItem value="Payout">Payouts</SelectItem>
                <SelectItem value="Order">Orders</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{payment.id}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getTypeColor(payment.type)}>
                        {payment.type}
                      </Badge>
                      <Badge className={`${getStatusColor(payment.status)} text-white`}>{payment.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">₹{payment.amount.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">{payment.method}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">User Details</span>
                  </div>
                  <p className="text-white font-medium">{payment.user}</p>
                  <p className="text-gray-400 text-sm">{payment.userType}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-medium">Transaction</span>
                  </div>
                  <p className="text-white text-sm">{payment.transactionId}</p>
                  <p className="text-gray-400 text-xs">{payment.date}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400 font-medium">Commission</span>
                  </div>
                  <p className="text-white font-medium">₹{payment.commission}</p>
                  <p className="text-gray-400 text-xs">
                    {((payment.commission / payment.amount) * 100).toFixed(1)}% of total
                  </p>
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
                      onClick={() => handleView(payment)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Payment Details - {payment.id}</DialogTitle>
                    </DialogHeader>
                    {selectedPayment && (
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="bg-gray-800 border-gray-700">
                          <TabsTrigger value="details" className="data-[state=active]:bg-green-600">
                            Details
                          </TabsTrigger>
                          <TabsTrigger value="history" className="data-[state=active]:bg-green-600">
                            History
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Payment Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Payment ID:</span>
                                  <span className="text-white">{selectedPayment.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Amount:</span>
                                  <span className="text-white">₹{selectedPayment.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Method:</span>
                                  <span className="text-white">{selectedPayment.method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Status:</span>
                                  <Badge className={`${getStatusColor(selectedPayment.status)} text-white`}>
                                    {selectedPayment.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Transaction Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Transaction ID:</span>
                                  <span className="text-white">{selectedPayment.transactionId}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Date:</span>
                                  <span className="text-white">{selectedPayment.date}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Commission:</span>
                                  <span className="text-white">₹{selectedPayment.commission}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Net Amount:</span>
                                  <span className="text-white">
                                    ₹{selectedPayment.amount - selectedPayment.commission}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="history" className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-3">Payment Timeline</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">Payment initiated</p>
                                  <p className="text-gray-400 text-xs">{selectedPayment.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">Payment processed</p>
                                  <p className="text-gray-400 text-xs">2 mins after initiation</p>
                                </div>
                              </div>
                              {selectedPayment.status === "Completed" && (
                                <div className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <div>
                                    <p className="text-white text-sm">Payment completed</p>
                                    <p className="text-gray-400 text-xs">5 mins after initiation</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </DialogContent>
                </Dialog>

                {/* {payment.status === "Completed" && payment.type.includes("Payment") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRefund(payment)}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refund
                  </Button>
                )} */}

                {payment.status === "Failed" && (
                  <Button size="sm" onClick={() => handleRetry(payment)} className="bg-green-600 hover:bg-green-700">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Retry
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Download, DollarSign, Users, Car, Package } from "lucide-react"

const earningsData = [
  { month: "Jan", earnings: 45000, rides: 1200 },
  { month: "Feb", earnings: 52000, rides: 1350 },
  { month: "Mar", earnings: 48000, rides: 1280 },
  { month: "Apr", earnings: 61000, rides: 1520 },
  { month: "May", earnings: 55000, rides: 1400 },
  { month: "Jun", earnings: 67000, rides: 1650 },
]

const hourlyData = [
  { hour: "6AM", earnings: 2500 },
  { hour: "9AM", earnings: 4200 },
  { hour: "12PM", earnings: 5800 },
  { hour: "3PM", earnings: 4100 },
  { hour: "6PM", earnings: 6200 },
  { hour: "9PM", earnings: 3800 },
  { hour: "12AM", earnings: 1500 },
]

const serviceData = [
  { name: "Ride", value: 45, color: "#10b981" },
  { name: "Food", value: 35, color: "#f59e0b" },
  { name: "Courier", value: 20, color: "#8b5cf6" },
]

const reportStats = {
  totalEarnings: 328000,
  totalRides: 8400,
  averagePerRide: 390,
  cancellationRate: 4.2,
}

export default function ReportsManagement() {
  const [dateRange, setDateRange] = useState<any>(null)
  const [selectedDriver, setSelectedDriver] = useState("All")
  const [reportType, setReportType] = useState("earnings")

  const handleExport = (type: string) => {
    alert(`Exporting ${type} report...`)
    // In real implementation, export to CSV/Excel/PDF
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleExport("earnings")} variant="outline" className="border-gray-700 text-gray-400">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => handleExport("excel")} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <DatePickerWithRange
              value={dateRange}
              onChange={setDateRange}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger className="w-[200px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select Driver" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="All">All Drivers</SelectItem>
                <SelectItem value="DR001">Rajesh Kumar</SelectItem>
                <SelectItem value="DR002">Amit Singh</SelectItem>
                <SelectItem value="DR003">Suresh Yadav</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[200px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="earnings">Earnings Report</SelectItem>
                <SelectItem value="rides">Rides Report</SelectItem>
                <SelectItem value="drivers">Driver Report</SelectItem>
                <SelectItem value="customers">Customer Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{reportStats.totalEarnings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Rides</CardTitle>
            <Car className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{reportStats.totalRides.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Across all services</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Average per Ride</CardTitle>
            <Package className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{reportStats.averagePerRide}</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.4% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Cancellation Rate</CardTitle>
            <Users className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{reportStats.cancellationRate}%</div>
            <div className="text-xs text-red-400">-1.2% from last period</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Overview */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "hsl(var(--chart-1))",
                },
                rides: {
                  label: "Rides",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="earnings" stroke="var(--color-earnings)" strokeWidth={2} />
                  <Line type="monotone" dataKey="rides" stroke="var(--color-rides)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Earnings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Earnings by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="earnings" fill="var(--color-earnings)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Driver Efficiency</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-white">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Customer Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <span className="text-white">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">On-time Delivery</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                  <span className="text-white">88%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Revenue Growth</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                  </div>
                  <span className="text-white">76%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Detailed Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-2">Date</th>
                  <th className="text-left text-gray-400 pb-2">Service</th>
                  <th className="text-left text-gray-400 pb-2">Rides</th>
                  <th className="text-left text-gray-400 pb-2">Earnings</th>
                  <th className="text-left text-gray-400 pb-2">Commission</th>
                  <th className="text-left text-gray-400 pb-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">2024-01-15</td>
                  <td className="py-2 text-white">Ride</td>
                  <td className="py-2 text-white">145</td>
                  <td className="py-2 text-white">₹12,450</td>
                  <td className="py-2 text-white">₹1,245</td>
                  <td className="py-2 text-green-400">+8.2%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">2024-01-15</td>
                  <td className="py-2 text-white">Food</td>
                  <td className="py-2 text-white">89</td>
                  <td className="py-2 text-white">₹8,900</td>
                  <td className="py-2 text-white">₹890</td>
                  <td className="py-2 text-green-400">+12.5%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">2024-01-15</td>
                  <td className="py-2 text-white">Courier</td>
                  <td className="py-2 text-white">34</td>
                  <td className="py-2 text-white">₹3,400</td>
                  <td className="py-2 text-white">₹340</td>
                  <td className="py-2 text-red-400">-2.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from "lucide-react";

export default function Reports() {
  const revenueData = [
    { month: "T1", revenue: 12000000, orders: 150 },
    { month: "T2", revenue: 15000000, orders: 180 },
    { month: "T3", revenue: 18000000, orders: 220 },
    { month: "T4", revenue: 14000000, orders: 170 },
    { month: "T5", revenue: 22000000, orders: 280 },
    { month: "T6", revenue: 25000000, orders: 320 },
  ];

  const topMedicines = [
    { name: "Paracetamol", sales: 1200, revenue: 2400000 },
    { name: "Vitamin C", sales: 950, revenue: 1425000 },
    { name: "Amoxicillin", sales: 800, revenue: 2800000 },
    { name: "Ibuprofen", sales: 650, revenue: 1950000 },
    { name: "Aspirin", sales: 500, revenue: 1000000 },
  ];

  const categoryData = [
    { name: "Giảm đau", value: 35, color: "#0088FE" },
    { name: "Kháng sinh", value: 28, color: "#00C49F" },
    { name: "Vitamin", value: 20, color: "#FFBB28" },
    { name: "Tiêu hóa", value: 17, color: "#FF8042" },
  ];

  const stats = [
    {
      title: "Doanh thu tháng này",
      value: "25M ₫",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Số đơn hàng",
      value: "320",
      change: "+8%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Sản phẩm bán",
      value: "1,250",
      change: "+12%",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Khách hàng mới",
      value: "45",
      change: "-5%",
      trend: "down",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-gray-600">Phân tích dữ liệu kinh doanh và hiệu suất</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="text-gray-500">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
            <CardDescription>Biểu đồ doanh thu và số lượng đơn hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === "revenue" ? `${Number(value).toLocaleString()} ₫` : value,
                    name === "revenue" ? "Doanh thu" : "Số đơn hàng"
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Medicines */}
        <Card>
          <CardHeader>
            <CardTitle>Top thuốc bán chạy</CardTitle>
            <CardDescription>5 sản phẩm có doanh số cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-sm text-gray-500">{medicine.sales} đã bán</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{medicine.revenue.toLocaleString()} ₫</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ bán hàng theo từng danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo chi tiết</CardTitle>
          <CardDescription>Các báo cáo chuyên sâu khác</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Báo cáo tồn kho</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Phân tích khách hàng</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Báo cáo nhập hàng</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

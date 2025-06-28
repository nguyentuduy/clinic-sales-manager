
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, ShoppingCart, AlertTriangle, TrendingUp, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const stats = [
    {
      title: "Tổng số thuốc",
      value: "1,234",
      change: "+12%",
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Đơn hàng hôm nay",
      value: "89",
      change: "+5%",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Doanh thu hôm nay",
      value: "12.5M ₫",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Khách hàng",
      value: "456",
      change: "+3%",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const alerts = [
    { id: 1, message: "5 loại thuốc sắp hết hạn trong 30 ngày", type: "warning" },
    { id: 2, message: "Tồn kho thấp: 12 sản phẩm dưới mức tối thiểu", type: "error" },
    { id: 3, message: "Đơn hàng mới cần xử lý", type: "info" },
  ];

  const recentOrders = [
    { id: "#001", customer: "Nguyễn Văn A", total: "450,000 ₫", status: "Hoàn thành", time: "10:30" },
    { id: "#002", customer: "Trần Thị B", total: "320,000 ₫", status: "Đang xử lý", time: "11:15" },
    { id: "#003", customer: "Lê Văn C", total: "780,000 ₫", status: "Hoàn thành", time: "12:00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hệ thống quản lý nhà thuốc</p>
        </div>
        <Button className="medical-gradient text-white">
          <Package className="w-4 h-4 mr-2" />
          Nhập hàng mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">
                {stat.change} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Cảnh báo
            </CardTitle>
            <CardDescription>Thông báo quan trọng cần xử lý</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === "error"
                    ? "border-red-500 bg-red-50"
                    : alert.type === "warning"
                    ? "border-amber-500 bg-amber-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>Các đơn hàng trong ngày hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.total}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                    <Badge
                      variant={order.status === "Hoàn thành" ? "default" : "secondary"}
                      className={
                        order.status === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>Các chức năng thường sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Pill className="h-6 w-6" />
              <span>Thêm thuốc mới</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ShoppingCart className="h-6 w-6" />
              <span>Tạo đơn hàng</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Thêm khách hàng</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Nhập hàng</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

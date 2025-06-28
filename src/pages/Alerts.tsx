
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, CheckCircle, XCircle, Bell, Package, Calendar, TrendingDown } from "lucide-react";

export default function Alerts() {
  const [filter, setFilter] = useState("all");

  const alerts = [
    {
      id: 1,
      type: "stock",
      priority: "high",
      title: "Tồn kho thấp",
      message: "12 sản phẩm dưới mức tối thiểu",
      details: "Paracetamol 500mg (5 còn lại), Vitamin C (8 còn lại), Amoxicillin (3 còn lại)...",
      time: "2024-01-15 14:30",
      status: "active",
      action: "Cần nhập hàng ngay"
    },
    {
      id: 2,
      type: "expiry",
      priority: "critical",
      title: "Thuốc sắp hết hạn",
      message: "5 loại thuốc hết hạn trong 30 ngày",
      details: "Ibuprofen (hết hạn 25/01/2024), Aspirin (hết hạn 28/01/2024)...",
      time: "2024-01-15 10:15",
      status: "active",
      action: "Xử lý khuyến mãi hoặc trả lại"
    },
    {
      id: 3,
      type: "order",
      priority: "medium",
      title: "Đơn hàng chờ xử lý",
      message: "8 đơn hàng chờ xử lý quá 2 giờ",
      details: "Đơn hàng #ORD-001, #ORD-003, #ORD-007...",
      time: "2024-01-15 12:45",
      status: "active",
      action: "Xử lý đơn hàng"
    },
    {
      id: 4,
      type: "system",
      priority: "low",
      title: "Cập nhật hệ thống",
      message: "Có bản cập nhật mới cho hệ thống",
      details: "Phiên bản 2.1.0 với các tính năng mới và sửa lỗi",
      time: "2024-01-15 09:00",
      status: "resolved",
      action: "Đã xử lý"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Khẩn cấp</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Thấp</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800">Đang hoạt động</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Đã xử lý</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <Package className="h-5 w-5 text-orange-500" />;
      case "expiry":
        return <Calendar className="h-5 w-5 text-red-500" />;
      case "order":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "all") return true;
    if (filter === "active") return alert.status === "active";
    if (filter === "resolved") return alert.status === "resolved";
    return alert.priority === filter;
  });

  const activeAlerts = alerts.filter(alert => alert.status === "active").length;
  const criticalAlerts = alerts.filter(alert => alert.priority === "critical" && alert.status === "active").length;

  const stats = [
    { title: "Tổng cảnh báo", value: alerts.length.toString(), color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Đang hoạt động", value: activeAlerts.toString(), color: "text-red-600", bg: "bg-red-100" },
    { title: "Khẩn cấp", value: criticalAlerts.toString(), color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Đã xử lý hôm nay", value: "3", color: "text-green-600", bg: "bg-green-100" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cảnh báo & Thông báo</h1>
          <p className="text-gray-600">Theo dõi các cảnh báo quan trọng của hệ thống</p>
        </div>
        <Button className="medical-gradient text-white">
          <CheckCircle className="w-4 h-4 mr-2" />
          Đánh dấu đã đọc tất cả
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Lọc cảnh báo</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="resolved">Đã xử lý</SelectItem>
              <SelectItem value="critical">Khẩn cấp</SelectItem>
              <SelectItem value="high">Ưu tiên cao</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`${alert.status === "active" ? "border-l-4 border-l-red-500" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription className="text-base">{alert.message}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(alert.priority)}
                  {getStatusBadge(alert.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <strong>Chi tiết:</strong> {alert.details}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {new Date(alert.time).toLocaleString('vi-VN')}
                  </div>
                  <div className="flex items-center gap-2">
                    {alert.status === "active" ? (
                      <>
                        <Button size="sm" className="medical-gradient text-white">
                          {alert.action}
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Đánh dấu đã xử lý
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Đã xử lý
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có cảnh báo</h3>
              <p className="text-gray-500">Tất cả cảnh báo đã được xử lý hoặc không có cảnh báo nào phù hợp với bộ lọc.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

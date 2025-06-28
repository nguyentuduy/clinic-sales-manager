
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Eye, Edit, Trash2, User, Phone, MapPin, Calendar } from "lucide-react";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUS-001",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      totalOrders: 15,
      totalSpent: 2500000,
      lastOrder: "2024-01-15",
      type: "vip",
      joinDate: "2023-05-12"
    },
    {
      id: "CUS-002",
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@email.com",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      totalOrders: 8,
      totalSpent: 1200000,
      lastOrder: "2024-01-12",
      type: "regular",
      joinDate: "2023-08-20"
    },
    {
      id: "CUS-003",
      name: "Lê Văn C",
      phone: "0456789123",
      email: "levanc@email.com",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      totalOrders: 3,
      totalSpent: 450000,
      lastOrder: "2024-01-10",
      type: "new",
      joinDate: "2023-12-01"
    }
  ];

  const getCustomerTypeBadge = (type: string) => {
    switch (type) {
      case "vip":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>;
      case "regular":
        return <Badge className="bg-blue-100 text-blue-800">Thường xuyên</Badge>;
      case "new":
        return <Badge className="bg-green-100 text-green-800">Mới</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: "Tổng khách hàng", value: "1,234", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Khách hàng VIP", value: "89", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Mới tháng này", value: "45", color: "text-green-600", bg: "bg-green-100" },
    { title: "Tổng chi tiêu", value: "125M ₫", color: "text-orange-600", bg: "bg-orange-100" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý khách hàng</h1>
          <p className="text-gray-600">Theo dõi và quản lý thông tin khách hàng</p>
        </div>
        <Button className="medical-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm khách hàng
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

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>
            Hiển thị {filteredCustomers.length} trên tổng số {customers.length} khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã KH</TableHead>
                  <TableHead>Thông tin khách hàng</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Tổng đơn hàng</TableHead>
                  <TableHead>Tổng chi tiêu</TableHead>
                  <TableHead>Đơn hàng cuối</TableHead>
                  <TableHead>Loại KH</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{customer.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-sm">{customer.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">{customer.totalSpent.toLocaleString()} ₫</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(customer.lastOrder).toLocaleDateString('vi-VN')}
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerTypeBadge(customer.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

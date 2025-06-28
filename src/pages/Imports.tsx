
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Eye, Edit, Trash2, Package, Calendar, Building } from "lucide-react";

export default function Imports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const imports = [
    {
      id: "IMP-001",
      supplier: "Công ty Dược phẩm A",
      contact: "0123456789",
      totalAmount: 15000000,
      totalItems: 25,
      status: "completed",
      date: "2024-01-15",
      deliveryDate: "2024-01-18",
      invoiceNumber: "HD001"
    },
    {
      id: "IMP-002",
      supplier: "Công ty Dược phẩm B",
      contact: "0987654321",
      totalAmount: 8500000,
      totalItems: 15,
      status: "pending",
      date: "2024-01-14",
      deliveryDate: "2024-01-17",
      invoiceNumber: "HD002"
    },
    {
      id: "IMP-003",
      supplier: "Công ty Dược phẩm C",
      contact: "0456789123",
      totalAmount: 22000000,
      totalItems: 40,
      status: "processing",
      date: "2024-01-13",
      deliveryDate: "2024-01-16",
      invoiceNumber: "HD003"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Đang xử lý</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const filteredImports = imports.filter(importItem => {
    const matchesSearch = importItem.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         importItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || importItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: "Tổng đơn nhập", value: "456", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Tháng này", value: "23", color: "text-green-600", bg: "bg-green-100" },
    { title: "Đang xử lý", value: "5", color: "text-yellow-600", bg: "bg-yellow-100" },
    { title: "Giá trị nhập", value: "245M ₫", color: "text-purple-600", bg: "bg-purple-100" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý nhập hàng</h1>
          <p className="text-gray-600">Theo dõi và quản lý các đơn nhập hàng</p>
        </div>
        <Button className="medical-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tạo đơn nhập hàng
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

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm đơn nhập hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo mã đơn nhập hoặc nhà cung cấp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Imports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn nhập hàng</CardTitle>
          <CardDescription>
            Hiển thị {filteredImports.length} trên tổng số {imports.length} đơn nhập hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn nhập</TableHead>
                  <TableHead>Nhà cung cấp</TableHead>
                  <TableHead>Số hóa đơn</TableHead>
                  <TableHead>Số lượng SP</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Ngày giao</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredImports.map((importItem) => (
                  <TableRow key={importItem.id}>
                    <TableCell className="font-medium">{importItem.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{importItem.supplier}</div>
                          <div className="text-sm text-gray-500">{importItem.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{importItem.invoiceNumber}</TableCell>
                    <TableCell>{importItem.totalItems} sản phẩm</TableCell>
                    <TableCell className="font-medium">{importItem.totalAmount.toLocaleString()} ₫</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(importItem.date).toLocaleDateString('vi-VN')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4 text-gray-400" />
                        {new Date(importItem.deliveryDate).toLocaleDateString('vi-VN')}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(importItem.status)}</TableCell>
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

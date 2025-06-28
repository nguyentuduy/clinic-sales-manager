
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, AlertTriangle, Package } from "lucide-react";

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState("");

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Giảm đau",
      unit: "Viên",
      price: 2000,
      stock: 150,
      minStock: 50,
      expiry: "2025-12-31",
      supplier: "Công ty A",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Kháng sinh",
      unit: "Viên",
      price: 3500,
      stock: 80,
      minStock: 30,
      expiry: "2024-08-15",
      supplier: "Công ty B",
    },
    {
      id: 3,
      name: "Vitamin C 1000mg",
      category: "Vitamin",
      unit: "Viên",
      price: 1500,
      stock: 25,
      minStock: 50,
      expiry: "2025-06-30",
      supplier: "Công ty C",
    },
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) return { label: "Tồn kho thấp", variant: "destructive" as const };
    if (stock <= minStock * 2) return { label: "Sắp hết", variant: "secondary" as const };
    return { label: "Đủ hàng", variant: "default" as const };
  };

  const isExpiringSoon = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90; // Cảnh báo nếu hết hạn trong 90 ngày
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thuốc</h1>
          <p className="text-gray-600">Quản lý kho thuốc và theo dõi tồn kho</p>
        </div>
        <Button className="medical-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm thuốc mới
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm thuốc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên thuốc hoặc loại thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Lọc theo loại
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng số thuốc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sắp hết hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tồn kho thấp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Giá trị kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245M ₫</div>
          </CardContent>
        </Card>
      </div>

      {/* Medicines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thuốc</CardTitle>
          <CardDescription>
            Hiển thị {filteredMedicines.length} trên tổng số {medicines.length} thuốc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên thuốc</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Đơn vị</TableHead>
                  <TableHead>Giá bán</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Hạn sử dụng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.stock, medicine.minStock);
                  const expiringSoon = isExpiringSoon(medicine.expiry);
                  
                  return (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {expiringSoon && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                          {medicine.name}
                        </div>
                      </TableCell>
                      <TableCell>{medicine.category}</TableCell>
                      <TableCell>{medicine.unit}</TableCell>
                      <TableCell>{medicine.price.toLocaleString()} ₫</TableCell>
                      <TableCell>
                        <span className={medicine.stock <= medicine.minStock ? "text-red-600 font-medium" : ""}>
                          {medicine.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={expiringSoon ? "text-amber-600 font-medium" : ""}>
                          {new Date(medicine.expiry).toLocaleDateString('vi-VN')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

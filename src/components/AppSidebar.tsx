
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Pill,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Home,
  AlertTriangle,
} from "lucide-react";

const menuItems = [
  { title: "Trang chủ", url: "/", icon: Home },
  { title: "Quản lý thuốc", url: "/medicines", icon: Pill },
  { title: "Đơn hàng", url: "/orders", icon: ShoppingCart },
  { title: "Nhập hàng", url: "/imports", icon: Package },
  { title: "Khách hàng", url: "/customers", icon: Users },
  { title: "Báo cáo", url: "/reports", icon: BarChart3 },
  { title: "Cảnh báo", url: "/alerts", icon: AlertTriangle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  
  const getNavClassName = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-sidebar-primary">MedStore</h1>
                <p className="text-xs text-sidebar-foreground/70">Quản lý nhà thuốc</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 mb-2">
            {!isCollapsed && "MENU CHÍNH"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => getNavClassName(isActive)}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

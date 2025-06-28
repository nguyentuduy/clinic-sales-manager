
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            {/* Placeholder routes for other pages */}
            <Route path="/orders" element={<div className="p-8 text-center text-gray-500">Trang đơn hàng đang phát triển</div>} />
            <Route path="/imports" element={<div className="p-8 text-center text-gray-500">Trang nhập hàng đang phát triển</div>} />
            <Route path="/customers" element={<div className="p-8 text-center text-gray-500">Trang khách hàng đang phát triển</div>} />
            <Route path="/reports" element={<div className="p-8 text-center text-gray-500">Trang báo cáo đang phát triển</div>} />
            <Route path="/alerts" element={<div className="p-8 text-center text-gray-500">Trang cảnh báo đang phát triển</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

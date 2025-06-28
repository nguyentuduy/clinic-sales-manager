
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-accent" />
              <div className="text-sm text-muted-foreground">
                Hệ thống quản lý nhà thuốc
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => console.log('Notifications clicked')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center text-xs text-white">
                  3
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log('User profile clicked')}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-gray-50/50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

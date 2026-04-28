"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart,
  Star, 
  ImageIcon,
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Bell,
  User
} from "lucide-react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(!!auth || pathname === "/admin/login");
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Images", href: "/admin/images", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <div className={`${inter.variable} ${inter.className}`}>{children}</div>;
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  return (
    <div className={`${inter.variable} ${inter.className} min-h-screen bg-[#F9FAFB] flex`} style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-[110] w-[260px] bg-[#111827] text-white flex flex-col transition-transform duration-300 transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-bold text-sm text-white">S</div>
            <span className="font-semibold text-base tracking-tight text-white">Sashaa Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-[#2563EB] text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <item.icon size={18} className={isActive ? "text-white" : "text-gray-500"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Home size={18} />
            View Store
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-[90]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#6B7280] hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-semibold text-[#111827] capitalize hidden sm:block">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop().replace(/-/g, ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg relative transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full border-2 border-white"></span>
             </button>
             <div className="h-6 w-px bg-[#E5E7EB] mx-1 hidden sm:block"></div>
             <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#DC2626] transition-colors"
            >
              Sign Out
            </button>
             <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] border border-[#2563EB]/20">
                <User size={16} />
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

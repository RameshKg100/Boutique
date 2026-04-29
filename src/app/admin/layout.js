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
    { name: "Dresses", href: "/admin/products", icon: Package },
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
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-[#1f2937]/50 backdrop-blur-sm">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">S</div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white uppercase">Sathyas</span>
              <span className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase -mt-1">Admin Panel</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <item.icon size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 bg-[#1f2937]/30">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Home size={20} />
            Visit Store
          </Link>
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

          <div className="flex items-center gap-2 md:gap-4">
             <button className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg relative transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full border-2 border-white"></span>
             </button>
             
             <div className="h-6 w-px bg-[#E5E7EB] mx-1"></div>
             
             <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-bold text-[#6B7280] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-all"
             >
               <LogOut size={16} />
               <span className="hidden xs:block">Logout</span>
             </button>

             <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white border-2 border-white shadow-sm overflow-hidden">
                <User size={18} />
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

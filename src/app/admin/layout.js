"use client";

import { useState, useEffect } from "react";
import { Inter, Poppins } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Star, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  PlusSquare,
  Bell,
  User
} from "lucide-react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Products", href: "/admin/products", icon: Package },
    { name: "Customer Reviews", href: "/admin/reviews", icon: Star },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <div className={`${inter.variable} ${poppins.variable} ${inter.className}`}>{children}</div>;
  }

  return (
    <div className={`${inter.variable} ${poppins.variable} ${inter.className} min-h-screen bg-[#F3F4F6] flex font-sans`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-[110] w-64 bg-[#111827] text-white flex flex-col transition-transform duration-300 transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF66A1] rounded-lg flex items-center justify-center font-black text-white">S</div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>Sashaa Panel</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-[#FF66A1] text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                <item.icon size={20} className={isActive ? "text-white" : "text-gray-500"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-1">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <Home size={20} />
            Storefront
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-[90]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 capitalize hidden sm:block">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop().replace(/-/g, ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             <button 
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
             <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
             <button className="p-2 text-gray-400 hover:text-[#FF66A1] hover:bg-pink-50 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
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

      <style jsx global>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-poppins), sans-serif;
        }
        body {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>
    </div>
  );
}

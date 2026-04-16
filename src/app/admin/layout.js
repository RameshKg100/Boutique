"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusSquare,
  Home
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic auth check
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  if (loading) return null;
  if (!isAuthenticated && pathname !== "/admin/login") return null;

  // Login page has its own layout or is rendered without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Products", href: "/admin/products", icon: Package },
    { name: "Add New Dress", href: "/admin/products/new", icon: PlusSquare },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-neutral-950 border-r border-white/5 transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin" className={`font-bold text-primary tracking-tighter ${!isSidebarOpen && "hidden"}`}>
            SASHAA ADMIN
          </Link>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/5 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                pathname === item.href ? "bg-primary text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Live Site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-white/5 px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white/40 text-sm font-medium uppercase tracking-widest hidden md:block">
              {pathname === "/admin" ? "Overview" : pathname.split("/").pop()}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold transition-all border border-red-500/20"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

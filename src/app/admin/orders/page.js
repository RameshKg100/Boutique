"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { 
  ShoppingCart, 
  Search, 
  Loader2,
  Filter,
  ShoppingBag,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
  ZoomIn,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ClipboardList,
  CreditCard,
  User,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally { setLoading(false); }
  };

  const updateOrderStatus = async (id, newStatus, newDate = null) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, status_updated_at: newDate }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus, status_updated_at: newDate || new Date().toISOString() } : o));
      }
    } catch (error) { alert("Failed to update order status."); }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: Clock },
    processing: { label: "Processing", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: Package },
    shipped: { label: "Shipped", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", icon: Truck },
    delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: X },
  };

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-blue-600" },
    { label: "Pending", value: orders.filter(o => o.status?.toLowerCase() === "pending").length, icon: Clock, color: "text-amber-600" },
    { label: "Processing", value: orders.filter(o => o.status?.toLowerCase() === "processing").length, icon: Package, color: "text-blue-500" },
    { label: "Shipped", value: orders.filter(o => o.status?.toLowerCase() === "shipped").length, icon: Truck, color: "text-purple-600" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-text/60">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
        <p className="text-sm font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setZoomedImage(null)}>
          <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setZoomedImage(null)} className="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-2 uppercase text-xs font-bold tracking-widest">
              Close <X size={20} />
            </button>
            <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image src={zoomedImage.image} alt={zoomedImage.name} fill className="object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-dark tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>Order Management</h1>
          <p className="text-text/60 text-sm mt-1">Monitor, process, and track your boutique orders.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:max-w-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-border/50 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <stat.icon size={16} className={stat.color} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text/40">{stat.label}</span>
              </div>
              <p className="text-2xl font-black text-dark">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-border/50 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name, or Phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/50 bg-cream/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-border/50 bg-cream/30 text-sm font-bold text-dark uppercase tracking-wider cursor-pointer focus:outline-none focus:border-primary"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border/50">
            <ShoppingBag className="mx-auto h-16 w-16 text-border mb-4" />
            <h3 className="text-lg font-bold text-dark">No orders found</h3>
            <p className="text-text/60 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <AnimatedSection key={order.id} delay={index * 50}>
              <div className={`bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden transition-all hover:shadow-md ${expandedOrder === order.id ? 'ring-2 ring-primary/10' : ''}`}>
                
                {/* Main Order Info Bar */}
                <div 
                  className="p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center gap-6"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${statusConfig[order.status?.toLowerCase()]?.bg || 'bg-gray-50'}`}>
                      {(() => {
                        const Icon = statusConfig[order.status?.toLowerCase()]?.icon || Clock;
                        return <Icon size={24} className={statusConfig[order.status?.toLowerCase()]?.color || 'text-gray-400'} />;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-dark tracking-tight">{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusConfig[order.status?.toLowerCase()]?.bg} ${statusConfig[order.status?.toLowerCase()]?.color} ${statusConfig[order.status?.toLowerCase()]?.border}`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-text/40 font-bold uppercase tracking-tighter mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })} at {new Date(order.created_at).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 lg:border-l border-border/50 lg:pl-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text/30 block mb-1">Customer</span>
                      <p className="text-sm font-bold text-dark">{order.customer_name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text/30 block mb-1">Total Amount</span>
                      <p className="text-sm font-black text-primary">{formatPrice(order.total_amount)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text/30 block mb-1">Items</span>
                      <p className="text-sm font-bold text-dark">{order.items?.length || 0} Pieces</p>
                    </div>
                    <div className={`transition-transform duration-300 ${expandedOrder === order.id ? 'rotate-180 text-primary' : 'text-text/20'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {expandedOrder === order.id && (
                  <div className="border-t border-border/30 bg-cream/10 animate-slide-down">
                    
                    {/* Visual Timeline */}
                    <div className="px-8 py-8 border-b border-border/30 overflow-x-auto">
                      <div className="min-w-[600px] flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/30 -translate-y-1/2 z-0" />
                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                          const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                          const currentStepIdx = steps.indexOf(order.status || 'Pending');
                          const isCompleted = steps.indexOf(step) <= currentStepIdx;
                          const isActive = step === (order.status || 'Pending');
                          
                          return (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-white border-2 border-border/50 text-text/30'}`}>
                                {isCompleted ? <CheckCircle2 size={20} /> : <span className="font-bold text-sm">{idx + 1}</span>}
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-primary' : 'text-text/30'}`}>{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
                      
                      {/* Column 1: Delivery & Payment */}
                      <div className="p-8 space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-dark/40">
                            <User size={16} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Customer Details</h4>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Phone size={14} className="mt-0.5 text-primary" />
                              <p className="text-sm font-medium text-dark">{order.customer_phone}</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin size={14} className="mt-1 text-primary shrink-0" />
                              <p className="text-sm text-text/80 leading-relaxed">{order.customer_location}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4 text-dark/40">
                            <CreditCard size={16} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Payment Info</h4>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-border/30 shadow-sm flex items-center justify-between">
                            <span className="text-xs font-bold text-text/60 uppercase tracking-widest">{order.payment_mode || "WhatsApp"}</span>
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest rounded border border-green-100">Verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Order Management */}
                      <div className="p-8 space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-dark/40">
                            <ClipboardList size={16} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Update Order Status</h4>
                          </div>
                          <div className="space-y-3">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-sm font-bold text-dark uppercase tracking-wider focus:outline-none focus:border-primary shadow-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <div className="flex items-center gap-2 px-4 py-2 bg-cream/30 rounded-xl border border-border/20">
                              <Clock size={12} className="text-text/40" />
                              <span className="text-[10px] font-bold text-text/60 uppercase">Updated: {order.status_updated_at ? new Date(order.status_updated_at).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4 text-dark/40">
                            <Truck size={16} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Tracking Information</h4>
                          </div>
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Courier (e.g. BlueDart)" 
                              className="w-full bg-white border border-border/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary shadow-sm"
                            />
                            <input 
                              type="text" 
                              placeholder="Tracking ID" 
                              className="w-full bg-white border border-border/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Items Summary */}
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4 text-dark/40">
                          <ShoppingBag size={16} />
                          <h4 className="text-xs font-black uppercase tracking-widest">Ordered Items ({order.items?.length})</h4>
                        </div>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-3 bg-white rounded-2xl border border-border/30 group hover:border-primary/30 transition-colors">
                              <div 
                                className="relative aspect-[3/4] w-14 rounded-xl overflow-hidden bg-cream shrink-0 cursor-zoom-in"
                                onClick={() => item.image && setZoomedImage(item)}
                              >
                                {item.image ? (
                                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : <div className="flex items-center justify-center h-full"><Package size={16} className="text-text/20" /></div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-dark leading-tight line-clamp-2">{item.name}</p>
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                  <span className="text-[9px] font-black uppercase tracking-widest bg-cream px-1.5 py-0.5 rounded text-text/60">Size: {item.size}</span>
                                  {item.color && (
                                    <span className="text-[9px] font-black uppercase tracking-widest bg-primary/10 px-1.5 py-0.5 rounded text-primary/80">Color: {item.color}</span>
                                  )}
                                  <span className="text-[9px] font-black uppercase tracking-widest text-text/40">Qty: {item.quantity}</span>
                                </div>
                                <p className="text-xs font-black text-primary mt-1.5">{formatPrice(item.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-dashed border-border/50 space-y-2">
                           <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text/40">
                              <span>Subtotal</span>
                              <span>{formatPrice(order.total_amount)}</span>
                           </div>
                           <div className="flex items-center justify-between text-xs font-black text-dark uppercase tracking-widest">
                              <span>Total</span>
                              <span className="text-primary text-base">{formatPrice(order.total_amount)}</span>
                           </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action Bar */}
                    <div className="px-8 py-4 bg-cream/20 border-t border-border/30 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                            <ClipboardList size={14} /> Add Private Note
                          </button>
                       </div>
                       <div className="flex items-center gap-3">
                          <button className="px-5 py-2 rounded-xl bg-white border border-border/50 text-[10px] font-bold uppercase tracking-widest text-dark hover:bg-cream transition-colors">
                             Print Invoice
                          </button>
                          <a 
                            href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 rounded-xl bg-green-600 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-green-700 transition-colors flex items-center gap-2"
                          >
                             WhatsApp Update <ExternalLink size={12} />
                          </a>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

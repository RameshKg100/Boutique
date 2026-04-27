"use client";

import { useState, useEffect } from "react";
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
  ZoomIn
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

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

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
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

  const statusStyles = {
    pending:    'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    processing: 'bg-blue-50 text-[#2563EB] border-blue-200',
    shipped:    'bg-purple-50 text-purple-700 border-purple-200',
    delivered:  'bg-green-50 text-[#16A34A] border-green-200',
    cancelled:  'bg-red-50 text-[#DC2626] border-red-200',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#6B7280]">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#2563EB]" />
        <p className="text-sm font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">

      {/* Lightbox */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setZoomedImage(null)}>
          <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomedImage(null)} className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1.5 shadow-lg text-[#111827] hover:text-[#DC2626] transition-colors">
              <X size={18} />
            </button>
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
              <Image src={zoomedImage.image} alt={zoomedImage.name} fill className="object-cover" sizes="400px" />
            </div>
            <div className="bg-white rounded-lg mt-3 p-4 shadow-lg text-center">
              <p className="font-semibold text-[#111827] text-sm">{zoomedImage.name}</p>
              <p className="text-xs text-[#6B7280] mt-1">Size: {zoomedImage.size} &nbsp;|&nbsp; Qty: {zoomedImage.quantity}</p>
              <p className="text-[#2563EB] font-bold mt-1">{formatPrice(zoomedImage.price * zoomedImage.quantity)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Orders</h2>
          <p className="text-sm text-[#6B7280] mt-0.5">Manage and track customer orders.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 shadow-sm">
          <p className="text-2xl font-bold text-[#2563EB]">{orders.length}</p>
          <p className="text-xs text-[#6B7280] font-medium leading-tight">Total<br/>Orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Name, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#E5E7EB] rounded-md px-3 py-2 text-sm bg-white text-[#111827] font-medium cursor-pointer focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className="px-4 py-3 font-medium text-center">Update</th>
                <th className="px-4 py-3 font-medium text-center">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-16 text-center text-[#6B7280]">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-200 mb-3" />
                    <p className="font-semibold text-[#111827]">No orders found</p>
                    <p className="text-sm mt-1">Orders placed via WhatsApp will appear here.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <>
                    <tr key={order.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#111827]">{order.id}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                          {' '}{new Date(order.created_at).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#111827]">{order.customer_name}</p>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1"><Phone size={10} /> {order.customer_phone}</p>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1 truncate max-w-[180px]"><MapPin size={10} className="shrink-0" /> {order.customer_location}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-[#111827]">{order.payment_mode || "N/A"}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-[#111827]">{formatPrice(order.total_amount)}</p>
                        <p className="text-xs text-[#6B7280]">{order.items?.length || 0} item(s)</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[10px] uppercase font-semibold tracking-wider rounded-full border ${statusStyles[order.status?.toLowerCase()] || 'bg-gray-50 text-[#6B7280] border-[#E5E7EB]'}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="border border-[#E5E7EB] rounded-md px-2 py-1.5 text-xs bg-white text-[#111827] font-medium cursor-pointer focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] hover:underline transition-colors"
                        >
                          {expandedOrder === order.id ? <><ChevronUp size={14}/> Hide</> : <><ChevronDown size={14}/> View</>}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Items Row */}
                    {expandedOrder === order.id && order.items && (
                      <tr key={`${order.id}-items`}>
                        <td colSpan="7" className="px-4 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">Ordered Items ({order.items.length})</p>
                          <div className="flex flex-wrap gap-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3 bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-sm w-[260px]">
                                <div 
                                  className="relative w-14 h-[72px] flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border border-[#E5E7EB] cursor-zoom-in group"
                                  onClick={() => item.image && setZoomedImage(item)}
                                >
                                  {item.image ? (
                                    <>
                                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="56px" />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <ZoomIn size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={16} className="text-gray-300" /></div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-[#111827] leading-tight line-clamp-2">{item.name}</p>
                                  <p className="text-[10px] text-[#6B7280] mt-1">Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}</p>
                                  <p className="text-xs font-bold text-[#2563EB] mt-1">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

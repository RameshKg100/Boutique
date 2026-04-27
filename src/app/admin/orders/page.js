"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Package, 
  Search, 
  Loader2,
  Filter,
  ShoppingBag,
  Phone,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      alert("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':   return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'processing':return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':   return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default:          return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentIcon = (mode) => {
    switch(mode) {
      case 'GPay':    return '📱';
      case 'PhonePe': return '📱';
      case 'Paytm':   return '📱';
      case 'Bank Transfer': return '🏦';
      case 'Cash on Delivery': return '💵';
      default: return '💳';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#FF66A1]" />
        <p className="font-medium animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 font-sans">

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="text-[#FF66A1]" size={22} /> Order Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">All WhatsApp orders — click a row to see dress images.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-[#FF66A1]">{orders.length}</p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF66A1] text-sm text-gray-900"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-gray-400 shrink-0" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 font-medium cursor-pointer focus:outline-none focus:border-[#FF66A1]"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-100">
          {filteredOrders.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-500">
              <ShoppingBag className="mx-auto h-14 w-14 text-gray-200 mb-4" />
              <p className="text-lg font-semibold text-gray-900">No orders found</p>
              <p className="text-sm mt-1">Orders placed via WhatsApp will appear here.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="hover:bg-pink-50/20 transition-colors">
                {/* Main Row */}
                <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                  
                  {/* Order ID + Date */}
                  <div className="min-w-[130px]">
                    <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{order.customer_name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Phone size={11} /> {order.customer_phone}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 truncate max-w-[200px]" title={order.customer_location}>
                      <MapPin size={11} className="shrink-0" /> {order.customer_location}
                    </p>
                  </div>

                  {/* Payment Mode */}
                  <div className="min-w-[130px]">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Payment</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
                      {getPaymentIcon(order.payment_mode)} {order.payment_mode || "N/A"}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="min-w-[90px] text-right sm:text-left">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Total</p>
                    <p className="font-black text-gray-900">{formatPrice(order.total_amount)}</p>
                    <p className="text-xs text-gray-400">{order.items?.length || 0} item(s)</p>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3">
                    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${getStatusStyle(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#FF66A1] bg-white text-gray-900 font-medium cursor-pointer shadow-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button 
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="flex items-center gap-1 text-xs font-bold text-[#FF66A1] hover:text-[#D43372] transition-colors"
                    >
                      {expandedOrder === order.id ? <><ChevronUp size={14}/> Hide</> : <><ChevronDown size={14}/> View Items</>}
                    </button>
                  </div>
                </div>

                {/* Expanded: Dress Images */}
                {expandedOrder === order.id && order.items && (
                  <div className="px-4 sm:px-6 pb-5 bg-gray-50/60 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider pt-4 pb-3">Ordered Items</p>
                    <div className="flex flex-wrap gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm max-w-[280px]">
                          {/* Dress Image */}
                          <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                            {item.image ? (
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag size={20} className="text-gray-300" />
                              </div>
                            )}
                          </div>
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-2">{item.name}</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Size: {item.size}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Qty: {item.quantity}</p>
                            <p className="text-xs font-black text-[#FF66A1] mt-1">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { FiFileText, FiUsers, FiPlusCircle, FiArrowRight } from 'react-icons/fi';

export default function AdminDashboardPage() {
  const summaryStats = {
    quotationsCount: 24,
    invoicesCount: 18,
    clientsCount: 35,
  };

  const recentQuotations = [
    { id: 1, client: "Maria Santos", date: "Aug 27, 2026", total: "₱4,500", status: "Pending" },
    { id: 2, client: "Juan Dela Cruz", date: "Aug 26, 2026", total: "₱7,200", status: "Sent" },
    { id: 3, client: "Ana Reyes", date: "Aug 25, 2026", total: "₱3,800", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 p-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back, Jasmine!</h1>
          <p className="text-sm text-gray-600">Here is the quick overview of your sales and marketing activities.</p>
        </div>
        <Link
          href="/admin/quotation"
          className="bg-[#c89134] hover:bg-[#b07c29] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition shadow-sm"
        >
          <FiPlusCircle /> New Quotation
        </Link>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quotations Card */}
        <Link href="/admin/quotation" className="bg-white p-6 rounded-xl shadow-sm border border-amber-200 hover:border-[#c89134] transition flex items-center justify-between group">
          <div>
            <p className="text-sm font-medium text-gray-500">Quotations Made</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{summaryStats.quotationsCount}</h3>
            <span className="text-[#c89134] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
              View quotations <FiArrowRight size={12} />
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-[#c89134] rounded-xl text-2xl flex items-center justify-center w-12 h-12">
            <FiFileText />
          </div>
        </Link>

        {/* Invoices Card with Philippine Peso Symbol */}
        <Link href="/admin/invoices" className="bg-white p-6 rounded-xl shadow-sm border border-amber-200 hover:border-[#c89134] transition flex items-center justify-between group">
          <div>
            <p className="text-sm font-medium text-gray-500">Invoices Made</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{summaryStats.invoicesCount}</h3>
            <span className="text-[#c89134] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
              View invoices <FiArrowRight size={12} />
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-[#c89134] rounded-xl text-2xl font-bold flex items-center justify-center w-12 h-12">
            ₱
          </div>
        </Link>

        {/* Client Contacts Card */}
        <Link href="/admin/clients" className="bg-white p-6 rounded-xl shadow-sm border border-amber-200 hover:border-[#c89134] transition flex items-center justify-between group">
          <div>
            <p className="text-sm font-medium text-gray-500">Client Contacts</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{summaryStats.clientsCount}</h3>
            <span className="text-[#c89134] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
              View client list <FiArrowRight size={12} />
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-[#c89134] rounded-xl text-2xl flex items-center justify-center w-12 h-12">
            <FiUsers />
          </div>
        </Link>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
        <div className="px-6 py-4 bg-amber-50/50 border-b border-amber-200 flex justify-between items-center">
          <span className="font-semibold text-gray-800 text-sm">Recent Quotations</span>
          <Link href="/admin/quotation" className="text-xs text-[#c89134] hover:underline font-medium">
            Manage all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Date Created</th>
                <th className="px-6 py-3 text-right">Total Amount</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {recentQuotations.map((item) => (
                <tr key={item.id} className="hover:bg-amber-50/20">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.client}</td>
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">{item.total}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      item.status === 'Sent' ? 'bg-amber-100 text-amber-900' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-slate-900">Admin Dashboard</h1>
      <p className="text-slate-500">Welcome back. Here is your operational overview.</p>
      
      {/* Required Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Quotations</h3>
          <p className="text-4xl font-bold mt-2 text-blue-600">14</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Paid Invoices</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-600">8</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Leads</h3>
          <p className="text-4xl font-bold mt-2 text-slate-800">24</p>
        </div>
      </div>

      {/* Required Client Contact Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 text-slate-900">Recent Client Inquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="pb-3 font-medium">Client Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Contact #</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 font-medium">Juan Dela Cruz</td>
                <td className="py-3 text-slate-500">juan@example.com</td>
                <td className="py-3 text-slate-500">0917-123-4567</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Pending Quote</span>
                </td>
              </tr>
              {/* You will map real Supabase data here later */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
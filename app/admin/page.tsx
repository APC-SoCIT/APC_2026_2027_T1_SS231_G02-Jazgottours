export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-slate-500">Welcome back. Here is your operational overview.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Total Quotations</h3>
          <p className="text-4xl font-bold mt-2 text-blue-600">14</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Paid Invoices</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-600">8</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Active Leads</h3>
          <p className="text-4xl font-bold mt-2 text-slate-800">24</p>
        </div>
      </div>
    </div>
  )
}
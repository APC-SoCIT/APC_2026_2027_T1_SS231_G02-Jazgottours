import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* B2B Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          JazGot Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block p-3 rounded hover:bg-slate-800">Home/Dashboard</Link>
          <Link href="/admin/products" className="block p-3 rounded hover:bg-slate-800">Products/Packages</Link>
          <Link href="/admin/quotation" className="block p-3 rounded hover:bg-slate-800">Quotation</Link>
          <Link href="/admin/invoices" className="block p-3 rounded hover:bg-slate-800">Invoices</Link>
          <Link href="/admin/clients" className="block p-3 rounded hover:bg-slate-800">Clients</Link>
        </nav>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-8 text-slate-900">
        {children}
      </main>
    </div>
  )
}
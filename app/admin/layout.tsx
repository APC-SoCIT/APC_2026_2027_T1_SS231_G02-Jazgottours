import Link from 'next/link';
import { FiHome, FiPackage, FiFileText, FiUsers, FiLogOut } from 'react-icons/fi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#fcfbf9] font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#c89134] text-white flex flex-col justify-between hidden md:flex border-r border-[#b07c29]">
        <div>
          <div className="px-6 py-6 text-xl font-bold tracking-wider border-b border-[#b07c29] text-white">
            JGT Admin Portal
          </div>
          {/* Navigation with soft, light-tinted borders */}
          <nav className="mt-4 px-3 space-y-3 text-sm font-mediumS">
            <Link href="/admin" className="flex items-center gap-3.5 px-4 py-3.5 bg-[#c89134] hover:bg-[#b57d26] border border-[#f3d9a4]/60 rounded-xl transition text-white shadow-sm">
              <FiHome size={18} /> Home / Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3.5 px-4 py-3.5 bg-[#c89134] hover:bg-[#b57d26] border border-[#f3d9a4]/60 rounded-xl transition text-white shadow-sm">
              <FiPackage size={18} /> Products / Packages
            </Link>
            <Link href="/admin/quotation" className="flex items-center gap-3.5 px-4 py-3.5 bg-[#c89134] hover:bg-[#b57d26] border border-[#f3d9a4]/60 rounded-xl transition text-white shadow-sm">
              <FiFileText size={18} /> Quotation
            </Link>
            <Link href="/admin/invoices" className="flex items-center gap-3.5 px-4 py-3.5 bg-[#c89134] hover:bg-[#b57d26] border border-[#f3d9a4]/60 rounded-xl transition text-white shadow-sm">
              <span className="font-bold text-base px-0.5">₱</span> Invoices
            </Link>
            <Link href="/admin/clients" className="flex items-center gap-3.5 px-4 py-3.5 bg-[#c89134] hover:bg-[#b57d26] border border-[#f3d9a4]/60 rounded-xl transition text-white shadow-sm">
              <FiUsers size={18} /> Clients
            </Link>
          </nav>
        </div>

        {/* Exit / Back to Public Site with "N" badge removed */}
        <div className="p-4 border-t border-[#b07c29]">
          <Link href="/" className="flex items-center justify-center gap-2.5 w-full py-2.5 bg-[#2c221e] hover:bg-[#1a1311] rounded-lg text-sm font-medium transition text-white shadow-sm">
            <FiLogOut size={16} /> Exit to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center border-b border-amber-100">
          <span className="text-sm font-semibold text-gray-700">Owner & Sales Workspace</span>
        </header>
        <main className="flex-1 p-2 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic'; // Prevent caching so new records show up instantly

export default async function QuotationRecordsPage() {
  // Fetch directly on the server
  const { data: quotations, error } = await supabase
    .from('quotations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotations on server:', error.message);
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-amber-200/50">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            Database Log
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Quotation Records</h1>
          <p className="text-sm text-slate-600">Track all historical quotations saved via the AI parser.</p>
        </div>
        <Link
          href="/admin/quotation"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
        >
          + New AI Quotation
        </Link>
      </div>

      {/* Error or Empty State vs Table Display */}
      {error ? (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center text-red-700">
          <p className="font-semibold">Failed to load quotation records from database.</p>
          <p className="text-xs mt-1 text-red-500">{error.message}</p>
        </div>
      ) : !quotations || quotations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-amber-200/50 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
            📄
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No quotation records found.</h3>
          <p className="text-sm text-slate-500 mt-1">Generate and save your first quotation using the AI parser workspace.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-50/50 border-b border-amber-100 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="p-4">Reference No</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Contact / Email</th>
                  <th className="p-4">Duration / Pax</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4 font-medium text-amber-900">{q.reference_no || 'N/A'}</td>
                    <td className="p-4 font-semibold text-slate-900">{q.client_name || 'Unnamed Client'}</td>
                    <td className="p-4 text-xs text-slate-500">
                      <div>{q.client_email}</div>
                      <div>{q.client_contact}</div>
                    </td>
                    <td className="p-4 text-xs">
                      <div>{q.duration}</div>
                      <div className="text-slate-500">{q.pax}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      ₱{typeof q.total_amount === 'number' ? q.total_amount.toFixed(2) : q.total_amount}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {q.status || 'Saved'}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {q.created_at ? new Date(q.created_at).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiFileText, FiCalendar, FiUser, FiHash, FiUsers } from 'react-icons/fi';
// Update this import path if your project's shared supabase client is located elsewhere (e.g. '@/lib/supabase')
import { supabase } from '@/lib/supabase';

export default function QuotationRecordsPage() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuotations();
  }, []);

  async function fetchQuotations() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        console.log('Successfully fetched quotations:', data);
        setQuotations(data);
      }
    } catch (err) {
      console.error('Error fetching quotation records:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter records based on client name or reference number
  const filteredQuotations = quotations.filter((item) =>
    item.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reference_no?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-amber-200/50 shadow-[0_8px_30px_rgb(180,130,60,0.06)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">
              Database Log
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quotation Records</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            View, audit, and track all historical quotations saved via the AI parser.
          </p>
        </div>

        <Link
          href="/admin/quotation"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all w-fit"
        >
          <FiPlus size={16} /> New AI Quotation
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-amber-200/50 shadow-xs">
        <FiSearch className="text-amber-700 ml-1" size={18} />
        <input
          type="text"
          placeholder="Search by client name or reference number (e.g. QTN-001)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Records Table View */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-amber-200/50 shadow-[0_8px_30px_rgb(180,130,60,0.06)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm font-medium">
            Loading quotation records from Supabase...
          </div>
        ) : filteredQuotations.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <FiFileText size={22} />
            </div>
            <p className="text-sm font-bold text-slate-700">No quotation records found.</p>
            <p className="text-xs text-slate-400">Generate and save your first quotation using the AI parser workspace.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-amber-100 bg-amber-50/50 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Reference / Client</th>
                  <th className="py-4 px-6">Details</th>
                  <th className="py-4 px-6">Date Created</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/60 text-sm">
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-amber-50/30 transition-colors">
                    {/* Client & Reference */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                          <FiUser size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{quotation.client_name || 'Unnamed Client'}</div>
                          <div className="text-[11px] font-mono text-amber-700 flex items-center gap-1 mt-0.5">
                            <FiHash size={10} /> {quotation.reference_no || 'No Ref'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Duration & Pax */}
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      <div className="space-y-0.5">
                        <div className="font-medium">{quotation.duration || 'Standard Duration'}</div>
                        <div className="text-slate-400 flex items-center gap-1">
                          <FiUsers size={11} /> {quotation.pax ? `${quotation.pax} Pax` : 'N/A'}
                        </div>
                      </div>
                    </td>

                    {/* Date Created */}
                    <td className="py-4 px-6 text-slate-600 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} className="text-amber-600" />
                        {quotation.created_at ? new Date(quotation.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }) : 'N/A'}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 font-black text-slate-900">
                      ₱{Number(quotation.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100/80 text-amber-800 border border-amber-200">
                        {quotation.status || 'Draft'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => alert(`Viewing details for Reference: ${quotation.reference_no}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-100/60 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shadow-xs"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
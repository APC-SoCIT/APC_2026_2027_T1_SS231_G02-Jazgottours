"use client"

import React, { useState } from 'react'

export default function InvoicesPage() {
  // Dummy data representing quotes that have successfully passed through the Paymongo webhook
  const [invoices] = useState([
    { id: "INV-2026-001", client: "Maria Santos", amount: 18500, datePaid: "Aug 22, 2026", status: "Confirmed Booking" },
    { id: "INV-2026-002", client: "TechCorp Retreat", amount: 45000, datePaid: "Aug 20, 2026", status: "Confirmed Booking" },
    { id: "INV-2026-003", client: "Elena Gomez", amount: 12400, datePaid: "Aug 18, 2026", status: "Confirmed Booking" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Paid Invoices</h1>
          <p className="text-slate-500">Track confirmed bookings automatically synced via Paymongo.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Export Report (CSV)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Invoice Number</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Client Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Total Paid (PHP)</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Date Paid</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-900">{invoice.id}</td>
                <td className="p-4 text-slate-700">{invoice.client}</td>
                <td className="p-4 font-semibold text-emerald-600">₱{invoice.amount.toLocaleString()}</td>
                <td className="p-4 text-slate-500 text-sm">{invoice.datePaid}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">View PDF</button>
                  <button className="text-slate-500 hover:text-slate-700 text-sm font-medium">Forward to Acctg</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
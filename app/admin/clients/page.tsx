"use client"

import React, { useState } from 'react'

export default function ClientsPage() {
  // Dummy data to show the panel how the CRM looks before the database is connected
  const [clients] = useState([
    { id: 1, name: "Juan Dela Cruz", email: "juan@example.com", phone: "0917-123-4567", status: "Active Lead", date: "Aug 24, 2026" },
    { id: 2, name: "Maria Santos", email: "maria.s@example.com", phone: "0918-987-6543", status: "Converted", date: "Aug 22, 2026" },
    { id: 3, name: "Acme Corp (Group)", email: "events@acmecorp.com", phone: "02-8123-4567", status: "Pending Quote", date: "Aug 20, 2026" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Client Management (CRM)</h1>
          <p className="text-slate-500">Centralized database for all active leads and past customers.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add New Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Client Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Email Address</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Contact Number</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Date Added</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{client.name}</td>
                <td className="p-4 text-slate-600">{client.email}</td>
                <td className="p-4 text-slate-600">{client.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' : 
                    client.status === 'Active Lead' ? 'bg-blue-100 text-blue-700' : 
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500 text-sm">{client.date}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
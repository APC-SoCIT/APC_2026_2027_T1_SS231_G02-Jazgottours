"use client"

import React, { useState } from 'react'

export default function ProductsPage() {
  // Dummy data based on the stakeholder's required tour packages and fees
  const [products] = useState([
    { id: 1, name: "El Nido Island Tour A", category: "Tour Package", basePrice: 1200 },
    { id: 2, name: "El Nido Island Tour B", category: "Tour Package", basePrice: 1300 },
    { id: 3, name: "El Nido Island Tour C", category: "Tour Package", basePrice: 1400 },
    { id: 4, name: "Chasing Sunset Tour", category: "Tour Package", basePrice: 1500 },
    { id: 5, name: "Airport Transfer (PPS - ENI)", category: "Transport", basePrice: 600 },
    { id: 6, name: "Environmental Fee", category: "Mandatory Fee", basePrice: 200 },
    { id: 7, name: "Lagoon Entrance Fee", category: "Mandatory Fee", basePrice: 200 },
    { id: 8, name: "Travel Insurance", category: "Add-on", basePrice: 150 }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products & Tour Packages</h1>
          <p className="text-slate-500">Manage base wholesale pricing for tours, transports, and fees.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Item Name</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Category</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Base Price (PHP)</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{product.name}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.category === 'Tour Package' ? 'bg-indigo-100 text-indigo-700' :
                    product.category === 'Transport' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {product.category}
                  </span>
                </td>
                <td className="p-4 font-semibold text-slate-700">₱{product.basePrice.toLocaleString()}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
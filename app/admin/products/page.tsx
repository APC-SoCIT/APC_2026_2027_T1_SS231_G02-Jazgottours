"use client"

import React, { useState, useEffect } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [tempPrice, setTempPrice] = useState<number>(0)

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('Tour Package')
  const [newPrice, setNewPrice] = useState(0)
  const [newDescription, setNewDescription] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      if (res.ok) {
        setProducts(data || [])
      } else {
        console.error('Error fetching services:', data.error)
      }
    } catch (err) {
      console.error('Failed to fetch services', err)
    }
    setLoading(false)
  }

  const handleEditClick = (product: { id: string | number; base_price: number }) => {
    setEditingId(product.id)
    setTempPrice(product.base_price)
  }

  const handleSave = async (id: string | number) => {
    try {
      const res = await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, base_price: tempPrice }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert('Error updating price: ' + data.error)
      } else {
        setProducts(products.map(p => p.id === id ? { ...p, base_price: tempPrice } : p))
        setEditingId(null)
      }
    } catch (err) {
      alert('Failed to update price')
      console.error(err)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          category: newCategory,
          base_price: newPrice,
          description: newDescription,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert('Error adding product: ' + data.error)
      } else {
        setIsAddModalOpen(false)
        setNewName('')
        setNewCategory('Tour Package')
        setNewPrice(0)
        setNewDescription('')
        fetchProducts() // Refresh list
      }
    } catch (err) {
      alert('Failed to add product')
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tour Packages & Add-ons</h1>
          <p className="text-slate-500">Manage base pricing for tours, transports, and additional fees.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          + Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Add New Service or Tour</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                <input 
                  type="text" 
                  required
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Island Hopping Tour D"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tour Package">Tour Package</option>
                  <option value="Transport">Transport</option>
                  <option value="Add-on">Add-on</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Base Price (PHP)</label>
                <input 
                  type="number" 
                  required
                  value={newPrice} 
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  placeholder="1500"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Short description of the tour or service..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium">Loading products...</div>
        ) : (
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
                  <td className="p-4 font-semibold text-slate-700">
                    {editingId === product.id ? (
                      <div className="flex items-center gap-2">
                        <span>₱</span>
                        <input 
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(Number(e.target.value))}
                          className="w-28 px-2 py-1 border rounded text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      `₱${Number(product.base_price).toLocaleString()}`
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {editingId === product.id ? (
                        <>
                          <button 
                            onClick={() => handleSave(product.id)}
                            className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(product)}
                          className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
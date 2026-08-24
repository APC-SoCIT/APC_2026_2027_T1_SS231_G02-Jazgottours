"use client"

import React, { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { tours } from "@/lib/tours"

export function ProductsSection() {
  // Modal and Form State
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated backend submission
    alert(`Success! Booking for ${clientName} on ${selectedTour?.name || 'this tour'} has been sent directly to the Admin Sales Dashboard.`)
    setSelectedTour(null) // Close modal
    setClientName("")
    setClientEmail("")
  }

  return (
    <section id="products" className="bg-background px-4 py-14 sm:px-6 relative">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Products</h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Discover our handpicked selection of exclusive tour packages designed to create
          unforgettable memories
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {tours.map((tour) => (
          // We wrap your existing card in a clickable div to trigger the modal
          // This ensures your ProductCard design stays 100% untouched!
          <div key={tour.id} onClick={() => setSelectedTour(tour)} className="cursor-pointer transition-transform hover:scale-[1.02]">
            <ProductCard tour={tour} />
          </div>
        ))}
      </div>

      {/* Pop-up Booking Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Book {selectedTour.name}</h3>
            <p className="text-slate-500 mb-6">Enter your details to secure your slot.</p>
            
            <form onSubmit={handleBookNow} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-900" 
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setSelectedTour(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
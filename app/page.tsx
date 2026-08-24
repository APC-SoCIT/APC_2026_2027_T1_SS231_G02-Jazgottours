"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const publicTours = [
    { id: 1, name: "El Nido Island Tour A", price: 1200, desc: "Big Lagoon, Secret Lagoon, Shimizu Island" },
    { id: 2, name: "El Nido Island Tour B", price: 1300, desc: "Snake Island, Pinagbuyutan Island, Cudugnon Cave" },
    { id: 3, name: "El Nido Island Tour C", price: 1400, desc: "Hidden Beach, Matinloc Shrine, Secret Beach" },
  ]

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    // Once Supabase is connected, this will push the lead straight to the Admin CRM!
    alert(`Success! Booking for ${clientName} on ${selectedTour.name} has been sent directly to the Admin Sales Dashboard.`)
    setSelectedTour(null) // Close the modal
    setClientName("")
    setClientEmail("")
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center px-8">
        <div className="text-2xl font-bold text-blue-900">JazGot Tours</div>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-blue-600">
          Agent Portal Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover El Nido, Palawan</h1>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Experience the world's most beautiful islands. Book your adventure instantly online.
        </p>
      </header>

      {/* Tour Packages Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Popular Island Hopping Tours</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publicTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-500 font-medium">
                [ {tour.name} Image ]
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tour.name}</h3>
                <p className="text-slate-500 text-sm mb-4 flex-1">{tour.desc}</p>
                <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                  <span className="text-lg font-bold text-slate-700">₱{tour.price.toLocaleString()}</span>
                  <button 
                    onClick={() => setSelectedTour(tour)} 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pop-up Booking Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Book {selectedTour.name}</h3>
            <p className="text-slate-500 mb-6">Total Price: ₱{selectedTour.price.toLocaleString()}</p>
            
            <form onSubmit={handleBookNow} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setSelectedTour(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
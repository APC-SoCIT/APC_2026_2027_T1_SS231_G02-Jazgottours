import React from 'react'
import Link from 'next/link'

export default function PublicHomepage() {
  const publicTours = [
    { id: 1, name: "El Nido Island Tour A", price: 1200, desc: "Big Lagoon, Secret Lagoon, Shimizu Island" },
    { id: 2, name: "El Nido Island Tour B", price: 1300, desc: "Snake Island, Pinagbuyutan Island, Cudugnon Cave" },
    { id: 3, name: "El Nido Island Tour C", price: 1400, desc: "Hidden Beach, Matinloc Shrine, Secret Beach" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center px-8">
        <div className="text-2xl font-bold text-blue-900">JazGot Tours</div>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-blue-600">
          Agent Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover El Nido, Palawan</h1>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Experience the world's most beautiful islands. Browse our tour packages and contact our agents to craft your perfect itinerary.
        </p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
          View Tour Packages
        </button>
      </header>

      {/* Tour Packages Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Popular Island Hopping Tours</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publicTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                [ Beautiful Image of {tour.name} ]
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tour.name}</h3>
                <p className="text-slate-500 text-sm mb-4 flex-1">{tour.desc}</p>
                <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                  <span className="text-lg font-bold text-slate-700">₱{tour.price.toLocaleString()}</span>
                  <button onClick={() => alert("Please contact a JazGot agent on Facebook to manually process this booking!")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
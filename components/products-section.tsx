"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { tours } from "@/lib/tours"

export function ProductsSection() {
  const router = useRouter()
  
  // Dev State: We will connect this to Supabase Auth later. 
  // Change this to 'true' to simulate a logged-in user!
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Modal and Form State
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  // The B2C Logic Routing
  const handleTourClick = (tour: any) => {
    if (!isLoggedIn) {
      alert("You need to create an account or sign in first to book a tour!")
      router.push("/signin") // Routes them to your sign-in page
    } else {
      setSelectedTour(tour) // Opens the booking modal if they have an account
    }
  }

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Success! Booking for ${clientName} on ${selectedTour?.name} has been processed.`)
    setSelectedTour(null)
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
        
        {/* DEV TOGGLE: Just so you can easily show your panel both scenarios */}
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)} 
          className="mt-6 px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-full transition-colors"
        >
          [Dev Tool] Simulate User Status: {isLoggedIn ? "LOGGED IN" : "LOGGED OUT"}
        </button>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {tours.map((tour) => (
          <div 
            key={tour.id} 
            onClick={() => handleTourClick(tour)} 
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <ProductCard tour={tour} />
          </div>
        ))}
      </div>

      {/* Pop-up Booking Modal (Only renders if logged in AND a tour is clicked) */}
      {isLoggedIn && selectedTour && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Book</h3>
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
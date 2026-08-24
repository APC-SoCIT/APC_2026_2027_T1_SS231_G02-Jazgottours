"use client"

import React, { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { tours } from "@/lib/tours"

export function ProductsSection() {
  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Modals
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [pendingTour, setPendingTour] = useState<any>(null) // Remembers which tour they clicked before logging in

  // Form Inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [clientName, setClientName] = useState("")

  // --- LOGIC HANDLERS ---
  const handleTourClick = (tour: any) => {
    if (!isLoggedIn) {
      setPendingTour(tour)
      setShowAuthModal(true)
    } else {
      setSelectedTour(tour)
    }
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated Supabase Login/Register
    setIsLoggedIn(true)
    setShowAuthModal(false)
    if (pendingTour) {
      setSelectedTour(pendingTour) // Instantly open booking modal after login!
      setPendingTour(null)
    }
  }

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Success! ${clientName || email}'s booking for ${selectedTour?.name} is confirmed!`)
    setSelectedTour(null)
    setClientName("")
  }

  return (
    <section id="products" className="bg-background px-4 py-14 sm:px-6 relative">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Products</h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Discover our handpicked selection of exclusive tour packages designed to create
          unforgettable memories
        </p>
        
        {/* DEV TOGGLE FOR TESTING */}
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)} 
          className="mt-6 px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-full transition-colors"
        >
          Dev Status: {isLoggedIn ? "LOGGED IN" : "LOGGED OUT"}
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

      {/* 1. AUTHENTICATION MODAL (Matches your screenshot style) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {authMode === "signin" ? "Welcome back" : "Create an Account"}
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
              {authMode === "signin" 
                ? "Sign in to manage your bookings and tours." 
                : "Sign up to start booking your unforgettable memories."}
            </p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
              {authMode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900" />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors">
                  {authMode === "signin" ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>

            {/* FIXED: The "Don't have an account" toggle */}
            <p className="mt-6 text-sm text-slate-500">
              {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                className="text-amber-600 font-semibold hover:underline"
              >
                {authMode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 2. BOOKING MODAL (Only shows if logged in AND tour selected) */}
      {isLoggedIn && selectedTour && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Secure your slot</h3>
            <p className="text-slate-500 mb-6">Booking: <strong>{selectedTour.name}</strong></p>
            
            <form onSubmit={handleBookNow} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Booking Name</label>
                <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-900" />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setSelectedTour(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
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
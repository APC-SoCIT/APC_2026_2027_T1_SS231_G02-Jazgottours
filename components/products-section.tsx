"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ProductCard } from "@/components/product-card"
import { tours } from "@/lib/tours"

export function ProductsSection() {
  const router = useRouter()

  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Auth Modals
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  
  // Tour Selection
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [pendingTour, setPendingTour] = useState<any>(null) 

  // Auth Form Inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [clientName, setClientName] = useState("")
  
  // Booking Form Inputs
  const [guestName, setGuestName] = useState("")
  const [pax, setPax] = useState<number | "">(1)
  const [tourDate, setTourDate] = useState("")
  const [contactNumber, setContactNumber] = useState("")

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
    setIsLoggedIn(true)
    setShowAuthModal(false)
    
    if (authMode === "signup") {
      toast.success("Account created successfully!")
    } else {
      toast.success("Signed in successfully!")
    }

    if (pendingTour) {
      setSelectedTour(pendingTour)
      setPendingTour(null)
    }
  }

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading("Processing your booking details...")
    
    // In the future, you can pass the booking details via URL params, context, or save to Supabase first
    // For now, we redirect to a checkout page placeholder
    router.push("/checkout")
    
    // Reset form
    setSelectedTour(null)
    setGuestName("")
    setPax(1)
    setTourDate("")
    setContactNumber("")
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

      {/* 1. AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {authMode === "signin" ? "Welcome back" : "Create an Account"}
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
              {authMode === "signin" 
                ? "Sign in to securely book your tour." 
                : "Sign up to secure your slot instantly."}
            </p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
              {authMode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900 outline-none" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 text-slate-900 outline-none" />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#ce9136] hover:bg-[#b87d2b] text-white py-2 rounded-lg font-medium transition-colors">
                  {authMode === "signin" ? "Sign In & Book" : "Sign Up & Book"}
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                className="text-[#ce9136] font-semibold hover:underline"
              >
                {authMode === "signin" ? "Create an account" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 2. BOOKING MODAL WITH DYNAMIC IMAGE */}
      {isLoggedIn && selectedTour && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl overflow-hidden max-w-md w-full shadow-2xl flex flex-col">
            
            {/* Dynamic Tour Image Banner */}
            <div className="h-40 w-full bg-slate-200 relative">
              <img 
                src={selectedTour.image || selectedTour.imageUrl || "/placeholder-tour.jpg"} 
                alt={selectedTour.title || selectedTour.name || "Tour Image"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-md truncate">
                {selectedTour.title || selectedTour.name}
              </h3>
            </div>

            <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Secure your slot</h3>
                <span className="text-lg font-bold text-[#ce9136]">
                  ₱{(selectedTour.price || 0).toLocaleString()}
                </span>
              </div>
              
              <form onSubmit={handleBookNow} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lead Guest Name</label>
                  <input 
                    type="text" 
                    required 
                    value={guestName} 
                    onChange={(e) => setGuestName(e.target.value)} 
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] text-slate-900 outline-none" 
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Pax</label>
                    <input 
                      type="number" 
                      min="1"
                      required 
                      value={pax} 
                      onChange={(e) => setPax(parseInt(e.target.value))} 
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] text-slate-900 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tour Date</label>
                    <input 
                      type="date" 
                      required 
                      value={tourDate} 
                      onChange={(e) => setTourDate(e.target.value)} 
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] text-slate-900 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={contactNumber} 
                    onChange={(e) => setContactNumber(e.target.value)} 
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] text-slate-900 outline-none" 
                    placeholder="+63 900 000 0000"
                  />
                </div>

                <div className="flex gap-4 mt-6 pt-2">
                  <button type="button" onClick={() => setSelectedTour(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
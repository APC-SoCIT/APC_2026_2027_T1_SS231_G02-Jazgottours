"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SiteShell } from "@/components/site-shell"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulating the delay of a Paymongo API call
    toast.loading("Processing payment securely via Paymongo...")

    setTimeout(() => {
      toast.dismiss()
      toast.success("Payment successful! Your booking is confirmed.")
      router.push("/") // Redirects back to home (or a future user dashboard)
    }, 2500)
  }

  return (
    <SiteShell>
      <div className="min-h-[70vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Order Summary Sidebar */}
          <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Tour Package</p>
                  <p className="font-medium text-white">El Nido Island Hopping Tour A</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Guests</p>
                  <p className="font-medium text-white">1 Pax</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Date</p>
                  <p className="font-medium text-white">Pending Confirmation</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-700 pt-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-[#ce9136]">₱1,350.00</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>
            
            <form onSubmit={handlePayment} className="space-y-5">
              {/* Payment Method Toggles */}
              <div className="flex gap-4 mb-6">
                <label className="flex-1 border border-amber-500 bg-amber-50 rounded-lg p-3 cursor-pointer text-center font-medium text-amber-900 ring-2 ring-amber-500 transition-all">
                  <input type="radio" name="payment" className="hidden" defaultChecked />
                  Credit Card
                </label>
                <label className="flex-1 border border-slate-200 hover:bg-slate-50 rounded-lg p-3 cursor-pointer text-center font-medium text-slate-600 transition-all">
                  <input type="radio" name="payment" className="hidden" />
                  GCash / Maya
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                <input type="text" required placeholder="Juan Dela Cruz" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] outline-none text-slate-900" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                <input type="text" required placeholder="0000 0000 0000 0000" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] outline-none text-slate-900" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] outline-none text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                  <input type="text" required placeholder="123" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ce9136] outline-none text-slate-900" />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-[#ce9136] hover:bg-[#b87d2b] text-white py-3 rounded-lg font-bold transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Pay ₱1,350.00"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </SiteShell>
  )
}
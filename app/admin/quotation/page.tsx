"use client"

import React, { useState, useMemo } from 'react'

// Core Math Engine for the Innovation Feature
const calculateQuote = ({
  vanRental, guideFee, accommodation, headcount, perHeadFee, markupPercent, companySplitPercent
}: any) => {
  const totalPerHead = Number(headcount) * Number(perHeadFee)
  const baseCost = Number(vanRental) + Number(guideFee) + Number(accommodation) + totalPerHead
  
  const safeMarkupPercent = Math.max(0, Number(markupPercent))
  const totalMarkup = baseCost * (safeMarkupPercent / 100)
  const clientTotalPrice = baseCost + totalMarkup
  
  const companyProfit = totalMarkup * (Number(companySplitPercent) / 100)
  const affiliateCommission = totalMarkup - companyProfit
  
  const isLossRisk = safeMarkupPercent < 10 // Minimum 10% safety floor

  return { baseCost, totalMarkup, clientTotalPrice, companyProfit, affiliateCommission, isLossRisk }
}

export default function QuotationPage() {
  // Form State
  const [clientName, setClientName] = useState("")
  const [vanRental, setVanRental] = useState(6000)
  const [guideFee, setGuideFee] = useState(2500)
  const [accommodation, setAccommodation] = useState(4000)
  const [headcount, setHeadcount] = useState(4)
  const [perHeadFee, setPerHeadFee] = useState(1200) // Env fee, Lagoon entrance, Insurance

  // Margin Slider State
  const [markupPercent, setMarkupPercent] = useState(15)
  const companySplitPercent = 50 

  // Real-time calculation triggers instantly when sliders/inputs change
  const quote = useMemo(() => {
    return calculateQuote({
      vanRental, guideFee, accommodation, headcount, perHeadFee, markupPercent, companySplitPercent
    })
  }, [vanRental, guideFee, accommodation, headcount, perHeadFee, markupPercent])

  const handleGenerateInvoice = () => {
    if (quote.isLossRisk) {
      alert("Cannot generate invoice: Margin is below the 10% company minimum.")
      return
    }
    alert(`Generating Paymongo Link for ${clientName}... Total: PHP ${quote.clientTotalPrice.toLocaleString()}`)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotation Builder</h1>
        <p className="text-slate-500">Draft custom tour packages and adjust B2B margins in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Data Entry */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4">Client Details & Base Costs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Client</label>
                <input type="text" placeholder="e.g., Juan Dela Cruz" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Van Rental (PHP)</label>
                <input type="number" value={vanRental} onChange={(e) => setVanRental(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Guide Fee (PHP)</label>
                <input type="number" value={guideFee} onChange={(e) => setGuideFee(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation (PHP)</label>
                <input type="number" value={accommodation} onChange={(e) => setAccommodation(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Headcount</label>
                <input type="number" value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Per Head Fees (Env/Entrance/Insurance)</label>
                <input type="number" value={perHeadFee} onChange={(e) => setPerHeadFee(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded" />
              </div>
            </div>
          </div>

          {/* The Innovation Feature Slider */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200">
            <h2 className="text-lg font-bold text-blue-800 mb-2">Innovation: Affiliate Margin Slider</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-blue-900">Adjust Markup %</span>
              <span className="text-xl font-bold text-blue-700">{markupPercent}%</span>
            </div>
            <input type="range" min="5" max="40" value={markupPercent} onChange={(e) => setMarkupPercent(Number(e.target.value))} className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
            {quote.isLossRisk && (
              <p className="text-red-600 text-sm font-semibold mt-2">Warning: Markup is below the 10% minimum safety floor.</p>
            )}
          </div>
        </div>

        {/* Right Column: Invoice Summary */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Internal Profit Breakdown</h2>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Base Wholesale Cost</span>
              <span className="font-medium">PHP {quote.baseCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-blue-400">
              <span>Affiliate Commission (50%)</span>
              <span className="font-medium">PHP {quote.affiliateCommission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>JazGot Net Margin (50%)</span>
              <span className="font-medium">PHP {quote.companyProfit.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Final Client Price</p>
            <p className="text-3xl font-bold">PHP {quote.clientTotalPrice.toLocaleString()}</p>
          </div>

          <button 
            onClick={handleGenerateInvoice}
            disabled={quote.isLossRisk}
            className={`w-full mt-8 py-3 rounded-lg font-bold transition-colors ${
              quote.isLossRisk ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            Generate Paymongo Link
          </button>
        </div>

      </div>
    </div>
  )
}
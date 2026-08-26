"use client"

import React, { useState, useRef } from "react"
import { SiteShell } from "@/components/site-shell"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { toast } from "sonner"

export default function DashboardPage() {
  // State to handle the expandable invoice details
  const [isExpanded, setIsExpanded] = useState(true) // Default to true so it matches your screenshot
  
  // Ref to target the invoice container for the PDF snapshot
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current
    if (!element) return

    toast.loading("Generating your invoice...")

    try {
      // Temporarily ensure the element styling looks perfect for the PDF
      const canvas = await html2canvas(element, { 
        scale: 2, // Higher scale for better PDF quality
        backgroundColor: "#ffffff",
      })
      
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("JazGot_Invoice_JZT-84729.pdf")
      
      toast.dismiss()
      toast.success("Invoice downloaded successfully!")
    } catch (error) {
      toast.dismiss()
      toast.error("Failed to generate PDF.")
    }
  }

  return (
    <SiteShell>
      <div className="min-h-[70vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your bookings and invoices.</p>
          </div>

          {/* Target this specific wrapper for the PDF */}
          <div ref={invoiceRef} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Card Header */}
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-3">
                  CONFIRMED & PAID
                </span>
                <h2 className="text-xl font-bold text-slate-900">El Nido Island Hopping Tour A</h2>
                <p className="text-sm text-slate-500 mt-1">Booking Ref: #JZT-84729</p>
              </div>
              
              <div className="mt-4 md:mt-0 text-left md:text-right flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Total Paid</p>
                  <p className="text-xl font-bold text-[#ce9136]">₱1,350.00</p>
                </div>
                {/* Hide the toggle arrow from the PDF export via a quick data attribute check if needed, but keeping it simple here */}
                <div data-html2canvas-ignore className="text-slate-400 bg-slate-100 h-8 w-8 rounded-full flex items-center justify-center">
                  {isExpanded ? "▲" : "▼"}
                </div>
              </div>
            </div>

            {/* Expanded Details Section */}
            {isExpanded && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 mb-4">Invoice & Itinerary Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  {/* Left: Customer Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Lead Guest</p>
                      <p className="font-medium text-slate-900">Juan Dela Cruz</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Pax & Date</p>
                      <p className="font-medium text-slate-900">1 Guest • Pending Confirmation</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Contact</p>
                      <p className="font-medium text-slate-900">+63 900 000 0000</p>
                    </div>
                  </div>

                  {/* Right: Destinations */}
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Destinations</p>
                    <ul className="list-disc pl-4 text-slate-700 space-y-1">
                      <li>Big Lagoon</li>
                      <li>Secret Lagoon</li>
                      <li>Snorkeling spot</li>
                      <li>Shimizu Island</li>
                      <li>Seven Commandos Beach</li>
                    </ul>
                  </div>
                </div>
                
                {/* Download Button (data-html2canvas-ignore hides this button from the actual PDF printout!) */}
                <div data-html2canvas-ignore className="mt-8 pt-6 border-t border-slate-200 flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the card from collapsing when clicking the button
                      handleDownloadPDF();
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors text-sm"
                  >
                    Download PDF Invoice
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
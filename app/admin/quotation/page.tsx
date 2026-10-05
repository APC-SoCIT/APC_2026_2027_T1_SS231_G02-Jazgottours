'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ahvfnuwdglbohtxwmrfc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodmZudXdkZ2xib2h0eHdtcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzY4ODEsImV4cCI6MjEwMzE1Mjg4MX0.F6vljBSLGHoNFL1D5gRjkj--0s3EF2epzjb6YOa7G7s'
);

const TOUR_PACKAGES = [
  { id: 'tour-a', name: 'El Nido Island Hopping Tour A with Lunch', price: 1350 },
  { id: 'tour-b', name: 'El Nido Island Hopping Tour B with Lunch', price: 1500 },
  { id: 'tour-c', name: 'El Nido Island Hopping Tour C with Lunch', price: 1600 },
];

const ADD_ONS_LIST = [
  { id: 'kayak', name: 'Transparent Kayak Rental', price: 500 },
  { id: 'snorkel', name: 'Snorkeling Gear Set Rental', price: 300 },
  { id: 'transfer', name: 'Private Van Transfer (PPS - El Nido roundtrip)', price: 3500 },
];

export default function QuotationPage() {
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('ai');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal and feedback states
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [duration, setDuration] = useState('4D3N');
  const [pax, setPax] = useState<number>(2);
  
  const [selectedPackageId, setSelectedPackageId] = useState<string>('tour-a');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const activePackage = TOUR_PACKAGES.find(p => p.id === selectedPackageId) || TOUR_PACKAGES[0];
  const packageSubtotal = activePackage.price * Number(pax);
  const addOnsSubtotal = selectedAddOns.reduce((sum, addOnId) => {
    const addon = ADD_ONS_LIST.find(a => a.id === addOnId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalAmount = packageSubtotal + addOnsSubtotal;

  const handleAIParse = async () => {
    if (!rawText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/admin/api/parse-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText }),
      });

      const result = await res.json();

      if (result.success && result.data) {
        const { client_name, client_email, client_contact, duration, pax, tour_activities } = result.data;
        
        if (client_name) setClientName(client_name);
        if (client_email) setClientEmail(client_email);
        if (client_contact) setClientContact(client_contact);
        if (duration) setDuration(duration);
        if (pax) setPax(pax);

        if (tour_activities && tour_activities.length > 0) {
          const matchedText = tour_activities[0].toLowerCase();
          if (matchedText.includes('tour b')) setSelectedPackageId('tour-b');
          else if (matchedText.includes('tour c')) setSelectedPackageId('tour-c');
          else setSelectedPackageId('tour-a');
        }

        setActiveTab('manual');
      } else {
        setModalState({
          isOpen: true,
          title: 'Parsing Error',
          message: 'Failed to parse message: ' + (result.error || 'Unknown error'),
          type: 'error',
        });
      }
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Network Error',
        message: 'Network or parsing error: ' + err.message,
        type: 'error',
      });
    }

    setLoading(false);
  };

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleSaveQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    const referenceNo = `Q-${Date.now().toString().slice(-6)}`;

    const { error } = await supabase
      .from('quotations')
      .insert([
        {
          reference_no: referenceNo,
          client_name: clientName,
          client_email: clientEmail,
          client_contact: clientContact,
          duration: duration,
          pax: Number(pax),
          status: 'Draft',
          total_amount: totalAmount,
        }
      ]);

    if (error) {
      setModalState({
        isOpen: true,
        title: 'Database Error',
        message: 'Error saving quotation record: ' + error.message,
        type: 'error',
      });
    } else {
      setModalState({
        isOpen: true,
        title: 'Action Successful',
        message: `Quotation record reference number ${referenceNo} has been successfully saved to the registry.`,
        type: 'success',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-gray-900 bg-white relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">Jazgot Tours Administration</span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">Quotation Management Module</h1>
        </div>
        
        <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'ai' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Chat Message Parser
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'manual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quotation Form
          </button>
        </div>
      </div>

      {activeTab === 'ai' && (
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Automated Inquiry Extraction</h2>
          <p className="text-xs text-gray-500 mb-4">Paste unstructured client chat logs below to automatically populate customer parameters and map package preferences.</p>
          <textarea
            rows={4}
            className="w-full p-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
            placeholder="Paste client inquiry text here..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAIParse}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Processing Text...' : 'Extract and Populate Form'}
          </button>
        </div>
      )}

      <form onSubmit={handleSaveQuotation} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-3">Client Profile Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Full Client Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Contact Number</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Headcount (Pax)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-3">Select Tour Package</h2>
            <div className="space-y-3">
              {TOUR_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <label
                    key={pkg.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/30' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="tour_package"
                        checked={isSelected}
                        onChange={() => setSelectedPackageId(pkg.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm font-semibold text-gray-900">{pkg.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">₱{pkg.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ pax</span></span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-3">Optional Add-ons</h2>
            <div className="space-y-3">
              {ADD_ONS_LIST.map((addon) => {
                const isChecked = selectedAddOns.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                      isChecked ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAddOnToggle(addon.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-900">{addon.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">+₱{addon.price.toLocaleString()}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-6 space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Financial Breakdown</span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">Quotation Summary</h3>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Headcount:</span>
                <span className="font-semibold text-gray-900">{pax} Pax</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold text-gray-900">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Package Subtotal:</span>
                <span className="font-semibold text-gray-900">₱{packageSubtotal.toLocaleString()}</span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons Subtotal:</span>
                  <span className="font-semibold text-gray-900">₱{addOnsSubtotal.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Total Amount:</span>
                <span className="text-xl font-black text-blue-600">₱{totalAmount.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                Save Quotation Record
              </button>
            </div>
          </div>
        </div>

      </form>

      {/* Formal Modal Dialog Overlay */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-sm w-full p-6 shadow-xl text-center relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <button
              type="button"
              onClick={() => setModalState(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex justify-center pt-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${
                modalState.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                <span className="text-xl font-bold">{modalState.type === 'success' ? '✓' : '!'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">{modalState.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed px-2">
                {modalState.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalState(prev => ({ ...prev, isOpen: false }))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Done
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
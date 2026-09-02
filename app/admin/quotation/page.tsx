'use client';
import { useState } from 'react';
import { FiDownload, FiSend, FiCheckCircle, FiCpu, FiLoader, FiZap } from 'react-icons/fi';

interface Item {
  name: string;
  price: number;
  category: string;
}

const AVAILABLE_ITEMS: Item[] = [
  { name: 'El Nido Island Tour A', price: 1200, category: 'Tour Packages' },
  { name: 'El Nido Island Tour B', price: 1300, category: 'Tour Packages' },
  { name: 'El Nido Island Tour C', price: 1400, category: 'Tour Packages' },
  { name: 'Chasing Sunset Tour', price: 1500, category: 'Tour Packages' },
  { name: 'Airport Transfer (PPS - ENI)', price: 600, category: 'Transport & Fees' },
  { name: 'Environmental Fee', price: 200, category: 'Transport & Fees' },
  { name: 'Lagoon Entrance Fee', price: 200, category: 'Transport & Fees' },
  { name: 'Travel Insurance', price: 150, category: 'Add-ons' },
];

export default function QuotationPage() {
  const [client, setClient] = useState('');
  const [rawMessage, setRawMessage] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  const [selectedItems, setSelectedItems] = useState<Item[]>([
    AVAILABLE_ITEMS[0],
    AVAILABLE_ITEMS[4],
    AVAILABLE_ITEMS[5],
  ]);
  const [notes, setNotes] = useState('Includes boat transfer, buffet lunch, and required fees.');
  const [downloaded, setDownloaded] = useState(false);

  // Simulated AI Copilot Parsing Action
  const handleParseWithAICopilot = () => {
    if (!rawMessage.trim()) return;
    setIsParsing(true);
    setParseSuccess(false);

    setTimeout(() => {
      setClient('Juan Dela Cruz (via FB Messenger)');
      setSelectedItems([
        AVAILABLE_ITEMS[0], // Tour A
        AVAILABLE_ITEMS[2], // Tour C
        AVAILABLE_ITEMS[4], // Airport Transfer
        AVAILABLE_ITEMS[7], // Travel Insurance
      ]);
      setNotes('Parsed via AI Copilot: 4D3N stay requested, 4 Adults headcount. Checked and ready for final review.');
      setIsParsing(false);
      setParseSuccess(true);
      setTimeout(() => setParseSuccess(false), 4000);
    }, 1200);
  };

  const handleAddItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemName = e.target.value;
    if (!itemName) return;
    const found = AVAILABLE_ITEMS.find((i) => i.name === itemName);
    if (found && !selectedItems.some((i) => i.name === found.name)) {
      setSelectedItems([...selectedItems, found]);
    }
    e.target.value = '';
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleGeneratePDF = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 p-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Owner & Sales Workspace</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">PDF Invoice & Quotation Generator</h1>
        <p className="text-sm text-gray-600">Parse messy client chats automatically with AI or build invoices manually.</p>
      </div>

      {/* AI Conversational Itinerary Parser Widget */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-xl text-[#c89134] border border-amber-200/60 shadow-2xs">
              <FiZap size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">AI-Powered Conversational Itinerary Parser</h3>
              <p className="text-xs text-gray-500">Paste raw client chats (Messenger, Viber, SMS) to auto-fill quotation fields.</p>
            </div>
          </div>
          {parseSuccess && (
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium self-start sm:self-auto">
              <FiCheckCircle size={14} className="text-green-600" /> Successfully Parsed & Auto-Filled!
            </span>
          )}
        </div>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={rawMessage}
            onChange={(e) => setRawMessage(e.target.value)}
            placeholder={`e.g., "Hi, balak namin mag El Nido 4D3N next month, 4 adults kami na may kasamang airport transfer tapos gusto namin sumali sa Island Tour A at C, meron ba kayong kasamang insurance?"`}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c89134] focus:bg-white transition"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleParseWithAICopilot}
              disabled={isParsing}
              className="bg-[#c89134] hover:bg-[#b07c29] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isParsing ? (
                <>
                  <FiLoader className="animate-spin" size={16} /> Parsing with Gemini AI...
                </>
              ) : (
                <>
                  <FiCpu size={16} /> Parse with AI Copilot
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Quotation Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Invoice & Package Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Client Name</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g., Juan Dela Cruz"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c89134]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Add Offerings / Fees</label>
            <select
              onChange={handleAddItem}
              defaultValue=""
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c89134] bg-white cursor-pointer"
            >
              <option value="" disabled>+ Choose item to add...</option>
              <optgroup label="Tour Packages">
                {AVAILABLE_ITEMS.filter(i => i.category === 'Tour Packages').map(item => (
                  <option key={item.name} value={item.name}>{item.name} - ₱{item.price.toLocaleString()}</option>
                ))}
              </optgroup>
              <optgroup label="Transport & Fees">
                {AVAILABLE_ITEMS.filter(i => i.category === 'Transport & Fees').map(item => (
                  <option key={item.name} value={item.name}>{item.name} - ₱{item.price.toLocaleString()}</option>
                ))}
              </optgroup>
              <optgroup label="Add-ons">
                {AVAILABLE_ITEMS.filter(i => i.category === 'Add-ons').map(item => (
                  <option key={item.name} value={item.name}>{item.name} - ₱{item.price.toLocaleString()}</option>
                ))}
              </optgroup>
            </select>

            {selectedItems.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {selectedItems.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-[#fcfbf9] border border-amber-200/80 text-gray-800 text-xs px-2.5 py-1 rounded-lg shadow-2xs font-medium"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#c89134] font-semibold">₱{item.price.toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-gray-400 hover:text-red-500 transition ml-0.5"
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Inclusions / Custom Notes</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c89134]"
          />
        </div>

        {/* Clean PDF Preview Box */}
        <div className="bg-[#fcfbf9] border border-amber-200/80 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-amber-200/50 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c89134]">JazGot Travel & Tours</span>
              <h3 className="text-base font-bold text-gray-900">Official Quotation / Invoice Preview</h3>
            </div>
            <span className="text-xs text-gray-500">Ref: INV-{Math.floor(Math.random() * 90000 + 10000)}</span>
          </div>

          <div className="text-sm space-y-3 text-gray-700">
            <p><strong className="text-gray-900">Billed To:</strong> {client || '[Client Name Placeholder]'}</p>
            
            <div>
              <strong className="text-gray-900 block mb-2">Selected Items & Fees:</strong>
              {selectedItems.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No items selected yet. Use the dropdown above to add tours, transport, or fees.</p>
              ) : (
                <div className="space-y-1.5 border border-amber-100 rounded-lg bg-white p-3">
                  {selectedItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200/60">{item.category}</span>
                      </div>
                      <span className="font-bold text-gray-900">₱{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-gray-200 font-bold text-sm text-gray-900">
                    <span>Total Amount:</span>
                    <span className="text-[#c89134] text-base">₱{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="pt-1"><strong className="text-gray-900">Notes:</strong> {notes}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleGeneratePDF}
            className="flex-1 bg-[#c89134] hover:bg-[#b07c29] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
          >
            {downloaded ? <FiCheckCircle size={16} /> : <FiDownload size={16} />}
            {downloaded ? 'PDF Downloaded Successfully!' : 'Download PDF Invoice'}
          </button>
          <button
            type="button"
            onClick={() => alert(`Invoice sent directly to ${client || 'the client'}`)}
            className="flex-1 bg-[#2c221e] hover:bg-[#3a2e29] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
          >
            <FiSend size={16} /> Send PDF via Email / Viber
          </button>
        </div>
      </div>
    </div>
  );
}
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabase = createClient(
  'https://ahvfnuwdglbohtxwmrfc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodmZudXdkZ2xib2h0eHdtcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzY4ODEsImV4cCI6MjEwMzE1Mjg4MX0.F6vljBSLGHoNFL1D5gRjkj--0s3EF2epzjb6YOa7G7s'
);

interface PageProps {
  params: Promise<{ reference: string }>;
}

export default async function ClientQuotationView({ params }: PageProps) {
  const { reference } = await params;

  // Fetch the quotation record matching the reference number
  const { data: quotation, error } = await supabase
    .from('quotations')
    .select('*')
    .eq('reference_no', reference)
    .single();

  if (error || !quotation) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans text-gray-900 bg-white">
      <div className="border-b border-gray-200 pb-6 mb-8 flex justify-between items-baseline">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">Jazgot Tours Official Quotation</span>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">Reference: {quotation.reference_no}</h1>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          Status: {quotation.status}
        </span>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-3">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <span className="block uppercase text-[10px] text-gray-400 font-bold">Client Name</span>
              <span className="font-semibold text-gray-900 text-sm">{quotation.client_name}</span>
            </div>
            <div>
              <span className="block uppercase text-[10px] text-gray-400 font-bold">Email Address</span>
              <span className="font-semibold text-gray-900 text-sm">{quotation.client_email}</span>
            </div>
            <div>
              <span className="block uppercase text-[10px] text-gray-400 font-bold">Contact Number</span>
              <span className="font-semibold text-gray-900 text-sm">{quotation.client_contact || 'N/A'}</span>
            </div>
            <div>
              <span className="block uppercase text-[10px] text-gray-400 font-bold">Duration</span>
              <span className="font-semibold text-gray-900 text-sm">{quotation.duration}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-3">Trip Cost Breakdown</h2>
          <div className="space-y-3 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Headcount:</span>
              <span className="font-semibold text-gray-900">{quotation.pax} Pax</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="text-sm font-bold uppercase text-gray-700">Total Investment:</span>
              <span className="text-xl font-black text-blue-600">₱{Number(quotation.total_amount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
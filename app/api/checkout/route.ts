import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Or use SERVICE_ROLE_KEY if bypassing RLS
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --> ADDED: Dynamically capture the current website URL (whether localhost or GitHub Codespaces)
    const origin = body.origin;
    
    // 1. Authenticate with Paymongo using your Secret Key
    const paymongoSecret = process.env.PAYMONGO_SECRET_KEY;
    if (!paymongoSecret) {
      return NextResponse.json({ error: 'Paymongo secret key is missing' }, { status: 500 });
    }
    const encodedKey = Buffer.from(`${paymongoSecret}:`).toString('base64');
    
    // 2. Create the Paymongo Checkout Session
    const paymongoPayload = {
      data: {
        attributes: {
          billing: {
            name: body.leadGuestName,
            phone: body.contactNumber
          },
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          
          // --> CHANGED: Use the dynamic origin variable here instead of hardcoding localhost
          cancel_url: `${origin}/checkout`,
          success_url: `${origin}/dashboard?success=true`,
          
          description: 'Jazgot Tour Services Booking',
          line_items: [
            {
              currency: 'PHP',
              amount: body.totalAmount * 100, // Paymongo requires amounts in cents (e.g., 135000 for ₱1,350)
              name: body.tourPackage,
              quantity: body.pax
            }
          ],
          payment_method_types: ['card', 'gcash', 'paymaya']
        }
      }
    };

    const paymongoRes = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Basic ${encodedKey}`
      },
      body: JSON.stringify(paymongoPayload)
    });

    const paymongoData = await paymongoRes.json();
    
    if (!paymongoRes.ok) {
      console.error("Paymongo Error:", paymongoData);
      return NextResponse.json({ error: 'Failed to create payment gateway session' }, { status: 500 });
    }

    const checkoutUrl = paymongoData.data.attributes.checkout_url;
    const checkoutId = paymongoData.data.id;

    // 3. Save the pending booking to your new Supabase table
    const { error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: body.userId, 
          tour_package: body.tourPackage,
          lead_guest_name: body.leadGuestName,
          pax: body.pax,
          tour_date: body.tourDate,
          contact_number: body.contactNumber,
          total_amount: body.totalAmount,
          paymongo_checkout_id: checkoutId,
          payment_status: 'pending'
        }
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return NextResponse.json({ error: 'Failed to save booking to database' }, { status: 500 });
    }

    // 4. Send the Paymongo URL back to the frontend
    return NextResponse.json({ url: checkoutUrl });
    
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
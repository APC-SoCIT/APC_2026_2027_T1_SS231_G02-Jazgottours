import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ahvfnuwdglbohtxwmrfc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodmZudXdkZ2xib2h0eHdtcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzY4ODEsImV4cCI6MjEwMzE1Mjg4MX0.F6vljBSLGHoNFL1D5gRjkj--0s3EF2epzjb6YOa7G7s'
const supabase = createClient(supabaseUrl, supabaseKey)

// GET: Fetch all services
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST: Add new service
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('services')
      .insert([body])
      .select()

    if (error) {
      console.error("Supabase insert error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error("POST route exception:", err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

// PATCH: Update service price
export async function PATCH(request: Request) {
  try {
    const { id, base_price } = await request.json()

    const { data, error } = await supabase
      .from('services')
      .update({ base_price })
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
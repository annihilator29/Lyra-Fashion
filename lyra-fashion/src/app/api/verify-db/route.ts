import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('products').select('*')

    return NextResponse.json({
        status: error ? 'error' : 'ok',
        count: data?.length,
        error,
        data
    })
}

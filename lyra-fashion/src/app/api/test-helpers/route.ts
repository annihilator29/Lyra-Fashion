import { NextRequest } from 'next/server';
import { createDummyOrder } from '@/app/actions/order';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Get the currently logged in user to create a dummy order for them
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Create a dummy order for the current user
    const result = await createDummyOrder();
    
    if (result.success && result.orderId) {
      return Response.json({ 
        success: true, 
        orderId: result.orderId,
        message: 'Dummy order created successfully' 
      });
    } else {
      return Response.json({ 
        success: false, 
        error: result.error || 'Failed to create dummy order' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating dummy order:', error);
    return Response.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
'use server'

import { createClient } from '@/lib/supabase/server'
import { Order, OrderItem, OrderStatus, ShippingAddress } from '@/types/database.types'
import { revalidatePath } from 'next/cache'

export type OrderWithItems = Order & {
    order_items: OrderItem[]
}

export async function getOrders(): Promise<{ data: Order[] | null; error: string | null }> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { data: null, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching orders:', error)
        return { data: null, error: 'Failed to fetch orders' }
    }

    return { data, error: null }
}

export async function getOrderDetails(orderId: string): Promise<{ data: OrderWithItems | null; error: string | null }> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { data: null, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (*)
    `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single()

    if (error) {
        console.error('Error fetching order details:', error)
        return { data: null, error: 'Failed to fetch order details' }
    }

    return { data: data as OrderWithItems, error: null }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

    if (error) {
        console.error('Error updating order status:', error)
        return { success: false, error: 'Failed to update status' }
    }

    revalidatePath(`/account/orders/${orderId}`)
    return { success: true, error: null }
}

export async function createDummyOrder(): Promise<{ success: boolean; orderId?: string; error: string | null }> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const { data, error } = await supabase
        .from('orders')
        .insert({
            user_id: user.id,
            status: 'pending',
            total_amount: 5000,
            currency: 'usd',
            shipping_address: {
                name: 'Test User',
                line1: '123 Test St',
                city: 'Test City',
                state: 'TS',
                postal_code: '12345',
                country: 'Test Country'
            } as ShippingAddress
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating dummy order:', error)
        return { success: false, error: 'Failed to create order' }
    }

    // Add an item
    await supabase.from('order_items').insert({
        order_id: data.id,
        product_id: null, // Or a real product ID if we knew one, but schema allows null
        quantity: 1,
        price_at_purchase: 5000
    })

    revalidatePath('/admin/demo')
    revalidatePath('/account/orders')
    return { success: true, orderId: data.id, error: null }
}

import { getOrders } from '@/app/actions/order'
import { OrderList } from '@/components/orders/OrderList'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Order History | Lyra Fashion',
    description: 'View your past orders and their status.',
}

export default async function OrderHistoryPage() {
    const { data: orders, error } = await getOrders()

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Order History</h1>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            <OrderList orders={orders || []} />
        </div>
    )
}

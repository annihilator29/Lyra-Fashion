import { Order } from '@/types/database.types'
import { OrderCard } from './OrderCard'

interface OrderListProps {
    orders: Order[]
}

export function OrderList({ orders }: OrderListProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-10">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}

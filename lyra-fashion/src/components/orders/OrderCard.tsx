import Link from 'next/link'
import { format } from 'date-fns'
import { Order, centsToFormattedPrice } from '@/types/database.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface OrderCardProps {
    order: Order
}

export function OrderCard({ order }: OrderCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800'
            case 'shipped':
                return 'bg-blue-100 text-blue-800'
            case 'delivered':
                return 'bg-gray-100 text-gray-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-yellow-100 text-yellow-800'
        }
    }

    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Order #{order.id.slice(0, 8)}
                </CardTitle>
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        <p>Date: {format(new Date(order.created_at), 'PPP')}</p>
                        <p>Total: {centsToFormattedPrice(order.total_amount)}</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/account/orders/${order.id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

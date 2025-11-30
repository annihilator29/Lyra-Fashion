import { getOrderDetails } from '@/app/actions/order'
import { centsToFormattedPrice } from '@/types/database.types'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import { TrackingTimeline } from '@/components/account/tracking-timeline'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    return {
        title: `Order #${id.slice(0, 8)} | Lyra Fashion`,
    }
}

export default async function OrderDetailsPage({ params }: PageProps) {
    const { id } = await params
    const { data: order, error } = await getOrderDetails(id)

    if (error || !order) {
        if (error === 'Failed to fetch order details') {
            return (
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                    <div className="mt-4">
                        <Button asChild variant="outline">
                            <Link href="/account/orders">Back to Orders</Link>
                        </Button>
                    </div>
                </div>
            )
        }
        notFound()
    }

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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/account/orders">← Back to Orders</Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-muted-foreground">
                        Placed on {format(new Date(order.created_at), 'PPP')}
                    </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
            </div>

            <div className="mb-8">
                <TrackingTimeline status={order.status} />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.order_items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Product ID: {item.product_id}</p>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">{centsToFormattedPrice(item.price_at_purchase * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.shipping_address ? (
                                <address className="not-italic text-sm">
                                    <p>{order.shipping_address.name}</p>
                                    <p>{order.shipping_address.line1}</p>
                                    {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
                                    <p>
                                        {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                                    </p>
                                    <p>{order.shipping_address.country}</p>
                                </address>
                            ) : (
                                <p className="text-sm text-muted-foreground">No shipping address provided</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>{centsToFormattedPrice(order.total_amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{centsToFormattedPrice(order.total_amount)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

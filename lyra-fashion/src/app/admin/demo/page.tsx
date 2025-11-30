import { getOrders, updateOrderStatus, createDummyOrder } from '@/app/actions/order'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderStatus } from '@/types/database.types'
import { revalidatePath } from 'next/cache'

export default async function AdminDemoPage() {
    const { data: orders, error } = await getOrders()

    if (error) {
        return <div>Error loading orders: {error}</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Demo: Order Status Manager</h1>
                <form action={async () => {
                    'use server'
                    await createDummyOrder()
                }}>
                    <Button type="submit">Seed Dummy Order</Button>
                </form>
            </div>

            <div className="grid gap-4">
                {orders?.map((order) => (
                    <Card key={order.id}>
                        <CardHeader>
                            <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <p>Current Status: <span className="font-bold">{order.status}</span></p>
                                <p className="text-sm text-muted-foreground">Total: ${(order.total_amount / 100).toFixed(2)}</p>
                            </div>
                            <form action={async (formData) => {
                                'use server'
                                const status = formData.get('status') as OrderStatus
                                await updateOrderStatus(order.id, status)
                                revalidatePath('/admin/demo')
                            }} className="flex gap-2 items-center">
                                <select
                                    name="status"
                                    defaultValue={order.status}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="production">Production</option>
                                    <option value="quality_check">Quality Check</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <Button type="submit">Update</Button>
                            </form>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

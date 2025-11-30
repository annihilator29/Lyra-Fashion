import { Resend } from 'resend'
import { render } from '@react-email/components'
import OrderConfirmationEmail from '@/emails/order-confirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderEmailData {
    to: string
    orderId: string
    totalAmount: number
    orderItems: Array<{
        productName: string
        quantity: number
        price: number
    }>
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    try {
        const emailHtml = await render(
            OrderConfirmationEmail({
                orderId: data.orderId,
                totalAmount: data.totalAmount,
                orderItems: data.orderItems,
            })
        )

        const { data: result, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'orders@lyrafashion.com',
            to: data.to,
            subject: `Order Confirmation - ${data.orderId}`,
            html: emailHtml,
        })

        if (error) {
            console.error('Error sending email:', error)
            throw error
        }

        console.log('Email sent successfully:', result)
        return result
    } catch (error) {
        console.error('Failed to send email:', error)
        throw error
    }
}

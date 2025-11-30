import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components'

interface OrderConfirmationEmailProps {
    orderId: string
    totalAmount: number
    orderItems: Array<{
        productName: string
        quantity: number
        price: number
    }>
}

export default function OrderConfirmationEmail({
    orderId,
    totalAmount,
    orderItems,
}: OrderConfirmationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Your Lyra Fashion order has been confirmed!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Order Confirmed!</Heading>
                    <Text style={text}>
                        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                    </Text>

                    <Section style={orderSection}>
                        <Text style={orderIdText}>Order ID: {orderId}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Heading as="h2" style={h2}>
                        Order Summary
                    </Heading>

                    {orderItems.map((item, index) => (
                        <Section key={index} style={itemSection}>
                            <Text style={itemName}>
                                {item.productName} x {item.quantity}
                            </Text>
                            <Text style={itemPrice}>
                                ${((item.price * item.quantity) / 100).toFixed(2)}
                            </Text>
                        </Section>
                    ))}

                    <Hr style={hr} />

                    <Section style={totalSection}>
                        <Text style={totalLabel}>Total</Text>
                        <Text style={totalAmountStyle}>
                            ${(totalAmount / 100).toFixed(2)}
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        If you have any questions, please contact our support team.
                    </Text>
                    <Text style={footer}>
                        © 2025 Lyra Fashion. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
}

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
}

const h2 = {
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '24px 0 16px',
}

const text = {
    color: '#333',
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center' as const,
    padding: '0 40px',
}

const orderSection = {
    padding: '24px 40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    margin: '24px 40px',
}

const orderIdText = {
    fontSize: '12px',
    color: '#666',
    margin: '0',
    textAlign: 'center' as const,
}

const itemSection = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 40px',
}

const itemName = {
    fontSize: '14px',
    color: '#333',
    margin: '0',
}

const itemPrice = {
    fontSize: '14px',
    color: '#333',
    margin: '0',
    fontWeight: '500',
}

const totalSection = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 40px',
}

const totalLabel = {
    fontSize: '16px',
    color: '#333',
    margin: '0',
    fontWeight: 'bold',
}

const totalAmountStyle = {
    fontSize: '16px',
    color: '#333',
    margin: '0',
    fontWeight: 'bold',
}

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 40px',
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '12px',
}

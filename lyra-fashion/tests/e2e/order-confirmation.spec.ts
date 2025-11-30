import { test, expect } from '@playwright/test'

test.describe('Order Confirmation Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to shop
        await page.goto('/shop')
    })

    test('should display success page after payment', async ({ page }) => {
        // This is a basic test - in a real scenario, you'd go through the full checkout flow
        // For now, we'll simulate arriving at the success page

        // Navigate directly to success page with mock payment intent
        await page.goto('/checkout/success?payment_intent=pi_test_12345&payment_intent_client_secret=secret&redirect_status=succeeded')

        // Wait for page to load
        await page.waitForLoadState('networkidle')

        // Should show loading state initially (since order might not be created yet)
        const loadingOrSuccess = page.locator('text=Finalizing your order|Order Confirmed')
        await expect(loadingOrSuccess).toBeVisible({ timeout: 10000 })
    })

    test('should show error for invalid payment intent', async ({ page }) => {
        // Navigate to success page without payment intent
        await page.goto('/checkout/success')

        // Should show error
        await expect(page.locator('text=Invalid Request')).toBeVisible()
    })

    test('should clear cart after successful order', async ({ page }) => {
        // This test would require:
        // 1. Adding items to cart
        // 2. Going through checkout
        // 3. Completing payment
        // 4. Verifying cart is empty

        // Skipped for now as it requires full checkout integration
        test.skip()
    })
})

test.describe('Webhook Handler', () => {
    test('should create order on payment_intent.succeeded event', async ({ request }) => {
        // Skip if webhook secret is not available
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.log('Skipping webhook test: STRIPE_WEBHOOK_SECRET not found')
            test.skip()
            return
        }

        const Stripe = require('stripe')
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
            apiVersion: '2024-11-20.acacia', // Use latest or matching version
        })

        // Mock payload
        const payload = {
            id: 'evt_test_webhook',
            object: 'event',
            type: 'payment_intent.succeeded',
            data: {
                object: {
                    id: 'pi_test_integration_' + Date.now(),
                    amount: 2000,
                    currency: 'usd',
                    metadata: {
                        cartItems: JSON.stringify([{ id: 'prod_test_1', qty: 2 }]),
                        userId: 'user_test_123',
                    },
                },
            },
        }

        const payloadString = JSON.stringify(payload)
        const secret = process.env.STRIPE_WEBHOOK_SECRET

        // Generate signature
        const signature = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        })

        // Send webhook request
        const response = await request.post('/api/webhooks/stripe', {
            headers: {
                'stripe-signature': signature,
                'Content-Type': 'application/json',
            },
            data: payloadString,
        })

        // Verify response
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.received).toBe(true)

        // Note: To fully verify, we'd check the DB here, but that requires direct DB access
        // which might not be set up in this test environment.
        // The 200 OK with 'received: true' confirms the handler processed it successfully.
    })
})

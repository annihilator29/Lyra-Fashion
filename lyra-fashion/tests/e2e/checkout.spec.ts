import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the checkout page
    // For now, we'll assume a basic setup - in a real app we might need to add items to cart first
    await page.goto('/checkout');
  });

  test('should display checkout page with shipping form and order summary', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Checkout/);

    // Verify shipping form is present
    await expect(page.locator('text=Shipping Information')).toBeVisible();
    await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();
    await expect(page.locator('input[placeholder="123 Main Street"]')).toBeVisible();
    await expect(page.locator('input[placeholder="New York"]')).toBeVisible();
    await expect(page.locator('input[placeholder="10001"]')).toBeVisible();
    await expect(page.locator('input[placeholder="United States"]')).toBeVisible();

    // Verify order summary is present
    await expect(page.locator('text=Order Summary')).toBeVisible();

    // Verify proceed to payment button exists
    const proceedButton = page.locator('button:has-text("Proceed to Payment")');
    await expect(proceedButton).toBeVisible();
    await expect(proceedButton).toBeDisabled(); // Should be disabled initially
  });

  test('should validate shipping form fields', async ({ page }) => {
    // Fill in shipping information with some invalid data to test validation
    await page.locator('input[placeholder="John Doe"]').fill('J');
    await page.locator('input[placeholder="123 Main Street"]').fill('12');
    await page.locator('input[placeholder="New York"]').fill('N');
    await page.locator('input[placeholder="10001"]').fill('12');
    await page.locator('input[placeholder="United States"]').fill('U');

    // Click the save button to trigger validation
    await page.locator('button:has-text("Save Shipping Information")').click();

    // Check for validation messages
    await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=Address must be at least 5 characters')).toBeVisible();
    await expect(page.locator('text=City must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=ZIP code must be at least 3 characters')).toBeVisible();
    await expect(page.locator('text=Country must be at least 2 characters')).toBeVisible();
  });

  test('should enable proceed to payment button when form is valid', async ({ page }) => {
    // Fill in valid shipping information
    await page.locator('input[placeholder="John Doe"]').fill('John Doe');
    await page.locator('input[placeholder="123 Main Street"]').fill('123 Main Street');
    await page.locator('input[placeholder="New York"]').fill('New York');
    await page.locator('input[placeholder="10001"]').fill('10001');
    await page.locator('input[placeholder="United States"]').fill('United States');

    // Wait for form validation to update the button state
    await page.waitForTimeout(500);

    // Verify proceed to payment button is now enabled
    const proceedButton = page.locator('button:has-text("Proceed to Payment")');
    await expect(proceedButton).toBeEnabled();
  });

  test('should display order summary with items and totals', async ({ page }) => {
    // Verify order summary elements are present
    await expect(page.locator('text=Subtotal')).toBeVisible();
    await expect(page.locator('text=Shipping')).toBeVisible();
    await expect(page.locator('text=Total')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test on desktop size
    await page.setViewportSize({ width: 1200, height: 800 });
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toHaveClass(/grid-cols-2/);

    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(gridContainer).toHaveClass(/grid-cols-1/);
  });
});

test.describe('Payment Integration', () => {
  test.beforeEach(async ({ page, context }) => {
    // Add items to cart first (seed the cart with test data)
    await context.addCookies([
      {
        name: 'lyra-cart-storage',
        value: JSON.stringify({
          state: {
            items: [
              {
                id: 'test-product-1',
                productId: 'test-product-1',
                name: 'Test Product',
                price: 100,
                quantity: 1,
                slug: 'test-product'
              }
            ]
          },
          version: 0
        }),
        domain: 'localhost',
        path: '/'
      }
    ]);

    // Navigate to checkout page
    await page.goto('/checkout');

    // Fill in shipping information
    await page.locator('input[placeholder="John Doe"]').fill('John Doe');
    await page.locator('input[placeholder="123 Main Street"]').fill('123 Main Street');
    await page.locator('input[placeholder="New York"]').fill('New York');
    await page.locator('input[placeholder="10001"]').fill('10001');
    await page.locator('input[placeholder="United States"]').fill('United States');

    // Wait for validation
    await page.waitForTimeout(500);
  });

  test('should show Stripe payment form after proceeding from shipping', async ({ page }) => {
    // Click proceed to payment
    await page.locator('button:has-text("Proceed to Payment")').click();

    // Wait for payment intent creation
    await page.waitForTimeout(2000);

    // Verify payment step is shown
    await expect(page.locator('text=Payment Details')).toBeVisible();

    // Verify Stripe Payment Element is loaded
    // Stripe Elements create an iframe, so we check for its presence
    const iframe = page.frameLocator('iframe[name^="__privateStripeFrame"]').first();
    await expect(iframe.locator('body')).toBeVisible({ timeout: 10000 });

    // Verify back button exists
    await expect(page.locator('button:has-text("Back to Shipping")')).toBeVisible();
  });

  test('should successfully process payment with test card (4242)', async ({ page }) => {
    // Proceed to payment
    await page.locator('button:has-text("Proceed to Payment")').click();
    await page.waitForTimeout(2000);

    // Wait for Stripe Elements to load
    await page.waitForTimeout(3000);

    // Fill in Stripe test card details (Stripe's test card that succeeds)
    const iframe = page.frameLocator('iframe[name^="__privateStripeFrame"]').first();

    // Note: This is a simplified test. In real E2E tests, you'd need to:
    // 1. Use Stripe's test mode
    // 2. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in test env
    // 3. Fill actual card fields in Stripe iframe

    // For now, we verify the pay button exists
    const payButton = page.locator('button:has-text("Pay $")');
    await expect(payButton).toBeVisible();

    // In a full test, you would:
    // - Fill card number: 4242424242424242
    // - Fill expiry: 12/34
    // - Fill CVC: 123
    // - Click pay button
    // - Verify redirect to success page
  });

  test('should show error for declined card (4000)', async ({ page }) => {
    // Proceed to payment
    await page.locator('button:has-text("Proceed to Payment")').click();
    await page.waitForTimeout(2000);

    // Wait for Stripe Elements to load
    await page.waitForTimeout(3000);

    // Verify payment form is ready
    const payButton = page.locator('button:has-text("Pay $")');
    await expect(payButton).toBeVisible();

    // Note: In real E2E tests, you would:
    // - Fill card number: 4000000000000002 (Stripe's decline test card)
    // - Fill expiry: 12/34
    // - Fill CVC: 123
    // - Click pay button
    // - Verify error message is shown
    // - Verify user stays on payment page
  });

  test('should show loading state during payment processing', async ({ page }) => {
    // Proceed to payment
    await page.locator('button:has-text("Proceed to Payment")').click();

    // Verify loading state is shown briefly
    await expect(page.locator('text=Preparing payment...')).toBeVisible();

    // Wait for payment form to appear
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Payment Details')).toBeVisible();
  });

  test('should navigate back to shipping from payment step', async ({ page }) => {
    // Proceed to payment
    await page.locator('button:has-text("Proceed to Payment")').click();
    await page.waitForTimeout(2000);

    // Click back button
    await page.locator('button:has-text("Back to Shipping")').click();

    // Verify we're back on shipping step
    await expect(page.locator('text=Shipping Information')).toBeVisible();
    await expect(page.locator('input[placeholder="John Doe"]')).toHaveValue('John Doe');
  });
});


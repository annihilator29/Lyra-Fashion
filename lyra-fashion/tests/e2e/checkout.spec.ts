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

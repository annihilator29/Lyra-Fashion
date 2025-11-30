import { test, expect } from '@playwright/test';

test.describe('Inventory Management', () => {
  test('should allow admin to access inventory page', async ({ page }) => {
    // Mock the authentication state to simulate an admin user
    await page.addInitScript(() => {
      Object.defineProperty(window, 'useUserMock', {
        writable: true,
        value: {
          user: { id: 'test-admin-id', email: 'admin@example.com', role: 'admin' },
          isLoading: false,
          isCheckingRole: false,
          error: null
        }
      });
    });

    // Navigate to inventory page
    await page.goto('/admin/inventory');

    // Verify access to inventory page
    await expect(page.getByRole('heading', { name: 'Inventory Management' })).toBeVisible();
  });

  test('should show inventory list with products', async ({ page }) => {
    // Mock the authentication state to simulate an admin user
    await page.addInitScript(() => {
      Object.defineProperty(window, 'useUserMock', {
        writable: true,
        value: {
          user: { id: 'test-admin-id', email: 'admin@example.com', role: 'admin' },
          isLoading: false,
          isCheckingRole: false,
          error: null
        }
      });
    });

    // Mock the inventory API response
    await page.route('**/api/inventory', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 'test-item-1',
              product_id: 'test-product-1',
              product_name: 'Test Product',
              product_slug: 'test-product',
              product_images: ['https://example.com/image.jpg'],
              variant_id: 'test-variant-1',
              variant_name: 'Small/Red',
              sku: 'TP-SM-RED-001',
              quantity: 10,
              low_stock_threshold: 5,
              reserved_quantity: 0
            }
          ],
          total: 1,
          pages: 1
        })
      });
    });

    // Navigate to inventory page
    await page.goto('/admin/inventory');

    // Verify inventory table is visible
    await expect(page.locator('table')).toBeVisible();

    // Check that table headers are present
    await expect(page.getByText('Product Name')).toBeVisible();
    await expect(page.getByText('Variant (Size/Color)')).toBeVisible();
    await expect(page.getByText('SKU')).toBeVisible();
    await expect(page.getByText('Current Stock')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
  });

  test('should allow admin to update stock quantity', async ({ page }) => {
    // Mock the authentication state to simulate an admin user
    await page.addInitScript(() => {
      Object.defineProperty(window, 'useUserMock', {
        writable: true,
        value: {
          user: { id: 'test-admin-id', email: 'admin@example.com', role: 'admin' },
          isLoading: false,
          isCheckingRole: false,
          error: null
        }
      });
    });

    // Mock the inventory API response
    await page.route('**/api/inventory', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 'test-item-1',
              product_id: 'test-product-1',
              product_name: 'Test Product',
              product_slug: 'test-product',
              product_images: ['https://example.com/image.jpg'],
              variant_id: 'test-variant-1',
              variant_name: 'Small/Red',
              sku: 'TP-SM-RED-001',
              quantity: 10,
              low_stock_threshold: 5,
              reserved_quantity: 0
            }
          ],
          total: 1,
          pages: 1
        })
      });
    });

    // Mock the update inventory API call
    await page.route('**/actions/admin', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Navigate to inventory page
    await page.goto('/admin/inventory');

    // Find a product with an update button and click it
    const updateButton = page.locator('button:has-text("Update")').first();
    await expect(updateButton).toBeVisible();
    await updateButton.click();

    // Fill in new quantity
    await page.locator('input[type="number"]').fill('50');

    // Submit the update
    await page.locator('button:has-text("Update Stock")').click();

    // Verify success toast notification appears
    await expect(page.locator('text=Inventory updated successfully')).toBeVisible();
  });

  test('should highlight low stock items', async ({ page }) => {
    // Mock the authentication state to simulate an admin user
    await page.addInitScript(() => {
      Object.defineProperty(window, 'useUserMock', {
        writable: true,
        value: {
          user: { id: 'test-admin-id', email: 'admin@example.com', role: 'admin' },
          isLoading: false,
          isCheckingRole: false,
          error: null
        }
      });
    });

    // Mock the inventory API response with a low stock item
    await page.route('**/api/inventory', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 'test-item-1',
              product_id: 'test-product-1',
              product_name: 'Test Product Low Stock',
              product_slug: 'test-product-low-stock',
              product_images: ['https://example.com/image.jpg'],
              variant_id: 'test-variant-1',
              variant_name: 'Small/Blue',
              sku: 'TP-SM-BLUE-001',
              quantity: 2, // Below threshold of 5
              low_stock_threshold: 5,
              reserved_quantity: 0
            },
            {
              id: 'test-item-2',
              product_id: 'test-product-2',
              product_name: 'Test Product In Stock',
              product_slug: 'test-product-in-stock',
              product_images: ['https://example.com/image.jpg'],
              variant_id: 'test-variant-2',
              variant_name: 'Large/Green',
              sku: 'TP-LG-GREEN-001',
              quantity: 15, // Above threshold of 5
              low_stock_threshold: 5,
              reserved_quantity: 0
            }
          ],
          total: 2,
          pages: 1
        })
      });
    });

    // Navigate to inventory page
    await page.goto('/admin/inventory');

    // Check for low stock indicators (items with quantity below threshold should have "Low Stock" badge)
    await expect(page.locator('text=Low Stock')).toBeVisible();

    // Verify that some items show "In Stock" badge as well
    await expect(page.locator('text=In Stock')).toBeVisible();
  });

  test('should prevent non-admin access to inventory page', async ({ page }) => {
    // Mock the authentication state to simulate a non-admin user
    await page.addInitScript(() => {
      Object.defineProperty(window, 'useUserMock', {
        writable: true,
        value: {
          user: { id: 'test-user-id', email: 'user@example.com', role: 'user' },
          isLoading: false,
          isCheckingRole: false,
          error: null
        }
      });
    });

    // Navigate to inventory page (should redirect or show access denied)
    await page.goto('/admin/inventory');

    // Verify that user cannot access admin inventory page
    // This could be a redirect to home or login page, or showing an access denied message
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/admin/inventory');
  });
});
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('should redirect non-admin users to login', async ({ page }) => {
    // Test that non-admin user gets blocked from accessing admin dashboard
    await page.goto('http://localhost:3000/admin/dashboard');

    // Should be redirected to auth pages since user is not an admin
    // This test verifies the access control is working
    await expect(page).toHaveURL(/.*\/login|.*\/auth.*/);
  });

  test('should have proper layout structure when accessible', async ({ page }) => {
    // This test verifies the admin layout structure
    // In a real test scenario, we would authenticate as an admin first
    await page.route('**/api/admin/metrics', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalRevenue: 125000, // in cents
          totalOrders: 42,
          lowStockItems: 3
        })
      });
    });

    // Mock the authentication state to simulate admin access
    await page.addInitScript(() => {
      // Mock the auth state to simulate an authenticated admin user
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

    // We'll navigate to the dashboard directly since the layout should handle auth
    await page.goto('http://localhost:3000/admin/dashboard');

    // Wait a bit for the page to load
    await page.waitForTimeout(1000);

    // Check for main dashboard elements (title, layout)
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
  });

  test('should display metric cards with data', async ({ page }) => {
    await page.route('**/api/admin/metrics', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalRevenue: 125000, // in cents
          totalOrders: 42,
          lowStockItems: 3
        })
      });
    });

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

    await page.goto('http://localhost:3000/admin/dashboard');

    // Wait for the metrics to load
    await page.waitForTimeout(1000);

    // Check if the metrics are shown (with formatted values)
    await expect(page.locator('text=\\$1250\\.00')).toBeVisible(); // Escaping $ and . for regex
    await expect(page.locator('text=42')).toBeVisible();
    await expect(page.locator('text=3')).toBeVisible();
  });

  test('should contain sidebar navigation elements', async ({ page }) => {
    await page.route('**/api/admin/metrics', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          totalRevenue: 125000, // in cents
          totalOrders: 42,
          lowStockItems: 3
        })
      });
    });

    // Mock the authentication state to allow access to the dashboard
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

    await page.goto('http://localhost:3000/admin/dashboard');

    // Wait for the page to load
    await page.waitForTimeout(1000);

    // Look for sidebar elements - check for the sidebar container first
    const sidebar = page.locator('div').filter({ hasText: 'Admin Dashboard' }).first();
    await expect(sidebar).toBeVisible();

    // Check for navigation items in the sidebar
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Inventory' })).toBeVisible();
  });
});
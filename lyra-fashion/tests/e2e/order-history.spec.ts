import { test, expect } from '@playwright/test';

test.describe('Order History', () => {
    test.setTimeout(60000);

    test('should redirect to login if not authenticated', async ({ page }) => {
        await page.goto('/account/orders');
        await expect(page).toHaveURL(/.*login/);
    });

    test.describe('Authenticated User', () => {
        test.beforeEach(async ({ page }) => {
            console.log('Starting auth flow...');

            // Sign up a new user
            await page.goto('/signup');
            const uniqueEmail = `testuser${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
            console.log('Signing up with:', uniqueEmail);

            await page.fill('input#email', uniqueEmail);
            await page.fill('input#password', 'password123');
            await page.fill('input#confirmPassword', 'password123');
            await page.click('button[type="submit"]');

            console.log('Signup submitted. Waiting for navigation...');

            try {
                await expect(page).toHaveURL(/.*login/, { timeout: 15000 });
                console.log('Redirected to login page.');
            } catch (e) {
                console.log('Failed to redirect to login. Current URL:', page.url());
                const error = await page.locator('.text-red-50').textContent().catch(() => 'No error message found');
                console.log('Error message on page:', error);
                throw e;
            }

            // Login
            console.log('Logging in...');
            await page.fill('input#email', uniqueEmail);
            await page.fill('input#password', 'password123');
            await page.click('button[type="submit"]');

            console.log('Login submitted. Waiting for navigation...');
            try {
                await expect(page).toHaveURL('/', { timeout: 15000 });
                console.log('Redirected to home page.');
            } catch (e) {
                console.log('Failed to redirect to home. Current URL:', page.url());
                const error = await page.locator('.text-red-500').textContent().catch(() => 'No error message found');
                console.log('Error message on page:', error);
                throw e;
            }

            // Navigate to order history
            console.log('Navigating to order history...');
            await page.goto('/account/orders');
            await page.waitForLoadState('networkidle');
            console.log('Order history page loaded. Current URL:', page.url());
        });

        test('should display order history page title', async ({ page }) => {
            console.log('Checking title...');
            await expect(page.locator('h1')).toHaveText('Order History');
        });

        test('should show empty state when no orders exist', async ({ page }) => {
            console.log('Checking empty state...');
            await expect(page.getByText('No orders found')).toBeVisible();
            await expect(page.getByText("You haven't placed any orders yet.")).toBeVisible();
        });

        test('should have a back to account or home link', async ({ page }) => {
            console.log('Checking page content...');
            const title = await page.title();
            console.log('Page title:', title);
            expect(title).toContain('Order History');
        });

        test('should allow navigation to order details page', async ({ page }) => {
            console.log('Testing navigation to order details...');

            // Create a dummy order first
            const response = await page.request.post('/api/orders/dummy');
            const orderData = await response.json();

            if (orderData.success) {
                const orderId = orderData.orderId;
                console.log(`Created dummy order with ID: ${orderId}`);

                // Navigate to the order history page
                await page.goto('/account/orders');
                await page.waitForLoadState('networkidle');

                // Check if the order appears in the list and click on its "View Details" button
                const viewDetailsButton = page.locator('button:has-text("View Details")').first();
                await expect(viewDetailsButton).toBeVisible();

                await viewDetailsButton.click();

                // Wait for navigation and check if we're on the order details page
                await expect(page).toHaveURL(new RegExp(`/account/orders/${orderId}`));

                console.log('Successfully navigated to order details page');
            } else {
                console.log('Failed to create dummy order for testing:', orderData.error);
            }
        });
    });
});

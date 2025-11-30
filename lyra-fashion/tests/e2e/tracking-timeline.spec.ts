import { test, expect } from '@playwright/test';

test.describe('Tracking Timeline', () => {
    test.setTimeout(90000);

    test('should display timeline and update status with visual highlighting', async ({ page }) => {
        // 1. Signup/Login
        await page.goto('/signup');
        const uniqueEmail = `testuser${Date.now()}@example.com`;
        await page.fill('input#email', uniqueEmail);
        await page.fill('input#password', 'password123');
        await page.fill('input#confirmPassword', 'password123');
        await page.click('button[type="submit"]');

        // Wait for redirect to login
        await expect(page).toHaveURL(/.*login/);

        await page.fill('input#email', uniqueEmail);
        await page.fill('input#password', 'password123');
        await page.click('button[type="submit"]');

        // Wait for redirect to home
        await expect(page).toHaveURL('/');

        // 2. Seed Dummy Order via Admin Demo Page
        await page.goto('/admin/demo');
        await page.click('button:has-text("Seed Dummy Order")');

        // Verify order appears
        await expect(page.locator('text=Order #')).toBeVisible();

        // 3. Navigate to Account Orders and View Details
        await page.goto('/account/orders');
        await expect(page.locator('text=Order #')).toBeVisible();

        // Click on the first order link
        await page.locator('a[href^="/account/orders/"]').first().click();

        // 4. Verify Timeline (Pending -> Placed) - Check visual highlighting
        // "Placed" should be visible and likely active/completed
        await expect(page.locator('text=Placed')).toBeVisible();

        // Verify visual highlighting for "Placed" status
        // Find the container that has both the icon with ring-4.ring-primary/20 and the text "Placed"
        const placedContainer = page.locator('div').filter({ has: page.locator('text=Placed') }).first();
        const placedIcon = placedContainer.locator('div.ring-4.ring-primary\\/20');
        await expect(placedIcon).toBeVisible();

        const placedText = placedContainer.locator('text=Placed');
        await expect(placedText).toHaveClass(/font-bold/);

        // 5. Update Status to Production via Admin Demo
        await page.goto('/admin/demo');
        // Select "production" for the first order (assuming it's the newly created one or first in list)
        await page.selectOption('select[name="status"]', 'production');
        await page.click('button:has-text("Update")');

        // 6. Verify Timeline (Production) - Check visual highlighting
        await page.goto('/account/orders');
        await page.locator('a[href^="/account/orders/"]').first().click();

        await expect(page.locator('text=Production')).toBeVisible();
        await expect(page.locator('text=Your garment is being sewn')).toBeVisible();

        // Verify visual highlighting for "Production" status
        const productionContainer = page.locator('div').filter({ has: page.locator('text=Production') }).first();
        const productionIcon = productionContainer.locator('div.ring-4.ring-primary\\/20');
        await expect(productionIcon).toBeVisible();

        const productionText = productionContainer.locator('text=Production');
        await expect(productionText).toHaveClass(/font-bold/);

        // 7. Update Status to Quality Check
        await page.goto('/admin/demo');
        await page.selectOption('select[name="status"]', 'quality_check');
        await page.click('button:has-text("Update")');

        // 8. Verify Timeline (Quality Check) - Check visual highlighting
        await page.goto('/account/orders');
        await page.locator('a[href^="/account/orders/"]').first().click();

        await expect(page.locator('text=Quality Check')).toBeVisible();

        // Verify visual highlighting for "Quality Check" status
        const qualityCheckContainer = page.locator('div').filter({ has: page.locator('text=Quality Check') }).first();
        const qualityCheckIcon = qualityCheckContainer.locator('div.ring-4.ring-primary\\/20');
        await expect(qualityCheckIcon).toBeVisible();

        const qualityCheckText = qualityCheckContainer.locator('text=Quality Check');
        await expect(qualityCheckText).toHaveClass(/font-bold/);

        // 9. Update Status to Shipped
        await page.goto('/admin/demo');
        await page.selectOption('select[name="status"]', 'shipped');
        await page.click('button:has-text("Update")');

        // 10. Verify Timeline (Shipped) - Check visual highlighting
        await page.goto('/account/orders');
        await page.locator('a[href^="/account/orders/"]').first().click();

        await expect(page.locator('text=Shipped')).toBeVisible();

        // Verify visual highlighting for "Shipped" status
        const shippedContainer = page.locator('div').filter({ has: page.locator('text=Shipped') }).first();
        const shippedIcon = shippedContainer.locator('div.ring-4.ring-primary\\/20');
        await expect(shippedIcon).toBeVisible();

        const shippedText = shippedContainer.locator('text=Shipped');
        await expect(shippedText).toHaveClass(/font-bold/);

        // 11. Update Status to Delivered
        await page.goto('/admin/demo');
        await page.selectOption('select[name="status"]', 'delivered');
        await page.click('button:has-text("Update")');

        // 12. Verify Timeline (Delivered) - Check visual highlighting
        await page.goto('/account/orders');
        await page.locator('a[href^="/account/orders/"]').first().click();

        await expect(page.locator('text=Delivered')).toBeVisible();

        // Verify visual highlighting for "Delivered" status
        const deliveredContainer = page.locator('div').filter({ has: page.locator('text=Delivered') }).first();
        const deliveredIcon = deliveredContainer.locator('div.ring-4.ring-primary\\/20');
        await expect(deliveredIcon).toBeVisible();

        const deliveredText = deliveredContainer.locator('text=Delivered');
        await expect(deliveredText).toHaveClass(/font-bold/);
    });
});

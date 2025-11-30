import { test, expect } from '@playwright/test';

test('sanity check', async ({ page }) => {
    console.log('Sanity test running');
    await page.goto('/');
    await expect(page).toHaveTitle(/Lyra Fashion/);
});

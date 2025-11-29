import { test, expect } from '@playwright/test';

test.describe('Wishlist Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the site
    await page.goto('/');
  });

  test('should allow user to add and remove items from wishlist', async ({ page }) => {
    // First, we need to sign in (assuming we have a way to sign in)
    await page.getByRole('link', { name: 'Account' }).click();
    
    // If not signed in, we'll be redirected to login
    await expect(page).toHaveURL(/.*login/);
    
    // For this test, we'll assume a user is already authenticated
    // In a real scenario, we'd set up authentication state
    
    // Navigate to a product page
    await page.goto('/product/example-product');
    
    // Find and click the wishlist button
    const wishlistButton = page.locator('[data-testid="wishlist-button"]');
    await wishlistButton.click();
    
    // Check for success toast notification
    await expect(page.getByText('Added to wishlist')).toBeVisible();
    
    // Navigate to wishlist page
    await page.goto('/account/wishlist');
    
    // Check that the wishlist page loads
    await expect(page.getByRole('heading', { name: 'My Wishlist' })).toBeVisible();
    
    // Verify that the product appears in the wishlist
    await expect(page.getByText('Example Product')).toBeVisible();
    
    // Go back to the product page
    await page.goto('/product/example-product');
    
    // Click the wishlist button again to remove the item
    await wishlistButton.click();
    
    // Check for removal notification
    await expect(page.getByText('Removed from wishlist')).toBeVisible();
    
    // Navigate back to wishlist page
    await page.goto('/account/wishlist');
    
    // Verify that the wishlist is empty
    await expect(page.getByText('Your wishlist is empty')).toBeVisible();
  });

  test('should prevent adding duplicate items to wishlist', async ({ page }) => {
    // Navigate to a product page
    await page.goto('/product/example-product');
    
    // Add the product to wishlist twice
    const wishlistButton = page.locator('[data-testid="wishlist-button"]');
    await wishlistButton.click();
    
    // Verify it was added
    await expect(page.getByText('Added to wishlist')).toBeVisible();
    
    // Try to add the same product again
    await wishlistButton.click();
    
    // Check for duplicate prevention message
    await expect(page.getByText('Product already in wishlist')).toBeVisible();
  });

  test('should display wishlist items with correct links', async ({ page }) => {
    // Navigate to wishlist page
    await page.goto('/account/wishlist');
    
    // Check that wishlist items link correctly to their respective Product Detail Pages
    const productLinks = page.locator('.wishlist-item-link');
    
    // For each product in the wishlist, verify the link is correct
    const count = await productLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = productLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/\/product\/.+/);
      
      // Click the link to verify it goes to the correct page
      await link.click();
      await expect(page).toHaveURL(/\/product\/.+/);
      
      // Navigate back to wishlist
      await page.goBack();
    }
  });

  test('should show empty state when wishlist is empty', async ({ page }) => {
    // Clear the wishlist first by removing any items
    await page.goto('/account/wishlist');
    
    // If there are items, remove them
    const wishlistItems = page.locator('.wishlist-item');
    const itemCount = await wishlistItems.count();
    
    if (itemCount > 0) {
      // Navigate to each product and remove from wishlist
      for (let i = 0; i < itemCount; ++i) {
        const firstItem = wishlistItems.first();
        const productLink = firstItem.locator('a').first();
        const productUrl = await productLink.getAttribute('href');
        
        if (productUrl) {
          await page.goto(productUrl);
        }
        
        const wishlistButton = page.locator('[data-testid="wishlist-button"]');
        await wishlistButton.click(); // Remove from wishlist
      }
    }
    
    // Go back to wishlist page
    await page.goto('/account/wishlist');
    
    // Verify empty state is shown
    await expect(page.getByText('Your wishlist is empty')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });
});
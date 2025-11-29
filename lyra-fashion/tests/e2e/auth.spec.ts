import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow user to sign up, login, and logout', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
    
    // Fill in signup form
    await page.fill('input#email', `testuser${Date.now()}@example.com`);
    await page.fill('input#password', 'password123');
    await page.fill('input#confirmPassword', 'password123');
    
    // Submit signup form
    await page.click('button[type="submit"]');
    
    // Should be redirected to login page after signup
    await expect(page).toHaveURL('/login');
    
    // Fill in login form
    await page.fill('input#email', `testuser${Date.now() - 1000}@example.com`); // Use the same email as before
    await page.fill('input#password', 'password123');
    
    // Submit login form
    await page.click('button[type="submit"]');
    
    // Should be redirected to home page after login
    await expect(page).toHaveURL('/');
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill in invalid login credentials
    await page.fill('input#email', 'nonexistent@example.com');
    await page.fill('input#password', 'wrongpassword');
    
    // Submit login form
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text="Invalid login credentials"')).toBeVisible();
  });

  test('should redirect unauthenticated user from protected route to login', async ({ page }) => {
    // Try to access a protected route directly
    await page.goto('/account');
    
    // Should be redirected to login page
    await expect(page).toHaveURL('/login');
  });
});
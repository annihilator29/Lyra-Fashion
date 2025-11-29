import { test, expect } from '@playwright/test';

test.describe('Profile Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the site
    await page.goto('/');
  });

 test('should allow user to view and update their profile', async ({ page }) => {
    // First, we need to sign in (assuming we have a way to sign in)
    await page.getByRole('link', { name: 'Account' }).click();
    
    // If not signed in, we'll be redirected to login
    await expect(page).toHaveURL(/.*login/);
    
    // For this test, we'll assume a user is already authenticated
    // In a real scenario, we'd set up authentication state
    
    // Navigate to profile page
    await page.goto('/account/profile');
    
    // Check that profile page loads
    await expect(page.getByRole('heading', { name: 'Your Profile' })).toBeVisible();
    
    // Verify that profile information is displayed
    await expect(page.getByText('Full Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    
    // Click edit profile button
    await page.getByRole('button', { name: 'Edit Profile' }).click();
    
    // Check that we're on the edit page
    await expect(page).toHaveURL(/.*account\/profile\/edit/);
    await expect(page.getByRole('heading', { name: 'Edit Profile' })).toBeVisible();
    
    // Fill in the name field (assuming it exists)
    await page.locator('input').fill('John Doe');
    
    // Submit the form
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    // Check for success toast notification
    await expect(page.getByText('Profile updated successfully!')).toBeVisible();
    
    // Check that we're redirected back to the profile page
    await expect(page).toHaveURL(/.*account\/profile/);
    
    // Verify the updated name is displayed
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  test('should validate profile form inputs', async ({ page }) => {
    // Navigate to profile edit page
    await page.goto('/account/profile/edit');
    
    // Try submitting with empty name (should fail validation)
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    // Check for validation error
    await expect(page.getByText('Name is required')).toBeVisible();
  });
});
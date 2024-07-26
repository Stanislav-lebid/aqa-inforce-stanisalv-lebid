// registration.test.js
const { test, expect } = require('@playwright/test');

test.describe('Registration functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with the registration modal
    await page.goto('https://www.demoblaze.com/index.html'); 
  });

  test('Valid registration', async ({ page }) => {
    // Open sign up modal
    await page.click('a#signin2'); // Click the "Sign up" link to open the modal

    // Fill in registration credentials
    await page.fill('#sign-username', 'NewUser'); 
    await page.fill('#sign-password', 'NewPassword1'); 

    // Submit registration
    await page.click('button:has-text("Sign up")');

    // Add assertion based on expected success message or behavior
    // Assuming there is a success message or redirect upon successful registration
    await expect(page.locator('#nameofuser')).toHaveText('NewUser'); // Adjust based on actual expected behavior
  });

  test('Invalid registration', async ({ page }) => {
    // Open sign up modal
    await page.click('a#signin2'); // Click the "Sign up" link to open the modal

    // Fill in invalid registration credentials
    await page.fill('#sign-username', ''); // Invalid username
    await page.fill('#sign-password', ''); // Invalid password

    // Submit registration
    await page.click('button:has-text("Sign up")');

    // Add assertion based on expected error message or behavior
    await expect(page.locator('#errors')).toHaveText('Please fill out this field.'); // Adjust based on actual error message
  });
});

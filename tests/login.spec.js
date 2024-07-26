// login.test.js
const { test, expect } = require('@playwright/test');

test.describe('Login functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with the login modal
    await page.goto('https://www.demoblaze.com/index.html'); // Update URL to match your local server or test environment
  });

  test('Valid login', async ({ page }) => {
    // Open login modal
    await page.click('a#login2'); // Click the "Log in" link to open the modal

    // Fill in login credentials
    await page.fill('#loginusername', 'User1'); // Replace 'validUser' with actual valid username
    await page.fill('#loginpassword', 'Password1'); // Replace 'validPassword' with actual valid password

    // Submit login
    await page.click('button:has-text("Log in")');

  });

  test('Invalid login', async ({ page }) => {
    // Open login modal
    await page.click('a#login2'); // Click the "Log in" link to open the modal

    // Fill in invalid login credentials
    await page.fill('#loginusername', '```');
    await page.fill('#loginpassword', '12112');

    // Submit login
    await page.click('button:has-text("Log in")');

    // Add assertion based on expected error message or behavior
    await expect(page.locator('#errorl')).toHaveText('Invalid username or password'); // Adjust error message as needed
  });
}); 
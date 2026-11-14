const { test, expect } = require('@playwright/test');

test('Перевірка вигляду сторінки реєстрації', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot('registration-page.png');
}); 

test('Перевірка вигляду форми реєстрації', async ({ page }) => {
    await page.goto('/');

    const form = page.locator('form');

    await expect(form).toHaveScreenshot('registration-form.png');
}); 
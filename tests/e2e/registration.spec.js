
const { test, expect } = require('@playwright/test');

test('Перевірка відображення форми реєстрації', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
}); 

test('Перевірка введення даних', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[type="text"]').fill('Kateryna');
    await page.locator('input[type="email"]').fill('test@gmail.com');
    await page.locator('input[type="password"]').fill('Test1234!');

    await expect(page.locator('input[type="text"]'))
        .toHaveValue('Kateryna');

    await expect(page.locator('input[type="email"]'))
        .toHaveValue('test@gmail.com');
}); 

test('Перевірка некоректної електронної пошти', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[type="email"]').fill('wrong-email');

    await expect(page.locator('input[type="email"]'))
        .toHaveJSProperty('validity.valid', false);
}); 

test('Перевірка очищення форми', async ({ page }) => {
    await page.goto('/');

    await page.locator('#name').fill('Kateryna');
    await page.locator('#email').fill('test@gmail.com');
    await page.locator('#password').fill('Test1234!');

    await page.getByRole('button', { name: 'Очистити' }).click();

    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#password')).toHaveValue('');
});
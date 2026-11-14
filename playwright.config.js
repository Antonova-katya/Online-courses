import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    testMatch: '**/*.spec.js',

    reporter: 'html',

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        headless: true
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'mobile',
            use: { ...devices['iPhone 13'] }
        }
    ],

    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI
    }
});
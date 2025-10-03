// playwright.config.ts (Partial view)

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // Create this folder for your tests
  fullyParallel: true,
  /* The URL to start the app for testing */
  webServer: {
    command: "npm run dev", // Ensure your dev server is running
    url: "http://127.0.0.1:5173",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  // Configure for mobile view testing (required by the assessment)
  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

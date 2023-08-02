import { test, expect } from '@playwright/test';

test("Button save is in login page", async ({page}) => {
  await page.goto("http://localhost:3000");
  const button = page.locator("button");
  expect(await button.textContent()).toBe("Login")
});
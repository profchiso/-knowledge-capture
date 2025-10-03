import { test, expect, Page } from "@playwright/test";

test.describe("Knowledge Capture CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  // ✅ Helper: click correct "Add New Entry" button based on screen size
  const clickAddButton = async (page: Page) => {
    if (page.viewportSize()?.width && page.viewportSize()!.width < 768) {
      // Mobile → floating "+"
      await page.getByRole("button", { name: "+" }).click();
    } else {
      // Desktop → full button
      await page.getByRole("button", { name: "Add New Entry" }).click();
    }
  };

  test("should allow a technician to create and view a new knowledge entry", async ({
    page,
  }) => {
    await clickAddButton(page);

    // Wait for form to appear
    await page.getByLabel("Title").waitFor();
    await page.getByLabel("Description").waitFor();

    await page.getByLabel("Title").fill("Test Entry");
    await page.getByLabel("Description").fill("This is a test entry.");
    await page.getByRole("button", { name: /save entry/i }).click();

    // Verify new entry appears
    await expect(page.getByRole("listitem").first()).toContainText(
      "Test Entry",
      {
        timeout: 10000,
      }
    );
  });

  test("should allow a technician to edit and update an existing entry", async ({
    page,
  }) => {
    // Click first Edit button
    await page.getByRole("button", { name: /edit/i }).first().click();

    await page.getByLabel("Title").waitFor();
    await page.getByLabel("Description").waitFor();

    await page.getByLabel("Title").fill("Updated Entry");
    await page.getByLabel("Description").fill("This entry has been updated.");
    await page
      .getByRole("button", { name: /update entry|save entry/i })
      .click();

    // Verify update
    await expect(page.getByRole("listitem").first()).not.toContainText(
      "Test Entry"
    );
    await expect(page.getByRole("listitem").first()).toContainText(
      "Updated Entry",
      {
        timeout: 10000,
      }
    );
  });

  test("should allow a technician to delete a knowledge entry", async ({
    page,
  }) => {
    // Click Delete button on first item
    await page
      .getByRole("button", { name: /delete/i })
      .first()
      .click();

    // If a confirm dialog/modal is used
    if (await page.getByRole("button", { name: /confirm/i }).isVisible()) {
      await page.getByRole("button", { name: /confirm/i }).click();
    }

    // ✅ Verify the entry text disappears (safer than checking .first())
    await expect(page.getByText("Updated Entry")).not.toBeVisible({
      timeout: 10000,
    });
  });
});

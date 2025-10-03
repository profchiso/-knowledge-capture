import { test, expect } from "@playwright/test";

// Use a unique title for reliable assertion
const UNIQUE_TITLE = `E2E Test Entry ${Date.now()}`;
const TEST_DESCRIPTION =
  "This entry was created by an automated Playwright test.";
const EDITED_DESCRIPTION =
  "This entry was successfully updated by the E2E test.";

test.describe("Knowledge Capture CRUD Operations", () => {
  // Before each test, navigate to the dashboard root
  test.beforeEach(async ({ page }) => {
    // Navigating to '/' starts the app and loads the initial entries from json-server
    await page.goto("/");
  });

  // --- Test 1: Create a New Entry (CREATE) ---
  test("should allow a technician to create and view a new knowledge entry", async ({
    page,
  }) => {
    // 1. Click the 'Add New Entry' button.
    // This handles both the FAB (Mobile) and the standard button (Desktop).
    await page.getByRole("button", { name: /Add New Entry/i }).click();

    // 2. The form modal should be visible
    const modalTitle = page.getByRole("heading", { name: "Create New Entry" });
    await expect(modalTitle).toBeVisible();

    // 3. Fill the form fields (Title, Description, Image is optional)
    await page.getByLabel("Title *").fill(UNIQUE_TITLE);
    await page.getByLabel("Description *").fill(TEST_DESCRIPTION);

    // 4. Submit the form
    await page.getByRole("button", { name: /Save Entry/i }).click();

    // 5. Assert: The modal should close and the new entry should appear in the list
    await expect(modalTitle).not.toBeVisible();

    // Check for the newly created card
    const newEntryCard = page
      .getByRole("listitem", { name: UNIQUE_TITLE })
      .first();
    await expect(newEntryCard).toBeVisible();
    await expect(newEntryCard).toContainText(TEST_DESCRIPTION);
  });

  // --- Test 2: Edit an Existing Entry (UPDATE) ---
  test("should allow a technician to edit and update an existing entry", async ({
    page,
  }) => {
    // Prerequisite: Find a known entry (using the mock data from db.json, id=1)
    const initialTitle = "Machine X Calibration Check";
    const entryCard = page
      .getByRole("listitem", { name: initialTitle })
      .first();
    await expect(entryCard).toBeVisible();

    // 1. Click the Edit button on the card
    await entryCard.getByRole("button", { name: "Edit" }).click();

    // 2. The form modal should open in editing mode
    const modalTitle = page.getByRole("heading", {
      name: "Edit Knowledge Entry",
    });
    await expect(modalTitle).toBeVisible();

    // 3. Update the Description field
    const descriptionInput = page.getByLabel("Description *");
    await descriptionInput.fill(EDITED_DESCRIPTION);

    // 4. Submit the update
    await page.getByRole("button", { name: "Update Entry" }).click();

    // 5. Assert: The entry card is updated with the new description
    await expect(modalTitle).not.toBeVisible();
    const updatedEntryCard = page
      .getByRole("listitem", { name: initialTitle })
      .first();
    await expect(updatedEntryCard).toBeVisible();
    await expect(updatedEntryCard).toContainText(EDITED_DESCRIPTION);
  });

  // --- Test 3: Delete an Existing Entry (DELETE) ---
  // Note: We delete the entry created in Test 2 for clean up, but we use a robust selector.
  test("should allow a technician to delete a knowledge entry", async ({
    page,
  }) => {
    // Prerequisite: Find a known entry (using the mock data from db.json, id=2)
    const titleToDelete = "Emergency Stop Reset Procedure";
    const entryToDelete = page
      .getByRole("listitem", { name: titleToDelete })
      .first();
    await expect(entryToDelete).toBeVisible();

    // 1. Click the Delete button on the card
    await entryToDelete.getByRole("button", { name: "Delete" }).click();

    // 2. Handle the window.confirm() dialog (Playwright handles this automatically by default, accepting it)
    // If we used a custom modal, we would click the "Confirm Delete" button here.

    // 3. Assert: The entry should be removed from the list
    await expect(entryToDelete).not.toBeInViewport();
    await expect(entryToDelete).toHaveCount(0);
  });
});

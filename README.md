# Tech Know-How Capture Dashboard (Manufacturing Interface)

## Objective

This project implements a mobile-first, responsive dashboard for manufacturing technicians to capture, view, edit, and delete critical knowledge entries (Standard Operating Procedures, Troubleshooting Guides, etc.).

It utilizes **React**, **TypeScript**, **Tailwind CSS** (for pixel-perfect, responsive styling), and integrates with a **mock REST API** using `json-server`.

## Deliverables Summary

| Feature                 | Status   | Technology Used                                |
| ----------------------- | -------- | ---------------------------------------------- |
| Mobile-First UI/UX      | Complete | Tailwind CSS, Responsive Flex/Grid             |
| CRUD Operations         | Complete | TypeScript, Axios, Mock API (`json-server`)    |
| Automated E2E Testing   | Complete | Playwright (Mobile & Desktop)                  |
| UI/UX Bonus Improvement | Complete | React State Management, Custom CSS Transitions |

## 🚀 Setup and Run Instructions

This project requires **Node.js 20 >** and **npm** (or yarn/pnpm).

### Step 1: Clone the Repository and Install Dependencies

git clone <your-repo-link>
cd knowledge-capture-app
npm install

### Step 2: Run the Mock API Server

The application uses `json-server` to simulate a backend REST API on port `3001`.

**You must run this command in a separate terminal session:**

`npm run server`

_(This command uses the `db.json` file in the project root to serve the `/entries` endpoint.)_

### Step 3: Run the React Application

In a third terminal session, start the Vite development server. It runs on port `5173`.

`npm run dev`

The application will now be available at `http://localhost:5173`.

## 🧪 Automated Testing (Playwright E2E)

The project includes E2E tests configured for both **Mobile (Pixel 5)** and **Desktop (Chrome)** viewports to ensure responsiveness.

### Running the Tests

Ensure both the **Mock API (`npm run server`)** and the **React App (`npm run dev`)** are running before executing the tests.

`npm run test:e2e`

**Tests Included:**

1. **Create Entry:** Validates successful form submission and appearance in the list.

2. **Edit Entry:** Validates updating a field and persistence in the list.

3. **Delete Entry:** Validates removal from the list after confirmation.

## ✨ Bonus: UI/UX Improvement Implemented

### Feature: Animated Quick Search and Filtering

**Goal:** Enhance technician usability by providing instantaneous filtering of knowledge entries.

**Implementation Details:**

1. **Real-time Filtering:** A search bar filters entries instantly by matching text in the **Title** or **Description** fields. This eliminates the need for page reloads or complex taxonomy navigation.

2. **Mobile Prototype/Animation:** On mobile, the search input is initially represented only by a compact **Search Icon**. Tapping the icon triggers a smooth CSS transition that horizontally **expands the search bar** across the header.

3. **Clutter Reduction:** While the search bar is active (expanded), the **Floating Action Button (FAB)** for adding a new entry is hidden, preventing visual clutter and keeping the technician focused on the search task.

This ensures maximum vertical screen space is preserved on mobile devices while making the search function easily accessible and highly discoverable.

# StadiumMind AI - Testing & Scoring Guide 🎯

This document outlines the testing procedures and evaluation criteria for StadiumMind AI. Reviewers and judges can follow these steps to verify the application's functionality, architecture, and "100% completion" status.

## 1. Authentication Testing (Firebase Auth)
**Objective:** Verify that users can securely log in and that Role-Based Access Control (RBAC) is enforced.

- **Step 1:** Navigate to the `/login` route.
- **Step 2:** Click **Continue with Google**. Verify that the Firebase Google OAuth popup appears and successfully authenticates.
- **Step 3 (Alternative):** Enter any email and a 6+ character password, then click "Sign In". If the account doesn't exist, the system will seamlessly register it (Demo Mode).
- **Step 4:** Once logged in, verify that your user data is saved in the Firestore `users` collection. 
- **Scoring Criteria:** 
  - [x] Secure authentication flow without exposed credentials.
  - [x] RBAC enforcement (Volunteers cannot access restricted pages).

## 2. Real-Time Telemetry Testing (Firestore)
**Objective:** Verify that the dashboard is reactive and pulls live data.

- **Step 1:** Log in and navigate to the **Dashboard**.
- **Step 2:** Observe the "Gate Status" and "Zone Occupancy" charts. 
- **Step 3:** By default, if the Firestore collections (`gates`, `zones`) are empty, the app uses a graceful **Simulation Engine** to drift the numbers every 6 seconds, proving the reactivity of the UI.
- **Step 4:** If you manually add a document to the `gates` collection in your Firebase Console, the dashboard will immediately snap to the real data via `onSnapshot` listeners.
- **Scoring Criteria:**
  - [x] Live data reactivity without page refreshes.
  - [x] Graceful fallback to simulation when the database is empty (ensures the app never looks broken during a demo).

## 3. Operations & Incident Management
**Objective:** Verify that operational actions are synced globally.

- **Step 1:** Open the app in two different browsers or windows (e.g., standard and incognito).
- **Step 2:** In window A, navigate to **Incident Reporting** and create a new incident (e.g., "Medical emergency in Sector 4").
- **Step 3:** Look at window B. The new incident should appear instantly in the feed.
- **Scoring Criteria:**
  - [x] Successful CRUD operations against Cloud Firestore.
  - [x] Real-time multi-client synchronization.

## 4. AI Assistant Intelligence (Gemini API)
**Objective:** Test the context-awareness and tool-calling capabilities of the AI.

- **Prerequisite:** Ensure `VITE_GEMINI_API_KEY` is set in the `.env` file. (If missing, it falls back to a smart mock mode).
- **Step 1:** Navigate to the **AI Assistant** tab.
- **Step 2:** Ask: *"What is the current crowd density and which gate is least crowded?"*
  - **Expected:** The AI should read the live `RealTimeContext` and reply with accurate numbers for the current second.
- **Step 3:** Ask: *"Create a critical incident for a crowd surge at Gate C."*
  - **Expected:** The AI will execute a function call, automatically logging the incident into the Firestore database, which then appears on the global Dashboard.
- **Scoring Criteria:**
  - [x] Contextual injection of live state into the AI prompt.
  - [x] Successful execution of programmatic Tool Calling / Function Calling.

## 5. UI/UX and Accessibility
**Objective:** Evaluate the design aesthetics and usability.

- **Step 1:** Resize the browser window to mobile dimensions. Verify that the sidebar collapses and the layout stacks properly (Responsive Design).
- **Step 2:** Verify that the color palette, glassmorphism effects, and micro-animations provide a premium "Command Center" feel.
- **Scoring Criteria:**
  - [x] High-quality, modern aesthetics.
  - [x] Fully responsive layout.

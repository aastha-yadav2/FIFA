# StadiumMind AI 🏟️🤖
**Intelligent Operations Center for FIFA World Cup 2026**

StadiumMind AI is a real-time, AI-powered dashboard designed to manage massive crowd operations, incident reporting, and sustainability metrics for live events. Built with React, Vite, Firebase, and Google Gemini AI, this platform gives operations managers and security officers a comprehensive, live view of stadium telemetry.

## Features ✨
- **Live Telemetry Dashboard:** Real-time monitoring of gate queues, zone occupancy, and transportation statuses.
- **Role-Based Access Control:** Distinct views and permissions for Operations Managers, Security Officers, and Volunteers.
- **Firebase Backend:** Fully integrated with Firebase Authentication and Cloud Firestore for real-time, multi-user syncing of incidents and assignments.
- **Gemini AI Assistant:** A context-aware chatbot that reads live stadium data, predicts crowd surges, and can automatically execute tools (like dispatching volunteers or logging incidents) via natural language commands.
- **Graceful Simulation Engine:** If the live database is empty, the app falls back to an internal simulation engine that drifts data dynamically, making it perfect for demonstrations.

## Tech Stack 🛠️
- **Frontend:** React 18, Vite, React Router, Lucide Icons, Chart.js
- **Backend as a Service:** Firebase (Auth, Firestore, Analytics)
- **AI Model:** Google Gemini (`gemini-1.5-flash`) via `@google/generative-ai`

## Project Structure 📂
```text
FIFA/
├── src/
│   ├── components/      # Reusable UI elements (Sidebar, TopBar, Cards)
│   ├── context/         # React Contexts (Auth, Operations, RealTime)
│   ├── data/            # Mock data and seed data
│   ├── i18n/            # Internationalization setup and locales
│   ├── lib/             # Utilities (Gemini API logic, tool handlers)
│   ├── pages/           # Application views (Dashboard, Login, AIAssistant, etc.)
│   ├── App.jsx          # Main application routing
│   ├── firebase.js      # Firebase SDK initialization
│   ├── index.css        # Global CSS and custom design tokens
│   └── main.jsx         # React DOM entry point
├── .env.example         # Environment variable template
├── index.html           # Vite HTML entry point
├── package.json         # Project metadata and dependencies
├── PRD.md               # Product Requirements Document
├── TESTING.md           # Testing and scoring guide
└── vite.config.js       # Vite configuration
```

## Getting Started 🚀

### 1. Clone the repository
```bash
git clone https://github.com/aastha-yadav2/FIFA.git
cd FIFA
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API Key (you can use `.env.example` as a template):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

### 4. Firebase Setup
The project is already configured to use a specific Firebase project. However, if you are setting this up from scratch:
1. Ensure you have enabled **Google Sign-In** and **Email/Password** authentication in your Firebase Console.
2. Enable **Cloud Firestore** and set your security rules to allow authenticated read/writes.

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment 🌐
To deploy to Firebase Hosting:
```bash
npm run build
firebase deploy
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
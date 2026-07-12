# StadiumMind AI 🏟️🤖

<!-- Add your Shields.io badges here -->
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-FFCA28?logo=firebase)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E75B2?logo=google)

An intelligent, real-time operations center designed to manage massive crowd operations, incident reporting, and sustainability metrics for the FIFA World Cup 2026.

🔗 **[Live Demo Link](https://fifa-aa217.firebaseapp.com)** *(Note: Add live link here once deployed)*

---

## 📸 Screenshots & Demos

| Desktop View | Mobile View |
|---|---|
| ![Desktop Screenshot](https://via.placeholder.com/800x450.png?text=Dashboard+Desktop+View) | ![Mobile Screenshot](https://via.placeholder.com/400x450.png?text=Dashboard+Mobile+View) |

*Insert a GIF here showing your application in action if possible.*

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router, Lucide Icons, Chart.js
- **Backend as a Service:** Firebase (Auth, Cloud Firestore)
- **AI Model:** Google Gemini (`gemini-1.5-flash`) via `@google/generative-ai`
- **Hosting/Deployment:** Firebase Hosting

---

## ✨ Features

- 🚀 **Live Telemetry Dashboard:** Real-time monitoring of gate queues, zone occupancy, and transportation statuses.
- 🔒 **Role-Based Access Control:** Distinct views and permissions for Operations Managers, Security Officers, and Volunteers.
- 🎨 **Firebase Backend:** Fully integrated with Firebase Auth and Firestore for real-time, multi-user syncing of incidents and assignments.
- 🤖 **Gemini AI Assistant:** A context-aware chatbot that reads live stadium data and can automatically dispatch volunteers or log incidents.
- 📱 **Graceful Simulation Engine:** Falls back to a dynamic local simulation engine if the live database is empty, perfect for demos.

---

## 📂 Project Structure

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

---

## ⚙️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

List the software versions required before running this project:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aastha-yadav2/FIFA.git
   cd FIFA
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚀 Usage

Commands to run the application in different environments:

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
firebase deploy
```

---

## ☁️ Deployment

### Google Cloud Run

This project includes Docker configuration to deploy the Vite application using Nginx on Google Cloud Run.

1. **Build the Docker Image:**
   ```bash
   docker build -t gcr.io/your-project-id/stadiummind-app .
   ```

2. **Push the Image to Container Registry:**
   ```bash
   docker push gcr.io/your-project-id/stadiummind-app
   ```

3. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy stadiummind-app \
     --image gcr.io/your-project-id/stadiummind-app \
     --platform managed \
     --allow-unauthenticated
   ```
*(Note: Replace `your-project-id` with your actual Google Cloud Project ID.)*

---

## 🧪 Running Tests

*(If automated tests like Jest/Vitest are added in the future, run them using: `npm run test`)*

For manual scoring and validation criteria, please refer to the detailed [TESTING.md](./TESTING.md) guide.

---

## 🗺️ Roadmap

- [x] Initial release with core telemetry features
- [x] Integrate Firebase Authentication & Cloud Firestore
- [x] Implement Google Gemini AI Assistant with Tool Calling
- [ ] Add automated CI/CD pipelines
- [ ] Integrate live IoT sensors for real-world gate telemetry

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✍️ Authors & Acknowledgments

- **Aastha Yadav** - *Initial work* - [@aastha-yadav2](https://github.com/aastha-yadav2)
- Thanks to Google Gemini and Firebase for powering the real-time infrastructure.

---

## ✉️ Contact / Support

Aastha Yadav - [@aastha-yadav2](https://github.com/aastha-yadav2)

Project Link: [https://github.com/aastha-yadav2/FIFA](https://github.com/aastha-yadav2/FIFA)
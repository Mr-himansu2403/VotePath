# VotePath — Your Democratic Journey Guide 🗳️

VotePath is an intelligent, interactive civic assistant designed to help Indian citizens navigate the complexities of the electoral process. From voter registration to the final declaration of results, VotePath provides a step-by-step roadmap, interactive knowledge testing, and real-time AI assistance.

## 🌟 Chosen Vertical: Civic Assistant (India Elections)

VotePath focuses on empowering citizens with accurate, neutral, and easily accessible information about India's democratic process. It serves as a digital companion for both first-time voters and seasoned citizens.

## 🛠️ Approach and Logic

### 1. Architectural Overview
- **Frontend:** Built with **React 18** and **Vite**. This ensures a highly responsive user experience, robust state management for multi-language support, and modular component architecture.
- **Styling:** Utilizes modern CSS with **Framer Motion** for smooth, professional animations.
- **Backend:** A **Node.js/Express** server that handles production build hosting and provides a secure, validated API endpoint for the AI assistant.
- **AI Integration:** Utilizes the **Google Generative AI SDK** (Gemini 1.5 Flash) for high-speed, intelligent natural language processing.

### 2. Core Features
- **Election Roadmap:** A structured, 10-step interactive timeline explaining every phase from announcement to government formation.
- **Interactive Quiz:** A dynamic knowledge check with instant feedback and explanations to reinforce civic learning.
- **CivicAI Assistant:** A context-aware chatbot specifically tuned with system instructions to provide politically neutral, accurate information about ECI functions, voter rights, and technology like EVM/VVPAT.
- **Glossary:** A quick-reference guide for complex electoral terminology.
- **Comprehensive Multi-language Support:** Supports 13+ Indian languages (including Odia, Hindi, Bengali, etc.) with full-site content translation powered by Gemini AI.

### 3. Engineering Excellence
- **Security:** Implemented server-side input validation and secure environment variable management for API keys.
- **Quality:** Integrated **ESLint** and **Prettier** for consistent code style and high maintenance standards.
- **Testing:** Comprehensive automated testing suite using **Jest** and **Supertest** to verify server stability and API logic.
- **Accessibility:** Adheres to **A11y** standards with semantic HTML, ARIA roles, and keyboard-friendly navigation.

## 🚀 How the Solution Works

1.  **Launch:** Run `npm start` to host the production-built application on `http://localhost:3000`.
2.  **Development:** Run `npm run dev` to start the Vite development server.
3.  **Build:** Run `npm run build` to generate the production-ready assets in the `dist/` folder.
4.  **Explore:** Navigate through the "Election Roadmap" to understand the sequential steps of an election.
5.  **Learn:** Use the "Glossary" for quick definitions of terms like MCC, EPIC, and NOTA.
6.  **Test:** Take the interactive quiz to evaluate your understanding of Indian democracy.
7.  **Ask:** Interact with "CivicAI" for any specific questions. The backend pipes your query to Gemini 1.5 Flash with a specialized "Civic Guide" persona.

## 📋 Assumptions Made

- **API Key:** The solution assumes a valid `GEMINI_API_KEY` is provided in a `.env` file at the root.
- **Data Accuracy:** The election steps and quiz data are based on standard Election Commission of India (ECI) procedures as of early 2024.
- **Environment:** Designed to be run in a Node.js environment (v18+) for the backend and any modern evergreen browser for the frontend.

---
*Built for Challenge 2 — Demonstrating the power of AI in Civic Tech.*

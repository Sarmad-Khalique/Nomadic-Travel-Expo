# 🌍 Nomadic Travel App

**Nomadic Travel** is a modern mobile application built with **Expo Router** and **React Native**, designed to offer users a seamless and immersive travel booking experience. The app features dynamic onboarding, secure authentication, and a scalable architecture that aligns with mobile development best practices.

---

## 📱 Tech Stack

- **Expo Router** – File-based routing for universal apps
- **React Native** – Cross-platform native development
- **TypeScript** – Static typing for safer code
- **NativeWind (TailwindCSS)** – Utility-first styling for React Native
- **Zustand** – Minimalistic global and localized state management
- **TanStack Query** – Data fetching with smart caching and mutation support
- **Zod** – Declarative schema validation
- **React Hook Form** – Performant form handling integrated with Zod

---

## 📂 Project Structure

```
NomadicTravel/
├── app/                      # Screens and routes (Expo Router)
│   ├── (auth)/              # Auth screens: login, register, forgot-password
│   └── onboarding/          # Onboarding carousel
│
├── assets/                  # Static assets
│   └── images/
│       ├── auth/            # Auth logos and icons
│       └── onboarding/      # Onboarding backgrounds
│
├── components/              # Reusable UI components
├── constants/               # Global constants (colors, etc.)
├── hooks/                   # Custom reusable hooks
├── lib/
│   ├── api/                 # API configuration (e.g., axios)
│   └── react-query/         # Query/mutation logic using TanStack Query
├── store/                   # Zustand stores
├── types/                   # Global TypeScript types and interfaces
├── utils/                   # Utility functions (e.g., `cn` class merge)
├── validation/              # Zod validation schemas
├── tailwind.config.js       # Tailwind + NativeWind theme configuration
├── babel.config.js          # Babel plugins (Reanimated, NativeWind)
└── README.md
```

---

## ✨ Features

- 🧭 Onboarding carousel with smooth horizontal scroll and animated dots
- 🔐 Authentication flows (Login, Register, Forgot Password)
- 🧠 Password visibility toggle with Zustand
- 📐 Fully responsive layout with TailwindCSS (NativeWind)
- 🎨 Custom theming using Tailwind's extended configuration
- 🧾 Schema-driven form validation with Zod and React Hook Form
- ⚙️ Modular, scalable, and maintainable project architecture

---

## 🚀 Getting Started

1. **Clone the Repository**

```bash
git clone https://github.com/your-org/nomadic-travel.git
cd nomadic-travel
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npx expo start
```






## ✅ TODO 
- Add authentication API integration using `TanStack Query`
- Implement token-based session storage in Zustand
- Add bottom tab navigation with protected routes
- Build profile and trip planner screens
- Add offline support and loading states

---

## 👨‍💻 Contributing

1. Fork the repo and create your branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes and push:
   ```bash
   git commit -m "Added your feature"
   git push origin feature/your-feature-name
   ```
3. Open a pull request

---



## 📜 License

This project is licensed under the [MIT License](LICENSE).



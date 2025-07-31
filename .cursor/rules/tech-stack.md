# Tech Stack

This document outlines the technologies used across the frontend and backend of the Southeast Mobile project. This serves as a reference for both current and future developers.

---

## 📱 Frontend

**Framework:**  
- React Native with [Expo](https://expo.dev/)

**Routing & Navigation:**  
- [`expo-router`](https://expo.github.io/router/) using file-based routing (including `(tabs)` folder for bottom tab navigation)

**UI Library:**  
- [Gluestack v2](https://gluestack.io/)
- [NativeWind v4](https://www.nativewind.dev/) (Tailwind-style utility classes for React Native)

**State Management:**  
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Query](https://tanstack.com/query/latest) (for remote data fetching and caching)
- React Context (used where appropriate for global state)

**Language & Tooling:**  
- TypeScript
- Environment Variables managed via `.env` and `app.config.js`

**Offline Support:**  
- React Query with persistent storage using:
  - `@tanstack/react-query-persist-client`
  - `@react-native-async-storage/async-storage`
- Allows previously fetched data to be available even after app restarts or during offline use
---

## 🔗 Backend

**Backend as a Service:**  
- [Supabase](https://supabase.com/)
  - PostgreSQL database (see `schema.sql`)
  - Supabase Edge Functions for logic
  - No authentication – read-only data access only

**Client:**  
- Using `@supabase/supabase-js` directly from the React Native app

---

## 💳 Payments

**RevenueCat**  
- Setup for both iOS and Android
- Will be used to gate premium features or features behind a paywall at launch
- SDK: Planning to use `react-native-purchases` (integrated via EAS)

---

## ⚙️ DevOps / Build

**Build System:**  
- [EAS Build](https://docs.expo.dev/eas/) (Expo Application Services)

**Deployment:**  
- Via EAS CLI manually for now (no CI/CD yet)

**Environments:**  
- `.env` and `app.config.js` used for separating production/staging/local environments

---

## 🔮 Future Considerations

- Push notifications (possibly via Expo Push or OneSignal)
- Full RevenueCat subscription handling
- App versioning and changelog handling via OTA updates
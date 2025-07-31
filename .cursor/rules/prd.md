# Product Requirements Document (PRD)

## App Name
**Southeast Mobile**

## Overview
Southeast Mobile provides commercial fishermen in Southeast Alaska with real-time harvest data, collected from the Alaska Department of Fish and Game (ADF&G), and displays it in a mobile-friendly, user-first interface.

This app is intended to simplify access to essential catch statistics, especially the "Estimated Salmon Harvest by Fishery Area", and allows fishermen to quickly check data on the go without needing to use clunky spreadsheets or outdated web dashboards.

## Purpose
- Transform raw ADF&G data into a readable mobile format.
- Make salmon landing stats intuitive and visually digestible.
- Support offline data viewing for areas with limited connectivity.

---

## Target Users
- **Who:** Commercial salmon fishermen operating in Southeast Alaska.
- **Needs Addressed:**
  - Access key landing stats while at sea.
  - Reduce time spent parsing reports.
  - Retain usability even in poor connection conditions.

---

## Core Features (V1)
- No authentication (read-only app).
- Fetch and display data from Supabase.
- Allow pull-to-refresh while showing "Last updated at" from DB.
- Provide one main screen: **Estimated Salmon Harvest by Fishery Area**.
- Offline support using cached data from prior queries.
- Fully accessible layout with respect to OS font scaling.

---

## Excluded Features (V1)
- Authentication
- User profiles
- Notifications
- Submitting or editing data

---

## Data Model Overview
The following data is served via Supabase:

**Tables**
- `fisheries`  
  - `id`, `name`, `last_updated_at`
- `landings`
  - `fishery_id`, `season_year`, `opening_date`, `closing_date`
  - `species`, `avg_weight`, `avg_price`, `numbers`

**Displayed Metrics**
- Fishery name
- Species harvested
- Number of salmon
- Average weight and price
- Opening and closing dates
- Last updated timestamp

---

## User Flows

### New User:
1. Open app
2. See annual subscription paywall, after payment brings them to step 3
3. See a single tab/screen showing current salmon harvest by area
4. Pull-to-refresh to check for data updates

### Returning User:
- Data should load instantly from local cache
- Pull-to-refresh optionally syncs fresh data if available

---

## UX & Accessibility
- Uses **Gluestack v2** and **NativeWind v4** for UI components and styling
- Designed to respect system-level font scaling
- Minimal interaction: tap, scroll, and refresh only

---

## Technical Notes
- Built with React Native using Expo
- Supabase provides DB + edge functions
- RevenueCat integrated for future feature gating or monetization
- Zustand + React Query + Context API for state + offline handling
- Will target both **iOS and Android**

---

## Future Considerations
- Add push notifications for major fishery updates or closures
- Add a “Favorites” screen or filter by district/species
- Build onboarding for first-time users

---

## Risks & Dependencies
- Scraper service must stay operational and accurate
- Data integrity depends on ADF&G source updates
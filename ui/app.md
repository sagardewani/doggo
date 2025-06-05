# UI Context – DOGGO Frontend

## Tech Stack
- React + Vite
- TypeScript

## Plugins & Packages
- @vitejs/plugin-react (React Fast Refresh)
- axios (API integration)
- eslint (Linting)
- Prettier (Code formatting)

## Folder Structure
```
ui/
├── public/
│   ├── doggo-logo.svg
│   └── vite.svg
├── src/
│   ├── api/            # All API utility code and endpoints
│   ├── assets/
│   │   └── react.svg
│   ├── components/     # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

## API Integration
- All API calls are handled using axios.
- Base URL and endpoints are managed in a central API utility folder: `src/api/`.
- Example APIs:
  - GET /cities
  - GET /vendors
  - GET /vendors/:city

## Setup Steps

1. Add a dummy Doggo app logo SVG to `public/doggo-logo.svg` for use in the header and branding.
2. Install the `react-icons` library for icon support:
   ```sh
   npm install react-icons
   ```
3. Use icons from `react-icons` in your components as needed.
4. Update the website's title bar:
  - Change the <title> tag in `ui/index.html` to `DOGGO – Citywide Pet Service Finder 🐶` so the correct project title appears in the browser tab.

## Playful AI: Bark-to-Text & Mood Analysis (Frontend)

- Add UI for dog owners to upload or record a short bark audio for their dog (on their dog's profile page).
- Show the AI-generated transcript, detected mood, and recommendations after upload.
- Display a history of bark analyses for each dog.

## Dog Feed UI (Frontend)

- Add a "Dog Feed" page accessible from the main navigation.
- Allow dog owners to create/manage their dog's profile (name, breed, age, photo).
- Allow uploading up to 10s video highlights with a caption (on the dog's profile page).
- Show a feed of all dog highlights (with video, caption, dog info, and owner info).
- Allow connecting with other pet owners (follow, comment, like, etc. - MVP: just view and like).
- Show moderation status for each highlight (pending, approved, rejected).

## Why Only Humans Should Have All the Fun? (Engagement Features)

- Add a playful, engaging landing section explaining the fun features for both dogs and owners (Dog Feed, Bark-to-Text, AI recommendations).
- Highlight these features in the main navigation and homepage.
- Encourage users to try the Dog Feed and Playful AI features.
- Add fun UI touches (animations, dog emojis, playful copy).

---
This file tracks all UI-related setup, plugins, structure, and API integration details for the DOGGO frontend.

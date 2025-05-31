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
│   └── vite.svg
├── src/
│   ├── api/            # All API utility code and endpoints
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── assets/
│       └── react.svg
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

---
This file tracks all UI-related setup, plugins, structure, and API integration details for the DOGGO frontend.

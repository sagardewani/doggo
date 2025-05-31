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
- Base URL and endpoints are managed in a central API utility file (recommended: `src/api/`).
- Example APIs:
  - GET /cities
  - GET /vendors
  - GET /vendors/:city

---
This file tracks all UI-related setup, plugins, structure, and API integration details for the DOGGO frontend.

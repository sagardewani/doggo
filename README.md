# DOGGO – Citywide Pet Service Finder 🐶

DOGGO is a lightweight AI-powered web app that allows pet owners to discover pet-related service vendors in their city. It groups vendors by city and filters them by service category (e.g., grooming, vet, boarding).

---

## 🧭 Objective
DOGGO helps pet owners find, filter, and contact pet service vendors in their city, and provides vendors with a panel to manage their profiles.

## 🧑‍💻 Features
- City selection and filtering
- Search vendors by name
- Filter by service category
- Vendor cards with quick actions (call, WhatsApp, map)
- Vendor profile page
- AI assistant for recommendations
- Vendor panel (registration, login, profile management)
- Supabase backend integration
- Modern, responsive UI (React + Vite + Tailwind)

## 🖼️ Screens & Components
- HomePage: City selector, service filter, vendor list, search bar
- VendorCard: Key info and quick actions
- VendorProfilePage: Full vendor details
- VendorPanel: Registration, login, profile management (Formik)
- Assistant: AI chat for vendor discovery

## 📦 API Endpoints
- `GET /doggo-api/cities` – List all supported cities
- `GET /doggo-api/vendors` – List all vendors
- `GET /doggo-api/vendors/:city` – Vendors by city
- `POST /doggo-api/vendor/register` – Vendor registration
- `POST /doggo-api/vendor/login` – Vendor login
- `PUT /doggo-api/vendor/profile` – Update vendor profile

## 🗄️ Database (Supabase)
- `vendors` (id, email, googleId, city, category, rating)
- `vendor_profile` (vendor_id, phone, address, price_range, price_range_value, description, whatsapp_link, map_link, profile_photo_link, locality)
- `services` (vendor_id, services_list)

See [`db.md`](./db.md) for full schema and examples.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** Supabase (Postgres)

## 📁 Project Structure
- `ui/` – Frontend app (see [`ui/app.md`](./ui/app.md))
- `backend/` – Express backend (see [`backend/backend.md`](./backend/backend.md))
- `db.md`, `user-stories.md`, `SDLC.md`, `testplan.md` – Docs

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
1. **Clone the repo:**
   ```zsh
   git clone <repo-url>
   cd doggo
   ```
2. **Install backend dependencies:**
   ```zsh
   cd backend
   npm install
   npm start
   ```
   Backend runs on [http://localhost:3000](http://localhost:3000)
3. **Install frontend dependencies:**
   ```zsh
   cd ../ui
   npm install
   npm run dev
   ```
   Frontend runs on [http://localhost:5173](http://localhost:5173)

### Environment Variables
- See `.env` files in both `backend/` and `ui/` for configuration.
- Set `VITE_API_BASE_URL` in `ui/.env` for frontend API calls.
- Set Supabase keys in `backend/.env`.

## 🧪 Testing
- See [`testplan.md`](./testplan.md) for manual and automated test cases.

## 📚 Documentation
- [Project context](./context.md)
- [User stories](./user-stories.md)
- [Database schema](./db.md)
- [SDLC process](./SDLC.md)
- [Backend setup](./backend/backend.md)
- [Frontend setup](./ui/app.md)

## 📝 Contributing
- Please open issues or pull requests for improvements or bug fixes.

---

© 2025 DOGGO. All rights reserved.

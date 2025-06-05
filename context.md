# Project: DOGGO – Citywide Pet Service Finder 🐶

## 🧭 Objective

DOGGO is a lightweight AI-powered web app that allows pet owners to discover pet-related service vendors in their city, connect with other dog owners, and enjoy playful, dog-centric features. The app now supports:
- Citywide pet service search and filtering
- Dog owner registration and authentication (using email + dog bark audio as password)
- Dog profile management (name, breed, bio, photo, age, bark fingerprint)
- Dog Feed: share and view dog highlights (short videos/captions)
- AI moderation for dog content
- Bark-to-Text AI: analyze dog barks, get mood and recommendations
- Downloadable bark audio for secure login

---

## 🖼️ Screens & Components

1. **HomePage**
   - City Selector Dropdown
   - Service Filter Buttons
   - List of Vendor Cards
   - FunLanding (playful intro)
   - Search bar
   - **AuthButtons**: Themed buttons for "Sniff In (Dog Owner Login)" and "Wag & Register (New Dog Profile)" (always visible on landing)
2. **VendorCard**
   - Key info and quick actions
3. **VendorProfilePage**
   - All vendor details
4. **DogFeed** *(after authentication)*
   - Feed of dog highlights (video, caption, dog/owner info, moderation status)
5. **AddDogProfile**
   - Form for dog owner registration (with bark audio upload/download)
6. **DogOwnerLogin**
   - Login form (email + bark audio)
7. **AddDogHighlight** *(after authentication)*
   - Form to add a highlight for a dog
8. **BarkAI** *(after authentication)*
   - Upload/record bark, get transcript/mood/recommendation
9. **Assistant**
   - AI chat for vendor/service discovery
10. **VendorPanel**
   - Vendor registration, login, and profile management

---

## 🧑‍💻 Routing & Authentication Flow

- **Public Routes:**
  - `/` (HomePage)
  - `/add-dog` (Dog Profile Registration)
  - `/dog-owner-login` (Dog Owner Login)
  - `/vendor/:id` (Vendor Profile)
  - `/vendor-panel` (Vendor Panel)
- **After Authentication (Dog Owner Only):**
  - `/feed` (DogFeed)
  - `/dogs/:dogId/add-highlight` (AddDogHighlight)
  - `/bark-ai` (BarkAI)

All after-authentication UI pages are grouped in an `AuthenticatedRoutes` wrapper for clarity and maintainability. Unauthenticated users attempting to access these routes are redirected to the home page.

---

## 🧑‍💻 Features Overview

- Select city from dropdown
- Search vendors by name
- View all pet service vendors in selected city
- Filter vendors by services (e.g., Grooming, Vet, Pet Food)
- Vendor card displays: name, profile photo, address, phone, services, price, WhatsApp, map, call button
- Vendor Profile page
- **Dog Owner Registration/Login:**
  - Register with email and dog bark audio (used as password/fingerprint)
  - Download and save bark audio for future login
- **Dog Profile Management:**
  - Name, breed, age, photo, one-liner bio, bark fingerprint
- **Dog Feed:**
  - Add up to 10s video highlights with captions
  - View a feed of all dog highlights
  - Like, comment, and connect with other owners (MVP: view/like)
- **AI Moderation:**
  - All uploads are checked to ensure content is dog-related
- **Bark-to-Text AI:**
  - Upload/record bark audio, get transcript, mood, and recommendations
- **Security:**
  - Dog owner authentication is based on email + bark fingerprint
  - Bark audio is required for login and can be downloaded during registration
  - All after-authentication pages are protected and require login

---

## 🔒 Security & Authentication
- Dog owner authentication is based on email + dog bark fingerprint (AI-powered audio matching)
- Bark audio is required for both registration and login
- Bark audio can be downloaded and saved by the owner for future use
- All sensitive operations (profile creation, highlight upload) require authentication
- All after-authentication UI pages are grouped and protected in the router

---

## 🧠 AI/ML Integration
- Bark fingerprinting for secure login
- Bark-to-text and mood analysis (BarkAI)
- AI moderation for all uploaded content (video/caption)

---

## 📝 Notes
- All new features are designed to be playful, secure, and dog-centric
- The app is ready for further social features (comments, follows, etc.)
- All endpoints and DB structure are ready for scalable, secure dog owner and vendor management

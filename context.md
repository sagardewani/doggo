# Project: DOGGO – Citywide Pet Service Finder 🐶

## 🧭 Objective

DOGGO is a lightweight AI-powered web app that allows pet owners to discover pet-related service vendors in their city.  It groups vendors by **city** and filters them by service category (e.g., grooming, vet, boarding).

---

## 🧑‍💻 Features Overview

- Select city from dropdown
- Search vendors by name
- View all pet service vendors in selected city
- Filter vendors by services (e.g., Grooming, Vet, Pet Food)
- Vendor card displays:
  - Name
  - Profile photo
  - Address (Short address that should only include locality)
  - Phone number (tel link)
  - Services provided
  - Price range
  - WhatsApp chat link
  - Map link for directions
  - Call button
- Vendor Profile page to show all the details of vendor

---

## 🖼️ Screens & Components

1. **HomePage**

   - City Selector Dropdown
   - Service Filter Buttons
   - List of Vendor Cards
   - Logo of Doggo App with heading
   - Search bar to search vendors by name
2. **VendorCard**

   - Props: name, phone, address, services, price, description, whatsapp_link, map_link, profile_photo
   - Actions: Call, WhatsApp, and Directions button

---

## 📦 APIs (Mock or Static JSON)

You can use `express-js`.


### 1. **GET /cities**

Returns a list of all supported cities.

`["Jaipur", "Ahmedabad", "Bangalore"]  `

---

### 2. **GET /vendors**

Returns a list of all vendors with complete information.

Each vendor includes:

- Unique ID (id)
- Name (name)
- Locality (locality)
- Address (address)
- Phone number (phone)
- List of services provided (services_provided)
- Price range (price_range)
- Description (description)
- WhatsApp chat link (whatsapp_link)
- Map link for directions (map_link)
- Profile photo URL (profile_photo)
- Category (category)

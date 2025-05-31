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
3. **VendorProfilePage**

   - Displays all information about the vendor:
     - Name
     - Profile photo
     - Locality
     - Address
     - Phone number (tel link)
     - Services provided
     - Price range
     - Description
     - WhatsApp chat link
     - Map link for directions
     - Category
     - Any additional vendor details

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
- Price range (price_range) (e.g., "₹300 - ₹1500")
- Description (description)
- WhatsApp chat link (whatsapp_link)
- Map link for directions (map_link)
- Profile photo URL (profile_photo)
- Category (category)

**Example Response:**

```
[
  {
    "id": "vendor_001",
    "name": "Paws & Claws Grooming",
    "locality": "Malviya Nagar",
    "address": "Malviya Nagar, Jaipur",
    "phone": "+91-9876543210",
    "services_provided": ["Grooming", "Pet Food"],
    "price_range": "₹300 - ₹1500",
    "description": "Professional grooming for all breeds.",
    "whatsapp_link": "https://wa.me/919876543210",
    "map_link": "https://maps.google.com/?q=Malviya+Nagar+Jaipur",
    "profile_photo": "https://example.com/photos/pawsclaws.jpg",
    "category": "Grooming"
  },
  {
    "id": "vendor_002",
    "name": "Happy Tails Vet Clinic",
    "locality": "Satellite",
    "address": "Satellite, Ahmedabad",
    "phone": "+91-9123456789",
    "services_provided": ["Vet"],
    "price_range": "₹300 - ₹1500",
    "description": "24/7 veterinary care.",
    "whatsapp_link": "https://wa.me/919123456789",
    "map_link": "https://maps.google.com/?q=Satellite+Ahmedabad",
    "profile_photo": "https://example.com/photos/happytails.jpg",
    "category": "Vet"
  }
]
```

---

### 3. **GET /vendors/:city**

Returns a list of all vendors in the selected city.

- **Path Parameter:** `city` (e.g., `/vendors/Jaipur`)
- **Response:** Same structure as **GET /vendors**, but filtered by the specified city.

---

## 🛠️ Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Express.js with Node.js
- **Database:** Simple JSON-based dummy files (placed in a `dummy/` folder)

---

## 📁 Project Folder Structure

```
/ (project root)
│
├── frontend/           # React + Vite frontend app
│   └── ...
│
├── backend/            # Express.js + Node.js backend
│   ├── dummy/          # JSON files for mock database
│   │   ├── cities.json
│   │   └── vendors.json
│   └── ...
│
├── context.md
├── README.md
├── user-stories.md
└── ...
```

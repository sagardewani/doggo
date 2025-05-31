# User Stories for DOGGO – Citywide Pet Service Finder 🐶

## 1. Attractive & Simple Home Page Design

**User Story:**
As a pet owner, I want the home page to have an attractive but simple design, with the DOGGO logo and app title clearly visible in the header, and the page should be scrollable, so that I feel welcomed and can easily navigate the app.

**Acceptance Criteria:**

- The home page displays the DOGGO logo and app title prominently in the header section.
- The overall design is clean and simple, not overly fancy or cluttered.
- The page layout is scrollable to accommodate all content and future additions.
- The header remains visible at the top as the user scrolls.

---

## 2. City Selection & Home Screen

**User Story:**
As a pet owner, I want to select my city from a dropdown on the homepage so that I can view pet service vendors relevant to my location.

**Acceptance Criteria:**

- By default, the homepage displays all vendors regardless of city (using GET /vendors).
- The homepage displays a city selector dropdown with all supported cities (from GET /cities).
- Upon selecting a city, the vendor list updates to show only vendors from that city (using GET /vendors/:city).
- The city selector is always visible at the top of the homepage below the header on right side.

---

## 3. Vendor List & Filtering

**User Story:**
As a pet owner, I want to view and filter a list of pet service vendors by service category so that I can easily find the services I need.

**Acceptance Criteria:**

- By default, the vendor list displays cards for all vendors (not filtered by city).
- When a city is selected, the vendor list displays cards for each vendor in the selected city.
- Service filter buttons (e.g., Grooming, Vet, Pet Food) are visible and update the vendor list when selected.
- The vendor list is fetched from GET /vendors (for all vendors) or GET /vendors/:city (for city-specific vendors) and filtered client-side by category.

---

## 4. Vendor Search

**User Story:**
As a pet owner, I want to search for vendors by name so that I can quickly find a specific vendor.

**Acceptance Criteria:**

- A search bar is present on the homepage.
- Typing in the search bar filters the vendor list in real time by vendor name.

---

## 5. Vendor Card Display

**User Story:**
As a pet owner, I want each vendor card to show key information and quick actions so that I can contact or locate vendors easily.

**Acceptance Criteria:**

- Each card displays: name, profile photo, locality, phone (tel link), services, price range (e.g., "₹300 - ₹1500"), services provided, WhatsApp link, map link, and call button.
- Services provided should be in tags/chip format. Each service should be separate by small gap and trim it if it grows beyond the card width.
- Clicking the call button initiates a phone call.
- Clicking the WhatsApp button opens a chat with the vendor.
- Clicking the map link opens directions in Google Maps.

---

## 6. Vendor Profile Page

**User Story:**
As a pet owner, I want to view a detailed profile page for each vendor so that I can see all their information before contacting them.

**Acceptance Criteria:**

- Clicking a vendor card opens a profile page with all vendor details from the API.
- The profile page includes all fields from the vendor JSON object.

---

## 7. API & Data Structure

**User Story:**
As a developer, I want the backend to provide clear APIs and a consistent JSON-based DB structure so that the frontend can reliably fetch and display data.

**Acceptance Criteria:**

- GET /cities returns an array of city names.
- GET /vendors returns an array of vendor objects with the following fields:
  - id (string)
  - name (string)
  - locality (string)
  - address (string)
  - phone (string)
  - services_provided (array of strings)
  - price_range (string, e.g., "₹300 - ₹1500")
  - description (string)
  - whatsapp_link (string)
  - map_link (string)
  - profile_photo (string)
  - category (string)
- GET /vendors/:city returns the same structure, filtered by city.
- The database is a JSON file or in-memory array matching the above structure.

---

## 8. JSON DB Example Structure

**User Story:**
As a developer, I want a sample JSON structure for the vendor database so that I can seed or mock the backend easily.

**Acceptance Criteria:**

- The JSON DB contains an array of vendor objects, each with all required fields.
- Example:

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
  }
]
```

---

## 9. Fetch All Cities

**User Story:**
As a user, I want the frontend to fetch and display the list of all cities from the backend using the fetch method so that I can select my city when using the app.

**Acceptance Criteria:**

- The frontend uses the fetch method to call the GET /cities API.
- User can view the list of all available cities.
- Loading and error states are handled gracefully.
- The API call logic should be placed in `api/cities.ts`.

---

## 10. Fetch All Vendors

**User Story:**
As a user, I want the frontend to fetch and display the list of all vendors from the backend using the fetch method so that I can browse all available pet service providers.

**Acceptance Criteria:**

- The frontend uses the fetch method to call the GET /vendors API.
- User can view the list of all vendors.
- Loading and error states are handled gracefully.
- The API call logic should be placed in `api/vendors.ts`.

---

## 11. Fetch Vendors by City

**User Story:**
As a user, I want the frontend to fetch and display the list of vendors for a specific city from the backend using the fetch method so that I can see only the vendors relevant to my selected city.

**Acceptance Criteria:**

- The frontend uses the fetch method to call the GET /vendors/:city API.
- User can view the list of vendors filtered by the selected city.
- Loading and error states are handled gracefully.
- The API call logic should be placed in `api/vendors.ts`.

---

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

## 12. AI Assistant for Vendor Discovery

**User Story:**
As a pet owner, I want to interact with an AI assistant that can understand my requirements (e.g., service type, location, price range, pet type) and recommend the most suitable pet service vendors, so that I can quickly find the best match without manually searching or filtering.

**Acceptance Criteria:**

- A chat or assistant UI is available on the homepage.
- The user can type or select their requirements (e.g., "I need a dog groomer in Bangalore under ₹1000").
- The AI assistant processes the input and suggests the best-matching vendor(s) from the database.
- The assistant can clarify or ask follow-up questions if the user's request is ambiguous.
- Clicking a suggested vendor opens their profile page.
- The assistant is accessible and non-intrusive, with a modern, friendly UI.

---

## 13. Retrieve List of Vendors Providing Specific Dog-Related Services

**User Story:**
As a product owner, I want to fetch a list of vendors who provide specific dog-related services (e.g., Consultation, Vaccination, Surgery, Dental Care, Diagnostics, Grooming, Pet Food), so that users can easily discover and connect with relevant pet service providers in their city.

**Acceptance Criteria:**

- The system should support fetching vendor data using one or more of the following methods:
  - **Official APIs:** Integrate with public APIs (e.g., Google Places, Yelp, Foursquare) to retrieve up-to-date vendor information for the specified services.
  - **Data Scraping:** If official APIs are not available or insufficient, implement data scraping from reputable online directories, ensuring compliance with legal and ethical standards.
- The service categories to filter by must include: Consultation, Vaccination, Surgery, Dental Care, Diagnostics, Grooming, and Pet Food.
- The solution should allow for easy extension to add more service categories in the future.
- The data returned must include, at minimum: vendor name, address, contact information, city, and list of services provided.
- The data retrieval method (API or scraping) should be configurable and documented.
- If no data source is available, the system should provide a clear error or fallback message.

**Notes:**

- Preference should be given to official APIs for reliability and compliance.
- Data scraping should only be used when APIs are unavailable, and must respect the source’s terms of service.
- The implementation should be modular to allow switching or combining data sources as needed.

---

## 14. Dog Feed: Add & Share Dog Highlights

**User Story:**
As a dog owner, I want to add my dog's profile and upload up to 10 seconds of dog highlight videos with a short caption, so I can share my dog's best moments with other pet owners.

**Acceptance Criteria:**
- Dog owners can create and manage their dog's profile (name, breed, age, photo, etc.).
- Owners can upload up to 10 seconds of video highlights with a caption.
- Owners can view a feed of dog highlights from other users.
- Owners can connect with other pet owners to share and comment on dog highlights.
- Only dog-related content is allowed (AI moderation).

---

## 15. AI Moderation for Dog Content

**User Story:**
As a product owner, I want an AI to analyze uploaded content and ensure it is only related to dogs, so the feed remains relevant and safe.

**Acceptance Criteria:**
- All uploaded videos and captions are analyzed by AI for dog-related content.
- Non-dog content is flagged and cannot be posted.
- Users are notified if their content is rejected.

---

## 16. Playful AI: Bark-to-Text & Mood Analysis

**User Story:**
As a dog owner, I want an AI that can convert my dog's bark to human-readable text or SMS using Google APIs, so I can better understand my dog's mood and needs.

**Acceptance Criteria:**
- Owners can record and upload a short audio of their dog's bark.
- AI analyzes the bark and provides a human-readable translation or SMS.
- AI suggests the dog's likely mood and recommends activities or needs (e.g., play, walk, food).
- All translations and recommendations are shown in the app.

---

## 17. Why Only Humans Should Have All the Fun?

**User Story:**
As a product owner, I want to create features that make the app fun and engaging for both dogs and their owners, so that the platform is enjoyable for everyone.

**Acceptance Criteria:**
- The app includes playful, interactive features for dogs and owners.
- Features like dog feed, bark-to-text, and AI recommendations are available.
- The app encourages positive, fun interactions between pet owners and their dogs.

---

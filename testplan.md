# Test Plan for DOGGO – Citywide Pet Service Finder 🐶

This test plan covers all user stories and acceptance criteria described in the user-stories.md file. Each section includes objectives, acceptance criteria, and sample test cases.

---

## 1. Attractive & Simple Home Page Design

**Objective:** Ensure the home page is visually appealing, simple, and user-friendly.

**Test Cases:**
- Verify DOGGO logo and app title are visible in the header.
- Check that the header remains visible while scrolling.
- Confirm the page layout is clean, uncluttered, and scrollable.

---

## 2. City Selection & Home Screen

**Objective:** Ensure users can select their city and view relevant vendors.

**Test Cases:**
- Verify city selector dropdown is present and populated (GET /cities).
- Select a city and confirm vendor list updates (GET /vendors/:city).
- Ensure city selector remains visible at the top.

---

## 3. Vendor List & Filtering

**Objective:** Ensure vendor list displays correctly and can be filtered by category.

**Test Cases:**
- Verify vendor cards are shown for the selected city.
- Check service filter buttons are visible and functional.
- Select a filter and confirm vendor list updates by category.

---

## 4. Vendor Search

**Objective:** Ensure users can search for vendors by name.

**Test Cases:**
- Verify search bar is present on the homepage.
- Type a vendor name and confirm the list filters in real time.

---

## 5. Vendor Card Display

**Objective:** Ensure each vendor card displays key info and quick actions.

**Test Cases:**
- Verify each card shows: name, photo, locality, phone, services, price range, WhatsApp link, map link, call button.
- Click call button and confirm phone dialer opens.
- Click WhatsApp button and confirm chat opens.
- Click map link and confirm Google Maps opens.

---

## 6. Vendor Profile Page

**Objective:** Ensure detailed vendor profile page displays all info.

**Test Cases:**
- Click a vendor card and confirm profile page opens.
- Verify all vendor fields are displayed as per JSON object.

---

## 7. API & Data Structure

**Objective:** Ensure backend APIs and data structure are consistent and reliable.

**Test Cases:**
- GET /cities returns array of city names.
- GET /vendors returns array of vendor objects with all required fields.
- GET /vendors/:city returns correct filtered data.
- Database matches JSON structure in user stories.

---

## 8. JSON DB Example Structure

**Objective:** Ensure the sample JSON DB structure is valid and usable for seeding/mocking.

**Test Cases:**
- Validate JSON DB contains array of vendor objects with all required fields.
- Confirm sample data matches the example provided.

---

This test plan should be updated as new features or user stories are added.

# DOGGO Database Structure (Supabase)

## Table: vendors

| Column     | Type        | Description                  |
| ---------- | ----------- | ---------------------------- |
| id         | int8        | Primary key (auto-increment) |
| created_at | timestamptz | Row creation timestamp       |
| email      | varchar     | Vendor's email (unique)      |
| googleId   | varchar     | Google account ID            |
| city       | varchar     | City name                    |
| category   | varchar     | Main service category        |
| rating     | int8        | Vendor rating                |

---

## Table: vendor_profile

| Column             | Type        | Description                  |
| ------------------ | ----------- | ---------------------------- |
| id                 | int8        | Primary key (auto-increment) |
| created_at         | timestamptz | Row creation timestamp       |
| vendor_id          | int8        | Foreign key to vendors.id    |
| phone              | varchar     | Contact phone number         |
| address            | varchar     | Full address                 |
| price_range        | varchar     | Price range string           |
| price_range_value  | json        | Price range value (min/max)  |
| description        | text        | Description of services      |
| whatsapp_link      | text        | WhatsApp chat link           |
| map_link           | text        | Google Maps link             |
| profile_photo_link | text        | Profile photo URL            |
| locality           | varchar     | Locality/neighborhood        |

---

## Table: services

| Column        | Type        | Description                        |
| ------------- | ----------- | ---------------------------------- |
| id            | int8        | Primary key (auto-increment)       |
| created_at    | timestamptz | Row creation timestamp             |
| vendor_id     | int8        | Foreign key to vendors.id          |
| services_list | text        | List of services (comma separated) |

---

## Relationships

- `vendor_profile.vendor_id` → `vendors.id`
- `services.vendor_id` → `vendors.id`

---

## Example: vendors Table Row (JSON)

```json
{
  "id": 1,
  "created_at": "2025-05-31T12:00:00Z",
  "email": "vendor1@example.com",
  "googleId": "google123",
  "city": "Jaipur",
  "category": "Grooming",
  "rating": 5
}
```

## Example: vendor_profile Table Row (JSON)

```json
{
  "id": 1,
  "created_at": "2025-05-31T12:00:00Z",
  "vendor_id": 1,
  "phone": "+91-9876543210",
  "address": "Malviya Nagar, Jaipur",
  "price_range": "₹₹₹",
  "price_range_value": {"min": 300, "max": 1500},
  "description": "Professional grooming for all breeds.",
  "whatsapp_link": "https://wa.me/919876543210",
  "map_link": "https://maps.google.com/?q=Malviya+Nagar+Jaipur",
  "profile_photo_link": "https://example.com/photos/pawsclaws.jpg",
  "locality": "Malviya Nagar"
}
```

## Example: services Table Row (JSON)

```json
{
  "id": 1,
  "created_at": "2025-05-31T12:00:00Z",
  "vendor_id": 1,
  "services_list": "Grooming,Pet Food"
}
```

---

## Notes

- Use `int8` for all primary/foreign keys (auto-increment).
- Use `json` for structured fields like `price_range_value`.
- Use `text` for lists (comma separated) or consider a join table for many-to-many services.
- Add indexes on `email`, `city`, and `category` for fast lookups.
- Use foreign keys to enforce relationships between tables.

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

## Table: dog_profiles
| Column           | Type        | Description                       |
|----------------- |------------ |-----------------------------------|
| id               | int8        | Primary key (auto-increment)      |
| name             | varchar     | Dog's name                        |
| breed            | varchar     | Dog's breed                       |
| bio              | text        | One-liner bio                     |
| photo_url        | text        | Dog's profile photo               |
| email            | varchar     | Dog owner's email                 |
| age              | int8        | Dog's age (years)                 |
| bark_fingerprint | text        | Audio fingerprint (password)      |
| created_at       | timestamptz | Row creation timestamp            |

---

## Table: dog_highlights
| Column            | Type        | Description                        |
|------------------ |------------ |------------------------------------|
| id                | int8        | Primary key (auto-increment)       |
| dog_id            | int8        | Foreign key to dog_profiles.id     |
| video_url         | text        | URL to 10s highlight video         |
| caption           | text        | Short caption                      |
| moderation_status | varchar     | 'pending', 'approved', 'rejected'  |
| moderation_reason | text        | Reason for rejection (if any)      |
| created_at        | timestamptz | Row creation timestamp             |

---

## Table: dog_barks
| Column         | Type        | Description                        |
|--------------- |------------ |------------------------------------|
| id             | int8        | Primary key (auto-increment)       |
| dog_id         | int8        | Foreign key to dog_profiles.id     |
| audio_url      | text        | URL to bark audio                  |
| transcript     | text        | Bark-to-text translation           |
| mood           | varchar     | Detected mood (e.g., happy, sad)   |
| recommendation | text        | AI recommendation                  |
| created_at     | timestamptz | Row creation timestamp             |

---

## Relationships
- `vendor_profile.vendor_id` → `vendors.id`
- `services.vendor_id` → `vendors.id`
- `dog_profiles.email` is unique for each owner
- `dog_highlights.dog_id` → `dog_profiles.id`
- `dog_barks.dog_id` → `dog_profiles.id`

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

## Example: dog_profiles Table Row (JSON)

```json
{
  "id": 1,
  "name": "Bruno",
  "breed": "Labrador",
  "bio": "Loves fetch and belly rubs!",
  "photo_url": "https://example.com/bruno.jpg",
  "email": "owner@email.com",
  "age": 3,
  "bark_fingerprint": "abc123xyz",
  "created_at": "2025-06-03T12:00:00Z"
}
```

## Example: dog_highlights Table Row (JSON)

```json
{
  "id": 1,
  "dog_id": 1,
  "video_url": "https://example.com/bruno-highlight.mp4",
  "caption": "Bruno catching a frisbee!",
  "moderation_status": "approved",
  "moderation_reason": "",
  "created_at": "2025-06-03T12:10:00Z"
}
```

## Example: dog_barks Table Row (JSON)

```json
{
  "id": 1,
  "dog_id": 1,
  "audio_url": "https://example.com/bruno-bark.wav",
  "transcript": "Woof! (I want to play!)",
  "mood": "playful",
  "recommendation": "Take your dog for a walk or play fetch.",
  "created_at": "2025-06-03T12:15:00Z"
}
```

---

## Notes

- All dog owner authentication is based on email + bark fingerprint (AI-powered audio matching)
- Bark audio is required for both registration and login, and can be downloaded by the owner
- All highlights are AI-moderated for dog-related content
- Bark-to-text and mood analysis is available for all registered dogs
- The schema is ready for further social features (comments, likes, follows, etc.)

# Backend Context – DOGGO Backend

## Tech Stack
- Node + Express
- Javascript

## API URLS
- Cities: http://localhost:3000/doggo-api/get-cities
- All Vendors: http://localhost:3000/doggo-api/get-vendors
- Venddors by City: http://localhost:3000/doggo-api/get-vendors/:city

## Dog Feed APIs

### 1. Dog Profiles
- `POST /doggo-api/dogs` – Create a new dog profile
- `GET /doggo-api/dogs` – List all dog profiles (optionally by owner)
- `GET /doggo-api/dogs/:id` – Get a single dog profile
- `PUT /doggo-api/dogs/:id` – Update a dog profile
- `DELETE /doggo-api/dogs/:id` – Delete a dog profile

### 2. Dog Highlights
- `POST /doggo-api/dogs/:dogId/highlights` – Add a highlight video for a dog
- `GET /doggo-api/dogs/:dogId/highlights` – List highlights for a dog
- `GET /doggo-api/feed` – Get a feed of all dog highlights (with dog & owner info)

## Setup Steps

1. npm i
2. npm start

---
This file tracks all backend-related setup, plugins, structure, and API integration details for the DOGGO backend.

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Utility to fetch breeds from open source API (TheDogAPI)
async function fetchDogBreedsFromAPI() {
  const res = await axios.get('https://api.thedogapi.com/v1/breeds');
  // Return all relevant fields
  return res.data.map(b => ({
    id: b.id,
    name: b.name,
    weight: b.weight,
    height: b.height,
    bred_for: b.bred_for,
    breed_group: b.breed_group,
    life_span: b.life_span,
    temperament: b.temperament,
    origin: b.origin,
    reference_image_id: b.reference_image_id
  }));
}

// GET /breeds - Get all breeds from DB (id and name only)
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('dog_breeds').select('id, name').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /breeds/sync - Sync breeds from open source API to DB
router.post('/sync', async (req, res) => {
  try {
    const breeds = await fetchDogBreedsFromAPI();
    // Upsert breeds into DB
    for (const breed of breeds) {
      await supabase.from('dog_breeds').upsert([breed], { onConflict: ['id'] });
    }
    res.json({ success: true, count: breeds.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

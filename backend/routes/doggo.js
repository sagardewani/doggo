require('dotenv').config();

var express = require('express');
var router = express.Router();
var cities = require('../public/data/cities.json');
var vendorsMockData = require('../public/data/vendors.json');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY; // Set this in your environment
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchGooglePlaces(service, city) {
  const query = encodeURIComponent(`${service} pet ${city}`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await axios.get(url);
  // Map Google Places results to your vendor format
  return (response.data.results || []).map(place => ({
    id: place.place_id,
    name: place.name,
    address: place.formatted_address,
    phone: '', // Google Places Details API needed for phone
    services_provided: [service],
    price_range: '',
    description: place.types ? place.types.join(', ') : '',
    whatsapp_link: '',
    map_link: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
    profile_photo: place.photos && place.photos.length
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      : '',
    category: service,
    city: city,
    locality: '', // Could parse from address if needed
  }));
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cities', function(req, res, next) {
  res.send(cities);
});

// GET /vendors - Return all vendors in VendorResponse format
router.get('/vendors', async function(req, res, next) {
  try {
    // Join vendors, vendor_profile, and services tables
    // const { data: vendors, error: vErr } = await supabase.from('vendors').select('*');
    // if (vErr) return res.status(500).json({ error: vErr.message });
    // if (!vendors || vendors.length === 0) return res.json({ vendors: [] });

    // Get all profiles and services
    // const vendorIds = vendors.map(v => v.id);
    // const { data: profiles, error: pErr } = await supabase.from('vendor_profile').select('*').in('vendor_id', vendorIds);
    // const { data: services, error: sErr } = await supabase.from('services').select('*').in('vendor_id', vendorIds);
    // if (pErr || sErr) return res.status(500).json({ error: pErr?.message || sErr?.message });

    // // Map vendorId to profile and services
    // const profileMap = Object.fromEntries((profiles || []).map(p => [p.vendor_id, p]));
    // const servicesMap = Object.fromEntries((services || []).map(s => [s.vendor_id, s]));

    // // Format as VendorResponse[]
    // const vendorList = vendors.map(v => {
    //   const profile = profileMap[v.id] || {};
    //   const serviceObj = servicesMap[v.id] || {};
    //   return {
    //     id: String(v.id),
    //     city: v.city || '',
    //     name: v.name || '',
    //     category: v.category || '',
    //     description: profile.description || '',
    //     locality: profile.locality || '',
    //     rating: v.rating || 0,
    //     price_range: profile.price_range || '',
    //     price_range_value: profile.price_range_value || { min: 0, max: 0 },
    //     phone: profile.phone || '',
    //     whatsapp: profile.whatsapp_link || '',
    //     address: profile.address || '',
    //     map_link: profile.map_link || '',
    //     profile_photo: profile.profile_photo_link || '',
    //     services_provided: (serviceObj.services_list ? serviceObj.services_list.split(',').map(s => s.trim()) : []),
    //   };
    // });
    res.json({ vendors: vendorsMockData.vendors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/vendors/:city', function(req, res, next) {
  const city = req.params.city;
  const filteredVendors = vendorsMockData.vendors.filter(vendor => vendor.city === city);
  if (filteredVendors.length === 0) {
    res.status(404).send({ error: 'No vendors found for this city' });
  }
  // If the city is not found, return an empty array
  res.send({"vendors": filteredVendors});
});

router.get('/vendor/:vendorId', function(req, res, next) {
  const vendorId = req.params.vendorId;
  const vendor = vendors.vendors.find(vendor => vendor.id === vendorId);
  
  if (vendor) {
    res.send(vendor);
  } else {
    res.status(404).send({ error: 'Vendor not found' });
  }
});

// GET /vendors/services?service=Grooming&service=Pet%20Food
router.get('/vendors/services', async function(req, res, next) {
  let { service, city } = req.query;
  if (!service) {
    return res.status(400).json({ error: 'At least one service must be specified as a query parameter.' });
  }
  let services = Array.isArray(service) ? service : [service];

  // Local vendors
  let localVendors = vendors.vendors.filter(vendor =>
    services.every(s => vendor.services_provided.includes(s)) &&
    (!city || vendor.city.toLowerCase() === city.toLowerCase())
  );

  // Google Places vendors
  let googleVendors = [];
  if (GOOGLE_PLACES_API_KEY && city) {
    try {
      for (const s of services) {
        const places = await fetchGooglePlaces(s, city);
        googleVendors = googleVendors.concat(places);
      }
    } catch (err) {
      console.error('Google Places error:', err.message);
    }
  }

  // Combine and deduplicate by name/address
  const allVendors = [...localVendors, ...googleVendors];
  const uniqueVendors = [];
  const seen = new Set();
  for (const v of allVendors) {
    const key = `${v.name}|${v.address}`;
    if (!seen.has(key)) {
      uniqueVendors.push(v);
      seen.add(key);
    }
  }

  res.json(uniqueVendors);
});

// Vendor registration/login and panel APIs
// Google OAuth2 setup (pseudo, for real use passport-google-oauth20 or similar)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Dummy in-memory vendor sessions (for demo)
const vendorSessions = {};

// POST /vendor/register - Register a new vendor (after Google login)
router.post('/vendor/register', async (req, res) => {
  const { email, googleId, city, category, rating, phone, address, price_range, price_range_value, description, whatsapp_link, map_link, profile_photo_link, locality, services_list } = req.body;
  if (!email || !googleId) return res.status(400).json({ error: 'Missing required fields' });
  // Check if vendor already exists in Supabase
  const { data: existing, error: findErr } = await supabase
    .from('vendors')
    .select('*')
    .eq('email', email)
    .single();
  if (existing) return res.status(409).json({ error: 'Vendor already registered' });
  // Add vendor to vendors table
  const { data: vendor, error } = await supabase
    .from('vendors')
    .insert([
      {
        email,
        googleId,
        city: city || '',
        category: category || '',
        rating: rating || 0
      },
    ])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  // Add vendor profile
  const { data: profile, error: profileErr } = await supabase
    .from('vendor_profile')
    .insert([
      {
        vendor_id: vendor.id,
        phone: phone || '',
        address: address || '',
        price_range: price_range || '',
        price_range_value: price_range_value || null,
        description: description || '',
        whatsapp_link: whatsapp_link || '',
        map_link: map_link || '',
        profile_photo_link: profile_photo_link || '',
        locality: locality || ''
      },
    ])
    .select()
    .single();
  if (profileErr) return res.status(500).json({ error: profileErr.message });
  // Add services
  const { data: services, error: servicesErr } = await supabase
    .from('services')
    .insert([
      {
        vendor_id: vendor.id,
        services_list: Array.isArray(services_list) ? services_list : (typeof services_list === 'string' ? services_list.split(',').map(s => s.trim()) : [])
      },
    ])
    .select()
    .single();
  if (servicesErr) return res.status(500).json({ error: servicesErr.message });
  res.json({ success: true, vendor, profile, services });
});

// POST /vendor/login - Login vendor via Google (pseudo, real use OAuth2)
router.post('/vendor/login', async (req, res) => {
  const { email, googleId } = req.body;
  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('email', email)
    .eq('googleId', googleId)
    .single();
  if (!vendor) return res.status(401).json({ error: 'Invalid credentials' });
  // Create a session token (dummy)
  const token = `token_${Date.now()}_${Math.random()}`;
  vendorSessions[token] = vendor.id;
  res.json({ success: true, token, vendor });
});

// GET /vendor/me - Get current vendor profile (requires token)
router.get('/vendor/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const vendorId = vendorSessions[token];
  if (!vendorId) return res.status(401).json({ error: 'Unauthorized' });
  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', vendorId)
    .single();
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  res.json(vendor);
});

// PUT /vendor/me - Update current vendor profile (requires token)
router.put('/vendor/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const vendorId = vendorSessions[token];
  if (!vendorId) return res.status(401).json({ error: 'Unauthorized' });
  const { data: vendor, error } = await supabase
    .from('vendors')
    .update(req.body)
    .eq('id', vendorId)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, vendor });
});

router.get('/context', async (req, res) => {
  const { data: vendors, error: vErr } = await supabase.from('vendors').select('*');
  if (vErr || cErr) return res.status(500).json({ error: vErr?.message || cErr?.message });
  res.json({ vendors, cities });
});

module.exports = router;

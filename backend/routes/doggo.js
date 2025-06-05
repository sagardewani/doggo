require('dotenv').config();

var express = require('express');
var router = express.Router();
var cities = require('../public/data/cities.json');
var vendorsMockData = require('../public/data/vendors.json');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { createClient: createRedisClient } = require('redis');
// JWT utility function
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ limits: { fileSize: 500 * 1024 } });
// --- AI Moderation for Dog Highlights ---
const { moderateDogContent } = require('../utils/moderation'); // (to be implemented)

// --- DOG BARK: Bark-to-Text & Mood Analysis ---
const { analyzeDogBark, getBarkFingerprint } = require('../utils/barkai'); // (to be implemented)

const JWT_SECRET = process.env.JWT_SECRET || 'doggo_secret';

// Dummy in-memory vendor sessions (for demo)
const vendorSessions = {};

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY; // Set this in your environment
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const s3 = new S3Client({ region: S3_REGION });
const redis = createRedisClient({ url: REDIS_URL });


redis.connect().catch(console.error);

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

// Middleware: require authentication for posting highlights and updating dog profiles
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    req.authId = decoded.seed; // assign the provided authId (seed) to req
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Protect all /dogs routes (except /dogs/login and /dogs registration) and /feed
router.use(['/feed', '/dogs', '/dogs/:dogId/highlights', '/dogs/:dogId/bark', '/dogs/:dogId/highlights', '/dogs/:dogId/bark'], (req, res, next) => {
  // Allow /dogs/login and POST /dogs (registration) without auth
  console.log('Request path:', req.path, 'Method:', req.method);
  if (
    (req.path === '/login' && req.method === 'POST') ||
    (req.path === '/' && req.method === 'POST')
  ) {
    return next();
  }
  return requireAuth(req, res, next);
});

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


// --- DOG FEED: Dog Profiles ---
// POST /dogs - Create dog profile (multipart/form-data)
router.post('/dogs', upload.single('audio'), async (req, res) => {
  try {
    const { owner_id, name, breed_id, age, photo_url, bio } = req.body;
    if (!owner_id || !name || !req.file) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    let fingerprint;
    try {
      fingerprint = await getBarkFingerprint(req.file.buffer);
    } catch (e) {
      return res.status(400).json({ error: 'Failed to analyze bark audio' });
    }
    // Insert dog profile with fingerprint
    const { data, error } = await supabase.from('dog_profiles').insert([
      {
        owner_id,
        name,
        breed_id: breed_id ? Number(breed_id) : null,
        age: age ? Number(age) : null,
        photo_url,
        bio,
        bark_fingerprint: fingerprint
      }
    ]).select("!bark_fingerprint"); // Exclude fingerprint from response
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true, profile: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Invalidate feed cache on new highlight
const invalidateFeedCache = async (req, res, next) => {
  try {
    const keys = await redis.keys('feed_*');
    if (keys.length) await redis.del(keys);
  } catch (e) {}
  next();
};


// POST /dogs/:dogId/highlights - Add a highlight (auth required)
router.post('/dogs/:dogId/highlights', invalidateFeedCache, async (req, res) => {
  const { dogId } = req.params;
  const { video_url, caption } = req.body;
  if (!video_url) return res.status(400).json({ error: 'Missing video_url' });

  // AI moderation step
  let moderation_status = 'pending';
  let moderation_reason = '';
  try {
    const result = await moderateDogContent(video_url, caption);
    if (result.isDogContent) {
      moderation_status = 'approved';
    } else {
      moderation_status = 'rejected';
      moderation_reason = result.reason || 'Not dog-related content';
    }
  } catch (e) {
    moderation_status = 'pending'; // fallback if AI fails
    moderation_reason = 'AI moderation error';
  }

  const { data, error } = await supabase.from('dog_highlights').insert([
    { dog_id: dogId, video_url, caption, moderation_status, moderation_reason }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  if (moderation_status === 'rejected') {
    return res.status(400).json({ error: moderation_reason, moderation_status });
  }
  res.json(data[0]);
});

// GET /dogs/:dogId/highlights - List highlights for a dog
router.get('/dogs/:dogId/highlights', async (req, res) => {
  const { dogId } = req.params;
  const { data, error } = await supabase.from('dog_highlights').select('*').eq('dog_id', dogId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /feed - Get all highlights with dog & owner info (with Redis cache)
router.get('/feed', async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const cacheKey = `feed_${offset}_${limit}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));
  } catch (e) {
    // If Redis fails, continue without cache
  }
  const { data, error } = await supabase
    .from('dog_highlights')
    .select('*, dog_profiles(*, owner_id)')
    // .eq('moderation_status', 'approved')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({ error: error.message });
  }
  try {
    await redis.setEx(cacheKey, 30, JSON.stringify(data)); // 30s TTL
  } catch (e) {}
  res.json(data);
});

// POST /dogs/:dogId/bark - Upload bark audio and analyze
router.post('/dogs/:dogId/bark', async (req, res) => {
  const { dogId } = req.params;
  const { audio_url } = req.body;
  if (!audio_url) return res.status(400).json({ error: 'Missing audio_url' });

  // AI bark analysis
  let transcript = '';
  let mood = '';
  let recommendation = '';
  try {
    const result = await analyzeDogBark(audio_url);
    transcript = result.transcript;
    mood = result.mood;
    recommendation = result.recommendation;
  } catch (e) {
    return res.status(500).json({ error: 'AI bark analysis failed' });
  }

  const { data, error } = await supabase.from('dog_barks').insert([
    { dog_id: dogId, audio_url, transcript, mood, recommendation }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// POST /doggo-api/bark-ai - Analyze dog bark (dummy for now)
router.post('/bark-ai', async (req, res) => {
  const { audio_url } = req.body;
  if (!audio_url) return res.status(400).json({ error: 'Missing audio_url' });
  const result = await analyzeDogBark(audio_url);
  res.json(result);
});

// POST /doggo-api/s3-presigned-url - Get presigned S3 upload URL
router.post('/s3-presigned-url', async (req, res) => {
  const { fileName, fileType } = req.body;
  if (!fileName || !fileType) return res.status(400).json({ error: 'Missing fileName or fileType' });
  try {
    const key = `dog_highlights/${Date.now()}_${fileName}`;
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      ContentType: fileType,
      ACL: 'public-read',
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });
    const publicUrl = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`;
    res.json({ url, key, publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /dogs/login - Dog profile login with owner_id and audio (bark)
router.post('/dogs/login', upload.single('audio'), async (req, res) => {
  const { owner_id } = req.body;
  if (!owner_id || !req.file) {
    return res.status(400).json({ error: 'Missing owner_id or audio' });
  }
  let fingerprint;
  try {
    fingerprint = await getBarkFingerprint(req.file.buffer);
  } catch (e) {
    return res.status(400).json({ error: 'Failed to analyze bark audio' });
  }
  // Find dog profile with matching owner_id and bark_fingerprint
  const { data: profile, error } = await supabase
    .from('dog_profiles')
    .select('*')
    .eq('owner_id', owner_id)
    .eq('bark_fingerprint', fingerprint)
    .single();
  if (error || !profile) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Generate a JWT token using the dog profile id as the seed
  const token = createJwtToken(profile.id);
  res.json({ token, profile });
});

function createJwtToken(seed) {
  // You can add more payload fields as needed
  return jwt.sign({ auth_id: seed }, JWT_SECRET, { expiresIn: '7d' });
}


module.exports = router;

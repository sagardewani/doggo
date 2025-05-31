var express = require('express');
var router = express.Router();
var cities = require('../public/data/cities.json');
var vendors = require('../public/data/vendors.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cities', function(req, res, next) {
  res.send(cities);
});

router.get('/vendors', function(req, res, next) {
  res.send(vendors);
});

router.get('/vendors/:city', function(req, res, next) {
  const city = req.params.city;
  const filteredVendors = vendors.vendors.filter(vendor => vendor.city === city);
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

module.exports = router;

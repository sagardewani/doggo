var express = require('express');
var router = express.Router();
var cities = require('../public/data/cities.json');
var vendors = require('../public/data/vendors.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-cities', function(req, res, next) {
  res.send(cities);
});

router.get('/get-vendors', function(req, res, next) {
  res.send(vendors);
});

router.get('/get-vendors/:city', function(req, res, next) {
  const city = req.params.city;
  const filteredVendors = vendors.vendors.filter(vendor => vendor.city === city);
  res.send({"vendors": filteredVendors});
});

module.exports = router;

var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');


router.get('/activities', function(req, res, next) {
  //console.log('you got here');
  Activity.findAll()
  .then(function(dbActivities) {
    res.send(dbActivities)
  })
  .catch(next);
});

router.get('/hotels', function(req, res, next) {
  Hotel.findAll()
  .then(function(dbHotels) {
    res.send(dbHotels)
  })
  .catch(next);
});

router.get('/restaurants', function(req, res, next) {
  Restaurant.findAll()
  .then(function(dbRestaurants) {
    res.send(dbRestaurants)
  })
  .catch(next);
});

module.exports = router;

var Promise = require('bluebird');
var router = require('express').Router();
var Restaurant = require('../../models/restaurant');


router.get('/', function(req, res, next) {
  Promise.all([
    Restaurant.findAll()
  ])
  .then(function(dbRestaurants) {
    res.send(dbRestaurants)
  })
  .catch(next);
});

module.exports = router;

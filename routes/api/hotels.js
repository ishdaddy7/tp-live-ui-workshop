var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');


router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll()
  ])
  .then(function(dbHotels) {
    res.send(dbHotels)
  })
  .catch(next);
});

module.exports = router;

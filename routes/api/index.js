var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Number = require('../../models/number');


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

router.get('/restaurants', function(req, res, next) {
    Restaurant.findAll()
        .then(function(dbRestaurants) {
            res.send(dbRestaurants)
        })
        .catch(next);
});

router.post('/days', function(req, res, next) {
    Number.create({
            value: req.body.value
        })
        .then(function(result) {
            console.log(result);
            res.json(result);
        })
        .catch(next);
})

router.get('/days/:id', function(req, res, next) {
    Number.findOne({
            where: {
                value: req.params.id
            }
        })
        .then(function(result) {
            console.log(result)
            res.json(result);
        }).catch(next);
})

router.delete('/days/:id', function(req, res, next) {
    Number.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(result) {
            result.destroy()
            res.sendStatus(202);
        }).catch(next);
})

router.post('/days/:id/restaurants', function(req, res, next) {
    Promise.all([
            Number.findOne({
                where: {
                    id: req.params.id
                }
            }), Restaurant.findOne({
                where: {
                    id: req.body.restaurantId
                }
            })
        ])
        .spread(function(day, restaurant) {
            day.setRestaurants([restaurant]);
            res.sendStatus(200);
        })
        .catch(next);
})

router.get('/days', function(req, res, next){
  Number.findAll( {
    include: [Activity, Hotel, Restaurant],
    order: 'value ASC'
  })
  .then(function(result){
    res.json(result);
  }).catch(next);
})

module.exports = router;

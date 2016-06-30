var Promise = require('bluebird');
var router = require('express').Router();
var Activity = require('../../models/activity');


router.get('/', function(req, res, next) {
  console.log('you got here');
  Promise.all([
    Activity.findAll()
  ])
  .then(function(dbActivities) {
    res.send(dbActivities)
  })
  .catch(next);
});

module.exports = router;

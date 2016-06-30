/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Number = db.define('number', {
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Number.belongsTo(Hotel);
Number.belongsToMany(Restaurant, {through:'day_restaurant'});
Number.belongsToMany(Activity, {through:'day_activity'});

module.exports = Number;


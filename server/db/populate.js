var csv = require('csv-parser')
var fs = require('fs')
var fetch = require('node-fetch')

// DB Setup
var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const db = require('../credentials');
const sequelize = new Sequelize(db);

// Stock Model Model
const Stock = require('../models/StockModel');

// Authenticate Postgres Server.
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    fs.createReadStream('./sandp.csv')
    .pipe(csv())
    .on('data', function (data) {
    fetch("https://api.iextrading.com/1.0/stock/" + data.Symbol + "/company")
    .then(res => res.json())
    .then(function(json) {
        Stock.create({
            name: data.Name,
            symbol: data.Symbol,
            sector: data.Sector,
            description: json.description,
            exchange: json.exchange
        });
    });
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


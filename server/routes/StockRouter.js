const express = require('express')
const axios = require('axios');
const stockRouter = express.Router()

// Stock Model Model
const Stock = require('../models/StockModel');

// middleware that is specific to this router
stockRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Route to go to general statistics and all stocks list.
stockRouter.get('/', function (req, res) {
    Stock.findAll().then(stocks => {
        res.send(stocks);
    });
})

// route to a specific stock.
stockRouter.get('/:symbol', function (req, res) {
    let oneDay = "https://api.iextrading.com/1.0/stock/" +  req.params.symbol + "/chart/1d";
    axios.get(oneDay).then(function(json) {
       res.send(json.data);
    }).catch(function(error) {
       console.log(oneDay); 
    })
})

// route to a specific stock and its frequency.
stockRouter.get('/:symbol/:frequency', function (req, res) {
    let url = "https://api.iextrading.com/1.0/stock/" +  req.params.symbol + "/chart/" + req.params.frequency;
    axios.get(url).then(function(json) {
        res.send(json.data);
    }).catch(function(error) {
        console.log(url); 
    })
})
  
module.exports = stockRouter
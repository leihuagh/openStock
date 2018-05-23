const express = require('express');
const app = express();

// Routes
const stocks = require('./routes/StockRouter');
const users = require('./routes/UserRouter');

// DB Setup
var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const db = require('./credentials');
const sequelize = new Sequelize(db);

// User Model
const User = require('./models/UserModel');

// Stock Model
const Stock = require('./models/StockModel');

// Authenticate Postgres Server.
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Init User Table
User.sync().then(() => {
  console.log("User Table Generated.");
});

// Init Stock Table
Stock.sync().then(() => {
    console.log("Stock Table Generated.");
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/Stocks', stocks);
app.use('/Users', users);

app.listen(3000, () => console.log('Openstock Server listening on port 3000!'));
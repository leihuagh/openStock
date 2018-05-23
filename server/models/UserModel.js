// DB Setup
var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const db = require('../credentials');
const sequelize = new Sequelize(db);

// UUID Generation
const uuidv4 = require('uuid/v4');

const User = sequelize.define('user', {
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    id: { 
      type: Sequelize.UUID, 
      primaryKey: true, 
      defaultValue: uuidv4(), 
      allowNull: false 
    }
  });

  module.exports = User;
// Express Router.
const express = require('express');
const userRouter = express.Router();

// BCrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// JWT
const jwt = require('express-jwt');

// User Model
const User = require('../models/UserModel');

// Route to return list of all users.
userRouter.get('/', function (req, res) {
    User.findAll().then(users => {
        res.send(users);
    });
});

// Route to Login.
userRouter.get('/Signin', function (req, res) {
    User.find({
        where: {
          userName: req.query.userName
        }
    }).then(user => {
        let found = bcrypt.compareSync(req.query.userPassword, user.password); // true
        if (found) {
            // Send a JWT to user.
        }
        res.send(found);
    }).catch(function(err) {
      console.log(err);
      res.send("User does not exist.");  
    });
});

// Post to register.
userRouter.post('/register', function(req, res) {
    // Check token for validation.
    // Register Account and add to server.
    if (req.query.userName != null && req.query.password != null) {
        // Salt password and send.
        bcrypt.hash( req.query.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            User.create({
                userName: req.query.userName,
                password: hash
            });
          });
    } else {
        // Send what parameter is misssing.
        
    }
});

// Register Page.
userRouter.get('/register', function(req, res) {
    // Send unique token for validation.

});

// Route to a specific user.
userRouter.get('/:userId', function (req, res) {
  User.findById(req.params.userId).then(user => {
    res.send(user);
  }).catch(error => {
    res.send("User not found");  
  });
});

module.exports = userRouter;
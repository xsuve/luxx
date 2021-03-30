const express = require('express');
const app = express();
const userRoute = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let config = require('../config');

// User Model
let User = require('../models/User');

// Create User
userRoute.route('/create').post((req, res, next) => {
  let token;
  try {
    token = jwt.sign(
      {
        email: req.body.email,
      },
      config.private_key,
      {
        expiresIn: '1d'
      },
    );
  } catch(error) {
    console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
  }

  req.body.token = token;

  User.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);

      // Send Verification Email
      let transporter = nodemailer.createTransport({
        host: config.email_host,
        port: 465,
        secure: true,
        auth: {
          user: config.email_user,
          pass: config.email_pass
        }
      });

      let mailOptions = {
        from: config.email_user,
        to: req.body.email,
        subject: 'luxx - Verify your Account',
        html: '<h1>Welcome to luxx!</h1><br><br><a href="' + config.server_url + '/user/verify/' + req.body.token + '">Verify your Account</a>'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
        } else {
          console.log('\x1b[32m%s\x1b[0m', '[LUXX][user] Email sent: ' + info.response + '!');
        }
      });

      //console.log('\x1b[36m%s\x1b[0m', '[LUXX][user] ' + URL + '/user/verify/' + req.body.token);
    }
  });
});

// Get User By Email
userRoute.route('/getUserByEmail/:email').get((req, res) => {
  User.findOne({ email: req.params.email }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Verify Account
userRoute.route('/verify/:token').get((req, res, next) => {
  try {
    let user = jwt.verify(req.params.token, config.private_key);
    User.findOneAndUpdate({ email: user.email }, {
      $set: {
        verified: true,
        token: ''
      }
    }, (error, data) => {
      if(error) {
        return next(error);
      } else {
        //res.json(data);
        return res.redirect(config.url + '/login');
      }
    });
  } catch(error) {
    console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
  }
});

// Send Log In Link
userRoute.route('/logInUser/:email').get((req, res) => {
  let token;
  try {
    token = jwt.sign(
      {
        email: req.params.email,
      },
      config.private_key,
      {
        expiresIn: 5 * 60
      },
    );
  } catch(error) {
    console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
  }

  User.findOneAndUpdate({ email: req.params.email }, {
    $set: {
      token: token
    }
  }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);

      // Send Log In Link Email
      let transporter = nodemailer.createTransport({
        host: config.email_host,
        port: 465,
        secure: true,
        auth: {
          user: config.email_user,
          pass: config.email_pass
        }
      });

      let mailOptions = {
        from: config.email_user,
        to: data.email,
        subject: 'luxx - Log In Link',
        html: '<h1>Log Into luxx!</h1><br><br><a href="' + config.server_url + '/user/login/' + token + '">Log Into your Account</a>'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
        } else {
          console.log('\x1b[32m%s\x1b[0m', '[LUXX][user] Email sent: ' + info.response + '!');
        }
      });
    }
  });
});

// Log In User
userRoute.route('/login/:token').get((req, res, next) => {
  try {
    let user = jwt.verify(req.params.token, config.private_key);
    User.findOneAndUpdate({ email: user.email }, {
      $set: {
        token: ''
      }
    }, (error, data) => {
      if(error) {
        return next(error);
      } else {
        let token;
        try {
          token = jwt.sign(
            {
              email: user.email,
            },
            config.private_key,
            {
              expiresIn: '7d'
            },
          );

          res.cookie('luxx_session', token, {
	          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
          });
          let currentUserCookie = JSON.stringify({
            _id: data._id,
            email: data.email,
            fullName: data.fullName,
            profile: data.profile,
            country: data.country,
            signUpDate: data.signUpDate,
            verified: true,
            language: data.language,
            currency: data.currency,
            darkMode: data.darkMode
          }, {
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
          });
          res.cookie('luxx_current_user', currentUserCookie, { encode: String });

          return res.redirect(config.url + '/dashboard');
        } catch(error) {
          console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
        }
      }
    });
  } catch(error) {
    console.log('\x1b[31m%s\x1b[0m', '[LUXX][user] ' + error + '!');
  }
});

// Is Logged In
userRoute.route('/isLoggedIn/:token').get((req, res, next) => {
  try {
    let user = jwt.verify(req.params.token, config.private_key);
    User.find({ email: user.email }, (error, data) => {
      if(error) {
        res.status(200).json(false);
      } else {
        res.status(200).json(true);
      }
    });
  } catch(error) {
    res.status(200).json(false);
  }
});

// Onboard User
userRoute.route('/onboardUser/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update User
userRoute.route('/updateUser/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);

      console.log('\x1b[36m%s\x1b[0m', '[LUXX][user] User updated!');
    }
  });
});


module.exports = userRoute;

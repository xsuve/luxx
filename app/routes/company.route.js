const express = require('express');
const app = express();
const companyRoute = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let config = require('../config');

// Company Model
let Company = require('../models/Company');

// Create Company
companyRoute.route('/create').post((req, res, next) => {
  Company.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Companies
// companyRoute.route('/').get((req, res) => {
//   Company.find((error, data) => {
//     if(error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// Get Companies
companyRoute.route('/:userId').get((req, res) => {
  Company.find({ userId: req.params.userId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Company
companyRoute.route('/company/:id').get((req, res) => {
  Company.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Company
companyRoute.route('/update/:id').put((req, res, next) => {
  Company.findByIdAndUpdate(req.params.id, {
    $set: {
      image: req.body.image,
      industry: req.body.industry,
      name: req.body.name,
      website: req.body.website,
      numberOfEmployees: req.body.numberOfEmployees,
      annualRevenue: req.body.annualRevenue
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('Company successfully updated!');
    }
  });
});

// Delete Company
companyRoute.route('/delete/:id').delete((req, res, next) => {
  Company.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = companyRoute;

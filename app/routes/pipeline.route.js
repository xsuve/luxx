const express = require('express');
const app = express();
const pipelineRoute = express.Router();
const nodemailer = require('nodemailer');
let config = require('../config');

// Models
let Pipeline = require('../models/Pipeline');

// Create Pipeline
pipelineRoute.route('/create').post((req, res, next) => {
  Pipeline.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Pipelines
pipelineRoute.route('/:userId').get((req, res) => {
  Pipeline.find({ userId: req.params.userId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Pipeline
pipelineRoute.route('/pipeline/:id').get((req, res) => {
  Pipeline.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Pipeline
pipelineRoute.route('/update/:id').put((req, res, next) => {
  Pipeline.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      contacts: req.body.contacts
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][pipeline] Pipeline updated!');
    }
  });
});

// Delete Pipeline
pipelineRoute.route('/delete/:id').delete((req, res, next) => {
  Pipeline.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][pipeline] Pipeline deleted!');
    }
  });
});


module.exports = pipelineRoute;

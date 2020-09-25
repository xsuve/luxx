const express = require('express');
const app = express();
const contactRoute = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let config = require('../config');

// Models
let Contact = require('../models/Contact');
let Task = require('../models/Task');
let Note = require('../models/Note');
let Invoice = require('../models/Invoice');
let Event = require('../models/Event');

// Create Contact
contactRoute.route('/create').post((req, res, next) => {
  Contact.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Contacts
// contactRoute.route('/').get((req, res) => {
//   Contact.find((error, data) => {
//     if(error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// Get Contacts
contactRoute.route('/:userId').get((req, res) => {
  Contact.find({ userId: req.params.userId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Contact
contactRoute.route('/contact/:id').get((req, res) => {
  Contact.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Contact
contactRoute.route('/update/:id').put((req, res, next) => {
  Contact.findByIdAndUpdate(req.params.id, {
    $set: {
      companyId: req.body.companyId,
      companyPosition: req.body.companyPosition,
      stage: req.body.stage,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      address: req.body.address,
      facebook: req.body.facebook,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      github: req.body.github,
      youtube: req.body.youtube
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][contact] Contact updated!');
    }
  });
});

// Delete Contact
contactRoute.route('/delete/:id').delete((req, res, next) => {
  Contact.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][contact] Contact deleted!');
    }
  });
});


// Add Task
contactRoute.route('/addtask').post((req, res, next) => {
  Task.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Tasks
contactRoute.route('/tasks/:contactId').get((req, res) => {
  Task.find({ contactId: req.params.contactId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Task
contactRoute.route('/task/:id').get((req, res) => {
  Task.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Task
contactRoute.route('/updatetask/:id').put((req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      deadline: req.body.deadline,
      type: req.body.type,
      notes: req.body.notes,
      completed: req.body.completed
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][task] Task updated!');
    }
  });
});

// Delete Task
contactRoute.route('/deletetask/:id').delete((req, res, next) => {
  Task.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][task] Task deleted!');
    }
  });
});


// Add Note
contactRoute.route('/addnote').post((req, res, next) => {
  Note.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Notes
contactRoute.route('/notes/:contactId').get((req, res) => {
  Note.find({ contactId: req.params.contactId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Note
contactRoute.route('/note/:id').get((req, res) => {
  Note.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Note
contactRoute.route('/updatenote/:id').put((req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, {
    $set: {
      text: req.body.text
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][note] Note updated!');
    }
  });
});

// Delete Note
contactRoute.route('/deletenote/:id').delete((req, res, next) => {
  Note.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][note] Note deleted!');
    }
  });
});


// Add Invoice
contactRoute.route('/addinvoice').post((req, res, next) => {
  Invoice.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Invoices
contactRoute.route('/invoices/:contactId').get((req, res) => {
  Invoice.find({ contactId: req.params.contactId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Invoice
contactRoute.route('/invoice/:id').get((req, res) => {
  Invoice.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Invoice
contactRoute.route('/updateinvoice/:id').put((req, res, next) => {
  Invoice.findByIdAndUpdate(req.params.id, {
    $set: {
      number: req.body.number,
      value: req.body.value,
      paid: req.body.paid,
      dueDate: req.body.dueDate
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][invoice] Invoice updated!');
    }
  });
});

// Delete Invoice
contactRoute.route('/deleteinvoice/:id').delete((req, res, next) => {
  Invoice.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][invoice] Invoice deleted!');
    }
  });
});


// Schedule Event
contactRoute.route('/scheduleevent').post((req, res, next) => {
  Event.create(req.body, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Events
contactRoute.route('/events/:contactId').get((req, res) => {
  Event.find({ contactId: req.params.contactId }, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Event
contactRoute.route('/event/:id').get((req, res) => {
  Event.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Event
contactRoute.route('/updateevent/:id').put((req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      type: req.body.type
    }
  }, (error, data) => {
    if(error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][event] Event updated!');
    }
  });
});

// Delete Event
contactRoute.route('/deleteevent/:id').delete((req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('\x1b[36m%s\x1b[0m', '[LUXX][event] Event deleted!');
    }
  });
});


module.exports = contactRoute;

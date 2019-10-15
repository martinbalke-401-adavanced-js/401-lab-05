'use strict';

const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  // new MongooseSchema
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  _team: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('people', peopleSchema); 

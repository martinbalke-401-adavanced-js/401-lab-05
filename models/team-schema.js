'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {required: true, type: String},
  color: {
    required: true, 
    type: String, 
    lowercase: true,
    enum: ['red', 'blue', 'yellow'],
  },
});

module.exports = mongoose.model('team', teamSchema);



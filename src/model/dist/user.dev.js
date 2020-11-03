"use strict";

var _require = require('fs'),
    truncate = _require.truncate;

var _require2 = require('mongoose'),
    Schema = _require2.Schema,
    model = _require2.model;

var userSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model('user', userSchema);
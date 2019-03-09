const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  details: Joi.string(),
});

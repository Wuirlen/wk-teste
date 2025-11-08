const Joi = require('joi');

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateTask = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow(''),
    completed: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateTaskUpdate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(1),
    description: Joi.string().allow(''),
    completed: Joi.boolean(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateTask, validateTaskUpdate };
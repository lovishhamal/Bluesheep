const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }

      req.value['body'] = result.value;
      next();
    };
  },

  registerSchema: {
    authSchema: Joi.object({
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().allow(''),
      password: Joi.string().required(),
      phoneno: Joi.string().alphanum().min(10).max(10).required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      citizenidno: Joi.string().required(),
    }),
  },
};

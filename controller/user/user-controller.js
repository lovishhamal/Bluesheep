const router = require('express').Router();
const passport = require('passport');
require('../../passport/passport');
const { validateBody, registerSchema } = require('../../validation/validate');
const authService = require('../../services/user-services');
const httpResponse = require('../../http-handler');

router.use(
  '/register',
  validateBody(registerSchema.authSchema),
  async (req, res) => {
    try {
      const data = await authService.register(req.body);
      httpResponse.successHandler(res, null, data);
    } catch (error) {
      httpResponse.errorHandler(res, error, 400);
    }
  }
);

router.use('/login', () => {});

module.exports = router;

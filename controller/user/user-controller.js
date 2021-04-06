const router = require('express').Router();
const passport = require('passport');
require('../../passport/passport');

const {
  validateBody,
  registerSchema,
  loginSchema,
} = require('../../validation/validate');
const authService = require('../../services/user-services');
const httpResponse = require('../../http-handler');

router.post(
  '/register',
  validateBody(registerSchema.authSchema),
  async (req, res) => {
    try {
      const data = await authService.register(req.body);
      httpResponse.successHandler(res, 200, data, null, 'success');
    } catch (error) {
      httpResponse.errorHandler(res, error, 400);
    }
  }
);

router.post(
  '/login',
  validateBody(loginSchema.authSchema),
  async (req, res) => {
    try {
      const data = await authService.login(req.body);
      httpResponse.successHandler(res, 200, null, data, 'Login Successfull');
    } catch (error) {
      httpResponse.errorHandler(res, error, 400);
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const data = await authService.get();
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.patch('/', async (req, res) => {
  try {
    const data = await authService.patch(req.body);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

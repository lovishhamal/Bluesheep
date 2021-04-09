const router = require('express').Router();
require('../../passport/passport');
const { validateBody, loginSchema } = require('../../validation/validate');
const authService = require('../../services/admin-services');
const httpResponse = require('../../http-handler');

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

router.post('/register', async (req, res) => {
  try {
    const data = await authService.register(req.body);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

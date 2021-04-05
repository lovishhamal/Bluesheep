const router = require('express').Router();
const httpResponse = require('../../http-handler');
const customerService = require('../../services/customer-services');

router.post('/', async (req, res) => {
  try {
    const data = await customerService.addCustomer(req.body);
    httpResponse.successHandler(res, 200, null, null, data);
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

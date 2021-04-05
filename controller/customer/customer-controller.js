const router = require('express').Router();
const httpResponse = require('../../http-handler');
const customerService = require('../../services/customer-services');

router.get('/', async (req, res) => {
  try {
    const data = await customerService.getCustomer();
    httpResponse.successHandler(res, 200, data, null, 'Success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});
router.post('/', async (req, res) => {
  try {
    const data = await customerService.addCustomer(req.body);
    httpResponse.successHandler(res, 200, null, null, 'Success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

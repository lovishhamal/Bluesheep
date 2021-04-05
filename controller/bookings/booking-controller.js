const router = require('express').Router();
const httpResponse = require('../../http-handler');
const bookService = require('../../services/booking-service');

router.get('/', async (req, res) => {
  try {
    const data = await bookService.get();
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

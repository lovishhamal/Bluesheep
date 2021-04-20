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

router.patch('/update/:id', async (req, res) => {
  try {
    const data = await bookService.update(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.get('/search/:id', async (req, res) => {
  try {
    const data = await bookService.searchBooked(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.get('/dates/:id', async (req, res) => {
  try {
    const data = await bookService.dates(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

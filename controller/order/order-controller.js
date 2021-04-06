const router = require('express').Router();
const httpResponse = require('../../http-handler');
const orderService = require('../../services/order-service');

router.post('/', async (req, res) => {
  try {
    const data = await orderService.add(req.body);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});
router.get('/', async (req, res) => {
  try {
    const data = await orderService.get();
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const data = await orderService.getOrder(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const data = await orderService.deleteOrder(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

const router = require('express').Router();
const userController = require('../controller/user/user-controller');
const roomController = require('../controller/rooms/room-controller');
const bookingController = require('../controller/bookings/booking-controller');
const customerController = require('../controller/customer/customer-controller');
const foodController = require('../controller/food/food-controller');
const orderController = require('../controller/order/order-controller');

router.use('/', userController);
router.use('/room', roomController);
router.use('/booking', bookingController);
router.use('/customer', customerController);
router.use('/food', foodController);
router.use('/order', orderController);

module.exports = router;

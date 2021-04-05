const router = require('express').Router();
const userController = require('../controller/user/user-controller');
const roomController = require('../controller/rooms/room-controller');
const bookingController = require('../controller/bookings/booking-controller');

router.use('/', userController);
router.use('/room', roomController);
router.use('/booking', bookingController);

module.exports = router;

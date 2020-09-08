const router = require('express').Router();
const userController = require('../controller/user/user-controller');
const roomController = require('../controller/rooms/room-controller');

router.use('/', userController);
router.use('/room', roomController);

module.exports = router;

const router = require('express').Router();
const userController = require('../controller/user/user-controller');

router.use('/', userController);

module.exports = router;

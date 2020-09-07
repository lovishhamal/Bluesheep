const router = require('express').Router();
const userController = require('../controller/user/user-controller');
const adminController = require('../controller/admin/admin-controller');

router.use('/', userController);
router.use('/admin', adminController);

module.exports = router;

const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const userRouter = require('./users');
const itemRouter = require('./items');
const categoryRouter = require('./categories');
const authentication = require('../middlewares/authentication');

router.use('/users', userRouter);
router.use('/items', authentication, itemRouter);
router.use('/categories', authentication, categoryRouter);

router.use(errorHandler);

module.exports = router;
const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const userRouter = require('./users');
const itemRouter = require('./items');
const categoryRouter = require('./categories');

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);

router.use(errorHandler);

module.exports = router;
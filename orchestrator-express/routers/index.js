const router = require('express').Router();
const itemRouter = require('./items');
const userRouter = require('./users');
const categoryRouter = require('./categories');

router.use('/items', itemRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;
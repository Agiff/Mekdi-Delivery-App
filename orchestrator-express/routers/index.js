const router = require('express').Router();
const itemRouter = require('./items');

router.use('/items', itemRouter);

module.exports = router;
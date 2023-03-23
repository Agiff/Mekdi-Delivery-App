const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getUserItems);
router.get('/categories', categoryController.showCategory);
router.get('/items/:id', itemController.getUserItemDetail);

module.exports = router;
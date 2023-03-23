const router = require('express').Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.showItems);
router.post('/', itemController.createItem);
router.get('/:id', itemController.showItemDetail);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
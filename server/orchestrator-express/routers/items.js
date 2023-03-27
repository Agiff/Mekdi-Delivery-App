const router = require('express').Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItem);
router.post('/', itemController.addItem);
router.get('/:id', itemController.findItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
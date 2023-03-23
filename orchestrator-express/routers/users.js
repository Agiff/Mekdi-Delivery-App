const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.showUsers);
router.post('/', userController.addUser);
router.get('/:id', userController.findUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
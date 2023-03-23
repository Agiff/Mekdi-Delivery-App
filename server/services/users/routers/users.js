const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.showUsers);
router.post('/', userController.addUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/users_controller')

/* GET users listing. */
router.post('/', usersController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const usersControllers = require('../../../../controllers/users_controller')

/* GET users listing. */
router.post('/', usersControllers.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const sessionsController = require('../../../controllers/sessions_controller')

/* GET users listing. */
router.post('/', sessionsController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const forecastsController = require('../../../controllers/forecasts_controller')

router.get('/', forecastsController.show);

module.exports = router;
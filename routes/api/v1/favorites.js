const express = require('express')
const router = express.Router()
const favoritesController = require('../../../controllers/favorites_controller')

router.post('/', favoritesController.create)
router.get('/', favoritesController.show)

module.exports = router;
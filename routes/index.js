const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.getName);

// mount contacts routes
router.use('/contacts', require('./contacts'));

module.exports = router;

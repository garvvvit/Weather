const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');

const router = express.Router();

// Route for weather data
router.get('/', getWeatherData);

module.exports = router;

const axios = require('axios');

const getWeatherData = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing or invalid' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from OpenWeather API
    const response = await axios.get(apiUrl);
    const weather = response.data;

    // Format the response data
    const formattedData = {
      city: weather.name,
      temperature: weather.main.temp,
      description: weather.weather[0].description,
      windSpeed: weather.wind.speed,
      humidity: weather.main.humidity,
    };

    // Return formatted data
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
};

module.exports = { getWeatherData };

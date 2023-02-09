import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

/**
 * Get weather data from OpenWeatherMap API given the city.
 * @param {string} city.
 * @returns {Promise} Promise object represents the weather data.
 */
export const getWeather = (city) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

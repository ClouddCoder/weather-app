import { useState } from "react";
import { getWeather } from "./services/weather";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleGetWeather = async (e) => {
    e.preventDefault();

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      const { response } = err;
      const { data } = response;
      setError(data.message);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <main>
        <h1>Weather App</h1>
        <form onSubmit={handleGetWeather} className="container-weather">
          <section className="container-search">
            <input type="text" placeholder="City" onChange={handleChange} value={city} />
            <div>
              <button type="submit">Search</button>
            </div>
          </section>
          <section>
            <h3>{weather ? weather.name : "-"}</h3>
          </section>
          <section>
            <h4>{weather ? weather.weather?.[0].description : "-"}</h4>
          </section>
          <section className="container-temp">
            <span>{weather ? `${weather.main?.temp} °C` : "°C"}</span>
            <img
              src={
                weather
                  ? `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`
                  : "http://openweathermap.org/img/wn/03d@2x.png"
              }
              alt="weather icon"
            />
          </section>
          <section className="container-details">
            <span>{weather ? `Feels like: ${weather.main?.feels_like} °C` : "°C"}</span>
            <span>{weather ? `Humidity: ${weather.main?.humidity} %` : "%"}</span>
            <span>{weather ? `Pressure: ${weather.main?.pressure} hPs` : "hps"}</span>
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;

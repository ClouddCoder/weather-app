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
      setError("City not found");
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <main>
        <h1>Weather App</h1>
        <form onSubmit={handleGetWeather} className="container-form">
          <section className="container-search">
            <input type="text" placeholder="City" onChange={handleChange} value={city} />
            <button type="submit">Search</button>
          </section>
          <section className="container-weather">
            <section>
              <h3>{weather ? weather.name : "-"}</h3>
            </section>
            <section>
              <span>{weather ? weather.weather?.[0].description : "-"}</span>
            </section>
            <section className="container-temp">
              <span className="temp-field">{weather ? `${weather.main?.temp}°C` : "°C"}</span>
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
              <div>
                <h3>Feels like</h3>
                <span>{weather ? `${weather.main?.feels_like}°C` : "°C"}</span>
              </div>
              <div>
                <h3>Humidity</h3>
                <span>{weather ? `${weather.main?.humidity} %` : "%"}</span>
              </div>
              <div>
                <h3>Pressure</h3>
                <span>{weather ? `${weather.main?.pressure} hPs` : "hps"}</span>
              </div>
            </section>
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;

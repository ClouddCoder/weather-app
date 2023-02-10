import { useState } from "react";
import { getWeather } from "./services/weather";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetWeather = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError("City not found");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setCity(e.target.value);

    if (error) {
      setError(null);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <main>
        <h1 className="main__title">Weather App</h1>
        <form onSubmit={handleGetWeather} className="container-form">
          <section className="container-search">
            <input type="text" placeholder="City" onChange={handleChange} value={city} />
            {loading ? (
              <button className="submit-button disabled" type="submit">
                <div
                  className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-loader"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="submit-button" type="submit">
                Search
              </button>
            )}
          </section>
          <section className="container-weather">
            {error ? (
              <section>
                <h3 className="main-subheading">{error}</h3>
              </section>
            ) : (
              <>
                <section>
                  <h3 className="main-subheading">{weather ? weather.name : "-"}</h3>
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
                    <h3 className="main-subheading">Feels like</h3>
                    <span>{weather ? `${weather.main?.feels_like}°C` : "°C"}</span>
                  </div>
                  <div>
                    <h3 className="main-subheading">Humidity</h3>
                    <span>{weather ? `${weather.main?.humidity}%` : "%"}</span>
                  </div>
                  <div>
                    <h3 className="main-subheading">Pressure</h3>
                    <span>{weather ? `${weather.main?.pressure} hPs` : "hps"}</span>
                  </div>
                </section>
              </>
            )}
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;

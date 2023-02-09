import { useState, useEffect } from "react";
import { getWeather } from "./services/weather";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);

  const handleGetWeather = async () => {
    const data = await getWeather("London");

    setWeather(data);
  };

  useEffect(() => {
    handleGetWeather();
  }, []);

  return (
    <div className="container">
      <main>
        <h1>Weather App</h1>
        <h3>{weather ? weather.name : "-"}</h3>
        <h4>{weather ? weather.weather?.[0].description : "-"}</h4>
        <h4>{weather ? `${weather.main?.temp} °C` : "°C"}</h4>
        <img
          src={weather && `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
          alt="weather icon"
        />
        <h3>Details</h3>
        <p>{weather ? `Feels like: ${weather.main?.feels_like} °C` : "°C"}</p>
        <p>{weather ? `Humidity: ${weather.main?.humidity} %` : "%"}</p>
        <p>{weather ? `Pressure: ${weather.main?.pressure} hPs` : "hps"}</p>
      </main>
    </div>
  );
}

export default App;

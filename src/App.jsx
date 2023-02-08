import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  return (
    <div className="container">
      <main>
        <h1>React App</h1>
      </main>
    </div>
  );
}

export default App;

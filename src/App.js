import React from "react";
import styles from "./App.module.css";
import WeatherInfo from "./components/weatherInfo.js";

export default function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <h1>Weather App</h1>
      </div>

      <div className={styles.CardContainer}>
        {[0, 1, 2, 3, 4].map((day) => (
          <div className="Card" key={day}>
            <WeatherInfo city="Phoenix" day={day} />
          </div>
        ))}
      </div>
    </div>
  );
}

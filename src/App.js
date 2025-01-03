import React from "react";
import styles from "./App.module.css";
import WeatherInfo from "./components/weatherInfo.js";

export default function App() {
  const curCity = "Phoenix";


  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <h1>{curCity} Weather</h1>
        <input
          type="text"
          placeholder="Search for a city"
          className={styles.SearchBar}
        />
      </div>

      <div className={styles.CardContainer}>
        {[0, 1, 2, 3, 4].map((day) => (
          <div className="Card" key={day}>
            <WeatherInfo city={curCity} day={day} />
          </div>
        ))}
      </div>
    </div>
  );
}

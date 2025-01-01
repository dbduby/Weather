import React, { useState, useEffect } from "react";
import styles from "./weatherInfo.css";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherInfo = ({ city, day }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
        setLoading(false); // loading done
      } catch (error) {
        console.error("Can't fetch", error);
        setLoading(false); // loading done (because error)
      }
    };

    fetchData();
  }, [city]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  // 3 hr interval, 8 intervals per day
  const weatherForDay = weatherData.list[day * 8];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // date from unix (seconds) to java (milliseconds)
  const date = new Date(weatherForDay.dt * 1000); 
  const dayName = daysOfWeek[date.getDay()];
  const currentDate = date.toLocaleDateString();

  return (
    <div className={styles.Card}>
      <h2>{dayName}</h2>
      <p>{currentDate}</p> {/* Display the current date */}
      <p>
        {weatherForDay && weatherForDay.weather[0]
          ? weatherForDay.weather[0].description
          : "No data available"}
      </p>
    </div>
  );
};

export default WeatherInfo;

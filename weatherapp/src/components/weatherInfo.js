import React, { useState, useEffect } from "react";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherInfo = ({ city, day }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Can't fetch", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [city]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>
        {weatherData.weather && weatherData.weather[day]
          ? weatherData.weather[day].description
          : "No data available"}
      </p>
    </div>
  );
};

export default WeatherInfo;

import React, { useState, useEffect } from "react";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherInfo = ({ city, day }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

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

  const weatherForDay = weatherData.list[day * 8]; // Assuming 3-hour intervals, 8 intervals per day

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(weatherForDay.dt * 1000); // Convert Unix timestamp to JavaScript Date object
  const dayName = daysOfWeek[date.getDay()];
  const currentDate = date.toLocaleDateString(); // Get the current date in a readable format

  return (
    <div>
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

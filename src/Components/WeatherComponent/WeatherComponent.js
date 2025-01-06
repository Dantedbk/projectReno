import React, { useEffect, useState } from "react";
import { getForecast } from "openmeteo";

const WeatherComponent = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const response = await getForecast({
            latitude,
            longitude,
            hourly: ["temperature_2m", "precipitation"],
          });
          setWeatherData(response);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Weather Data</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weatherData ? (
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;

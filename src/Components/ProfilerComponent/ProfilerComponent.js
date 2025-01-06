import React, { useContext, useState, useEffect } from "react";
import { IPInfoContext } from "ip-info-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { browserName, osName, mobileVendor, isDesktop } from "react-device-detect";
import "./Profiler.css";

export const ProfilerComponent = () => {
  const userInfo = useContext(IPInfoContext);
  const [visitorId, setVisitorId] = useState("");
  const [fpComponents, setFpComponents] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        const { visitorId, components } = result;
        setVisitorId(visitorId);
        setFpComponents(components);
      })
      .catch((err) => {
        console.error("Error api fingerprint:", err);
      });
  }, []);

  useEffect(() => {
    if (userInfo?.latitude && userInfo?.longitude) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${userInfo.latitude}&longitude=${userInfo.longitude}&current=apparent_temperature`
          );
          if (!response.ok) {
            throw new Error("api o apikey");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchWeather();
    }
  }, [userInfo]);

  const userFingerprint = {
    fingerprint: visitorId,
    ip: userInfo?.ip,
    location: `${userInfo?.latitude || "Unknown"} ${userInfo?.longitude || "Unknown"}`,
    region: userInfo?.region || "Unknown",
    hardware: fpComponents?.webGlBasics,
    platform: `${isDesktop ? osName : userInfo?.osTypes + " " + mobileVendor}`,
    browser: browserName,
  };

  return (
    <div className="perfilator">
      <p> Id: <span>{userFingerprint.fingerprint}</span> </p>
      <p> IP: <span>{userFingerprint.ip}</span> </p>
      <p> OS: <span>{userFingerprint.platform}</span> </p>
      <p> Browser: <span>{userFingerprint.browser}</span> </p>
      <p> Location: <span>{userFingerprint.location}</span> </p>
      <p> Region: <span>{userFingerprint.region}</span> </p>
      <h3>Weather Data</h3>
      {error && <p style={{ color: "red" }}>Error fetching weather data: {error}</p>}
      {weatherData ? (
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default ProfilerComponent;

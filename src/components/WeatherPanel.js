// WeatherPanel.js
import { useEffect, useState } from "react";

export default function WeatherPanel({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(`http://localhost:4000/weather?lat=${lat}&lon=${lon}`);

        if (!res.ok) throw new Error("Kunne ikke hente værdata");

        const data = await res.json();
        const instant = data.properties.timeseries[0].data.instant.details;

        setWeather({
          temp: instant.air_temperature,
          wind: instant.wind_speed,
          symbol: data.properties.timeseries[0].data.next_1_hours?.summary.symbol_code
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const panelStyle = {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    backgroundColor: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #aaa",
    zIndex: 2000,
    width: "160px",
  };

  if (error) {
    return <div style={panelStyle}>Kunne ikke hente vær: {error}</div>;
  }

  if (!weather) {
    return <div style={panelStyle}>Henter vær…</div>;
  }

  return (
    <div style={panelStyle}>
      <h3 style={{ marginTop: 0 }}>Vær her</h3>
      <p>Temperatur: <b>{weather.temp}°C</b></p>
      <p>Vind: <b>{weather.wind} m/s</b></p>
      {weather.symbol && (
        <img
          alt="Værikon"
          src={`https://api.met.no/weatherapi/weathericon/2.0/?symbol=${weather.symbol}&content_type=image/png`}
          style={{ width: 50 }}
        />
      )}
    </div>
  );
}

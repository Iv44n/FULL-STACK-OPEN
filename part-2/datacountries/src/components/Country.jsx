import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const { name, capital, area, languages, flags, latlng } = country;
  const [weatherCountry, setWeatherCountry] = useState(null);

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${latlng[0]},${latlng[1]}` },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios.request(options).then((res) => setWeatherCountry(res.data));
  }, []);
  
  console.log(country);

  return (
    <div>
      <h1>{name.common}</h1>
      <div>
        <p>Capital: {capital.join(", ")}</p>
        <p>Area: {area} M km²</p>
      </div>
      <div>
        <h2>Languages:</h2>
        <ul>
          {Object.entries(languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={flags.svg}
          alt={flags.alt}
          width={300}
          height={200}
        />
      </div>
      <div>
        <h2>Weather in {name.common}</h2>
        {weatherCountry ? (
          <>
            <p>Temperature: {weatherCountry.current.temp_c}°C</p>
            <img
              src={weatherCountry.current.condition.icon}
              alt={weatherCountry.current.condition.text}
              width={100}
              height={100}
            />
            <p>Wind: {Math.round(weatherCountry.current.wind_kph / 3.6)} m/s</p>
          </>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
};

export default Country;

import { useMemo, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const searchFilter = useMemo(() => {
    return countries.filter((country) =>
      country.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleShowDetails = (e) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${e.target.name.toLowerCase()}`
      )
      .then((response) => {
        const country = response.data;
        let singleCountryData = {
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: {
            image: country.flags.svg,
            alt: country.flags.alt,
          },
        };

        setSingleCountry(singleCountryData);
      })
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    // get all
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        let countryNames = response.data.map((country) => country.name.common);

        setCountries(countryNames);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    // If search filter results is 1
    if (searchFilter.length === 1) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${searchFilter}`
        )
        .then((response) => {
          const country = response.data;
          let singleCountryData = {
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flag: {
              image: country.flags.svg,
              alt: country.flags.alt,
            },
          };

          setSingleCountry(singleCountryData);
        })
        .catch((error) => console.log("Error: ", error));
    } else {
      setSingleCountry(null);
    }
  }, [search, countries]);

  useEffect(() => {
    if (searchFilter.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchFilter}&APPID=${
            import.meta.env.VITE_WEATHER_KEY
          }`
        )
        .then((response) => {
          console.log("Weather: ", response.data);

          const weather = {
            temp: (response.data.main.temp - 273.16).toFixed(1),
            wind: response.data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
          };

          setWeatherData(weather);
        })
        .catch((error) => ("Error: ", error));
    }
  }, [searchFilter]);

  return (
    <>
      <label htmlFor="search">Find countries:</label>
      <input type="search" name="search" id="search" onChange={handleChange} />

      {singleCountry && (
        <>
          <h2>NAME: {singleCountry.name}</h2>
          <p>Capital: {singleCountry.capital}</p>
          <p>Area: {singleCountry.area}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(singleCountry.languages).map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
          <img src={singleCountry.flag.image} alt={singleCountry.flag.alt} />
          {weatherData && (
            <>
              <h2>Weather</h2>
              <p>Temperature: {weatherData.temp} celcius</p>
              <img src={weatherData.icon} alt={singleCountry.name} />
              <p>Wind: {weatherData.wind} m/s</p>
            </>
          )}
        </>
      )}

      {searchFilter.length === 0 && (
        <div>No results, specify another filter</div>
      )}

      {searchFilter.length === 1 && (
        <>
          <div></div>
        </>
      )}

      {searchFilter.length > 1 && searchFilter.length <= 10 && (
        <ul>
          {searchFilter.map((country) => (
            <li key={country}>
              {country}
              <button name={country} type="button" onClick={handleShowDetails}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}

      {search && searchFilter.length > 10 && (
        <div>Too many results, specify another filter</div>
      )}

      {!search && (
        <ul>
          {countries.map((country, i) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

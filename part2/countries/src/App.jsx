import { useMemo, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);
  const [show, setShow] = useState(false);

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
        console.log("Single Country: ", country);
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

        console.log("Single Country: ", singleCountryData);

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
          console.log("Single Country: ", country);
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

  let content;
  switch (true) {
    case searchFilter.length === 0:
      content = <div>No results, specify another filter</div>;
      break;
    case search.length > 0 &&
      searchFilter.length <= 10 &&
      searchFilter.length > 1:
      content = (
        <ul>
          {searchFilter.map((country) => (
            <li key={country}>
              {country}
              <button
                name={country}
                type="button"
                onClick={() => handleShowDetails(country)}
              >
                show
              </button>
            </li>
          ))}
        </ul>
      );
      break;
    case searchFilter.length === 1:
      content = singleCountry && (
        <div>
          <h2>NAME: {singleCountry.name}</h2>
          <p>Capital: {singleCountry.capital}</p>
          <p>Area: {singleCountry.area}</p>
          <p>Languages:</p>
          {singleCountry.languages && (
            <ul>
              {Object.values(singleCountry.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          )}
          <img src={singleCountry.flag.image} alt={singleCountry.flag.alt} />
        </div>
      );
      break;
    default:
      content = <div>Too many results, specify another filter</div>;
  }

  return (
    <>
      <label htmlFor="search">Find countries:</label>
      <input type="search" name="search" id="search" onChange={handleChange} />
      {content}
      {search.length === 0 && (
        <ul>
          {countries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) =>
      setCountries(
        response.data.map(({ name, capital, area, languages, flags }) => ({
          name: name.common,
          capital,
          area,
          languages,
          flags,
        }))
      )
    );
  }, []);
  console.log(countries);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const fileterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange} />
      </p>
      {fileterCountries.length > 10 && (
        <div>To many matches, specify another filter</div>
      )}
      {fileterCountries.length <= 10 &&
        fileterCountries.length > 1 &&
        fileterCountries.map((country) => <div>{country.name}</div>)}
      {fileterCountries.length === 1 && (
        <>
          <h1>{fileterCountries[0].name}</h1>
          <div>capital {fileterCountries[0].capital}</div>
          <div>area {fileterCountries[0].area}</div>
          <h3>languages:</h3>
          <ul>
            {Object.values(fileterCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div><img src={fileterCountries[0].flags.png} alt ="Not found"/></div>
        </>
      )}
    </div>
  );
}

export default App;

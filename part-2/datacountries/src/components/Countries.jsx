import { useEffect, useState } from "react";
import Country from "./Country";

const Countries = ({ countries, textFilter }) => {
  const [dataCountries, setDataCountries] = useState(countries);

  useEffect(() => {
    if (textFilter.length > 0) {
      const countriesFiltered = countries.filter((countrie) =>
        countrie.name.common.toUpperCase().includes(textFilter.toUpperCase())
      );

      setDataCountries(countriesFiltered);
    } else {
      setDataCountries(countries);
    }
  }, [textFilter, countries]);

  if (dataCountries.length > 10 && textFilter.length > 0) {
    return <p>Too many matches, specify another filter</p>;
  } else if (dataCountries.length <= 10 && dataCountries.length > 1) {
    return (
      <ul>
        {dataCountries.map((countrie) => (
          <li key={countrie.name.common}>{countrie.name.common}</li>
        ))}
      </ul>
    );
  } else if (dataCountries.length === 1) {
    return <Country country={dataCountries[0]} />;
  }

  return (
    <ul>
      {dataCountries.map((countrie) => (
        <li key={countrie.name.common}>{countrie.name.common}</li>
      ))}
    </ul>
  );
};

export default Countries;

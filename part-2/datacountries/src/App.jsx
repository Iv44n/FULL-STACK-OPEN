import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const countriesFiltered = countries.filter((countrie) =>
    countrie.name.common.toUpperCase().includes(searchText.toUpperCase())
  );

  return (
    <>
      <form>  
        <span>
          Find countries:
          <input type="text" onChange={handleChange} value={searchText} />
        </span>
      </form>
      <Countries countries={searchText.length > 0 && countriesFiltered || []}/>
    </>
  );
}

export default App;

import Country from "./Country";
import ListItem from "./ListItem";

const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  else if (countries.length === 1) return <Country country={countries[0]} />;
  else
    return (
      <ul>
        {countries.map((countrie) => (
          <ListItem key={countrie.name.common} country={countrie} />
        ))}
      </ul>
    );
};

export default Countries;

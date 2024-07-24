const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        {country.capital.map((cap) => (
          <p key={cap}>Capital: {cap}</p>
        ))}
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h2>Languages:</h2>
        <ul>
          {Object.entries(country.languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          width={300}
          height={200}
        />
      </div>
    </div>
  );
};

export default Country;

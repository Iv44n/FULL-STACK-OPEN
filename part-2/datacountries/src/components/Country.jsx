const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h1>{name.common}</h1>
      <div>
        {capital.map((cap) => (
          <p key={cap}>Capital: {cap}</p>
        ))}
        <p>Area: {area}</p>
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
    </div>
  );
};

export default Country;

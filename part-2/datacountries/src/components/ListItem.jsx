import { useState } from "react";
import Country from "./Country";

const ListItem = ({ country }) => {
  const [show, setShow] = useState(false);

  return show ? (
    <div>
      <button onClick={() => setShow(!show)}>Hide</button>
      <Country country={country} />
    </div>
  ) : (
    <li>
      <span>{country.name.common}</span>
      <button onClick={() => setShow(!show)}>Show</button>
    </li>
  );
};

export default ListItem;

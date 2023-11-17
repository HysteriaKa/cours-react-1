import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio,setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceanie"];
  useEffect(() => {
    // au moment de la mise en place du composant : callback
    //hooks
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent, index) => (
          <li key={index}>
            <input type="radio" id={continent} name="continentRadio" 
			checked={continent ===selectedRadio}
			onChange={(e)=>setSelectedRadio(e.target.id)}/>
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
	  {selectedRadio && (
		<button onClick={()=>setSelectedRadio("")}>Annuler recherche</button>
	  )}
      <ul>
        {data
		.filter((country)=>country.continents[0].includes(selectedRadio))
		.sort((a,b)=>b.population - a.population)
		.slice(0, rangeValue).map((country, index) => (
          <Card key={index} country={country} />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";


const Temp = () => {
  const [searchValue, setSearchValue] = useState("Pune");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {

    try {
      let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=a680e4eefe9967c3f187a0994e9b0133");
      let data = await res.json();

      const { temp } = data.main;
      const { humidity } = data.main;
      const { pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;

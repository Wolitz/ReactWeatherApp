import React, { useState } from "react";
import sunny from "./sunny.png";
import rainy from "./rainy.png";
import semi from "./semi.png";
import cloudy from "./cloudy.png";

function App() {
  const apiKey = "ffcc3b1d6839acddfd18b10b824cdae1";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState();
  const [errorMessage, setErrorMessage] = useState(null); 

  const checkWeather = async () => {
    try {
      const response = await fetch(apiUrl + location + "&appid=" + apiKey);
      if (!response.ok) {
        throw new Error("The city is not found, try again");
      }
      const APIdata = await response.json();
      if (APIdata.cod && APIdata.message) {
        throw new Error(APIdata.message);
      }
      setData(APIdata);
      const picID = APIdata.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + picID + "@2x.png";
      setPicture(imgUrl);
      setErrorMessage(null); 
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setErrorMessage(error.message); 
    }
  };

  const getData = (event) => {
    if (event.key === "Enter") {
      checkWeather();
    }
  };

  return (
    <div className="background">
      <center>
        <h1 className="font">Weather</h1>
        <div className="search">
          <input
            type="text"
            id="myText"
            onChange={(event) => setLocation(event.target.value)}
            onKeyUp={getData}
            placeholder="Search..."
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>} {}
        </div>
        <br />
        <h2 className="location">{data.name}</h2>
        <table>
          <tr>
            <th>
              <img src={picture} className="slika" alt="" />
            </th>
            <th>{data.main ? <h2>{data.main.temp}°C</h2> : null}</th>
          </tr>
        </table>
        {data.main ? <h2> H: {data.main.humidity}%</h2> : null}
        {data.main ? <h2> P: {data.main.pressure}Ph</h2> : null}
        {data.wind ? <h2> S: {data.wind.speed}KM/H</h2> : null}
      </center>
    </div>
  );
}

export default App;

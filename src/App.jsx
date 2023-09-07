import { useState } from "react";
import sunny from "./sunny.png"
import rainy from "./rainy.png"
import semi from "./semi.png"
import cloudy from "./cloudy.png"



function App() { 


var APIdata ;
const [data, setData] = useState({
  name: "",
  main: {
    temp: "",
    humidity: "",
    pressure: "",
  },
  weather: [
    {
      icon: "",
    },
  ],
  wind: {
    speed: "",
  },
});
const [location,setLocation ] = useState("" );
const [picture, setPicture] = useState()

const apiKey = "ffcc3b1d6839acddfd18b10b824cdae1";
const apiUrl=  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const checkWeather = async () => {
  const response = await fetch(apiUrl + location +'&appid=' + apiKey);
  APIdata = await response.json();
  setData(APIdata)
  const picID =data.weather[0].icon;
  const imgUrl = 'https://openweathermap.org/img/wn/' + picID + '@2x.png';
  setPicture(imgUrl);
}

const counter = 0;
 
const getData = (event) => {
  if(event.key === 'Enter'){

      checkWeather();

  }
}

  return (
     <div className="background">
      <center>
        <h1 className="font">Weather</h1>
          <div className="search">
            <input 
            type="text"
            id="myText"
            onChange={event => setLocation(event.target.value) }
            onKeyUp={getData}
            placeholder="Search..." 
            />
          </div>
          <br/>
          <h2 className="location">{data.name}</h2>
            <table>
                <tr>
                  <th> <img src ={picture}  className="slika" /></th>
                    <th>{data.main ? <h2>{data.main.temp }°C</h2> : null }</th>
                </tr>
            </table>
            {data.main ? <h2> H: {data.main.humidity }%</h2> : null }
            {data.main ? <h2> P: {data.main.pressure }Ph</h2> : null } 
            {data.wind ? <h2> S: {data.wind.speed }KM/H</h2> : null }
      </center>

     </div>
  );
}

export default App;

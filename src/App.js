import { useState } from "react";
import sunny from "./sunny.png"
import rainy from "./rainy.png"
import semi from "./semi.png"
import cloudy from "./cloudy.png"

var picture= sunny;


function App() {


 var APIdata 
const [data,setData ] = useState({} );
const [location,setLocation ] = useState("" );

const apiKey = "ffcc3b1d6839acddfd18b10b824cdae1";
const apiUrl=  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

 const checkWeather = async () => {
 const response = await fetch(apiUrl + location +'&appid=' + apiKey);
  APIdata = await response.json();
 setData(APIdata)
 console.log(APIdata);
  
}

 
const getData = (event) => {
  if(event.key === 'Enter'){

    checkWeather();
    if( data.clouds.all > 39 && data.clouds.all < 70){
      picture = semi;
     }
      if(data.clouds.all > 70){
       picture = cloudy;
     }
      if(data.weather[0].main === "Rainy"){
       picture = rainy;
     }
     if(data.clouds.all === 0){
      picture = sunny;
     }
  }
}

  return (
     <div>
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

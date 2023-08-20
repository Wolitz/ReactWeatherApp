function App() {
  return (
     <div>
      <center>
        <h1 class="font">Weather</h1>
          <div class="search">
            <input type="text" id="myText" placeholder="Search.." />
            <input type="submit" onclick="loadData()" class="button" value="Submit"/> 
          </div>
          <h2 class="location"></h2>
            <table>
                <tr>
                  <th> <img src="sunny.png" class="slika" alt="img "/></th>
                    <th><h2 class="temp"></h2></th>
                </tr>
            </table>
            <h2 class="humidity"></h2>
            <h2 class="pressure"></h2>
            <h2 class="wind"> </h2>
      </center>
     </div>
  );
}

export default App;

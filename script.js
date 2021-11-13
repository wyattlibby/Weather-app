// settings
const apikey = "a5403c39c80696399a3eb6883d440871";
const storagekey="savedcity";

// html elements
const cityinput = document.querySelector("nav input");
const searchedcitys = document.querySelector("nav footer");
const main = document.querySelector("main");

// event listners
document.querySelector("nav button").addEventListener("click", () => {
  getweatherbycity(cityinput.value);
  cityinput.value = "";
});

//pageload
displaysavedcitys();

// api calls
async function getweatherbycity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const { lat, lon } = data.coord;
  const { name } = data;
  addsearchedcitys(name);
  getweatherbycoordinates(lat, lon, name);
}
async function getweatherbycoordinates(lat, lon, name) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  displayweather(data, name);
  displayforecast(data.daily.slice(0, 5));
}

// rendering output
function displayweather(data, name) {
  const temp = data.current.temp;
  const humidity = data.current.humidity;
  const uvindex = data.current.uvi;
  const windspeed = data.current.wind_speed;
  const icon = data.current.weather[0].icon;
  var uviscale;
  if (uvindex < 3) uviscale = "low";
  else if (uvindex < 6) uviscale = "moderate";
  else if (uvindex < 8) uviscale = "high";
  else if (uvindex < 11) uviscale = "veryhigh";
  else uviscale = "extreme";
  const html = `
        <h2>${name} <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h2>
        <p>Temp: ${temp}&deg;F</p>
        <p>Humidiity: ${humidity}%</p>
        <p>Windspeed: ${windspeed}MPH</p>
        <p>UVI: <span class="${uviscale}">${uvindex}</span></p>
        <footer></footer>
    `;
  main.innerHTML = html;
}
function displayforecast(data) {
  var html = "";
  for (let day of data) {
    const date = new Date(day.dt * 1000).toLocaleDateString();
    const temp = day.temp.day;
    const windspeed = day.wind_speed;
    const humidity = day.humidity;
    const icon = day.weather[0].icon;
    html += `
            <section>
                <h3>${date} <img src="http://openweathermap.org/img/wn/${icon}.png"></h3>
                <p>Temp: ${temp}&deg;F</p>
                <p>Humidiity: ${humidity}%</p>
                <p>Windspeed: ${windspeed}MPH</p>
            </section>
        `;
  }
  main.querySelector("footer").innerHTML = html;
}
function displaysavedcitys(){
    const data=getdatafromstorage();
    var html="";
    for (let city of data){
        html+=`<button>${city}</button>`;
    }
    searchedcitys.innerHTML=html;
    const buttons=searchedcitys.querySelectorAll("button");
    for (let button of buttons){
        button.addEventListener("click",()=>{
            getweatherbycity(button.textContent);
        });
    }
}

// data managment
function addsearchedcitys(city) {
    const data=getdatafromstorage();
    if (!data.includes(city)){
        data.unshift(city);
        setdatatostorage(data);
        displaysavedcitys();
    }
}
function getdatafromstorage(){
    const data= localStorage.getItem(storagekey);
    if (!data)return [];
    return JSON.parse(data);
}
function setdatatostorage(data){
    localStorage.setItem(storagekey,JSON.stringify(data));
}

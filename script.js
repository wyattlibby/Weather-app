// settings
const apikey="a5403c39c80696399a3eb6883d440871";


// html elements
const cityinput=document.querySelector("nav input");
const searchedcitys=document.querySelector("nav footer");
const main=document.querySelector("main");

// event listners
document.querySelector("nav button").addEventListener("click",()=>{
    getweatherbycity(cityinput.value);
    cityinput.value="";
});

// api calls
async function getweatherbycity(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
    const response =await fetch(url);
    const data=await response.json();
    console.log(data);
    const {lat,lon}=data.coord;
    const {name}=data;
    addsearchedcitys(name);
    getweatherbycoordinates(lat,lon,name);
}
async function getweatherbycoordinates(lat,lon,name){
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
    const response =await fetch(url);
    const data=await response.json();
    console.log(data);
    displayweather(data,name);
    displayforecast(data.daily.slice(0,5));
}


// rendering output
function displayweather(data,name){
    const temp= data.current.temp;
    const humidity= data.current.humidity;
    const uvindex= data.current.uvi;
    const windspeed= data.current.wind_speed;
    const icon= data.current.weather[0].icon;
    var uviscale;
    if (uvindex <3) uviscale="low";
    else if (uvindex <6) uviscale="moderate";
    else if (uvindex <8) uviscale="high";
    else if (uvindex <11) uviscale="veryhigh";
    else uviscale= "extreme";
    const html=`
        <h2>${name} <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h2>
        <p>Temp: ${temp}&deg;F</p>
        <p>Humidiity: ${humidity}%</p>
        <p>Windspeed: ${windspeed}MPH</p>
        <p>UVI: <span class="${uviscale}">${uvindex}</span></p>
    `;
    main.innerHTML=html;
}
function displayforecast(data){

}


// data managment
function addsearchedcitys(city){}

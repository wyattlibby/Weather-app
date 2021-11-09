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
function getweatherbycity(city){}

// rendering output

// data managment


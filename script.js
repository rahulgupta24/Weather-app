let weather ={
apiKey : "64ce4d80d6432ee5497fb809c3f19b94",

fetchWeather: function (city){
    fetch (
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        +"&units=metric&appid=" 
        + this.apiKey
    )
    .then((response) => {
        if(!response.ok){
            alert("No weather Found");
            throw new Error("No weather Found");
        }
        return response.json();
    })
    .then((data) => this.displayWeather(data));
},
displayWeather: function (data){
  const {name} = data;
  const {icon,description} =data.weather[0];
  const {temp,humidity} = data.main;
  const {speed} =data.wind;
 
document.querySelector(".city").innerText = "Weather in " + name;
document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; 
document.querySelector(".description").innerText = description;
document.querySelector(".temp").innerText = temp + "°C";
document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/hr";
document.querySelector(".weather").classList.remove("loading");
document.body.stlye.backgroundImage = "url('https://unsplash.com/s/photos/" + name +"')";
},
search : function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
},
};

document.querySelector(".search button").addEventListener("click",function(){
  weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup",function(event)
     { if(event.key == "Enter"){
    weather.search();
}
});

weather.fetchWeather("chandigarh");
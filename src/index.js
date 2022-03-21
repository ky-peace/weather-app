function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatWeeklyDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function getWeeklyForecast(coordinates) {
  let apiKey = "dd66198ca4a46c65380b73f0c31de66e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#wind-speed-value").innerHTML =
    response.data.wind.speed;
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);

  getWeeklyForecast(response.data.coord);
}

function displayForecast(response) {
  let weeklyForecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");

  let forecastHTML = "";

  weeklyForecast.forEach(function (weeklyForecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="row align-middle mb-2 row-day">
        <div class="col day" align="center">
          ${formatWeeklyDays(weeklyForecastDay.dt)}
        </div>
        <div class="col forecast-emoji" align="center">
          <img src = "http://openweathermap.org/img/wn/${
            weeklyForecastDay.weather[0].icon
          }@2x.png" alt="" width="32"/>
        </div>
        <div class="col forecast-low-high" align="center">
          ${Math.round(weeklyForecastDay.temp.min)}º / ${Math.round(
          weeklyForecastDay.temp.max
        )}º
        </div>
              
        </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "dd66198ca4a46c65380b73f0c31de66e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#new-city-value").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "dd66198ca4a46c65380b73f0c31de66e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Toronto");

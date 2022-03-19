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

  celsiusTemperature = response.data.main.temp;
  celsiusMax = response.data.main.temp_max;
  celsiusMin = response.data.main.temp_min;
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

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  document.querySelector("#high").innerHTML = Math.round(
    (celsiusMax * 9) / 5 + 32
  );
  document.querySelector("#low").innerHTML = Math.round(
    (celsiusMin * 9) / 5 + 32
  );
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#high").innerHTML = Math.round(celsiusMax);
  document.querySelector("#low").innerHTML = Math.round(celsiusMin);
}

let celsiusTemperature = null;
let celsiusMax = null;
let celsiusMin = null;

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#tempc-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#tempf-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Toronto");

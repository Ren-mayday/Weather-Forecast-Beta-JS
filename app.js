window.onload = function () {
  document.querySelector("#current-date").innerHTML = formatDate(new Date());
};

function formatDate(date) {
  const currentDay = date.getDate();
  const weekNameDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const currentWeekNameDay = weekNameDays[date.getDay()];

  const currentHour = date.getHours();
  const currentMinutes = date.getMinutes();

  return `${currentWeekNameDay} ${currentDay}, ${currentHour}:${currentMinutes}`;
}

const apiKey = "38c349a49afd297ba3e65a07d11fe652";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function searchCity(e) {
  if (e.key === "Enter") {
    const city = searchBar.value.toLowerCase();
    //if (weather[city]) {
    axios
      .get(apiUrl, { params: { appid: apiKey, q: city, units: "metric" } })
      .then((json) => json.data)
      .then((data) => {
        updateCityDisplay(city);
        let temperature = Math.round(data.main.temp);
        updateNumberTemperature(temperature);
      });
  }
}

const searchBar = document.getElementById("search-input"); // devuelve un elemento HTML
searchBar.addEventListener("keydown", searchCity);

function updateCityDisplay(city) {
  const displayCity = document.getElementById("city-display");
  displayCity.innerHTML = city;
}

function updateNumberTemperature(temperature) {
  const displayTemperature = document.getElementById("temperature-display");
  displayTemperature.innerHTML = temperature;
}

const degree = document.querySelector("input[name=degree]");

/*degree.addEventListener("change", function () {
  if (this.checked) {
    let temp = 17;
    let tempFahrenheit = Math.round((temp * 9) / 5 + 32);
    updateNumberTemperature(tempFahrenheit);
  } else {
    updateNumberTemperature(17);
  }
});*/

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(success);
}

const locationBtn = document.getElementById("current-location");
locationBtn.addEventListener("click", showCurrentLocation);

function success(pos) {
  const coords = pos.coords;
  axios
    .get(apiUrl, {
      params: {
        appid: apiKey,
        lat: coords.latitude,
        lon: coords.longitude,
        units: "metric",
      },
    })
    .then((json) => json.data)
    .then((data) => {
      updateCityDisplay(data.name);
      let temperature = Math.round(data.main.temp);
      updateNumberTemperature(temperature);
    });
}

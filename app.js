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

  return `${currentWeekNameDay} ${currentDay}, ${currentHour}:${currentMinutes
    .toString()
    .padStart(2, "0")}`;
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
        console.log(data);
        const {
          temp_max: max,
          temp_min: min,
          feels_like,
          humidity,
        } = data.main;
        const { speed: windSpeed } = data.wind;
        updateMaxMin({ max, min });
        updateFeelsLike(feels_like);
        updateHumidity(humidity);
        updateWind({ windSpeed });
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
  const displayTemperature = document.getElementById("temperature-number");
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
      const { temp_max: max, temp_min: min, feels_like, humidity } = data.main;
      const { speed: windSpeed } = data.wind;
      updateMaxMin({ max, min });
      updateFeelsLike(feels_like);
      updateHumidity(humidity);
      updateWind({ windSpeed });
    });
}

function updateMaxMin({ min, max }) {
  const displayMaxMin = document.getElementById("maxMin");
  displayMaxMin.innerHTML = `Maxº ${max} / Minº ${min}`;
}

function updateFeelsLike(feelsLike) {
  const displayFeelsLike = document.getElementById("feelsLike");
  displayFeelsLike.innerHTML = `Feels Like ${feelsLike}º`;
}

function updateHumidity(humidity) {
  const displayHumidity = document.getElementById("humidity");
  displayHumidity.innerHTML = `Humidity ${humidity}%`;
}

function updateWind({ windSpeed }) {
  const displayWind = document.getElementById("wind");
  displayWind.innerHTML = `Wind ${windSpeed}km/h`;
}

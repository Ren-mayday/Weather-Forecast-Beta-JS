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

function searchCity(e) {
  if (e.key === "Enter") {
    const city = searchBar.value.toLowerCase();
    //if (weather[city]) {
    updateCityDisplay(city);
    updateNumberTemperature(17);
    //}
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

degree.addEventListener("change", function () {
  if (this.checked) {
    let temp = 17;
    let tempFahrenheit = Math.round((temp * 9) / 5 + 32);
    updateNumberTemperature(tempFahrenheit);
  } else {
    updateNumberTemperature(17);
  }
});

/*
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Sidney&units=metric";

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `It is ${temperature} degrees in Sidney`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);*/

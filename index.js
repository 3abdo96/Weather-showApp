let todayName = document.getElementById("today_date_day_name");
let todayNumber = document.getElementById("today_date_day_number");
let todayMonth = document.getElementById("today_date_month");
let todayLocation = document.getElementById("today_location");
let todayTemp = document.getElementById("today_temp");
let todayConditionImage = document.getElementById("today_condition_img");
let todayConditionText = document.getElementById("today_condition_text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind_direction");

let nextDayName = document.getElementsByClassName("next_day_name");
let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");
let nextConditionImage = document.getElementsByClassName("next_condition_img");
let nextConditionText = document.getElementsByClassName("next_condition_text");

let searchInput = document.getElementById("search");

async function getWeather(cityName) {
  let weatherData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`
  );
  let response = await weatherData.json();
  return response;
}

// display today weather

function displayTodayWeather(data) {
  let todayDate = new Date();
  let currentWeather = `
     <div
              class="d-flex justify-content-between py-2 px-3 bg-main-color text-light rounded-start"
              id="today-date"
            >
              <p id="today_date_day_name" class="my-auto">${todayDate.toLocaleDateString(
                "en-us",
                { weekday: "long" }
              )}</p>
              <span>
                <span id="today_date_day_number" class="my-auto">${todayDate.getDate()}</span>
                <span id="today_date_month" class="my-auto">${todayDate.toLocaleDateString(
                  "en-us",
                  { month: "long" }
                )}</span>
              </span>
            </div>
            <div
              class="item-content text-start px-3 py-3 pt-5 text-light"
              id="today"
            >
              <p id="today_location" class="fs-4">${data.location.name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-1 fw-bolder">
                  <span id="today_temp">${data.current.temp_c}</span>
                  <span><sup>o</sup> C</span>
                </span>
                <img id="today_condition_img" src="${
                  data.current.condition.icon
                }" alt="" />
              </div>
              <p id="today_condition_text" class="fs-6 text-light-blue">
                ${data.current.condition.text}
              </p>
            </div>
            <div class="item-footer d-flex text-light p-3">
              <div class="d-flex me-3">
                <img
                  src="images/icon-umberella.png"
                  class="footer-icons me-2"
                  alt=""
                />
                <p id="humidity">${data.current.humidity}%</p>
              </div>
              <div class="d-flex me-3">
                <img
                  src="images/icon-wind.png"
                  class="footer-icons mx-2"
                  alt=""
                />
                <p id="wind">${data.current.wind_kph} km/h</p>
              </div>
              <div class="d-flex">
                <img
                  src="images/icon-compass.png"
                  class="footer-icons mx-2"
                  alt=""
                />
                <p id="wind_direction">${data.current.wind_dir}</p>
              </div>
            </div>
    `;

  document.getElementById("todayWeather").innerHTML = currentWeather;
}
// display next days weather
function displayNextDaysWeather(data) {
  let todayDate = data.forecast.forecastday;
  let weatherData = ``;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(todayDate[i + 1].date);
    nextMaxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
    nextConditionImage[i].innerHTML =
      data.forecast.forecastday[i + 1].day.condition.icon;
    nextConditionText[i].innerHTML =
      data.forecast.forecastday[i + 1].day.condition.text;

    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
  }
}
// start the Application
async function startApp(city = "cairo") {
  let weatherData = await getWeather(city);

  if (!weatherData.error) {
    displayTodayWeather(weatherData);
    displayNextDaysWeather(weatherData);
  }
}

startApp();

searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});

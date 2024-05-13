const URL_BASE = `https://api.openweathermap.org/data/2.5/weather`;
const OPENWEATHER_API_KEY = ""; //Space to enter your API KEY from https://openweathermap.org/

document.getElementById("search-button").addEventListener("click", () => {
  const cityInputValue = document.getElementById("city-input").value;
  if (cityInputValue) {
    fetchApiWeather(cityInputValue);
  } else {
    alert("Invalid city");
  }
});

function fetchApiWeather(city) {
  fetch(`${URL_BASE}?q=${city}&appid=${OPENWEATHER_API_KEY}`)
    .then((data) => data.json())
    .then((data) => showApiData(data));
}

function showApiData(data) {
  const dataContainerEl = document.getElementById("api-data");
  dataContainerEl.innerHTML = "";

  const cityName = data.name;
  const countryName = data.sys.country;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  const diffKelvin = 273.15;

  const cityInfo = document.createElement("h2");
  cityInfo.textContent = `${cityName}, ${countryName}`;

  const tempInfo = document.createElement("p");
  tempInfo.textContent = `Temperature:  ${Math.floor(temp - diffKelvin)}ºC`;

  const humidityInfo = document.createElement("p");
  humidityInfo.textContent = `Humidity: ${humidity}%`;

  const icoInfo = document.createElement("img");
  icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  icoInfo.classList.add("icon");

  const descriptionInfo = document.createElement("p");
  descriptionInfo.textContent = `Aditional info: ${description}`;

  dataContainerEl.appendChild(cityInfo);
  dataContainerEl.appendChild(tempInfo);
  dataContainerEl.appendChild(humidityInfo);
  dataContainerEl.appendChild(icoInfo);
  dataContainerEl.appendChild(descriptionInfo);
}

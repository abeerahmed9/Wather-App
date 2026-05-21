const apiKey = "4c02b1f24b10d978f46a615acb11d731";

// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const weatherIcon = document.getElementById("weatherIcon");
const date = document.getElementById("date");

async function getWeather(cityName) {
  try {
    if (!cityName) return;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "City not found");
      return;
    }

    if (!data || !data.main) {
      alert("Invalid weather data");
      return;
    }

    // Update UI
    temperature.innerHTML = `${Math.round(data.main.temp)}°`;
    condition.innerHTML = data.weather[0].main;
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    humidity.innerHTML = `${data.main.humidity}%`;

    // FIXED WIND SPEED
    wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    feelsLike.innerHTML = `${Math.round(data.main.feels_like)}°`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
    visibility.innerHTML = `${(data.visibility / 1000).toFixed(1)} km`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    sunrise.innerHTML = sunriseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    date.innerHTML = new Date().toDateString();
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Check internet or API key.");
  }
}

// Button click
searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    alert("Please enter a city name");
    return;
  }

  getWeather(cityName);
});

// Enter key
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const cityName = cityInput.value.trim();

    if (!cityName) {
      alert("Please enter a city name");
      return;
    }

    getWeather(cityName);
  }
});

// Default city
getWeather("Karachi");
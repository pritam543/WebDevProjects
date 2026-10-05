const cityInput = document.getElementById("cityInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const weatherContent = document.getElementById("weatherContent");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const weatherIconEl = document.getElementById("weatherIcon");
const conditionEl = document.getElementById("condition");
const windSpeedEl = document.getElementById("windSpeed");
const humidityEl = document.getElementById("humidity");

function getWeatherDescription(code) {
    if (code === 0) return { desc: "Clear Sky", icon: "☀️" };
    if ([1, 2, 3].includes(code)) return { desc: "Partly Cloudy", icon: "⛅" };
    if ([45, 48].includes(code)) return { desc: "Foggy", icon: "🌫️" };
    if ([51, 53, 55, 61, 63, 65].includes(code)) return { desc: "Rainy", icon: "🌧️" };
    if ([71, 73, 75, 77].includes(code)) return { desc: "Snowy", icon: "❄️" };
    if ([95, 96, 99].includes(code)) return { desc: "Thunderstorm", icon: "⛈️" };
    return { desc: "Overcast", icon: "☁️" };
}

async function fetchWeather(city) {
    loadingEl.classList.remove("hidden");
    errorEl.classList.add("hidden");
    weatherContent.classList.add("hidden");

    try {
        // Step 1: Geocoding lookup
        const geoRes = await fetch(`[https://geocoding-api.open-meteo.com/v1/search?name=$](https://geocoding-api.open-meteo.com/v1/search?name=$){encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Forecast weather data
        const weatherRes = await fetch(`[https://api.open-meteo.com/v1/forecast?latitude=$](https://api.open-meteo.com/v1/forecast?latitude=$){latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        const weatherData = await weatherRes.json();

        const current = weatherData.current;
        const weatherMeta = getWeatherDescription(current.weather_code);

        cityNameEl.textContent = `${name}, ${country}`;
        tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
        weatherIconEl.textContent = weatherMeta.icon;
        conditionEl.textContent = weatherMeta.desc;
        windSpeedEl.textContent = `${current.wind_speed_10m} km/h`;
        humidityEl.textContent = `${current.relative_humidity_2m}%`;

        loadingEl.classList.add("hidden");
        weatherContent.classList.remove("hidden");
    } catch (err) {
        loadingEl.classList.add("hidden");
        errorEl.classList.remove("hidden");
    }
}

function handleSearch(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
}

// Default search on first load
fetchWeather("Indore");
const apiKey = "bd5e378503939ddaee76f12ad7a97608";  // Replace with your OpenWeather API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    document.getElementById("errorMessage").classList.add("hidden");

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    document.getElementById("weatherInfo").classList.remove("hidden");
}

function displayError(message) {
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorMessage").classList.remove("hidden");
    document.getElementById("weatherInfo").classList.add("hidden");
}
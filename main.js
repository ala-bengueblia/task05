document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    getWeatherData(location);
});

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

function getWeatherData(location) {
    const apiKey = '5e1c62e2b3ee52a78e921762b0183df4'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function getWeatherDataByCoords(lat, lon) {
    const apiKey = '5e1c62e2b3ee52a78e921762b0183df4'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeatherData(data) {
    const locationName = data.name;
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;

    document.getElementById('locationName').innerText = locationName;
    document.getElementById('weatherDescription').innerText = weatherDescription;
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
}

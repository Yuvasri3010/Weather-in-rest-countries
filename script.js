document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');

    // Fetch Rest Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const card = createCard(country);
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching Rest Countries API:', error));
});

function createCard(country) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';

    card.innerHTML = `
        <div class="card">
            <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Capital: ${country.capital[0]}</p>
                <p class="card-text">Region: ${country.region}</p>
                <p class="card-text">Country Codes: ${country.cca2}, ${country.cca3}</p>
                <p class="card-text">LatLng: ${country.latlng.join(', ')}</p>
                <button class="btn btn-primary" onclick="fetchWeather('${country.name.common}')">Get Weather</button>
            </div>
        </div>
    `;

    return card;
}

function fetchWeather(countryName) {
    // Fetch OpenWeatherMap API using the country name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_OPENWEATHERMAP_API_KEY`)
        .then(response => response.json())
        .then(weatherData => {
            // Process weather data as needed
            if (weatherData.weather && weatherData.weather.length > 0) {
                const description = weatherData.weather[0].description;
                alert(`Current weather in ${countryName}: ${description}`);
            } else {
                alert(`Weather information not available for ${countryName}`);
            }
        })
        
        .catch(error => console.error('Error fetching OpenWeatherMap API:', error));
}
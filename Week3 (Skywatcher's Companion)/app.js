const API_KEY = '939afd3f6126841a98253e3bf7a1b91a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to convert Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
}

// Function to update UI elements
function updateUI(data) {
    document.getElementById('temp').textContent = `${data.temp}°F`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('conditions').textContent = data.conditions;
    document.getElementById('wind').textContent = `${data.wind} mph`;

    // Update background based on conditions
    const container = document.getElementById('weatherContainer');
    container.className = 'container ' + data.conditions.toLowerCase();
}

// Function to process API response
function processWeatherData(weatherData) {
    return {
        temp: kelvinToFahrenheit(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        conditions: weatherData.weather[0].main,
        wind: Math.round(weatherData.wind.speed)
    };
}

// Function to fetch and display weather
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Show loading state
        const container = document.getElementById('weatherContainer');
        container.style.opacity = '0.7';
        
        // Log the URL we're fetching (remove this in production)
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
        console.log('Fetching from:', url);
        
        // Fetch weather data from API
        const response = await fetch(url);
        
        // Log the response status
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            
            throw new Error(response.status === 404 
                ? 'City not found! Please check the spelling and try again.'
                : `Error: ${errorData.message || 'Unknown error'}`
            );
        }

        const weatherData = await response.json();
        console.log('Weather data:', weatherData);
        
        const processedData = processWeatherData(weatherData);
        updateUI(processedData);

    } catch (error) {
        console.error('Detailed error:', error);
        alert(error.message || 'Error fetching weather data');
    } finally {
        // Reset loading state
        const container = document.getElementById('weatherContainer');
        container.style.opacity = '1';
    }
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Initialize with default city
window.addEventListener('load', () => {
    document.getElementById('cityInput').value = 'New York';
    getWeather();
});
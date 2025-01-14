// index.js
require('dotenv').config(); 

const apiKey = process.env.API_KEY;
console.log(apiKey)

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
function fetchWeatherData(city) {
    
    // - Use fetch() to retrieve data from the OpenWeather API
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}}`)
    // - Handle the API response and parse the JSON
        .then(response => response.json())
    // - Log the data to the console for testing
        .then(locationData => {
            if(locationData.length === 0) {
                const errorMessage = 'City not found';
                console.error(errorMessage);
                displayError(errorMessage)
            }

            const { lat, lon} = locationData[0];
            console.log(`Coordinates for ${city}: `, lat, lon);

            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        })
        .then(response => response.json())
        .then(weatherData => {
            console.log('Weather Data:', weatherData);
            displayWeather(weatherData);
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
function displayWeather(data) {
    //Clear out error message if any
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = '';

    //Grab weather-display Div
    const weatherDisplay = document.getElementById('weather-display');
    
    //Clear the DOM to remove the previous city's info
    weatherDisplay.innerHTML = '';

    // - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
    //Create temperature p tag, add textContent, and append to weatherDisplay
    const cityName = document.createElement('h3');
    cityName.textContent = data.name;
    weatherDisplay.append(cityName);

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${Math.floor(data.main.temp)}°F`;
    weatherDisplay.append(temperature);

    //Create humidity p tag, add textContent, and append to weatherDisplay
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDisplay.append(humidity);

    //Create description p tag, add textContent, and append to weatherDisplay
    const description = document.createElement('p');
    description.textContent = `Current Forecast: ${data.weather[0].description}`;
    weatherDisplay.append(description);
}


// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
const button = document.getElementById('fetch-weather');
button.addEventListener('click', () => {
    const cityInput = document.getElementById('city-input');
    // - Retrieve the value from the input field
    const city = cityInput.value;
    // - Call `fetchWeatherData(city)` with the user-provided city name
    fetchWeatherData(city);

    cityInput.value = '';

    
})

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    errorMessage.append(messageElement);

}
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process

const axios = require("axios");
const apiKey = "982a49ea08ff83f4f2daffba238b5f9c";
const city = process.argv[2];
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

axios.get(url).then(response => {
    console.log(`It is now ${response.data.main.temp}°C in ${city}, ${response.data.sys.country}`);
    console.log(`The current weather conditions are: ${response.data.weather[0].description}`)
})
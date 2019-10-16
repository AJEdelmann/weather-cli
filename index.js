const axios = require("axios");
const apiKey = "982a49ea08ff83f4f2daffba238b5f9c";
const city = process.argv[2];
const urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`;

getWeather = async () => {
    return await axios.get(urlWeather)
};

getForecast = async () => {
    return await axios.get(urlForecast)
};

axios.all([getWeather(), getForecast()])
    .then(
        axios.spread((weather, forecast) => {
            let country = weather.data.sys.country,
                list = forecast.data.list,
                dateArr = [],
                forecastArr = [],
                descriptionArr = [],
                dateConvertArr = [],
                celsiusToFahrenheitArr = [];

            // This loop iterates through list array to gather current data and 5 days forecast 
            for (let i = 0; i < list.length; i += 8) {
                dateArr.push(new Date(list[i].dt * 1000));
                forecastArr.push(Math.trunc(list[i].main.temp));
                descriptionArr.push(list[i].weather[0].description)
            }

            // Convert Celsius to Fahrenheit function
            forecastArr.forEach(el => {
                celsiusToFahrenheitArr.push(Math.trunc(el * 9 / 5 + 32))
            });

            // Change date to the following format DD-MM-YYYY
            dateArr.forEach(el => dateConvertArr
                .push(el.getDate() + "-" + (el.getMonth() + 1) + "-" + el.getFullYear()));

            console.log(`==============
${city}, ${country}`)
            console.log(
                `==============
Date: ${dateConvertArr[0]} => Current temperature: ${forecastArr[0]}°C / ${celsiusToFahrenheitArr[0]}°F => ${descriptionArr[0]}
--------------------------------------------------------------------
Date: ${dateConvertArr[1]} => Forecast: ${forecastArr[1]}°C / ${celsiusToFahrenheitArr[1]}°F => ${descriptionArr[0]}
--------------------------------------------------------------------
Date: ${dateConvertArr[2]} => Forecast: ${forecastArr[2]}°C / ${celsiusToFahrenheitArr[2]}°F => ${descriptionArr[2]}
--------------------------------------------------------------------
Date: ${dateConvertArr[3]} => Forecast: ${forecastArr[3]}°C / ${celsiusToFahrenheitArr[3]}°F => ${descriptionArr[3]}
--------------------------------------------------------------------
Date: ${dateConvertArr[4]} => Forecast: ${forecastArr[4]}°C / ${celsiusToFahrenheitArr[4]}°F => ${descriptionArr[4]}
********************************************************************`);
        })

    ).catch(e => {
        console.log(`There is an error on your code!!`)
    });
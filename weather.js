export const loadData = async (city, date) => {

   try {
    const coordinates = await geoCode(city);
    console.log(coordinates[0].lat, coordinates[0].lon);
    console.log(coordinates)
    const cityForecast = await getCityForecast(coordinates);
    console.log(cityForecast);
    console.log(typeof(cityForecast));
    const weatherInfoByDate = await getWeatherInfoByDate(cityForecast, date);
    console.log(weatherInfoByDate);
    return weatherInfoByDate;
   }
          
    catch (e) {
        console.error('Error loading weather data', e);
        throw e;
    }
    
}

async function geoCode(city) {
    const apiKey ='1e8721162eb0b30adfd50aad1ff47818';
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    if (response.status !== 200) {
        throw 'Error geocode city';
    }
    const jsonResponse = await response.json();
    return jsonResponse;
    // console.log(jsonResponse);
    // const lat = jsonResponse[0].lat;
    // const lon = jsonResponse[0].lon;
    // weatherInfo(lat,lon)
}



async function getCityForecast(coordinates) {
    const apiKey ='1e8721162eb0b30adfd50aad1ff47818';
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=${apiKey}&units=metric`);
    if (response.status !== 200) {
        throw 'Error loading weather info for city';
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  
}

async function getWeatherInfoByDate(cityForecast, date) {
    const newArr = cityForecast.list;
    const result = newArr.find(element => element.dt_txt === `${date} 00:00:00`);
    return result;

}


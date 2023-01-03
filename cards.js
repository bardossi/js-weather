export const addCard = (city, date, weatherData) => {
    const container = document.getElementById('cards-container');
    const weatherState = weatherData.weather[0].main;
    const minTemp = Math.round(weatherData.main.temp_min);
    const maxTemp = Math.round(weatherData.main.temp_max);
    const icon = weatherData.weather[0].icon;
    container.insertAdjacentHTML('afterbegin', `
    <zizi-card title="${city} - ${date}">
   
    <div class="card-content">
        <div>${maxTemp}℃</div>
        <div class="weather-icon"><img src="https://www.sunny-studio.hu/weathericons/${icon}.png" /></div>
        <div>${minTemp}℃</div>
        <button id="deleteCard">Törlés</button>
    </div>
    </zizi-card>
    `);
    document.querySelector('#deleteCard')
    .addEventListener('click', e => e.target.closest('zizi-card').remove())
}
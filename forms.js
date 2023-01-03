import { addCard } from "./cards.js";
import { loadData } from "./weather.js";


export const initForm = () => {
    const datePicker = document.getElementById('date-input');
    // const form = document.getElementById('form');
    // minimum dátum a mai nap
    const cardsContainer = document.getElementById('cards-container');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    datePicker.min = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    
    // maximum dátum a mai + 5 nap
    const maxDate = now;
    maxDate.setDate(now.getDate() + 5);
    const maxDateYear = maxDate.getFullYear();
    const maxDateMonth = maxDate.getMonth() + 1;
    const maxDateDay = maxDate.getDate();
    datePicker.max = `${maxDateYear}-${maxDateMonth < 10 ? `0${maxDateMonth}` : maxDateMonth}-${maxDateDay < 10 ? `0${maxDateDay}` : maxDateDay}`;


    console.log(datePicker.max);
    console.log(datePicker.min);
    form.addEventListener('submit', async e => {
        const city = document.getElementById('city-input').value;
        const date = document.getElementById('date-input').value;
        console.log(city, date)
        // loading start
       cardsContainer.insertAdjacentHTML('afterbegin', ` <div class="loader" id="loading-indicator"</div>`)
        submitButton.disabled = true;
        e.preventDefault();
        try {
            const weatherData = await loadData(city, date);
            addCard(city, date, weatherData);
            form.reset();
        }
        catch {
            errorMessage.style.display = 'block';
            setTimeout(() => errorMessage.style.display = 'none', 2000);
        }
       submitButton.disabled = false;
        // loading stop
        cardsContainer.removeChild(document.getElementById('loading-indicator'));
       
    })
}
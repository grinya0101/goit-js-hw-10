import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300; 


const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector("ul");
const divEl = document.querySelector("div")




inputEl.addEventListener('input', debounce(onHandleInputEl, DEBOUNCE_DELAY));

function onHandleInputEl() {
    const getCountries = inputEl.value.trim();
   
      if (!getCountries) {
    resetMarkup();
    
    return ;
  }

  fetchCountries(getCountries)
    .then(createListItem)
    .catch(error =>
      Notiflix.Notify.failure('Упс, страны с таким названием не существует.')
    );

}
function createListItem(countries) {
    if (countries.length > 10) {
      resetMarkup();
      
      Notiflix.Notify.info(
        'Найдено слишком много совпадений. Пожалуйста, введите более конкретное имя.'
      );
    }
  
    if (countries.length >= 2 && countries.length < 10) {
      const createListCountries = countries
        .map(({ name, flags }) => {
          return `
          <li> 
            <img src = ${flags.svg} 
                alt = "Country flag" 
                width = 100>
            <span>${name.official}</span>
          </li>`;
        })
        .join('');
      listEl.innerHTML = createListCountries;
      divEl.innerHTML = '';
    }
    if (countries.length === 1) {
      const createCountryContainer = countries
        .map(({ name, capital, population, flags, languages }) => {
          return `
          <h1 class="title-country"> 
            <img src = ${flags.svg} 
                alt = "flag of country" 
                width = 500>
                <br>
                <span class= "title-text">${name.official}</span>
            </h1>
        <p class ="text"><b>Capital</b>: ${capital}</p>
        <p class ="text"><b>Population</b>: ${population}</p>
        <p class ="text"><b>Languages</b>: ${Object.values(languages).join(
          ', '
        )}</p> `;
        })
        .join('');

      listEl.innerHTML = '';
      divEl.innerHTML = createCountryContainer;
    }
  }
  
  function resetMarkup() {
    listEl.innerHTML = '';
    divEl.innerHTML = '';
  }
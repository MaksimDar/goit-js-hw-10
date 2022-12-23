import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(inputCountryName, DEBOUNCE_DELAY));
function inputCountryName(event) {
  countryInformation.innerHTML = '';
  const countryName = event.target.value.trim();
  if (countryName) {
    fetchCountries(countryName).then(countryCharacteristics).catch(error);
  }
}

function countryCharacteristics([
  { flags, name, capital, population, languages },
]) {
  const template = `
      <div class='main-info'>
         <img src="${flags.svg}"
              alt="Flag of Ukraine"
              class="country-flag"
              width="40px"
      />
         <h1 class="country-name">${name.common}</h1>
      </div>
      
      <p><b>Capital: </b>${capital}</p>
      <p><b>Population: </b>${population}</p>
      <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;

  console.log(template);

  countryInformation.innerHTML = template;
}

function error() {
  (countryInformation.innerHTML = ''),
    Notify.info('Oops, there is no country with that name');
}

function checkCountriesData(countryData) {
  if (countryData < 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

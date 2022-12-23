import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInformation = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  nothing();

  const country = e.target.value.trim();
  if (country) {
    fetchCountries(country).then(showData).catch(error);
  }
}

function showData(data) {
  if (data.length > 10) {
    nothing();
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'right-top',
    });
    return;
  } else if (data.length === 1) {
    searchOneCountry(data);
    return;
  }

  searchNumerousCountries(data);
}

function searchOneCountry([{ flags, name, capital, population, languages }]) {
  const info = `
      <div class='info'>
         <img src="${flags.svg}"
              alt="Flag of Ukraine"
              width="50px"
      />
         <h1 class="name">${name.common}</h1>
      </div>

      <p><b>Capital: </b>${capital}</p>
      <p><b>Population: </b>${population}</p>
      <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;

  console.log(info);

  countryInformation.innerHTML = info;
}

function searchNumerousCountries(countries) {
  const list = countries
    .map(({ flags, name }) => {
      return `<li class="country-item">
        <img src="${flags.svg}"
          alt="Flag of ${name}"
          width="40px"/>
          <p class="name">${name.common}</p>
              </li>`;
    })
    .join('');

  console.log(list);

  countryInformation.innerHTML = list;
}

function error() {
  nothing();
  Notify.failure('Oops, there is no country with that name');
  return;
}

function nothing() {
  countryInformation.innerHTML = '';
}

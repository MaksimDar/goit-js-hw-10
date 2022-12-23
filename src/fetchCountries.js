const endPoint = 'https://restcountries.com/v3.1/name/';
const nextFields = '?fields=name,capital,flags,languages,population';

export function fetchCountries(name) {
  const URL_API = '${endPoint}${name}${nextFields}';
  fetch(URL_API).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json;
  });
}

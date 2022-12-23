export function fetchCountries(name) {
  const URL_API = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`;
  return fetch(URL_API).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

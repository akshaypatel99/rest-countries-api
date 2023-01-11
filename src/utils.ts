// Utils
const baseURL = 'https://restcountries.com/v3.1'
export const allCountriesURL = `${baseURL}/all`;
export const countryURL = `${baseURL}/alpha`

export async function getCountries() {
  const response = await fetch(allCountriesURL, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getCountry(id: string) {
  const response = await fetch(`${countryURL}/${id}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

interface LanguageObject { [key: string]: string };

export type Country = {
  name: {
    common: string,
    official: string,
    nativeName: {
      official: string
    }
  },
  cca3: string,
  population: number,
  region: string,
  subregion: string,
  capital: [string],
  tld: [string],
  currencies: {
    [key: string]: {
      name: string
    }
  },
  languages: LanguageObject,
  flags: {
    png: string,
    svg: string
  },
  borders: [string]
}
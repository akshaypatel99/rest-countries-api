import * as countries from 'i18n-iso-countries';
import * as countriesEN from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(countriesEN);

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
interface NativeNameObject { [key: string]: {
  official: string,
  common: string
}
};

interface CurrencyObject {
  [key: string]: {
    name: string,
    symbol: string
}}

export type Country = {
  name: {
    common: string,
    official: string,
    nativeName: NativeNameObject
  },
  cca3: string,
  population: number,
  region: string,
  subregion: string,
  capital: [string],
  tld: [string],
  currencies: CurrencyObject,
  languages: LanguageObject,
  flags: {
    png: string,
    svg: string
  },
  borders: [string]
}

export function formatPopulation(population: number): string {
  return new Intl.NumberFormat('en-GB').format(population);
}

export function formatCurrencies(currency: CurrencyObject) {
  return currency[Object.keys(currency)[0]].name;
}

export function formatLanguages(languages: LanguageObject) {
  let languageArray = [];
  for (let key in languages) {
    languageArray.push(languages[key])
  }
  return languageArray;
}

export function formatBorderNames(borders: [string]): string[][] {
  let result = borders.map(border => [border, countries.getName(border, "en", { select: "alias" }) ?? border])
  return result;
}
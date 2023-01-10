// Utils
export const apiURL = 'https://restcountries.com/v3.1/all';

export const getCountries = async () => {
  return await fetch(apiURL).then(res => res.json())
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
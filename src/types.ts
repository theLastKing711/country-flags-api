export interface ICountry {
    alpha2Code: string;
    population: number;
    capital: string;
    region: string;
    flag: "flag";
    name: string;
}


export interface ICountryDetails {
    name: string;
    nativeName: string;
    population: string;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string;
    languages: string[];
    borderCountries: string[];
    flag: string;
    currencies: string[];
}

export interface IResponseCountryDetails {
    name: string;
    topLevelDomain: string[];
    population: string;
    flag: string;
    region: string;
    subregion: string;
    capital: string;
    languages: {name: string}[];
    borders?: string[];
    currencies: {code: string, name: string, symbol: string}[]
}

export enum ActiveTheme {
    Light = "Light",
    Dark = "Dark"
}

// export enum Region  {
    // Africa = "Africa",
    // Asia = "Asia",
    // Europe = "Europe",
    // America = "America"
// }
// 
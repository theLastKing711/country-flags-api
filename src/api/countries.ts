import { ICountry, ICountryDetails, IResponseCountryDetails } from './../types';
import axios from "axios"


export class CountriesApi {


    static apiUrl: string = "https://restcountries.com/v2";

    static regions = [ 
        {id: 0, name: "Africa", value: "Africa" },
        {id: 1,name: "America", value: "Americas"}, 
        {id: 2,name: "Asia", value: "Asia"},
        {id: 3 ,name: "Europe", value : "Europe"},
        {id: 4,name: "Oceania", value :"Oceania"} 
     ]

    static getCountries = async (region: string) => {
        console.log("second", region)

        const countriesApiUrl = region ? `${CountriesApi.apiUrl}/region/${region}` : `${CountriesApi.apiUrl}/all`;
        
        const { data } =  await axios.get(countriesApiUrl)
        return data as ICountry[];
    }

    static getCountryByName = async (name: string) => {

        const countryApiUrl = `${CountriesApi.apiUrl}/name/${name}`

        const { data } = await axios.get(countryApiUrl) ;
        
        const countryDto: ICountryDetails = CountriesApi.transformResponseToDto(data[0] as IResponseCountryDetails);

        return countryDto;
        
        
    }

    static filterCountries = (list: ICountry[], query: string): ICountry[] =>
    {
        const filterdList = list.filter(x => ! x || x.name.toLowerCase().includes(query.toLowerCase())) 
        return filterdList;
    }

    static transformResponseToDto = (countryResponse: IResponseCountryDetails): ICountryDetails => {

        const countryDetailsDto: ICountryDetails = 
            {           name: countryResponse.name,
                        nativeName: countryResponse.name,
                        capital: countryResponse.capital,
                        flag: countryResponse.flag,
                        population: countryResponse.population,
                        region: countryResponse.region,
                        subregion: countryResponse.subregion,
                        languages: countryResponse.languages.map(x => x.name),
                        borderCountries: [...countryResponse.borders??  []],
                        topLevelDomain: countryResponse.topLevelDomain[0],
                        currencies: countryResponse.currencies.map(x => x.name)
            }
        

        return countryDetailsDto;
    }

    
}
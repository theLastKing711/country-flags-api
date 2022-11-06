import { ActiveTheme } from './../types';

export class ThemeStorageService {


    static setItem<T>(key: string, value: T): T {
        localStorage.setItem(key, JSON.stringify(value))

        return value; 
        
    }

    static getItem(key: string): ActiveTheme{

        const value: string | null = localStorage.getItem(key) 

        if(value)
        {
            return JSON.parse(value)
        }
        else {
            return ActiveTheme.Light
        }
    }

}
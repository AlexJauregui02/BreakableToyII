
import { getCityNameFromIataCode } from "@/api/services/flightSearchService";
import type { apiResponse } from "@/types/apiResponse";
import type { IataCodeCitySearchResponse } from "@/types/iataCodeSearch";
import { createContext, useContext, useRef, type ReactNode } from "react"

type IataCache = Map<string, string>;

type IataContextType = {
    getCityName: (iataCode: string) => Promise<string>;
}

const IataCodeContext = createContext<IataContextType | undefined>(undefined);


export const IataCodeProvider = ({ children }: { children: ReactNode }) => {
    const cache = useRef<IataCache>(new Map());

    const getCityName = async (iataCode: string): Promise<string> => {
        // See in localstorage
        const local = localStorage.getItem(`iata:${iataCode}`);
        if (local) {
        console.log(`Found in localStorage: ${iataCode} -> ${local}`);
        return local;
        }

        // See in cache
        const cached = cache.current.get(iataCode);
        if (cached) {
        console.log(`✔️ Found in memory cache: ${iataCode} -> ${cached}`);
        return cached;
        }

        // Call to the api
        try {
            const res = await getCityNameFromIataCode(iataCode) as apiResponse<IataCodeCitySearchResponse>;
            console.log(res.data[0].name);
            const name = res.data[0]?.name || iataCode;

            cache.current.set(iataCode, name);
            localStorage.setItem(`iata:${iataCode}`, name);
            
        } catch (error) {
            console.error('Fallo al obtener ciudad para', iataCode, error);
        }

        return ''
    }

    return (
        <IataCodeContext.Provider value={{ getCityName}}>
            {children}
        </IataCodeContext.Provider>
    )
}

export const useIataCode = () => {
    const context = useContext(IataCodeContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
}
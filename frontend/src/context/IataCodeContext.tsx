
import { createContext, useContext, useState, type ReactNode } from "react"

type IataCache = Map<string, string>;

type IataContextType = {
    getCityName: (iataCode: string) => Promise<string>;
}

const IataCodeContext = createContext<IataContextType | undefined>(undefined);


export const FlightResultsProvider = ({ children }: { children: ReactNode }) => {
    const [cache] = useState<IataCache>(new Map());

    const getCityName = async (iataCode: string): Promise<string> => {
        const cached = cache.get(iataCode);
        if(cached) return cached;

        return ''
    }
}

export const useIataCode = () => {
    const context = useContext(IataCodeContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
}
import type { FlightOffersResponse, FlightOffersContextType } from "@/types/flightSearch"
import { createContext, useContext, useState, type ReactNode } from "react"


const FlightOffersContext = createContext<FlightOffersContextType | undefined>(undefined);

export const FlightResultsProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResultsState] = useState<FlightOffersResponse | null>(null);

    const setResults = (data: FlightOffersResponse) => { setResultsState(data) }
    const clearResults = () => setResultsState(null);

    return (
        <FlightOffersContext.Provider value={{ results, setResults, clearResults }}>
            {children}
        </FlightOffersContext.Provider>
    )
}

export const useFlightOffersResponse = (): FlightOffersContextType => {
    const context = useContext(FlightOffersContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
}


import type { flightOfferResponse, SortOrder } from "@/types/flightSearch";
import { useState } from "react";
import { Button } from "../../UI/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select/select";

import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { getFlightOffers } from "@/api/services/flightSearchService";
import type { apiResponse } from "@/types/apiResponse";


export function SortControls() {
    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [loading, setLoading] = useState<boolean>(false);
    const { searchParams, setResults } = useFlightOffersResponse();

    const onApplySort = async () => {
        if (!searchParams) return;

        setLoading(true);

        const paramsWithSort = {
            ...searchParams,
            sortBy: sortBy,
            sortOrder: sortOrder,
        };

        const newQuery = await getFlightOffers(paramsWithSort) as apiResponse<flightOfferResponse>;

        setResults({ ...newQuery });
        
        setLoading(false);
    };

    return (
        <div className="flex gap-2 items-center justify-end w-full">
            <Select onValueChange={(value) => setSortBy(value)} defaultValue="price">
                <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Order by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="price,duration">Both</SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
                {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>

            <Button onClick={onApplySort} disabled={loading}>Apply</Button>
        </div>
    );
}
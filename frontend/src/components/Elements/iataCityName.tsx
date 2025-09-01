import { useEffect, useState } from "react";
import { getCityNameFromIataCode } from "@/api/services/flightSearchService";
import type { apiResponse } from "@/types/apiResponse";
import type { IataCodeAirportSearchResponse } from "@/types/iataCodeSearch";


const memoryCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

const retriedCodes = new Set<string>();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface Props {
  code?: string;
}

export function IataCityName({ code }: Props) {
  const [cityName, setCityName] = useState<string>("");

  useEffect(() => {
    if (!code) return;

    const iataCode = code.toUpperCase();
    const storageKey = `iata:${iataCode}`;

    if (memoryCache.has(iataCode)) {
      setCityName(memoryCache.get(iataCode)!);
      return;
    }

    const cached = localStorage.getItem(storageKey);
    if (cached !== null) {
      memoryCache.set(iataCode, cached);
      setCityName(cached);
      return;
    }

    if (pendingRequests.has(iataCode)) {
      pendingRequests.get(iataCode)!.then(setCityName);
      return;
    }

    const fetchCity = async (retry = false): Promise<string> => {
      const promise = getCityNameFromIataCode(iataCode)
        .then((res) => {
          const result = (res as apiResponse<IataCodeAirportSearchResponse>).data.find(
            (item) => item.iataCode.toUpperCase() === iataCode
          );

          const name = result?.name ?? '';

          if (!name && !retry && !retriedCodes.has(iataCode)) {
            retriedCodes.add(iataCode);
            pendingRequests.delete(iataCode);
            delay(1000);
            return fetchCity(true);
          }

          memoryCache.set(iataCode, name);
          localStorage.setItem(storageKey, name);

          return name;
        })
        .catch((err) => {
          console.error('Error fetching IATA name', err, iataCode);

          memoryCache.set(iataCode, '');
          localStorage.setItem(storageKey, '');

          return '';
        })
        .finally(() => {
          pendingRequests.delete(iataCode);
        });

      pendingRequests.set(iataCode, promise);
      const name = await promise;
      setCityName(name);
      return name;
    };

    fetchCity();

  }, [code]);

  return <span>{cityName}</span>;
}



import { useEffect, useState } from "react";
import { getAirlineNameFromIataCode } from "@/api/services/flightSearchService";


const memoryCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();
const retriedCodes = new Set<string>();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface Props {
  code?: string;
}

export function IataAirlineName({ code }: Props) {
  const [airlineName, setAirlineName] = useState<string>("");

  useEffect(() => {
    if (!code) return;

    const iataCode = code.toUpperCase();
    const storageKey = `airline:${iataCode}`;

    if (memoryCache.has(iataCode)) {
      setAirlineName(memoryCache.get(iataCode)!);
      return;
    }

    const cached = localStorage.getItem(storageKey);
    if (cached !== null) {
      memoryCache.set(iataCode, cached);
      setAirlineName(cached);
      return;
    }

    if (pendingRequests.has(iataCode)) {
      pendingRequests.get(iataCode)!.then(setAirlineName);
      return;
    }

    const fetchAirline = async (retry = false): Promise<string> => {
      const promise = getAirlineNameFromIataCode(iataCode)
        .then(async (res) => {
          const name = res?.data?.[0]?.businessName ?? '';

          if (!name && !retry && !retriedCodes.has(iataCode)) {
            retriedCodes.add(iataCode);
            pendingRequests.delete(iataCode);
            await delay(1000);
            return fetchAirline(true);
          }

          memoryCache.set(iataCode, name);
          localStorage.setItem(storageKey, name);
          return name;
        })
        .catch((err) => {
          console.error('Error fetching airline name', err, iataCode);
          memoryCache.set(iataCode, '');
          localStorage.setItem(storageKey, '');
          return '';
        })
        .finally(() => {
          pendingRequests.delete(iataCode);
        });

      pendingRequests.set(iataCode, promise);
      const name = await promise;
      setAirlineName(name);
      return name;
    };

    fetchAirline();

  }, [code]);

  return <span>{airlineName}</span>;
}


import { Button } from '@/components/UI/button/button';
import { Card } from '@/components/UI/card/card';
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDuration } from '@/lib/utils';


function handleNumberstops(numberStops: number | undefined): string {

    let numberOfStops;
    if (numberStops == 0) { numberOfStops = 'Nonstop'}
    else if (numberStops == 1) { numberOfStops = '1 Stop'}
    else { numberOfStops = numberOfStops + 'Stops'};

    return numberOfStops;
}

export default function ResultsPage() {
    const navigate = useNavigate();
    const { results, clearResults } = useFlightOffersResponse();

    console.log(JSON.stringify(results?.data[0], null, 1));

    useEffect(() => {
        if(!results) {
            navigate('/');
        }
    }, [results, navigate])

    if (!results) return null;

    const handleReturnToSearchPage = () => {
        clearResults();
        navigate('/');
    }

    const handleDetailsPage = (flightOfferIDSelected: string) => {
        navigate(`/results/${flightOfferIDSelected}`);
    }

    return (
        <div className='h-full py-5 space-y-5'>
            <div className='text-md'>
                <Button
                    type='submit'
                    className='w-1/5'
                    onClick={handleReturnToSearchPage}
                >
                    Return to search
                </Button>
            </div>
            <div className='border h-[95%] overflow-y-auto inset-shadow-sm p-2 bg-gray-50'>
                {
                    results.data.map(item =>
                        <Card onClick={() => handleDetailsPage(item.id)} className='m-4 p-0 text-sm hover:shadow-xl transition-shadow'>
                            {
                                item.itineraries?.map(itinerary =>
                                    <div className='flex w-full'>
                                        <div className='w-[80%]'>
                                        {
                                            itinerary.segments.map(segment => 
                                                <div className='border p-4'>
                                                    <div>
                                                        {formatDate(segment.departure?.at)} - {formatDate(segment.arrival?.at)}
                                                    </div>
                                                    <div className='flex h-10'>
                                                        <div className='w-[50%]'>
                                                            Ciudad1({segment.departure?.iataCode}) - Ciudad2({segment.arrival?.iataCode})
                                                        </div>
                                                        <div className='w-[50%]'>
                                                            <div>
                                                                {formatDuration(segment.duration)} ({handleNumberstops(segment.numberOfStops)})
                                                            </div>
                                                            {segment.numberOfStops !== undefined && segment.numberOfStops > 0 && 
                                                                <div>
                                                                    {
                                                                        segment.stops?.map(stop =>
                                                                            <div>
                                                                                {formatDuration(stop.duration)} in City({stop.iataCode})
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Aerolinea ({segment.carrierCode})
                                                    </div>
                                                </div>
                                            )
                                        }
                                        </div>
                                        <div className='w-[20%] p-0 pr-15 border flex items-center font-semibold'>
                                            <div className='w-full flex flex-col'>
                                                <div className='flex justify-end'>
                                                    $ {Number(item.price?.grandTotal).toLocaleString()} {item.price?.currency}
                                                </div>
                                                <div className='flex justify-end font-medium mb-3'>
                                                    total
                                                </div>
                                                <div className='flex justify-end'>
                                                    $ {Number(item.travelerPricings?.[0]?.price?.total).toLocaleString()} {item.price?.currency}
                                                </div>
                                                <div className='flex justify-end font-medium'>
                                                    per Traveler
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Card>
                    )
                }

            </div>
        </div>
    );
}
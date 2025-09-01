
import { Button } from '@/components/UI/button/button';
import { Card } from '@/components/UI/card/card';
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDuration } from '@/lib/utils';
import { IataCityName } from '@/components/Elements/iataCityName';
import { IataAirlineName } from '@/components/Elements/iataAirlineName';
import ArrowDownIcon from '@/assets/arrow-down.png'


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
            <div className='h-[95%] border overflow-y-auto inset-shadow-sm p-3 bg-gray-100'>
                {
                    results.data.map(item =>
                        <Card onClick={() => handleDetailsPage(item.id)} className='border-0 m-4 p-0 text-sm hover:shadow-xl transition-shadow flex flex-row'>
                            <div className='w-[80%]'>
                            {
                                item.itineraries?.map((itinerary, index) =>
                                    <>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            {
                                                itinerary.segments.map(segment => 
                                                    <div className='border w-full p-4'>
                                                        <div>
                                                            {formatDate(segment.departure?.at)} - {formatDate(segment.arrival?.at)}
                                                        </div>
                                                        <div className='flex h-10'>
                                                            <div className='w-[60%]'>
                                                                <IataCityName code={segment.departure?.iataCode}/> ({segment.departure?.iataCode}) - <IataCityName code={segment.arrival?.iataCode}/> ({segment.arrival?.iataCode})
                                                            </div>
                                                            <div className='w-[40%]'>
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
                                                            <IataAirlineName code={segment.carrierCode}/> ({segment.carrierCode})
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        { 
                                            item.itineraries != undefined && index != item.itineraries?.length - 1 && 
                                            <div className='flex items-center justify-center w-full border-3 border-l-white border-r-white'>
                                                <div className='flex items-center justify-between h-5 w-1/4'>
                                                    <img src= {ArrowDownIcon} alt='' className='w-4 h-4'/>
                                                    <img src= {ArrowDownIcon} alt='' className='w-4 h-4'/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    </>
                                )
                            }
                            </div>

                            <div className='w-[20%] border p-0 pr-15 border flex items-center font-semibold'>
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
                        </Card>
                    )
                }

            </div>
        </div>
    );
}

import { Button } from '@/components/UI/button/button';
import { Card } from '@/components/UI/card/card';
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function formatDate(date: string | undefined): string {
    if (!date) return '';
    let formattedDate = new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    formattedDate = formattedDate.replace(' ','');

    return formattedDate;
}

function formatHour(duration: string | undefined): string {

    if (!duration) return '';

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;

    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}m` : '';

    return [hours, minutes].filter(Boolean).join(' ');
}

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

    return (
        <>
            <div className='my-9 text-md'>
                <Button
                    type='submit'
                    className='w-1/5'
                    onClick={handleReturnToSearchPage}
                >
                    Return to search
                </Button>
            </div>
            <div>
                {
                    results.data.map(item =>
                        <Card className='my-4 p-0 text-md'>
                            {
                                item.itineraries?.map(itinerary =>
                                    <div className='flex w-full'>
                                        <div className='w-[80%]'>
                                        {
                                            itinerary.segments.map(segment => 
                                                <div className='border p-6'>
                                                    <div>
                                                        {formatDate(segment.departure?.at)} - {formatDate(segment.arrival?.at)}
                                                    </div>
                                                    <div className='flex h-16'>
                                                        <div className='w-[50%]'>
                                                            Ciudad1({segment.departure?.iataCode}) - Ciudad2({segment.arrival?.iataCode})
                                                        </div>
                                                        <div className='w-[50%]'>
                                                            <div>
                                                                {formatHour(segment.duration)} ({handleNumberstops(segment.numberOfStops)})
                                                            </div>
                                                            {segment.numberOfStops !== undefined && segment.numberOfStops > 0 && 
                                                                <div>
                                                                    {
                                                                        segment.stops?.map(stop =>
                                                                            <div>
                                                                                {formatHour(stop.duration)} in City({stop.iataCode})
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
                                        <div className='w-[20%] p-6 pr-15 border flex items-center font-semibold'>
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
        </>
    );
}
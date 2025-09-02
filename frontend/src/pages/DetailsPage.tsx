import { Button } from '@/components/UI/button/button'
import { Card } from '@/components/UI/card/card'
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { handleLocalSearchCityName } from '@/lib/utils'


export default function DetailsPage() {
    const navigate = useNavigate();
    const { flightOfferID } = useParams();
    const { results } = useFlightOffersResponse();
    const currency = results?.data[0].price?.currency;

    const handleFormatSegmentDate = (date: string | undefined): string => {
        if (!date) return '';
        return dayjs(date).format('YYYY-MM-DD HH:mm a');
    }

    const handleDiffDate = (date_1: string | undefined, date_2: string | undefined): string => {
        const date1 = dayjs(date_1);
        const date2 = dayjs(date_2);
        const diffMinutes = date2.diff(date1, 'minute');

        return `${Math.floor(diffMinutes / 60)} hrs & ${diffMinutes % 60} mins`;
    }

    const handlePriceFormat = (price: string | undefined): string => {
        if (!price) return '';
        return Number(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    const handleReturnToResultsPage = () => {
        navigate('/results');
    }

    return (
        <div className='py-5 h-full'>
            <Button
                type='submit'
                className='w-1/5'
                onClick={handleReturnToResultsPage}
            >
                Return to results
            </Button>

            <div className='w-full flex gap-5 h-full py-5'>
                    <div className='w-[70%] border space-y-5 overflow-y-auto p-3 inset-shadow-sm bg-gray-50 text-sm'>
                        {
                            typeof flightOfferID === 'string' && results?.data[Number(flightOfferID) - 1]?.itineraries?.map((itinerary, index) => 
                            <Card 
                                key={index}
                                className='gap-y-5 font-medium'
                            >
                                {
                                    itinerary.segments.map((segment, index) =>
                                        <div key={index}>
                                        <Card className='flex flex-row gap-5 p-5'>
                                            <div className='w-[50%]'>
                                                <div>Flight {index + 1}</div>
                                                <div>Departure: {handleFormatSegmentDate(segment.departure?.at)}</div>
                                                <div>Arrival: {handleFormatSegmentDate(segment.arrival?.at)}</div>
                                                <div>{handleLocalSearchCityName(segment.departure?.iataCode)} ({segment.departure?.iataCode}) - {handleLocalSearchCityName(segment.arrival?.iataCode)} ({segment.arrival?.iataCode})</div>

                                                <div>Flight number: {segment.number}</div>
                                                <div>Aircraft: {results.dictionaries?.aircraft?.[segment.aircraft?.code ?? ''] ?? 'unknown'}</div>
                                                <div>{results.dictionaries?.carriers?.[segment.carrierCode ?? ''] ?? 'unknown'} ({segment.carrierCode})</div>
                                            </div>
                                            <Card className='w-[50%] p-2'>
                                                Travelers fare details
                                                <div className='w-full h-37 inset-shadow-sm text-xs overflow-y-auto'>
                                                    {
                                                        results.data[Number(flightOfferID) - 1].travelerPricings?.map((travelerFareDetails, index) =>
                                                            <div 
                                                                key={index}
                                                                className='p-1 border'
                                                            >
                                                                <div className='w-full mb-1'>Traveler {travelerFareDetails.travelerId}</div>
                                                                {
                                                                    travelerFareDetails.fareDetailsBySegment.map((fareDetailBySegment, index) => {
                                                                        if (fareDetailBySegment.segmentId === segment.id) {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <div>Cabin: {fareDetailBySegment.cabin}</div>
                                                                                    <div>Class: {fareDetailBySegment.class}</div>
                                                                                    <div>Amenties:</div>
                                                                                    <div className='font-normal'>
                                                                                        {
                                                                                            fareDetailBySegment.amenities?.map((amenity, index) =>
                                                                                                <div key={index}>
                                                                                                    <div>- {amenity.description}</div>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            )
                                                                        }
                                                                        return null;
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </Card>
                                            
                                        </Card>
                                        { index != itinerary.segments.length - 1 && 
                                            <div className='w-full flex justify-center items-center mt-5'>
                                                <Card className='border w-1/2 flex items-center p-0'>
                                                    {handleDiffDate(segment.arrival?.at, itinerary.segments[index + 1].departure?.at)}
                                                </Card>
                                            </div>
                                        }
                                        </div>
                                )}
                            </Card>
                        )}
                    </div>
                <div className='w-[30%]'>
                        <Card className='font-medium h-full'>
                            <div className='h-[50%]'>
                                <div className='text-lg mb-3'>Price Breakdown</div>
                                <div>Base: $ {handlePriceFormat(results?.data[Number(flightOfferID) - 1]?.price?.base)} ({currency})</div>
                                <div>Total: $ {Number(results?.data[Number(flightOfferID) - 1]?.price?.grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({currency})</div>
                                <div className='mb-2'>Fees: </div>
                                <div className='border h-1/2 overflow-y-auto font-normal border inset-shadow-sm'>
                                    {
                                        typeof flightOfferID === 'string' && results?.data[Number(flightOfferID) - 1].price?.fees?.map((fee, index) => 
                                            <div key={index} className='p-1 border'>
                                                <div>Amount: {fee.amount}</div>
                                                <div>Type: {fee.type}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <Card className='p-3 h-[50%]'>
                                Per Traveler
                                <div className='mt-3 inset-shadow-sm text-sm overflow-y-auto'>
                                    {
                                        typeof flightOfferID === 'string' && results?.data[Number(flightOfferID) - 1].travelerPricings?.map((travelerPricing, index) => 
                                            <div key={index} className='border p-1'>
                                                Traveler {travelerPricing.travelerId}
                                                
                                                <div className='mt-2 space-y-1'>
                                                    <div>Base: ${handlePriceFormat(travelerPricing.price?.base)} ({currency})</div>
                                                    <div>Total: ${handlePriceFormat(travelerPricing.price?.total)} ({currency})</div>
                                                </div>
                                                    
                                            </div>

                                        )
                                    }
                                </div>
                                
                            </Card>
                        </Card>
                    </div>
            </div>


        </div>
    );
}
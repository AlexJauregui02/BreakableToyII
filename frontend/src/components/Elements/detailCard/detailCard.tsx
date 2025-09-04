import { Card } from "@/components/UI/card/card";
import { diffBetweenDate, fornmatToCompleteDate, iataCodeCitySearch } from "@/lib/utils";
import type { detailCardProps } from "@/types/props";


export function DetailCard(props: detailCardProps) {

    return (
        <Card key={props.index} className="gap-y-5 font-medium">
        {props.itinerary.segments.map((segment, index) => (
            <div key={index}>
                <Card className="flex flex-row gap-5 p-5">
                    <div className="w-[50%]">
                        <div>Flight {index + 1}</div>
                        <div>Departure: {fornmatToCompleteDate(segment.departure?.at)}</div>
                        <div>Arrival: {fornmatToCompleteDate(segment.arrival?.at)}</div>
                        <div>
                            {iataCodeCitySearch(segment.departure?.iataCode)} (
                            {segment.departure?.iataCode}) -{" "}
                            {iataCodeCitySearch(segment.arrival?.iataCode)} (
                            {segment.arrival?.iataCode})
                        </div>

                        <div>Flight number: {segment.number}</div>
                        <div>
                            Aircraft:{" "}
                            {props.aircraft?.[segment.aircraft?.code ?? ""] ?? "unknown"}
                        </div>
                        <div>
                            {props.carriers?.[segment.carrierCode ?? ""] ?? "unknown"}{" "}
                            ({segment.carrierCode})
                        </div>
                    </div>
                    <Card className="w-[50%] p-2">
                        Travelers fare details
                        <div className="w-full h-37 inset-shadow-sm text-xs overflow-y-auto">
                        {props.travelerPricings?.map(
                            (travelerFareDetails, index) => (
                                <div key={index} className="p-1 border">
                                    <div className="w-full mb-1">
                                        Traveler {travelerFareDetails.travelerId}
                                    </div>
                                    {travelerFareDetails.fareDetailsBySegment.map(
                                        (fareDetailBySegment, index) => {
                                            if (fareDetailBySegment.segmentId === segment.id) {
                                                return (
                                                    <div key={index}>
                                                        <div>Cabin: {fareDetailBySegment.cabin}</div>
                                                        <div>Class: {fareDetailBySegment.class}</div>
                                                        <div>Amenties:</div>
                                                        <div className="font-normal">
                                                            {fareDetailBySegment.amenities?.map(
                                                                (amenity, index) => (
                                                                    <div key={index}>
                                                                        <div>- {amenity.description}</div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                                </div>
                            )
                        )}
                        </div>
                    </Card>
                </Card>
                {index != props.itinerary.segments.length - 1 && (
                    <div className="w-full flex justify-center items-center mt-5">
                        <Card className="border w-1/2 flex items-center p-0">
                            {diffBetweenDate(
                                segment.arrival?.at,
                                props.itinerary.segments[index + 1].departure?.at
                            )}
                        </Card>
                    </div>
                )}

                
            </div>
        ))}
        </Card>
    )
}
import { Button } from "@/components/UI/button/button";
import { Card } from "@/components/UI/card/card";
import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formaDateToHrMin, formatDuration, iataCodeCitySearch } from "@/lib/utils";
import ArrowDownIcon from "@/assets/arrow-down.png";
import { SortControls } from "@/components/Elements/sortControls/sortControls";
import { handleNumberstops, formatPrice } from "@/lib/utils";


export default function ResultsPage() {
	const navigate = useNavigate();
	const { results, clearResults, clearLocationsName } = useFlightOffersResponse();

	useEffect(() => {
		if (!results) {
			navigate("/");
		}
	}, [results, navigate]);

	if (!results) return null;

	const handleReturnToSearchPage = () => {
		clearResults();
		clearLocationsName();
		navigate("/");
	};

	const handleDetailsPage = (flightOfferIDSelected: string) => {
		navigate(`/results/${flightOfferIDSelected}`);
	};

	return (
		<div className="h-full py-5 space-y-5">
			<div className="flex text-md justify-between">
				<Button type="submit" className="w-1/5" onClick={handleReturnToSearchPage}>
					Return to search
				</Button>
				<div className="w-1/3">
					<SortControls />
				</div>
			</div>
			<div className="h-[95%] border overflow-y-auto inset-shadow-sm p-3 bg-gray-100">
				{results.data.map((item) => (
					<Card
						key={item.id}
						onClick={() => handleDetailsPage(item.id)}
						className="border-0 m-4 p-0 text-sm hover:shadow-xl transition-shadow flex flex-row"
					>
						<div className="w-[80%]">
							{item.itineraries?.map((itinerary, index) => (
								<div key={index}>
									<div className="w-full">
										<div className="w-full">
											{itinerary.segments.map((segment, index) => (
												<div key={index} className="border w-full p-4">
													<div>
														{formaDateToHrMin(segment.departure?.at)} - {formaDateToHrMin(segment.arrival?.at)}
													</div>
													<div className="flex h-10">
														<div className="w-[70%] mr-6">
															{iataCodeCitySearch(segment.departure?.iataCode)} (
															{segment.departure?.iataCode}) -{" "}
															{iataCodeCitySearch(segment.arrival?.iataCode)} (
															{segment.arrival?.iataCode})
														</div>
														<div className="w-[30%]">
															<div>
																{formatDuration(segment.duration)} (
																{handleNumberstops(segment.numberOfStops)})
															</div>
															{segment.numberOfStops !== undefined && segment.numberOfStops > 0 && (
																<div>
																	{segment.stops?.map((stop) => (
																		<div>
																			{formatDuration(stop.duration)} in City(
																			{stop.iataCode})
																		</div>
																	))}
																</div>
															)}
														</div>
													</div>
													<div>
														{results.dictionaries?.carriers?.[segment.carrierCode ?? ""] ??
															"unknown"}{" "}
														({segment.carrierCode})
													</div>
												</div>
											))}
										</div>
										{item.itineraries != undefined && index != item.itineraries?.length - 1 && (
											<div className="flex items-center justify-center w-full border-3 border-l-white border-r-white">
												<div className="flex items-center justify-between h-5 w-1/4">
													<img src={ArrowDownIcon} alt="" className="w-4 h-4" />
													<img src={ArrowDownIcon} alt="" className="w-4 h-4" />
												</div>
											</div>
										)}
									</div>
								</div>
							))}
						</div>

						<div className="w-[20%] border flex items-center justify-center font-semibold">
							<div className="flex flex-col items-start">
								<div className="flex justify-end">
									$ {formatPrice(item.price?.grandTotal)} {item.price?.currency}
								</div>
								<div className="flex justify-end font-medium mb-3">total</div>
								<div className="flex justify-end">
									$ {formatPrice(item.travelerPricings?.[0]?.price?.total)} {item.price?.currency} 
								</div>
								<div className="flex justify-end font-medium">per Traveler</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

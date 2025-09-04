import { Button } from "@/components/UI/button/button";
import { Card } from "@/components/UI/card/card";
import { useFlightOffersResponse } from "@/context/FlightOffersContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { 
	formatPrice 
} from "@/lib/utils";
import { DetailCard } from "@/components/Elements/detailCard/detailCard";

export default function DetailsPage() {
	const navigate = useNavigate();
	const { flightOfferID } = useParams();
	const { results } = useFlightOffersResponse();
	const currency = results?.data[0].price?.currency;

	const handleReturnToResultsPage = () => {
		navigate("/results");
	};

	return (
		<div className="py-5 h-full">
			<Button type="submit" className="w-1/5" onClick={handleReturnToResultsPage}>
				Return to results
			</Button>

			<div className="w-full flex gap-5 h-full py-5">
				<div className="w-[70%] border space-y-5 overflow-y-auto p-3 inset-shadow-sm bg-gray-50 text-sm">
					{typeof flightOfferID === "string" &&
						results?.data[Number(flightOfferID) - 1]?.itineraries?.map((itinerary, index) => (
							<DetailCard  
								index={index}
								itinerary={itinerary}
								travelerPricings={results.data[Number(flightOfferID) - 1].travelerPricings}
								aircraft={results.dictionaries?.aircraft}
								carriers={results.dictionaries?.carriers}
							/>
						))}
				</div>
				<div className="w-[30%]">
					<Card className="font-medium h-full">
						<div className="h-[50%]">
							<div className="text-lg mb-3">Price Breakdown</div>
							<div>
								Base: $ {formatPrice(results?.data[Number(flightOfferID) - 1]?.price?.base)}
								({currency})
							</div>
							<div>
								Total: ${" "}
								{formatPrice(results?.data[Number(flightOfferID) - 1]?.price?.grandTotal)}
								({currency})
							</div>
							<div className="mb-2">Fees: </div>
							<div className="border h-1/2 overflow-y-auto font-normal border inset-shadow-sm">
								{typeof flightOfferID === "string" &&
									results?.data[Number(flightOfferID) - 1].price?.fees?.map((fee, index) => (
										<div key={index} className="p-1 border text-sm">
											<div>Amount: {fee.amount}</div>
											<div>Type: {fee.type}</div>
										</div>
									))}
							</div>
						</div>
						<Card className="p-3 h-[50%]">
							Per Traveler
							<div className="mt-3 inset-shadow-sm text-sm overflow-y-auto">
								{typeof flightOfferID === "string" &&
									results?.data[Number(flightOfferID) - 1].travelerPricings?.map(
										(travelerPricing, index) => (
											<div key={index} className="border p-1">
												Traveler {travelerPricing.travelerId}
												<div className="mt-2 space-y-1">
													<div>
														Base: ${formatPrice(travelerPricing.price?.base)} ({currency})
													</div>
													<div>
														Total: ${formatPrice(travelerPricing.price?.total)} ({currency})
													</div>
												</div>
											</div>
										)
									)}
							</div>
						</Card>
					</Card>
				</div>
			</div>
		</div>
	);
}

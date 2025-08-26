
import { useState, type ChangeEventHandler } from 'react'
import Card from '../card/card'

import type { FlightSearch } from '../../../types/flightSearch'

import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


interface SelectOption {
    label: string;
    value: string;
}

export default function SearchTable(){

    const originLocationCodeOptions: SelectOption[] = [
        { label: 'Select...', value: '' },
        { label: 'SFO', value: 'SFO' },
    ];

    const destinationLocationCodeOptions: SelectOption[] = [
        { label: 'Select...', value: '' },
        { label: 'LAX', value: 'LAX' },
    ];

    const currencyCodeOptions: SelectOption[] = [
        { label: 'Select...', value: '' },
        { label: 'USD', value: 'USD' },
    ];

    const [originLocationCode, setOriginLocationCode] = useState<string>('');
    const handleOriginLocationCode = (option: SelectOption | null) => {
        if (option) setOriginLocationCode(option.value);
        else setOriginLocationCode('');
    }

    const [destinationLocationCode, setDestinationLocationCode] = useState<string>('');
    const handleDestinationLocationCode = (option: SelectOption | null) => {
        if (option) setDestinationLocationCode(option.value);
        else setDestinationLocationCode('');
    }

    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const handleDepartureDate = (date: Date | null) => {
        setDepartureDate(date);
    }

    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const handleReturnDate = (date: Date | null) => {
        setReturnDate(date);
    }

    const [adults, setAdults] = useState<string>('');
    const handleAdults = (options: React.ChangeEvent<HTMLInputElement>) => {
        setAdults(options.target.value);
    }
    
    const [currencyCode, setCurrencyCode] = useState<String>('');
    const handleCurrencyCode = (options: SelectOption | null) => {
        if (options) setCurrencyCode(options?.value);
        else setCurrencyCode('');
    }

    const [isNonStop, setIsNonStop] = useState<boolean>(false);
    const handleIsNonStop = (options: React.ChangeEvent<HTMLInputElement>) => {
        setIsNonStop(options.target.checked);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const flightSearchOffer: FlightSearch = {
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: departureDate?.toISOString().split('T')[0],
            returnDate: returnDate?.toISOString().split('T')[0],
            adults: adults,
            nonStop: isNonStop,
            currencyCode: currencyCode
        };

        try {
            console.log(flightSearchOffer);
        }
        catch (error) {
            console.log('Error')
        }
    }

    return (
        <div className="flex items-center justify-center h-full w-full">
            <Card className="w-1/2 flex items-center h-3/4">
                <form onSubmit={handleSubmit}>

                    <div className="font-semibold mb-3">FLIGHT SEARCH</div>

                    <div className="flex flex-col w-full gap-y-3">
                        <label className="font-medium">
                            Departure Airport:
                            <Select
                                options={originLocationCodeOptions}
                                onChange={handleOriginLocationCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => `bg-white rounded-sm pl-2 py-1`,
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                                required
                            />
                        </label>

                        <label className="font-medium">
                            Arrival Airport:
                            <Select
                                options={destinationLocationCodeOptions}
                                onChange={handleDestinationLocationCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => `bg-white rounded-sm pl-2 py-1`,
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                                required
                            />
                        </label>

                        <div className='flex flex-col'>
                            <label className="font-medium mb-1">
                                Departure Date(dd-mm-yyyy):
                            </label>
                            <DatePicker
                                showIcon
                                selected={departureDate? new Date(departureDate) : null}
                                onChange={handleDepartureDate}
                                className='border-1 border-gray-400 shadow-sm rounded-sm w-full text-sm'
                                dateFormat="dd-MM-yyyy"
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className="font-medium mb-1">
                                Return Date(dd-mm-yyyy) (optional):
                            </label>
                            <DatePicker
                                showIcon
                                selected={returnDate? new Date(returnDate) : null}
                                onChange={handleReturnDate}
                                className='border-1 border-gray-400 shadow-sm rounded-sm w-full text-sm'
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>
                        
                        <div className='flex flex-col'>
                            <label className="font-medium mb-1">
                                Adults (optional):
                            </label>
                            <input
                                id='adults'
                                type='number'
                                value={Number(adults)}
                                onChange={handleAdults}
                                className="h-8 w-full rounded-sm border border-input border-gray-400 px-3 py-1 text-sm shadow-sm"
                                min={0}
                                max={999}
                            />
                        </div>

                        <label className="font-medium">
                            Currency:
                            <Select
                                id='currencyCode'
                                options={currencyCodeOptions}
                                onChange={handleCurrencyCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => `bg-white rounded-sm pl-2 py-1`,
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                                required
                            />
                        </label>

                        <div>
                            <input
                                type='checkbox'
                                checked={isNonStop}
                                onChange={handleIsNonStop}
                                required
                            />
                            <label className="font-medium ml-2">
                                Non-Stop
                            </label>
                        </div>

                    </div>
                    
                </form>
            </Card>
        </div>
    );
}
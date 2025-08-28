import { useState } from 'react'

import type { FlightOffersResponse, FlightSearchOffer } from '@/types/flightSearch'
import type { SelectOption } from '@/types/option'

import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/UI/button/button'
import { Input } from '@/components/UI/input/input'
import { Calendar } from '@/components/UI/calendar/calendar'
import { Card } from '@/components/UI/card/card'
import { getFlightOffers } from '@/api/services/flightSearchService'
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useNavigate } from 'react-router-dom'


function formatDate(date: Date | undefined | null) {
    if (!date) {
        return '';
    }

    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

export default function SearchPage() {
    const { setResults } = useFlightOffersResponse();
    const navigate = useNavigate();

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

    const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
    const handleDepartureDate = (date: Date | undefined) => {
        setDepartureDate(date);
    }

    const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
    const handleReturnDate = (date: Date | undefined) => {
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

        const flightSearchOffer: FlightSearchOffer = {
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: departureDate?.toISOString().split('T')[0],
            returnDate: returnDate?.toISOString().split('T')[0],
            adults: adults,
            nonStop: isNonStop,
            currencyCode: currencyCode
        };

        if(!originLocationCode || 
           !destinationLocationCode || 
           !departureDate ||
           !adults) 
        {
            alert("Campo faltante");
            return;
        }

        try {
            const flightOffers = await getFlightOffers(flightSearchOffer) as FlightOffersResponse;

            if (flightOffers !== undefined) {
                setResults(flightOffers);
                navigate('/results');
            }
        }
        catch (error) {
            console.log('Error')
        }
    }

    return (
        <div className='flex items-center justify-center h-full w-full'>
            <Card className='w-1/2 flex items-center h-4/5'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>

                    <div className='font-semibold mb-3'>FLIGHT SEARCH</div>

                    <div className='flex flex-col w-full gap-y-3 mb-4'>
                        <label className='font-medium'>
                            Departure Airport:
                            <Select
                                options={originLocationCodeOptions}
                                onChange={handleOriginLocationCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => 'bg-white rounded-sm pl-2 py-1',
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                                required
                            />
                        </label>

                        <label className='font-medium'>
                            Arrival Airport:
                            <Select
                                options={destinationLocationCodeOptions}
                                onChange={handleDestinationLocationCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => 'bg-white rounded-sm pl-2 py-1',
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                                required
                            />
                        </label>

                        <div className='flex flex-col'>
                            <label className='font-medium mb-1'>
                                Departure Date:
                            </label>
                            <div className='relative flex gap-2'>
                                <Input
                                    placeholder='New Date'
                                    className='bg-background pr-10'
                                    value={formatDate(departureDate)}
                                    required
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
                                        >
                                            <CalendarIcon className='size-3.5'/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto overflow-hidden p-0 z-50 border border-gray-300 shadow-md rounded-sm'
                                        align='end'
                                        alignOffset={-8}
                                        sideOffset={10}
                                    >
                                        <Calendar
                                            mode='single'
                                            captionLayout='dropdown'
                                            className='bg-white'
                                            selected={departureDate}
                                            onSelect={handleDepartureDate}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className="font-medium mb-1">
                                Return Date (optional):
                            </label>
                            <div className='relative flex gap-2'>
                                <Input
                                    placeholder='Returning Date'
                                    className='bg-background pr-10'
                                    value={formatDate(returnDate)}
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
                                        >
                                            <CalendarIcon className='size-3.5'/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto overflow-hidden p-0 z-50 border border-gray-300 shadow-md rounded-sm'
                                        align='end'
                                        alignOffset={-8}
                                        sideOffset={10}
                                    >
                                        <Calendar
                                            mode='single'
                                            captionLayout='dropdown'
                                            className='bg-white'
                                            selected={returnDate}
                                            onSelect={handleReturnDate}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        
                        <div className='flex flex-col'>
                            <label className="font-medium mb-1">
                                Adults:
                            </label>
                            <input
                                id='adults'
                                type='number'
                                value={Number(adults)}
                                onChange={handleAdults}
                                className='h-8 w-full rounded-sm border border-gray-400 px-3 py-1 text-sm shadow-sm'
                                min={0}
                                max={999}
                            />
                        </div>

                        <label className='font-medium'>
                            Currency (optional):
                            <Select
                                id='currencyCode'
                                options={currencyCodeOptions}
                                onChange={handleCurrencyCode}
                                unstyled
                                classNames={{
                                    control: () => 'mt-1 px-2 rounded-sm border-1 border-gray-400 text-sm shadow-sm',
                                    option: () => 'bg-white rounded-sm pl-2 py-1',
                                    menu: () => 'bg-white border-1 border-gray-400 rounded-sm'
                                }}
                            />
                        </label>

                        <div>
                            <input
                                type='checkbox'
                                checked={isNonStop}
                                onChange={handleIsNonStop}
                            />
                            <label className='font-medium ml-2'>
                                Non-Stop
                            </label>
                        </div>

                    </div>

                    <Button
                        type='submit'
                        className='w-3/4'
                    >
                        Search
                    </Button>

                </form>
            </Card>
        </div>
    );
}
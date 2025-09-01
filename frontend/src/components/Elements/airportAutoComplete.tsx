import AsyncSelect from 'react-select/async';
import { searchAirportsByKeyword } from '@/api/services/flightSearchService';
import type { IataCodeAirportSearchResponse } from '@/types/iataCodeSearch';

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  onChange: (option: OptionType | null) => void;
  defaultValue?: OptionType;
  placeholder?: string;
}

export function AirportAutocomplete({ onChange, defaultValue, placeholder }: Props) {
  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue || inputValue.length < 2) return [];

    const results: IataCodeAirportSearchResponse[] = await searchAirportsByKeyword(inputValue);

    return results.map(item => ({
      label: `${item.name} (${item.iataCode})`,
      value: item.iataCode
    }));
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder || "Search airport..."}
      unstyled
      classNames={{
        control: () => 'mt-1 px-2 rounded-sm border border-gray-400 text-sm shadow-sm',
        option: () => 'bg-white rounded-sm pl-2 py-1',
        menu: () => 'bg-white border border-gray-400 rounded-sm'
      }}
    />
  );
}

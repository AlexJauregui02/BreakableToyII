import type { SelectOption } from "./option";

export interface AirportAutoCompleProps {
	onChange: (option: SelectOption | null) => void;
	defaultValue?: SelectOption;
}

export interface selectDateProps {
	date: Date | undefined;
	onChange: (newDate: Date | undefined) => void;
}
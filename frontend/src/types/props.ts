import type { SelectOption } from "./option";

export interface AirportAutoCompleProps {
	onChange: (option: SelectOption | null) => void;
	defaultValue?: SelectOption;
}

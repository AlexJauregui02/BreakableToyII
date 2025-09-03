import { Button } from "@/components/UI/button/button";
import { Calendar } from "@/components/UI/calendar/calendar";
import { Input } from "@/components/UI/input/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover/popover";
import { formatToLongDate } from "@/lib/utils";
import type { selectDateProps } from "@/types/props";
import { CalendarIcon } from "lucide-react";


export function DateSelect({date, onChange}: selectDateProps) {

    return (
        <div className="relative flex gap-2">
            <Input
                placeholder="New Date"
                className="bg-background pr-10"
                value={formatToLongDate(date)}
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                        <CalendarIcon className="size-3.5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0 z-50 border border-gray-300 shadow-md rounded-sm"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        className="bg-white"
                        selected={date}
                        onSelect={onChange}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
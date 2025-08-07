import { cn } from "@/lib/utils";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { useBookingState } from "../consult/booking-context";
import { isEqual } from "date-fns";

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const { unAvailableDays, selectedService, selectedDate } = useBookingState();

  const minValue = new Date(selectedService.startDate);
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const currentDateValue = new Date(`${date.year}-${date.month}-${date.day}`);

  const isPastDay =
    currentDateValue.getTime() < minValue.getTime() ||
    currentDateValue < yesterday;

  const isOffDay = unAvailableDays.includes(
    date.toDate(getLocalTimeZone()).getDay()
  );
  const ref = useRef<HTMLDivElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date, isDisabled: isOffDay || isPastDay }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  // const [year, month, day] = selectedDate.split("-").map(Number);
  // const defaultValue = new CalendarDate(year, month, day);

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={cn("py-0.5 relative px-0.5", isFocusVisible ? "z-10" : "z-0")}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 md:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-md flex items-center justify-center",
            "text-gray-700 text-sm font-semibold",
            isDisabled
              ? isDateToday
                ? "cursor-default"
                : "text-gray-400 cursor-default"
              : "cursor-pointer bg-muted",
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible &&
              "ring-1 group-focus:z-2 ring-gray-12 ring-offset-1",
            // Darker selection background for the start and end.
            isSelected && "bg-primary text-gray-50",
            // Hover state for non-selected cells.
            !isSelected && !isDisabled && "hover:ring-2 hover:ring-gray-12"
            // isDateToday && "bg-gray-1 text-primary ring-0 ring-offset-0",
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-gray-50"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}

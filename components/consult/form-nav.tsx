"use client";

import { Button } from "../ui/button";
import { useBookingState } from "./booking-context";

export default function FormNav() {
  const {
    formStep,
    selectedTime,
    selectedDay,
    selectedDate,
    guest,
    guestValidated,
    bookingMade,
  } = useBookingState();

  if (bookingMade) return null;

  switch (formStep) {
    case 1:
      return <Buttons showPrevBtn={false} />;

    case 2:
      return (
        <Buttons
          disableNextBtn={
            !Boolean(selectedTime) ||
            !Boolean(selectedDay) ||
            !Boolean(selectedDate)
          }
        />
      );

    case 3:
      return (
        <Buttons
          disableNextBtn={
            !Boolean(guest.fullName) ||
            !Boolean(guest.email) ||
            !Boolean(guest.phoneNumber) ||
            !guestValidated
          }
        />
      );

    case 4:
      return <Buttons showPrevBtn={true} showNextBtn={false} />;

    default:
      return <Buttons />;
  }
}

type Props = {
  showPrevBtn?: boolean;
  showNextBtn?: boolean;
  disableNextBtn?: boolean;
};

function Buttons({
  showPrevBtn = true,
  showNextBtn = true,
  disableNextBtn,
}: Props) {
  const { dispatch } = useBookingState();
  return (
    <div className="h-12 relative">
      {showPrevBtn && (
        <Button
          onClick={() => dispatch({ type: "step/prev" })}
          className="bg-muted absolute left-0"
          variant="outline"
        >
          Back
        </Button>
      )}
      {showNextBtn && (
        <Button
          onClick={() => dispatch({ type: "step/next" })}
          className="absolute right-0"
          disabled={disableNextBtn}
        >
          Next
        </Button>
      )}
    </div>
  );
}

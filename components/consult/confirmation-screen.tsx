import { convert24HourTo12Hour, generateRandomString } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { P } from "../ui/typography";
import ExpertPhoto from "./expert-photo";
import { Heading } from "../ui/Heading";
import { useBookingState } from "./booking-context";
import BookingLoader from "./booking-loader";
import { Check } from "lucide-react";
import AddToCalendarDropdown from "./add-to-calendar";
import { FiVideo } from "react-icons/fi";
import { createMeeting } from "@/server/meeting.actions";
import { useState } from "react";

export default function ConfirmationScreen() {
  const {
    user,
    selectedTime,
    selectedDate,
    selectedService,
    guest,
    bookingMade,
    dispatch,
    termsAccepted,
    isBooking,
  } = useBookingState();

  const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
  const endDateTime = new Date(
    startDateTime.getTime() + selectedService.duration * 60 * 1000
  );

  const meetingEvent = {
    title: `Meeting with ${user.firstName} ${user.lastName}`,
    description: `Consultation service: ${selectedService?.title}`,
    location: `Online meeting - https://meetpad.app/c/${generateRandomString()}`,
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
  };

  const bookMeeting = async () => {
    dispatch({ type: "booking/loading" });
    const data = {
      meeting: {
        service: selectedService.id,
        time: convert24HourTo12Hour(selectedTime),
        duration: selectedService.duration,
        status: "confirmed",
        userId: user.id,
        date: selectedDate,
        link: meetingEvent.location,
        type: selectedService.title,
      },
      guest: {
        ...guest,
        userId: user.id,
      },
      user,
    };

    await createMeeting(data);

    dispatch({ type: "booking/success" });
  };

  if (bookingMade)
    return (
      <div className="grid place-content-center gap-8 h-[20rem]">
        <div className="w-24 aspect-square rounded-full bg-blue-500 flex items-center justify-center mx-auto">
          <Check size={48} className="stroke-white" />
        </div>
        <Heading className="text-center justify-center items-center">
          Booking successful
        </Heading>
        <div className="flex items-center gap-4">
          <AddToCalendarDropdown event={meetingEvent} />
          <Button className="bg-gray-600 text-white">
            <FiVideo size={20} />
            Start Meeting
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 items-center">
      {isBooking && <BookingLoader />}
      <ExpertPhoto />
      <div>
        <P>
          Meeting with
          <strong>
            {" "}
            {user.firstName} {user.lastName}
          </strong>
        </P>
      </div>
      <P size="sm">
        Meeting will be scheduled for{" "}
        <strong>
          {new Date(selectedDate).toDateString()}, at{" "}
          {convert24HourTo12Hour(selectedTime)}
        </strong>
      </P>
      <P size="sm" className="max-w-[60ch] text-center">
        Use the button below to book a meeting. After booking, we will send you
        an email with the meeting link
      </P>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={termsAccepted}
          onCheckedChange={() => dispatch({ type: "toggle/terms" })}
        />
        <P size="sm">
          I accept the{" "}
          <a className="underline" href="#">
            Terms of service
          </a>{" "}
          and{" "}
          <a className="underline" href="#">
            Privacy
          </a>
        </P>
      </div>
      <form action={bookMeeting}>
        <Button disabled={!termsAccepted}>Book Meeting</Button>
      </form>
    </div>
  );
}

"use client";

import ServiceScreen from "@/components/consult/service-screen";
import AvailabilityScreen from "@/components/consult/availabilty-screen";
import DetailsScreen from "@/components/consult/details-screen";
import ConfirmationScreen from "@/components/consult/confirmation-screen";
import { useBookingState } from "./booking-context";
import BookingLoader from "./booking-loader";

export default function BookingForm() {
  const { formStep, isBooking } = useBookingState();

  return (
    <div className="bg-gray-50 p-6 rounded-md my-5 shadow-sm min-h-[20rem]">
      {formStep === 1 && <ServiceScreen />}
      {formStep === 2 && <AvailabilityScreen />}
      {formStep === 3 && <DetailsScreen />}
      {formStep === 4 && <ConfirmationScreen />}
      {isBooking && <BookingLoader />}
    </div>
  );
}

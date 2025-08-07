"use client";

import { useBookingState } from "./booking-context";

export default function Steps() {
  const {
    formStep: currentStep,
    dispatch,
    selectedTime,
    selectedDay,
    selectedDate,
    guest,
    selectedService,
    bookingMade,
  } = useBookingState();

  function isCompleted(stepNumber: number) {
    const step1completed = Boolean(selectedService);
    const step2completed =
      Boolean(selectedTime) && Boolean(selectedDay) && Boolean(selectedDate);
    const step3completed =
      Boolean(guest.fullName) &&
      Boolean(guest.email) &&
      Boolean(guest.phoneNumber);

    switch (stepNumber) {
      case 1:
        return step1completed;
      case 2:
        return step1completed || step2completed;
      case 3:
        return step2completed || step3completed;
      case 4:
        return step3completed;
    }
  }

  const handleStepClick = (stepNumber: number) =>
    dispatch({ type: "step/goto", payload: stepNumber });

  if (bookingMade) return null;

  return (
    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-[1px] after:-translate-y-1/2 after:rounded-lg after:bg-gray-200">
      <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-600">
        {["Service", "Availability", "Details", "Confirmation"].map(
          (step, index) => (
            <li key={step} className="flex items-center bg-gray-50 gap-2 p-2">
              <button
                disabled={!isCompleted(index + 1)}
                onClick={() => handleStepClick(index + 1)}
                className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${
                  currentStep > index
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {index + 1}
              </button>

              <span
                className={`hidden sm:block ${
                  currentStep === index + 1 ? "text-gray-800" : ""
                }`}
              >
                {step}
              </span>
            </li>
          )
        )}
      </ol>
    </div>
  );
}

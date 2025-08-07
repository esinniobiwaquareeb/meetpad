import { Suspense } from "react";
import { Services } from "@/components/calender/services";
import AvailabilityLoader from "@/components/calender/availability-loader";

export const metadata = {
  title: "My Calender",
};

export default function Page() {
  return (
    <div className="bg-gray-50 rounded p-6 w-full mx-auto">
      <h2 className="text-[24px] font-semibold mb-4">Availability Calendar</h2>
      <Suspense fallback={<AvailabilityLoader />}>
        <Services />
      </Suspense>
    </div>
  );
}

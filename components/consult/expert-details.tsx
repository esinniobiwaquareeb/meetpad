import { Calendar, DollarSign, MapPin } from "lucide-react";
import { Heading } from "../ui/Heading";
import { P } from "../ui/typography";
import { useBookingState } from "./booking-context";

export function ExpertDetails() {
  const { user, selectedService } = useBookingState();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6">
      <div className="flex flex-col mb-6 md:mb-0">
        <Heading type="h4" className="font-bold">
          {user.firstName} {user.lastName}
        </Heading>
        <div className="flex gap-6 md:flex-col md:gap-0">
          <div className="flex gap-2 items-center mt-1">
            <Calendar size={18} className="text-primary" />
            <P size="sm">{new Date(Date.now()).toDateString()}</P>
          </div>
          <div className="flex gap-2 items-center mt-1">
            <MapPin size={18} className="text-primary" />
            <P size="sm">{user.country}</P>
          </div>
        </div>
      </div>
      <div>
        <P size="xs" className="">
          Starting at
        </P>
        <div className="flex gap-2">
          <Heading type="h2" className="font-bold flex items-center">
            {selectedService.price ? (
              <>
                {selectedService.price}
                <DollarSign size={24} />
              </>
            ) : (
              "Free"
            )}
          </Heading>
          <P size="sm">/{selectedService.duration} minutes</P>
        </div>
      </div>
    </div>
  );
}

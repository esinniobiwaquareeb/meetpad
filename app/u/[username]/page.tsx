import Steps from "@/components/consult/steps";
import BookingForm from "@/components/consult/booking-form";
import FormNav from "@/components/consult/form-nav";
import { BookingProvider } from "@/components/consult/booking-context";
import { getConsultationDataByUsername } from "@/server/booking.actions";

interface IUser extends User {
  services: Service[];
}

export default async function Page({ params }: PageParamProps) {
  const { username } = params;

  const user = await getConsultationDataByUsername(username);

  return (
    <BookingProvider userApi={user as unknown as IUser}>
      <Steps />
      <BookingForm />
      <FormNav />
    </BookingProvider>
  );
}

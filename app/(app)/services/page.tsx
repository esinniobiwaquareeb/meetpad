import ButtonAddService from "@/components/services/btn-add-service";
import ServiceList from "@/components/services/service-list";
import ServiceLoader from "@/components/services/service-loader";
import { Heading } from "@/components/ui/Heading";
import { P } from "@/components/ui/typography";
import { UserProvider } from "@/contexts/user-context";
import { getCurrentUser } from "@/server/user.actions";
import { Suspense } from "react";

export const metadata = {
  title: "My Services",
};

export const revalidate = 0;

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <UserProvider user={user}>
      <div className="bg-gray-50 rounded p-2 md:p-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-48 mb-10">
          <div>
            <Heading>My Services</Heading>
            <P size="sm" className="font-normal">
              {`Add the types of consultations you provide, e.g.,
          "Medical consultation". It will enable your clients to book a
          consultation through your Public Profile.`}
            </P>
          </div>
          <ButtonAddService />
        </div>
        <Suspense fallback={<ServiceLoader />}>
          <ServiceList />
        </Suspense>
      </div>
    </UserProvider>
  );
}

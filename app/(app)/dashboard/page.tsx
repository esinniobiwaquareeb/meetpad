// import MeetingsTable from "@/components/meetings/MeetingsTable";
import { WelcomeScreen } from "@/components/dashboard/WelcomeScreen";
import StripeBanner from "@/components/dashboard/StripeBanner";
import ProfilePrompt from "@/components/dashboard/profile-prompt";
import ServicePrompt from "@/components/dashboard/service-prompt";
import { Suspense } from "react";
import DashboardLoader from "@/components/dashboard/dashboard-loader";
import { UserProvider } from "@/contexts/user-context";
import { Heading } from "@/components/ui/Heading";
import { getServices } from "@/server/service.actions";
import { getCurrentUser } from "@/server/user.actions";
import HorizontalCalendar from "@/components/dashboard/HorizontalCalendar";
import { CalendarProvider } from "@/components/dashboard/calender-provider";
import DashboardCalendar from "@/components/dashboard/dashboard-calendar";
import { MeetingsTable } from "@/components/dashboard/meetings-table";
import { columns } from "@/components/dashboard/columns";
import MeetingTableProvider from "@/components/dashboard/meeting-table-provider";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const user = await getCurrentUser();
  const userServices = await getServices(user.id);
  const displayName = user.firstName ? `${user.lastName}` : user.email;

  // Exclude the 'stripe_verified' field from profile data
  const profileFields = Object.entries(user).filter(
    ([key, _]) => key !== "stripe_verified" && key !== "stripe_customer_id"
  );

  const incompleteProfileFields =
    profileFields.filter(([_, value]) => !value).length > 0;
  const noServices = userServices?.length === 0;

  return (
    <Suspense fallback={<DashboardLoader />}>
      <UserProvider user={user}>
        <CalendarProvider>
          {(incompleteProfileFields || noServices) && (
            <div
              className={`bg-gray-50 p-3 mb-6 rounded-md gap-6 ${
                incompleteProfileFields && noServices
                  ? "grid md:grid-cols-2"
                  : "grid"
              }`}
            >
              {incompleteProfileFields && <ProfilePrompt />}
              {noServices && <ServicePrompt />}
            </div>
          )}
          {!user.stripe_verified && <StripeBanner />}
          <div className="grid md:grid-cols-[1fr_auto] md:gap-6 mb-6">
            <WelcomeScreen email={displayName} />
            <div className="bg-gray-50 rounded-md hidden md:block">
              <DashboardCalendar />
            </div>
          </div>
          <div className="bg-gray-50 rounded-md overflow-hidden mb-6">
            <HorizontalCalendar />
          </div>
          <Heading className="mb-3">Meetings</Heading>
          <div className="bg-gray-50 flex-1 rounded-md p-3">
            <MeetingTableProvider />
          </div>
        </CalendarProvider>
      </UserProvider>
    </Suspense>
  );
}

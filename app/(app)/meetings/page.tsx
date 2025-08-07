import TableLoader from "@/components/common/table-loader";
import ButtonCreateMeeting from "@/components/meetings/btn-create-meeting";
import MeetingsTableProvider from "@/components/meetings/meetings-provider";
import { MeetingsTable } from "@/components/meetings/meetings-table";
import MeetingsFilter from "@/components/meetings/MeetingsFilter";
// import MeetingsTable from "@/components/meetings/MeetingsTable";
import { UserProvider } from "@/contexts/user-context";
import { getCurrentUser } from "@/server/user.actions";
import { Suspense } from "react";

export const metadata = {
  title: "Meetings",
};

type Props = {
  searchParams?: {
    status: "paid" | "in-progress" | "confirmed" | "pending";
  };
};

export default async function Page({ searchParams }: Props) {
  const status = searchParams?.status ?? "all";
  const user = await getCurrentUser();
  return (
    <UserProvider user={user}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <ButtonCreateMeeting />
        <MeetingsFilter />
      </div>
      <Suspense fallback={<TableLoader />} key={status}>
        <MeetingsTableProvider filter={status} />
      </Suspense>
    </UserProvider>
  );
}

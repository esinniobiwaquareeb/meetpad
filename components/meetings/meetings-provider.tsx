import { getUserMeetings } from "@/server/meeting.actions";
import { MeetingsTable } from "./meetings-table";
import { getCurrentUser } from "@/server/user.actions";
import NoMeetings from "../meetings/NoMeetings";
import { columns } from "./columns";

type Props = {
  filter: MeetingFilter;
};

export default async function MeetingsTableProvider({ filter }: Props) {
  const user = await getCurrentUser();
  const meetings = await getUserMeetings(user.id);

  if (!meetings || !meetings.length) return <NoMeetings />;

  return (
    <MeetingsTable
      columns={columns}
      data={filterMeetings(meetings, filter) ?? []}
    />
  );
}

const filterMeetings = (meetings: Meeting[], filter: MeetingFilter) => {
  if (filter === "all") return meetings;

  if (filter === "confirmed")
    return meetings.filter((meeting) => meeting.status === "confirmed");

  if (filter === "in-progress")
    return meetings.filter((meeting) => meeting.status === "in-progress");

  if (filter === "pending")
    return meetings.filter((meeting) => meeting.status === "pending");

  if (filter === "paid")
    return meetings.filter((meeting) => meeting.status === "paid");
};

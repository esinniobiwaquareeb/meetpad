"use client";
import { getUserMeetings } from "@/server/meeting.actions";
import { MeetingsTable } from "./meetings-table";
import { columns } from "./columns";
import { getCurrentUser } from "@/server/user.actions";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/contexts/user-context";
import { createClient } from "@/utils/supabase/client";
import NoMeetings from "../meetings/NoMeetings";
import { useCalendarContext } from "./calender-provider";
import { format } from "date-fns";
import TableLoader from "../common/table-loader";
import { revalidate } from "../services/service-list";
import { revalidatePath } from "next/cache";

export default function MeetingTableProvider() {
  const user = useCurrentUser();
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedDate, dayIndex, days } = useCalendarContext();
  console.log(format(selectedDate!, "yyyy-MM-dd"));

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data: meetings, error } = await supabase
          .from("meeting")
          .select("id, status, time, duration, date, guest(*), service(*)")
          .eq("userId", user.id)
          .eq("date", format(selectedDate!, "yyyy-MM-dd"));

        if (error) throw new Error("error getting user meetings");

        setMeetings(meetings as unknown as any);
        setIsLoading(false);
        // revalidatePath("/dashboard");s
      } catch (error) {
        console.log(error);
        setMeetings([]);
      }
    };

    fetchMeetings();
  }, [selectedDate, user.id, dayIndex, days]);

  if (!meetings || !meetings.length) return <NoMeetings date={selectedDate} />;

  if (isLoading) return <TableLoader />;

  return <MeetingsTable columns={columns} data={meetings ?? []} />;
}

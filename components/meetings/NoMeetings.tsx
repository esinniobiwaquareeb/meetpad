import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Heading } from "../ui/Heading";
import { Button } from "../ui/button";
import { P } from "../ui/typography";
import ButtonCreateMeeting from "./btn-create-meeting";
import { format, isToday } from "date-fns";

type Props = {
  date?: Date;
};

export default function NoMeetings({ date }: Props) {
  return (
    <div className="bg-gray-50 p-4 rounded shadow-sm">
      <div className="border-2 rounded grid place-items-center py-14 border-dotted border-gray-200">
        <div className="mb-3">
          <IoChatboxEllipsesOutline size={80} className="text-gray-300" />
        </div>
        {date && (
          <Heading>
            No meeting requests
            {isToday(date!)
              ? "Today"
              : ` on ${format(date!, "EEE MMM dd yyyy")}`}
          </Heading>
        )}
        {!date && "No meeting request yet"}
        <P>{`You don't have any meeting requests`}</P>
        <div className="flex justify-center items-center mt-4">
          {/* <Button size="lg">Schedule a meeting</Button> */}
          <ButtonCreateMeeting>Schedule a meeting</ButtonCreateMeeting>
        </div>
      </div>
    </div>
  );
}

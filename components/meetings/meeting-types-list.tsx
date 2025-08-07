import { MessageSquareMore, PhoneCall, Video } from "lucide-react";
import { P } from "../ui/typography";

type Props = {
  meeting_types: MeetingType[];
};

export default function MeetingTypesList({ meeting_types }: Props) {
  const isAllTypes = meeting_types.includes("all");
  const types = isAllTypes
    ? ["video call", "voice call", "chat"]
    : meeting_types;
  return (
    <div className="grid grid-cols-2 gap-2">
      {types.map((type) => (
        <div key={type} className="flex items-center gap-2 text-gray-800">
          <span className="h-6 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
            {type === "video call" && (
              <Video className="size-5" strokeWidth={1.5} />
            )}
            {type === "voice call" && (
              <PhoneCall className="size-5" strokeWidth={1.5} />
            )}
            {type === "chat" && (
              <MessageSquareMore className="size-5" strokeWidth={1.5} />
            )}
          </span>
          <P size="sm" className="capitalize">
            {type}
          </P>
        </div>
      ))}
    </div>
  );
}

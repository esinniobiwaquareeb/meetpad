import clsx from "clsx";
import { BadgeCheck, TimerIcon } from "lucide-react";

type Tag_Props = {
  status: "confirmed" | "paid" | "in-progress" | "pending" | "ended"| string;
};

export default function StatusTag({ status }: Tag_Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xl text-xs font-medium capitalize",
        {
          "bg-green-100   dark:bg-green-800 text-green-800 dark:text-green-100":
            status === "confirmed",
          "bg-green-300 dark:bg-green-900": status === "paid",
          "bg-blue-100 dark:bg-blue-950 text-blue-950 dark:text-blue-100":
            status === "in-progress",
          "bg-yellow-200 dark:bg-amber-900  dark:text-amber-100":
            status === "pending",
        }
      )}
    >
      <Icon status={status} />
      {status}
    </span>
  );
}

const Icon = ({ status }: Tag_Props) => {
  switch (status) {
    case "confirmed":
      return <BadgeCheck size={16} />;
    case "pending":
      return <TimerIcon size={16} />;
    case "in-progress":
      return <span className="loader-progress"></span>;
  }
};

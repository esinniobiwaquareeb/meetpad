import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, DollarSign, Users } from "lucide-react";
import WithdrawalCard from "./withdrawal-card";
import { getCurrentUser, getUserEarnings } from "@/server/user.actions";
import { getUserMeetings } from "@/server/meeting.actions";

export default async function Component() {
  const user = await getCurrentUser();
  const [meetings, earnings] = await Promise.all([
    getUserMeetings(user.id) ?? [],
    getUserEarnings(user.id),
  ]);

  const totalEarnings = earnings?.reduce(
    (acc, earning) => acc + earning.amount,
    0
  );

  // returns [totalFree, totalPaid]
  const numOfPaidAndFreeMeetings = meetings?.reduce(
    (acc, meeting) =>
      meeting.status === "paid" ? [acc[0] + 1, acc[1]] : [acc[0], acc[1] + 1],
    [0, 0]
  );

  const [numOfPaid, numOfFree] = numOfPaidAndFreeMeetings!;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{meetings?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Meetings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numOfPaid}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Free Meetings</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numOfFree}</div>
        </CardContent>
      </Card>
      <WithdrawalCard amount={totalEarnings ?? 0} />
    </div>
  );
}

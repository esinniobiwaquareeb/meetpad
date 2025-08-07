"use client";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoMeetings from "../meetings/NoMeetings";
import { formatDateString } from "@/lib/utils";
import StatusTag from "../meetings/StatusTag";
import { Button } from "../ui/button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Pagination } from "../ui/pagination";
import TableLoader from "../common/table-loader";
import { getUserMeetings } from "@/server/meeting.actions";
import { useCurrentUser } from "@/contexts/user-context";

type Props = {
  filter: MeetingFilter;
};

export default function MeetingsTable({ filter }: Props) {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchMeetings() {
      setIsLoading(true);
      // const userMeetings = await getUserMeetings();
      const userMeetings = await getUserMeetings(user.id);

      if (Array.isArray(userMeetings)) {
        setMeetings(userMeetings);
      } else {
        console.error(
          "Expected userMeetings to be an array, but received:",
          userMeetings
        );
      }
      setIsLoading(false);
    }
    fetchMeetings();
  }, [user.id]);

  if (isLoading) return <TableLoader />;
  if (!meetings.length) return <NoMeetings />;

  const filteredMeetings =
    filterMeetings(
      meetings.filter((meeting) =>
        meeting.guest.fullName.toLowerCase().includes(search.toLowerCase())
      ),
      filter
    ) || [];

  const displayedMeetings = filteredMeetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-6 mx-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <Input
            type="text"
            placeholder="Search by Guest Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <div className="flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 hidden md:flex">
          <label className="text-sm md:text-base">Per Page</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="select select-bordered w-full md:w-32"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">Date</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Meeting Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-75">
          {displayedMeetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell className="font-medium flex flex-col">
                <span>{formatDateString(meeting.date)}</span>
                <span>{formatTo12Hour(meeting.time)}</span>
              </TableCell>
              <TableCell>
                <span>{meeting.guest.fullName}</span>
                <br />
                <span className="text-xs">{meeting.guest.email}</span>
              </TableCell>
              <TableCell>{meeting.duration} mins</TableCell>
              <TableCell>{meeting.service.title}</TableCell>
              <TableCell>
                <StatusTag status={meeting.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button size="sm">Join</Button>
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <HiOutlineDotsVertical size={24} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
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

function formatTo12Hour(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // convert 0 to 12 for 12 AM
  const formattedHours = adjustedHours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${suffix}`;
}

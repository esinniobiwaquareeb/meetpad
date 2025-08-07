"use client";

import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowUpDown,
  Ban,
  Copy,
  Eye,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import TableColumnHeader from "../table/table-column-header";
import StatusTag from "./StatusTag";
import DeleteMeetingDialog from "./delete-meeting-dialog";
import ButtonEditMeeting from "./btn-edit-meeting";

export const columns: ColumnDef<Meeting>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text=[0.8rem]">
        {new Date(row.original.date).toDateString()}
      </span>
    ),
  },
  {
    accessorKey: "guest",
    header: ({ column }) => <TableColumnHeader column={column} title="Guest" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.guest.fullName}</span>
        <span className="text-xs text-accent-foreground">
          {row.original.guest.email}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "time",
    header: ({ column }) => <TableColumnHeader column={column} title="Time" />,
    cell: ({ row }) => <span>{convert24HourTo12Hour(row.original.time)}</span>,
  },
  {
    accessorKey: "meetingType",
    header: "Meeting type",
    cell: ({ row }) => <span>{row.original.service.title}</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className="text-xs">Status</span>,
    cell: ({ row }) => <StatusTag status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Button size="sm">Join</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 p-0 flex justify-end">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
              <ButtonEditMeeting
                meeting={row.original}
                className="flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Pencil size={16} className="stroke-gray-600" />
                Edit meeting schedule
              </ButtonEditMeeting>

              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(row.original.id);
                  toast.success("Copied to clipboard!");
                }}
                className="flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Copy size={16} className="stroke-gray-600" /> Copy meeting ID
              </DropdownMenuItem>
              <DeleteMeetingDialog>
                <DropdownMenuItem className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <Ban size={16} className="stroke-gray-600" /> Cancel meeting
                </DropdownMenuItem>
              </DeleteMeetingDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const formatCurrencyToUSD = (amount: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
};

export function convert24HourTo12Hour(time24: string): string {
  // Split the input time string into hours and minutes
  const [hour, minute] = time24.split(":").map(Number);

  // Determine the period (AM/PM)
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  let hour12 = hour % 12;
  hour12 = hour12 === 0 ? 12 : hour12; // Convert 0 to 12 for 12 AM/PM

  // Format hours and minutes to ensure they are always two digits
  const formattedHour = String(hour12).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");

  // Return the formatted 12-hour time string with AM/PM
  return `${formattedHour}:${formattedMinute} ${period}`;
}

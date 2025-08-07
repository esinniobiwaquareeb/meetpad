"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableColumnHeader from "@/components/table/table-column-header";

export const earningColumns: ColumnDef<Earning>[] = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
    cell: ({ row }) => <span className="text=[0.8rem]">{row.original.id}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span>{formatCurrencyToUSD(row.original.amount + "")}</span>
    ),
  },
  {
    accessorKey: "meetingId",
    header: () => <span>Meeting ID</span>,
    cell: ({ row }) => (
      <span className="text=[0.8rem]">{row.original.meetingId}</span>
    ),
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
];

export const walletHistoryColumns: ColumnDef<WalletHistory>[] = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
    cell: ({ row }) => <span className="text=[0.8rem]">{row.original.id}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span>{formatCurrencyToUSD(row.original.amount + "")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: () => <span>Type</span>,
    cell: ({ row }) => (
      <span className="text=[0.8rem]">{row.original.type}</span>
    ),
  },
  {
    accessorKey: "description",
    header: () => <span>Description</span>,
    cell: ({ row }) => (
      <span className="text=[0.8rem]">{row.original.description}</span>
    ),
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
];

const formatCurrencyToUSD = (amount: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
};

export function convert24HourTo12Hour(time24: string): string {
  const [hour, minute] = time24.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";

  let hour12 = hour % 12;
  hour12 = hour12 === 0 ? 12 : hour12; // Convert 0 to 12 for 12 AM/PM

  const formattedHour = String(hour12).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${period}`;
}
